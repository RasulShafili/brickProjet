import * as THREE from 'three';

const ROWS = 24;
const COLS = 40;
export const TOTAL_BRICKS = ROWS * COLS; // 960 kərpic - 1 Draw Call

const BRICK_W = 0.25;
const BRICK_H = 0.065;
const BRICK_D = 0.12;
const MORTAR_GAP = 0.008;

// Garbage Collection dondurmalarının qarşısını almaq üçün qlobal pre-allocated obyektlər
const tempObj = new THREE.Object3D();
const tempCol = new THREE.Color();

export interface BrickDataStore {
  starts: THREE.Vector3[];
  targets: THREE.Vector3[];
  rotations: THREE.Euler[];
  delays: number[];
}

export function createInstancedBrickWall(): {
  mesh: THREE.InstancedMesh;
  brickData: BrickDataStore;
  updateAssembly: (progress: number) => void;
} {
  const geo = new THREE.BoxGeometry(BRICK_W, BRICK_H, BRICK_D);
  const mat = new THREE.MeshStandardMaterial({
    roughness: 0.88,
    metalness: 0.04,
  });

  const mesh = new THREE.InstancedMesh(geo, mat, TOTAL_BRICKS);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const starts: THREE.Vector3[] = [];
  const targets: THREE.Vector3[] = [];
  const rotations: THREE.Euler[] = [];
  const delays: number[] = [];

  const wallWidth = COLS * (BRICK_W + MORTAR_GAP);
  const wallHeight = ROWS * (BRICK_H + MORTAR_GAP);

  const palette = ['#C85A32', '#E3C1AA', '#B84A27', '#9E3F20', '#D9754E'];

  for (let r = 0; r < ROWS; r++) {
    // Klassik running-bond: tək sıralarda yarım kərpic sürüşməsi
    const rowOffset = (r % 2) * ((BRICK_W + MORTAR_GAP) * 0.5);

    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c;

      const targetX = c * (BRICK_W + MORTAR_GAP) + rowOffset - wallWidth / 2;
      const targetY = r * (BRICK_H + MORTAR_GAP) - wallHeight / 2;
      const targetZ = 0;

      targets.push(new THREE.Vector3(targetX, targetY, targetZ));

      // İlkin vəziyyət: yuxarıdan və radial səpələnmiş
      starts.push(
        new THREE.Vector3(
          targetX + Math.sin(idx * 12.9898) * 1.5,
          targetY + 2.5 + r * 0.06,
          targetZ + Math.cos(idx * 78.233) * 1.8
        )
      );

      rotations.push(
        new THREE.Euler(
          Math.sin(idx) * 0.3,
          Math.cos(idx) * 0.4,
          0
        )
      );

      // Aşağıdan yuxarıya doğru sıra gecikməsi
      const normalizedRow = r / ROWS;
      const normalizedCol = c / COLS;
      delays.push(normalizedRow * 0.75 + normalizedCol * 0.12);

      // Terrakota kərpic rəng çaları
      tempCol.set(palette[idx % palette.length]);
      mesh.setColorAt(idx, tempCol);
    }
  }

  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }

  // İlkin matrisləri doldur
  for (let i = 0; i < TOTAL_BRICKS; i++) {
    tempObj.position.copy(targets[i]);
    tempObj.updateMatrix();
    mesh.setMatrixAt(i, tempObj.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  const brickData: BrickDataStore = { starts, targets, rotations, delays };

  const updateAssembly = (progress: number) => {
    for (let i = 0; i < TOTAL_BRICKS; i++) {
      const delay = brickData.delays[i];
      const rawLocal = THREE.MathUtils.clamp((progress - delay) / 0.18, 0, 1);

      // Nəm sement məhluluna oturan kərpicin elastik yaylanma əyrisi
      const easeOutBack = 1 + 1.2 * Math.pow(rawLocal - 1, 3) + 0.3 * Math.pow(rawLocal - 1, 2);
      const t = rawLocal === 1 ? 1 : easeOutBack;

      tempObj.position.lerpVectors(brickData.starts[i], brickData.targets[i], t);
      tempObj.rotation.set(
        brickData.rotations[i].x * (1 - rawLocal),
        brickData.rotations[i].y * (1 - rawLocal),
        0
      );
      tempObj.updateMatrix();
      mesh.setMatrixAt(i, tempObj.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  return { mesh, brickData, updateAssembly };
}
