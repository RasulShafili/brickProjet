'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useConstructionStore } from '@/store/useConstructionStore';
import { createArchitecturalHouse, StructuralNodeDef } from './HouseModel';
import { createInstancedBrickWall } from './InstancedBrickWall';
import { Sun, Moon, Layers, Maximize2, RotateCcw, Compass, Info, CheckCircle2 } from 'lucide-react';

export default function MasterBuilderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Zustand state
  const {
    viewMode,
    explosionFactor,
    setExplosionFactor,
    sunHour,
    setSunHour,
    activeStructuralNode,
    setActiveStructuralNode,
  } = useConstructionStore();

  const [activeHotspot, setActiveHotspot] = useState<{
    id: string;
    name: string;
    specs: string;
    x: number;
    y: number;
  } | null>(null);

  // Three.js daxili istinadları
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const houseNodesRef = useRef<StructuralNodeDef[]>([]);
  const brickWallUpdaterRef = useRef<((p: number) => void) | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const nightFacadeLightsRef = useRef<THREE.SpotLight[]>([]);

  // Orbit idarəsi üçün daxili dəyişənlər
  const isDragging = useRef(false);
  const previousMousePos = useRef({ x: 0, y: 0 });
  const cameraAngle = useRef({ theta: 0.65, phi: 0.95, radius: 18.0 });
  const targetLookAt = useRef(new THREE.Vector3(0, 2.0, 0));

  // Kameranın hərəkətini yenilə
  const updateCameraTransform = useCallback(() => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngle.current;
    
    // Sferik koordinatlar
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(
      targetLookAt.current.x + x,
      targetLookAt.current.y + y,
      targetLookAt.current.z + z
    );
    cameraRef.current.lookAt(targetLookAt.current);
  }, []);

  // Günəş İşıqlandırması (06:00 - 22:00)
  useEffect(() => {
    if (!sunLightRef.current || !ambientLightRef.current || !sceneRef.current) return;

    const hour = sunHour;
    // 06:00 = 0 rad, 12:00 = PI/2, 18:00 = PI, 22:00 = qaranlıq
    const dayProgress = (hour - 6) / 14; // 0 (06:00) ilə 1 (20:00) arası

    if (hour >= 6 && hour <= 20) {
      // Gündüz
      const angle = dayProgress * Math.PI;
      const sunY = Math.sin(angle) * 16 + 2;
      const sunX = Math.cos(angle) * 18;
      const sunZ = Math.sin(angle * 0.8) * 12;

      sunLightRef.current.position.set(sunX, sunY, sunZ);
      sunLightRef.current.intensity = Math.max(0.4, Math.sin(angle) * 2.2);

      // Rəng temperaturu
      if (hour < 8 || hour > 18) {
        // Qızılı/narıncı səhər və qürub
        sunLightRef.current.color.setHex(0xffaa66);
        ambientLightRef.current.color.setHex(0x5a4a3a);
        ambientLightRef.current.intensity = 0.5;
        sceneRef.current.background = new THREE.Color(0xecd8c3);
      } else {
        // Günorta mühəndis aydınlığı
        sunLightRef.current.color.setHex(0xfff7ed);
        ambientLightRef.current.color.setHex(0xe2e8f0);
        ambientLightRef.current.intensity = 0.75;
        sceneRef.current.background = new THREE.Color(0xf4f0db);
      }

      // Gecə projektorlarını söndür
      nightFacadeLightsRef.current.forEach((sl) => (sl.intensity = 0));
    } else {
      // Gecə rejimi (20:00 - 22:00)
      sunLightRef.current.intensity = 0.05;
      ambientLightRef.current.color.setHex(0x1e293b);
      ambientLightRef.current.intensity = 0.25;
      sceneRef.current.background = new THREE.Color(0x0f172a);

      // Fasad memarlıq projektorları
      nightFacadeLightsRef.current.forEach((sl) => (sl.intensity = 3.5));
    }
  }, [sunHour]);

  // Exploded View vektor yenilənməsi
  useEffect(() => {
    houseNodesRef.current.forEach((node) => {
      const targetPos = node.initialPos
        .clone()
        .addScaledVector(node.dirVector, node.explosionDist * explosionFactor);
      node.group.position.copy(targetPos);
    });
  }, [explosionFactor]);

  // Əsas Three.js Başlanğıcı
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf4f0db);

    // Mühəndis CAD şəbəkəsi döşəməsi
    const grid = new THREE.GridHelper(24, 24, 0x262626, 0x3b60c5);
    grid.position.y = -0.01;
    scene.add(grid);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraTransform();

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    // 4. İşıqlandırma
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 0.75);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    sunLightRef.current = sunLight;
    sunLight.position.set(12, 14, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    scene.add(sunLight);

    // Fasad projektorları (Gecə üçün)
    const facadeSpot1 = new THREE.SpotLight(0xffcc88, 0, 15, Math.PI / 5, 0.4);
    facadeSpot1.position.set(-6, 0.2, 6);
    facadeSpot1.target.position.set(0, 2.5, 0);
    scene.add(facadeSpot1);
    scene.add(facadeSpot1.target);

    const facadeSpot2 = new THREE.SpotLight(0xffcc88, 0, 15, Math.PI / 5, 0.4);
    facadeSpot2.position.set(6, 0.2, 6);
    facadeSpot2.target.position.set(0, 2.5, 0);
    scene.add(facadeSpot2);
    scene.add(facadeSpot2.target);

    nightFacadeLightsRef.current = [facadeSpot1, facadeSpot2];

    // 5. 3D Ev Modelini Qur
    const { rootGroup, structuralNodes } = createArchitecturalHouse();
    houseNodesRef.current = structuralNodes;
    scene.add(rootGroup);

    // 6. 1500 Kərpic InstancedMesh divarını hazırla (lazy load)
    const { mesh: brickMesh, updateAssembly } = createInstancedBrickWall();
    brickWallUpdaterRef.current = updateAssembly;
    brickMesh.position.set(0, 1.2, -7);
    brickMesh.visible = false;
    scene.add(brickMesh);

    // 7. Render Dövrəsi
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Yüngül dinamik fırlanma və ya hərəkət
      const delta = clock.getDelta();
      if (!isDragging.current) {
        // Sakit, sabit fəza nəfəsi
        rootGroup.rotation.y += delta * 0.04;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Hadisəsi
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 9. Mouse / Touch Hadisələri (Orbit)
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePos.current.x;
      const deltaY = e.clientY - previousMousePos.current.y;
      previousMousePos.current = { x: e.clientX, y: e.clientY };

      cameraAngle.current.theta -= deltaX * 0.006;
      cameraAngle.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.05, cameraAngle.current.phi - deltaY * 0.006)
      );
      updateCameraTransform();
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraAngle.current.radius = Math.max(
        8.0,
        Math.min(28.0, cameraAngle.current.radius + e.deltaY * 0.015)
      );
      updateCameraTransform();
    };

    // Touch Hadisələri
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePos.current.x;
      const deltaY = e.touches[0].clientY - previousMousePos.current.y;
      previousMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      cameraAngle.current.theta -= deltaX * 0.008;
      cameraAngle.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.05, cameraAngle.current.phi - deltaY * 0.008)
      );
      updateCameraTransform();
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    dom.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Təmizləmə
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [updateCameraTransform]);

  // Kamera mövqeyini sıfırla
  const resetCamera = () => {
    cameraAngle.current = { theta: 0.65, phi: 0.95, radius: 18.0 };
    targetLookAt.current.set(0, 2.0, 0);
    updateCameraTransform();
  };

  return (
    <div className="relative w-full h-[550px] lg:h-[680px] bg-stonePaper border border-graphiteText shadow-brutal select-none overflow-hidden">
      {/* 3D Canvas Konteyneri */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Yuxarı İnfo Barı: 3D Rejim & Status */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="bg-obsidianCad/90 backdrop-blur-md text-stonePaper px-3 py-1.5 border border-stonePaper/20 font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FƏZA ŞƏBƏKƏSİ: AKTİV // 60 FPS</span>
        </div>

        <button
          onClick={resetCamera}
          className="bg-stonePaper text-graphiteText px-2.5 py-1.5 border border-graphiteText font-mono text-xs hover:bg-terracotta hover:text-white transition-colors flex items-center gap-1.5"
          title="Kameranı sıfırla"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* Sağ Yuxarı: Günəş və Vaxt Saatı */}
      <div className="absolute top-4 right-4 z-10 bg-stonePaper/95 border border-graphiteText p-3 shadow-brutalSm font-mono text-xs max-w-[220px]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold flex items-center gap-1.5 text-graphiteText">
            {sunHour < 20 ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-blue-600" />}
            <span>GÜNƏŞ İŞIĞI</span>
          </span>
          <span className="bg-graphiteText text-stonePaper px-1.5 py-0.5 text-[11px] font-bold">
            {Math.floor(sunHour)}:00
          </span>
        </div>
        <input
          type="range"
          min="6"
          max="22"
          step="0.5"
          value={sunHour}
          onChange={(e) => setSunHour(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-graphiteText/20 accent-terracotta cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-graphiteText/60 mt-1">
          <span>06:00 (Səhər)</span>
          <span>14:00 (Zirvə)</span>
          <span>22:00 (Gecə)</span>
        </div>
      </div>

      {/* Aşağı İdarəetmə Paneli: Exploded View və Qatlar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-stonePaper/95 border border-graphiteText p-3 shadow-brutal">
        {/* Exploded View Sürgüsü */}
        <div className="flex-1 flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-graphiteText min-w-[130px]">
            <Layers className="w-4 h-4 text-terracotta" />
            <span>QATLAR AYRILMASI:</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={explosionFactor}
            onChange={(e) => setExplosionFactor(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-graphiteText/20 accent-terracotta cursor-pointer"
          />
          <span className="font-mono text-xs font-bold w-12 text-right">
            {Math.round(explosionFactor * 100)}%
          </span>
        </div>

        {/* Tez Keçid Düymələri */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExplosionFactor(explosionFactor > 0.5 ? 0 : 0.85)}
            className={`px-3 py-1.5 text-xs font-mono font-bold border transition-colors ${
              explosionFactor > 0.5
                ? 'bg-terracotta text-white border-graphiteText'
                : 'bg-stonePaper text-graphiteText border-graphiteText hover:bg-stonePaperLight'
            }`}
          >
            {explosionFactor > 0.5 ? 'Evi Birləşdir' : 'Qatları Aç (Exploded)'}
          </button>
        </div>
      </div>

      {/* İnteraktiv Hotspot Məlumat Kartı */}
      {activeStructuralNode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-80 max-w-[90vw] bg-obsidianCad text-stonePaper border border-terracotta p-4 shadow-brutal font-mono text-xs">
          <div className="flex items-center justify-between border-b border-stonePaper/20 pb-2 mb-2">
            <span className="text-terracottaLight font-bold">STRUKTUR PASPORT</span>
            <button
              onClick={() => setActiveStructuralNode(null)}
              className="text-stonePaper hover:text-terracotta font-bold text-sm"
            >
              ✕
            </button>
          </div>
          <p className="font-bold text-sm text-stonePaper mb-1">
            {houseNodesRef.current.find((n) => n.id === activeStructuralNode)?.name}
          </p>
          <p className="text-stonePaper/80 leading-relaxed mb-3">
            {houseNodesRef.current.find((n) => n.id === activeStructuralNode)?.specs}
          </p>
          <div className="text-[11px] text-terracottaLight bg-white/5 p-2 border border-white/10">
            <strong>Materiallar:</strong>{' '}
            {houseNodesRef.current.find((n) => n.id === activeStructuralNode)?.materials}
          </div>
        </div>
      )}
    </div>
  );
}
