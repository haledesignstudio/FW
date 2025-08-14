'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FutureText } from '@/components/FutureText';

export default function NotFound() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const createScene = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
      camera.position.set(0.5, 0.5, 15);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      scene.fog = new THREE.FogExp2(0x000000, 0.025);
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0); // Transparent background
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }
      
      const radius = 5;
      const tubeLength = 100;
      const tubeGeo = new THREE.CylinderGeometry(radius, radius, tubeLength, 50, 100, true);
      const tubeVerts = tubeGeo.attributes.position;
      const colors = [];
      
      // Enhanced noise function with multiple octaves for more variation
      const noise = (x, y, z, time = 0) => {
        const base = Math.sin(x * 0.1 + time * 0.001) * Math.cos(y * 0.1 + time * 0.002) * Math.sin(z * 0.1 + time * 0.0015);
        const detail1 = Math.sin(x * 0.3 + time * 0.003) * Math.cos(y * 0.3 + time * 0.004) * 0.5;
        const detail2 = Math.sin(x * 0.7 + time * 0.005) * Math.cos(y * 0.7 + time * 0.006) * 0.25;
        return base + detail1 + detail2;
      };
      
      let p = new THREE.Vector3();
      let v3 = new THREE.Vector3();
      const noisefreq = 0.8; // Increased frequency for more variation
      const noiseAmp = 0.4; // Increased amplitude for more dramatic effect
      const color = new THREE.Color();
      
      // Store original positions for animation
      const originalPositions = [];
      
      for (let i = 0; i < tubeVerts.count; i += 1) {
        p.fromBufferAttribute(tubeVerts, i);
        originalPositions.push(p.x, p.y, p.z);
        
        v3.copy(p);
        
        // Create a black hole effect in the center
        const distanceFromCenter = Math.sqrt(v3.x * v3.x + v3.z * v3.z);
        const blackHoleRadius = 2.5; // Larger black hole for text readability
        
        if (distanceFromCenter < blackHoleRadius) {
          // Points closer to center become less visible or removed
          const fadeDistance = blackHoleRadius * 0.8;
          if (distanceFromCenter < fadeDistance) {
            // Skip this point (create black hole)
            color.setRGB(0, 0, 0);
            colors.push(0, 0, 0);
            continue;
          } else {
            // Fade out points near the edge of black hole
            const fadeFactor = (distanceFromCenter - fadeDistance) / (blackHoleRadius - fadeDistance);
            const brightness = fadeFactor * (0.3 + Math.random() * 0.2);
            color.setRGB(brightness, brightness, brightness);
            colors.push(color.r, color.g, color.b);
          }
        } else {
          let vertexNoise = noise(
            v3.x * noisefreq,
            v3.y * noisefreq,
            v3.z * noisefreq
          );
          v3.addScaledVector(p, vertexNoise * noiseAmp);
          
          // Vary the brightness for more visual interest
          const brightness = 0.3 + Math.random() * 0.2; // Reduced brightness for less distraction (was 0.7-1.0, now 0.3-0.5)
          color.setRGB(brightness, brightness, brightness);
          colors.push(color.r, color.g, color.b);
        }
        
        tubeVerts.setXYZ(i, v3.x, p.y, v3.z);
      }
      
      const mat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true });

      function getTube(index) {
        const startPosZ = -tubeLength * index;
        const endPosZ = tubeLength;
        const resetPosZ = -tubeLength;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", tubeVerts);
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        const points = new THREE.Points(geo, mat);
        points.rotation.x = Math.PI * 0.5;
        points.position.z = startPosZ;
        const speed = 0.03;
        
        function update() {
          points.rotation.y += 0.0008;
          points.position.z += speed;
          if (points.position.z > endPosZ) {
            points.position.z = resetPosZ;
          }
        }
        return { points, update };
      }

      const tubeA = getTube(0);
      const tubeB = getTube(1);
      const tubes = [tubeA, tubeB]; 
      scene.add(tubeA.points, tubeB.points);

      function animate(t = 0) {
        requestAnimationFrame(animate);
        tubes.forEach((tb) => tb.update());
        camera.position.x = Math.cos(t * 0.001) * 0.5;
        camera.position.y = Math.sin(t * 0.001) * 0.5;
        renderer.render(scene, camera);
      }

      animate();

      function handleWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      
      window.addEventListener("resize", handleWindowResize, false);
      
      // Store scene reference for cleanup
      sceneRef.current = { scene, renderer, handleWindowResize };
    };

    createScene();

    return () => {
      const currentMount = mountRef.current;
      if (sceneRef.current) {
        window.removeEventListener("resize", sceneRef.current.handleWindowResize);
        if (sceneRef.current.renderer) {
          sceneRef.current.renderer.dispose();
        }
        if (currentMount && sceneRef.current.renderer.domElement) {
          try {
            currentMount.removeChild(sceneRef.current.renderer.domElement);
          } catch {
            // Element might already be removed
          }
        }
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        {/* Add a semi-transparent dark overlay with gradient for better text readability */}
        <div className="absolute inset-0 rounded-full" 
             style={{ 
               width: 'min(80vw, 400px)', 
               height: 'min(80vw, 400px)',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)',
               background: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.2) 100%)'
             }} 
        />
        
        <div className="max-w-xs sm:max-w-sm mx-auto w-full relative z-20 px-5 sm:px-6 py-4 sm:py-4">
          <h1 
            className="font-roboto text-white leading-tight mb-2 sm:mb-3 text-left"
            style={{ 
              fontSize: 'clamp(0.875rem, 4vw, 2rem)',
              fontWeight: '700'
            }}
          >
            <FutureText
              text="404 / You've reached the end of the internet"
              delay={500}
              speed={15}
              className="font-roboto text-white leading-tight"
            />
          </h1>
          <div 
            className="mb-4 sm:mb-6"
            style={{ marginBottom: 'clamp(0.75rem, 3vw, 1.5rem)' }}
          >
            <p 
              className="font-roboto text-gray-300 leading-relaxed max-w-xs sm:max-w-sm mx-auto text-left"
              style={{ 
                fontSize: 'clamp(0.75rem, 3.5vw, 1.125rem)',
                fontWeight: '300'
              }}
            >
              <FutureText
                text="The page you're looking for doesn't exist or may have been moved."
                delay={1800}
                speed={10}
                className="font-roboto text-gray-300 leading-relaxed"
              />
            </p>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center font-roboto underline transition-all duration-300 text-white"
            style={{ 
              padding: 'clamp(0.375rem, 1.5vw, 0.75rem) clamp(0.75rem, 3vw, 1.5rem)',
              fontSize: 'clamp(0.75rem, 3.5vw, 1rem)',
              fontWeight: '500'
            }}
          >
            <FutureText
              text="Go back to homepage"
              delay={3200}
              speed={15}
              className="font-roboto text-white underline"
            />
          </Link>
        </div>
      </div>

      {/* Static stars for depth */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div> */}
    </div>
  );
}