"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GlassesPair {
  group: THREE.Group;
  pos: [number, number, number];
  rotY: number;
  speed: number;
  phase: number;
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    let onResize: (() => void) | null = null;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;

    try {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let width = mount.clientWidth;
      let height = mount.clientHeight;
      if (width < 10 || height < 10) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      if ("outputEncoding" in renderer) {
        renderer.outputEncoding = THREE.sRGBEncoding;
      }
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x6a7fa0, 1.0));
      const key = new THREE.PointLight(0xf3d9a4, 1.7, 30);
      key.position.set(4, 5, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0x5fb3ff, 1.2, 30);
      rim.position.set(-6, -3, 4);
      scene.add(rim);
      const fill = new THREE.DirectionalLight(0xffffff, 0.4);
      fill.position.set(0, 4, -5);
      scene.add(fill);

      function makeGlasses(frameColor: number, lensColor: number, scale: number) {
        const group = new THREE.Group();
        const frameMat = new THREE.MeshStandardMaterial({ color: frameColor, metalness: 0.75, roughness: 0.28 });
        const lensMat = new THREE.MeshPhysicalMaterial({
          color: lensColor,
          transparent: true,
          opacity: 0.26,
          roughness: 0.06,
          metalness: 0,
          side: THREE.DoubleSide,
          clearcoat: 1,
          clearcoatRoughness: 0.15,
        });

        const lensGeo = new THREE.TorusGeometry(0.62, 0.05, 16, 48);
        const glassGeo = new THREE.CircleGeometry(0.6, 48);

        const lensL = new THREE.Mesh(lensGeo, frameMat);
        lensL.position.x = -0.72;
        const glassL = new THREE.Mesh(glassGeo, lensMat);
        glassL.position.x = -0.72;
        const lensR = lensL.clone();
        lensR.position.x = 0.72;
        const glassR = glassL.clone();
        glassR.position.x = 0.72;

        const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.28, 12), frameMat);
        bridge.rotation.z = Math.PI / 2;
        bridge.position.set(0, 0.05, 0);

        const templeL = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 10), frameMat);
        templeL.position.set(-1.35, 0, -0.5);
        templeL.rotation.z = Math.PI / 2 - 0.35;
        const templeR = templeL.clone();
        templeR.position.x = 1.35;
        templeR.rotation.z = -(Math.PI / 2 - 0.35);

        group.add(lensL, lensR, glassL, glassR, bridge, templeL, templeR);
        group.scale.setScalar(scale);
        return group;
      }

      const pairs: GlassesPair[] = [
        { group: makeGlasses(0x0b63ac, 0xdceafa, 1.15), pos: [-1.7, 0.5, 0], rotY: 0.35, speed: 0.55, phase: 0 },
        { group: makeGlasses(0xf2f4f7, 0xffffff, 0.85), pos: [1.9, -0.5, -1.4], rotY: -0.5, speed: 0.46, phase: 2 },
        { group: makeGlasses(0xe30613, 0xfae0e2, 0.68), pos: [0.5, 1.5, -2.6], rotY: 0.15, speed: 0.4, phase: 4 },
      ];
      pairs.forEach((p) => {
        p.group.position.set(p.pos[0], p.pos[1], p.pos[2]);
        p.group.rotation.y = p.rotY;
        scene.add(p.group);
      });

      let mouseX = 0;
      let mouseY = 0;
      onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      let t = 0;
      function animate() {
        raf = requestAnimationFrame(animate);
        t += reduceMotion ? 0.0015 : 0.012;
        pairs.forEach((p) => {
          p.group.position.y = p.pos[1] + Math.sin(t * p.speed + p.phase) * 0.28;
          p.group.rotation.y = p.rotY + Math.sin(t * p.speed * 0.6 + p.phase) * 0.22;
          p.group.rotation.z = Math.sin(t * p.speed * 0.4 + p.phase) * 0.05;
        });
        camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.7 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
        renderer?.render(scene, camera);
      }
      animate();

      onResize = () => {
        width = mount.clientWidth;
        height = mount.clientHeight;
        if (width < 10 || height < 10) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer?.setSize(width, height);
      };
      window.addEventListener("resize", onResize);

      mount.classList.add("is-ready");
    } catch (err) {
      // Three.js indisponible : le repli visuel CSS/SVG reste affiché
      console.warn("Hero 3D indisponible, repli visuel CSS actif.", err);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentElement === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="hero-3d" id="hero3d" ref={mountRef}>
      <div className="hero-3d-fallback" id="hero3dFallback" aria-hidden="true">
        <svg className="gl-1" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lg1" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#fff" stopOpacity=".45" />
              <stop offset="100%" stopColor="#fff" stopOpacity=".04" />
            </radialGradient>
          </defs>
          <line x1="17" y1="38" x2="1" y2="27" stroke="#4E9FE0" strokeWidth="5" strokeLinecap="round" />
          <line x1="183" y1="38" x2="199" y2="27" stroke="#4E9FE0" strokeWidth="5" strokeLinecap="round" />
          <circle cx="55" cy="45" r="37" fill="url(#lg1)" stroke="#4E9FE0" strokeWidth="5" />
          <circle cx="145" cy="45" r="37" fill="url(#lg1)" stroke="#4E9FE0" strokeWidth="5" />
          <path d="M92 40 Q100 30 108 40" stroke="#4E9FE0" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="gl-2" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lg2" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#fff" stopOpacity=".4" />
              <stop offset="100%" stopColor="#fff" stopOpacity=".03" />
            </radialGradient>
          </defs>
          <line x1="17" y1="38" x2="1" y2="27" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <line x1="183" y1="38" x2="199" y2="27" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="55" cy="45" r="37" fill="url(#lg2)" stroke="#FFFFFF" strokeWidth="5" />
          <circle cx="145" cy="45" r="37" fill="url(#lg2)" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M92 40 Q100 30 108 40" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="gl-3" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lg3" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#fff" stopOpacity=".4" />
              <stop offset="100%" stopColor="#fff" stopOpacity=".03" />
            </radialGradient>
          </defs>
          <line x1="17" y1="38" x2="1" y2="27" stroke="#F0333F" strokeWidth="5" strokeLinecap="round" />
          <line x1="183" y1="38" x2="199" y2="27" stroke="#F0333F" strokeWidth="5" strokeLinecap="round" />
          <circle cx="55" cy="45" r="37" fill="url(#lg3)" stroke="#F0333F" strokeWidth="5" />
          <circle cx="145" cy="45" r="37" fill="url(#lg3)" stroke="#F0333F" strokeWidth="5" />
          <path d="M92 40 Q100 30 108 40" stroke="#F0333F" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
