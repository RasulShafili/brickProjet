import * as THREE from 'three';

export interface StructuralNodeDef {
  id: string;
  name: string;
  category: string;
  specs: string;
  materials: string;
  group: THREE.Group;
  initialPos: THREE.Vector3;
  dirVector: THREE.Vector3;
  explosionDist: number;
}

/**
 * 6 Konstruktiv qatdan ibarət Fərdi Yaşayış Evi:
 * 01 - Dəmir-beton monolit bünövrə və kürsülük
 * 02 - Daşıyıcı kərpic hörgü divarları (pəncərə və tağ oyuqları ilə)
 * 03 - Daxili monolit pilləkən və arakəsmələr
 * 04 - Mərtəbəarası seysmik kəmər və örtük plitələri
 * 05 - Dam stropil taxta karkası (ferma sistemi)
 * 06 - Dam örtüyü kirəmitləri və izolyasiya qatı
 */
export function createArchitecturalHouse(): {
  rootGroup: THREE.Group;
  structuralNodes: StructuralNodeDef[];
  hotspots: { id: string; name: string; position: THREE.Vector3; specs: string }[];
} {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ArchitecturalMasterHouse';

  const structuralNodes: StructuralNodeDef[] = [];
  const hotspots: { id: string; name: string; position: THREE.Vector3; specs: string }[] = [];

  // Materiallar
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x8a929a,
    roughness: 0.9,
    metalness: 0.05,
  });

  const brickMat = new THREE.MeshStandardMaterial({
    color: 0xc85a32,
    roughness: 0.85,
    metalness: 0.02,
  });

  const darkBrickMat = new THREE.MeshStandardMaterial({
    color: 0x9e3f20,
    roughness: 0.85,
  });

  const timberMat = new THREE.MeshStandardMaterial({
    color: 0xba8c59,
    roughness: 0.7,
    metalness: 0.0,
  });

  const roofTileMat = new THREE.MeshStandardMaterial({
    color: 0x3d444d,
    roughness: 0.6,
    metalness: 0.1,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xa8c4e0,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    transmission: 0.8,
    thickness: 0.5,
  });

  // ==========================================
  // 01. Bünövrə və Kürsülük (Foundation)
  // ==========================================
  const foundationGroup = new THREE.Group();
  foundationGroup.name = '01_Foundation_Concrete';

  // Əsas bünövrə plitəsi
  const baseSlabGeo = new THREE.BoxGeometry(10.4, 0.6, 8.4);
  const baseSlab = new THREE.Mesh(baseSlabGeo, concreteMat);
  baseSlab.position.y = 0.3;
  baseSlab.castShadow = true;
  baseSlab.receiveShadow = true;
  foundationGroup.add(baseSlab);

  // Kürsülük çıxıntısı və pillələr
  const porchGeo = new THREE.BoxGeometry(2.4, 0.4, 1.2);
  const porch = new THREE.Mesh(porchGeo, concreteMat);
  porch.position.set(0, 0.2, 4.8);
  porch.receiveShadow = true;
  foundationGroup.add(porch);

  // Armatur karkas vizual indikatoru (mesh xətləri)
  const rebarGeo = new THREE.BoxGeometry(10.2, 0.04, 8.2);
  const rebarMat = new THREE.MeshBasicMaterial({ color: 0x3b60c5, wireframe: true });
  const rebarWire = new THREE.Mesh(rebarGeo, rebarMat);
  rebarWire.position.y = 0.55;
  foundationGroup.add(rebarWire);

  rootGroup.add(foundationGroup);
  structuralNodes.push({
    id: '01_Foundation_Concrete',
    name: 'Dəmir-Beton Bünövrə və Kürsülük',
    category: 'Struktur Əsas',
    specs: 'B25 (M350) monolit beton, Ø16mm A500C armatur toru, 2 qat bitum-polimer hidroizolyasiya.',
    materials: 'Beton M350, Armatur A500C, Qranit çınqıl',
    group: foundationGroup,
    initialPos: foundationGroup.position.clone(),
    dirVector: new THREE.Vector3(0, -1, 0),
    explosionDist: 1.8,
  });

  hotspots.push({
    id: '01_Foundation_Concrete',
    name: 'Dəmir-Beton Bünövrə',
    position: new THREE.Vector3(3.5, 0.4, 4.2),
    specs: 'Dərinlik: 1.2m // Beton: B25 M350 // Armatur: Ø16mm toxunma karkas',
  });

  // ==========================================
  // 02. Daşıyıcı Kərpic Divarlar (Masonry Walls)
  // ==========================================
  const masonryGroup = new THREE.Group();
  masonryGroup.name = '02_LoadBearing_Masonry';
  masonryGroup.position.y = 0.6; // Bünövrənin üstündə

  // Xarici divarlar (Qoşa kərpic 380mm qalınlıq)
  const wallHeight = 3.0;
  
  // Arxa divar
  const backWallGeo = new THREE.BoxGeometry(10, wallHeight, 0.38);
  const backWall = new THREE.Mesh(backWallGeo, brickMat);
  backWall.position.set(0, wallHeight / 2, -3.81);
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  masonryGroup.add(backWall);

  // Sol divar (pəncərə oyuqlu bloklar)
  const leftWallGeo = new THREE.BoxGeometry(0.38, wallHeight, 7.62);
  const leftWall = new THREE.Mesh(leftWallGeo, brickMat);
  leftWall.position.set(-4.81, wallHeight / 2, 0);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  masonryGroup.add(leftWall);

  // Sağ divar
  const rightWall = leftWall.clone();
  rightWall.position.set(4.81, wallHeight / 2, 0);
  masonryGroup.add(rightWall);

  // Ön divar (Giriş qapısı və vitraj pəncərə hissəsi)
  const frontLeftGeo = new THREE.BoxGeometry(3.5, wallHeight, 0.38);
  const frontLeft = new THREE.Mesh(frontLeftGeo, brickMat);
  frontLeft.position.set(-3.25, wallHeight / 2, 3.81);
  frontLeft.castShadow = true;
  masonryGroup.add(frontLeft);

  const frontRightGeo = new THREE.BoxGeometry(3.5, wallHeight, 0.38);
  const frontRight = new THREE.Mesh(frontRightGeo, brickMat);
  frontRight.position.set(3.25, wallHeight / 2, 3.81);
  frontRight.castShadow = true;
  masonryGroup.add(frontRight);

  // Giriş qapısı tağı (Lintel)
  const lintelGeo = new THREE.BoxGeometry(3.0, 0.8, 0.4);
  const lintel = new THREE.Mesh(lintelGeo, darkBrickMat);
  lintel.position.set(0, wallHeight - 0.4, 3.81);
  lintel.castShadow = true;
  masonryGroup.add(lintel);

  // Pəncərə şüşələri
  const windowGeo = new THREE.BoxGeometry(2.0, 1.8, 0.05);
  const win1 = new THREE.Mesh(windowGeo, glassMat);
  win1.position.set(-2.5, 1.8, 3.83);
  masonryGroup.add(win1);

  const win2 = win1.clone();
  win2.position.set(2.5, 1.8, 3.83);
  masonryGroup.add(win2);

  rootGroup.add(masonryGroup);
  structuralNodes.push({
    id: '02_LoadBearing_Masonry',
    name: 'Daşıyıcı Termos-Hörgü Divarlar',
    category: 'Daşıyıcı Karkas',
    specs: '380mm qoşa bişmiş qırmızı kərpic / mişar daşı, 50mm bazalt daş yunu, sement-qum M100 məhlulu.',
    materials: 'Qırmızı bişmiş kərpic, M100 məhlulu, Bazalt izolyasiya',
    group: masonryGroup,
    initialPos: masonryGroup.position.clone(),
    dirVector: new THREE.Vector3(0, 0.2, 0),
    explosionDist: 1.2,
  });

  hotspots.push({
    id: '02_LoadBearing_Masonry',
    name: '380mm Termos Hörgü',
    position: new THREE.Vector3(-4.8, 2.2, 1.5),
    specs: 'Qoşa bağlama // Seysmik ankerlər // Daxili hava yastığı',
  });

  // ==========================================
  // 03. Daxili Arakəsmələr və Monolit Pilləkən
  // ==========================================
  const internalGroup = new THREE.Group();
  internalGroup.name = '03_Internal_Partitions_Stairs';
  internalGroup.position.y = 0.6;

  // Daxili bölücü arakəsmə
  const partitionGeo = new THREE.BoxGeometry(0.2, wallHeight, 6.0);
  const partition = new THREE.Mesh(partitionGeo, concreteMat);
  partition.position.set(-1.0, wallHeight / 2, 0);
  partition.castShadow = true;
  internalGroup.add(partition);

  // Monolit dəmir-beton pilləkən (pillələr)
  const stepsCount = 10;
  for (let i = 0; i < stepsCount; i++) {
    const stepGeo = new THREE.BoxGeometry(1.2, 0.2, 0.32);
    const stepMesh = new THREE.Mesh(stepGeo, concreteMat);
    stepMesh.position.set(2.2, i * 0.2 + 0.1, -2.5 + i * 0.28);
    stepMesh.castShadow = true;
    internalGroup.add(stepMesh);
  }

  rootGroup.add(internalGroup);
  structuralNodes.push({
    id: '03_Internal_Partitions_Stairs',
    name: 'Monolit Pilləkən və Daxili Arakəsmələr',
    category: 'Daxili Konstruksiya',
    specs: 'Monolit dəmir-beton pilləkən qəfəsi, 150mm kərpic arakəsmələr, akustik səs izolyasiyası.',
    materials: 'B25 Monolit beton, Armatur karkas, Gips-qum suvaq',
    group: internalGroup,
    initialPos: internalGroup.position.clone(),
    dirVector: new THREE.Vector3(0.6, 0.5, -0.6).normalize(),
    explosionDist: 2.2,
  });

  hotspots.push({
    id: '03_Internal_Partitions_Stairs',
    name: 'Monolit Pilləkən',
    position: new THREE.Vector3(2.2, 1.8, -1.0),
    specs: 'Dəmir-beton tökmə // 18cm hündürlük // 28cm addım',
  });

  // ==========================================
  // 04. Mərtəbəarası Plitələr və Seysmik Kəmər
  // ==========================================
  const slabGroup = new THREE.Group();
  slabGroup.name = '04_Floor_Slabs_SeismicBelt';
  slabGroup.position.y = 3.6; // Divarların üstündə

  // Seysmik monolit qurşaq (Armopoyas)
  const beltGeo = new THREE.BoxGeometry(10.2, 0.35, 8.2);
  const beltMesh = new THREE.Mesh(beltGeo, concreteMat);
  beltMesh.castShadow = true;
  beltMesh.receiveShadow = true;
  slabGroup.add(beltMesh);

  // Mərtəbəarası örtük plitəsi
  const slabPlateGeo = new THREE.BoxGeometry(9.8, 0.22, 7.8);
  const slabPlate = new THREE.Mesh(slabPlateGeo, concreteMat);
  slabPlate.position.y = 0.25;
  slabGroup.add(slabPlate);

  rootGroup.add(slabGroup);
  structuralNodes.push({
    id: '04_Floor_Slabs_SeismicBelt',
    name: 'Seysmik Kəmər (Armopoyas) və Örtük Plitələri',
    category: 'Mühəndis Təhlükəsizliyi',
    specs: '400x300mm monolit dəmir-beton seysmik kəmər, 4 ədəd Ø14mm boylama armatur, seysmik qorunma 8-9 bal.',
    materials: 'Monolit beton B25, Ø14mm A500C, Boşluqlu dəmir-beton panellər',
    group: slabGroup,
    initialPos: slabGroup.position.clone(),
    dirVector: new THREE.Vector3(0, 1.2, 0).normalize(),
    explosionDist: 2.5,
  });

  hotspots.push({
    id: '04_Floor_Slabs_SeismicBelt',
    name: 'Seysmik Kəmər',
    position: new THREE.Vector3(0, 3.8, 4.1),
    specs: 'Armopoyas karkası // 8-9 bal seysmik müqavimət // Yükpaylayıcı',
  });

  // ==========================================
  // 05. Dam Çatı (Stropil) Fermaları və Karkası
  // ==========================================
  const trussGroup = new THREE.Group();
  trussGroup.name = '05_Roof_Truss_Framing';
  trussGroup.position.y = 4.2;

  // Əsas taxta mauerlat
  const mauerlatGeo = new THREE.BoxGeometry(10.2, 0.15, 0.2);
  const mauerlat1 = new THREE.Mesh(mauerlatGeo, timberMat);
  mauerlat1.position.set(0, 0, 4.0);
  trussGroup.add(mauerlat1);

  const mauerlat2 = mauerlat1.clone();
  mauerlat2.position.set(0, 0, -4.0);
  trussGroup.add(mauerlat2);

  // Taxta stropil fermaları (7 cüt üçbucaq ferma)
  const trussCount = 7;
  const trussSpacing = 9.8 / (trussCount - 1);
  for (let i = 0; i < trussCount; i++) {
    const xPos = -4.9 + i * trussSpacing;
    const rafterGeo = new THREE.BoxGeometry(0.12, 3.2, 0.18);

    // Sol yamac
    const leftRafter = new THREE.Mesh(rafterGeo, timberMat);
    leftRafter.position.set(xPos, 1.3, -1.9);
    leftRafter.rotation.x = Math.PI / 4.8;
    leftRafter.castShadow = true;
    trussGroup.add(leftRafter);

    // Sağ yamac
    const rightRafter = new THREE.Mesh(rafterGeo, timberMat);
    rightRafter.position.set(xPos, 1.3, 1.9);
    rightRafter.rotation.x = -Math.PI / 4.8;
    rightRafter.castShadow = true;
    trussGroup.add(rightRafter);

    // Qayçı bağlama (üfüqi tir)
    const tieGeo = new THREE.BoxGeometry(0.1, 0.14, 3.4);
    const tieMesh = new THREE.Mesh(tieGeo, timberMat);
    tieMesh.position.set(xPos, 1.0, 0);
    trussGroup.add(tieMesh);
  }

  // Dam silsilə tiri (Ridge board)
  const ridgeGeo = new THREE.BoxGeometry(10.6, 0.2, 0.12);
  const ridgeMesh = new THREE.Mesh(ridgeGeo, timberMat);
  ridgeMesh.position.set(0, 2.6, 0);
  trussGroup.add(ridgeMesh);

  rootGroup.add(trussGroup);
  structuralNodes.push({
    id: '05_Roof_Truss_Framing',
    name: 'Dam Çatı (Stropil) və Mansard Karkası',
    category: 'Dam Mühəndisliyi',
    specs: '50x200mm odadavamlı və antiseptik hopdurulmuş quru şam tirləri, polad bucaqlıqlar, külək yükü hesablanması.',
    materials: 'Quru şam taxtası, sinklənmiş montaj bucaqları, od-qoruyucu emal',
    group: trussGroup,
    initialPos: trussGroup.position.clone(),
    dirVector: new THREE.Vector3(0, 1.8, 0).normalize(),
    explosionDist: 3.8,
  });

  hotspots.push({
    id: '05_Roof_Truss_Framing',
    name: 'Stropil Ferma Karkası',
    position: new THREE.Vector3(0, 5.6, 1.8),
    specs: '50x200mm şam // Antiseptik hopdurma // 45° yamac bucağı',
  });

  // ==========================================
  // 06. Dam Örtüyü Kirəmitləri və İzolyasiya
  // ==========================================
  const roofGroup = new THREE.Group();
  roofGroup.name = '06_Roof_Tiles_Insulation';
  roofGroup.position.y = 4.2;

  // İkimailli damın sol və sağ yamac örtükləri
  const roofSlopeGeo = new THREE.BoxGeometry(10.8, 0.14, 4.6);

  // Ön yamac
  const frontSlope = new THREE.Mesh(roofSlopeGeo, roofTileMat);
  frontSlope.position.set(0, 1.45, 2.05);
  frontSlope.rotation.x = -Math.PI / 4.8;
  frontSlope.castShadow = true;
  frontSlope.receiveShadow = true;
  roofGroup.add(frontSlope);

  // Arxa yamac
  const backSlope = new THREE.Mesh(roofSlopeGeo, roofTileMat);
  backSlope.position.set(0, 1.45, -2.05);
  backSlope.rotation.x = Math.PI / 4.8;
  backSlope.castShadow = true;
  backSlope.receiveShadow = true;
  roofGroup.add(backSlope);

  // Silsilə qapağı (Ridge cap)
  const ridgeCapGeo = new THREE.BoxGeometry(11.0, 0.15, 0.4);
  const ridgeCap = new THREE.Mesh(ridgeCapGeo, roofTileMat);
  ridgeCap.position.set(0, 2.75, 0);
  roofGroup.add(ridgeCap);

  // Mansard bacası (Kərpic)
  const chimneyGeo = new THREE.BoxGeometry(0.8, 2.0, 0.8);
  const chimney = new THREE.Mesh(chimneyGeo, darkBrickMat);
  chimney.position.set(3.2, 2.4, -1.2);
  chimney.castShadow = true;
  roofGroup.add(chimney);

  rootGroup.add(roofGroup);
  structuralNodes.push({
    id: '06_Roof_Tiles_Insulation',
    name: 'Dam Örtüyü və Hidro-İstilik İzolyasiyası',
    category: 'Mühafizə Qatı',
    specs: '0.50mm polimer örtüklü metal kirəmit / keramika, superdiffuziya membranı, 150mm bazalt daş yunu.',
    materials: 'Metal kirəmit Ral 7024, Tyvek nəfəsalan membran, 150mm daş yunu',
    group: roofGroup,
    initialPos: roofGroup.position.clone(),
    dirVector: new THREE.Vector3(0, 2.4, 0).normalize(),
    explosionDist: 5.2,
  });

  hotspots.push({
    id: '06_Roof_Tiles_Insulation',
    name: 'İzolyasiya və Kirəmit',
    position: new THREE.Vector3(2.5, 6.2, 2.5),
    specs: 'Metal kirəmit 0.5mm // Tyvek membran // 150mm bazalt yunu',
  });

  return { rootGroup, structuralNodes, hotspots };
}
