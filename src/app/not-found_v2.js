'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function NotFound() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };

    let cameraProgress = 0;
    
    // Wormhole parameters (similar to Three.js example)
    const tubeRadius = Math.min(canvas.width, canvas.height) * 0.25;
    const tubeSegments = 250;
    const radialSegments = 20;
    const cameraSpeed = 0.0001;
    const maxDepth = 100000; // Depth limit - black hole location
    const waviness = 5;
    
    // Generate curved path for wormhole (like Three.js CatmullRomCurve3)
    let pathPoints = [];
    
    function generatePath() {
      pathPoints = [];
      const numPoints = 20;
      const segmentLength = 20;
      
      for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * waviness;
        const y = (Math.random() - 0.5) * waviness;
        const z = i * segmentLength;
        pathPoints.push({ x, y, z });
      }
    }
    
    // Get path position at parameter t (0 to 1)
    function getPathPosition(t) {
      if (pathPoints.length < 2) return { x: 0, y: 0 };
      
      const scaledT = t * (pathPoints.length - 1);
      const index = Math.floor(scaledT);
      const nextIndex = Math.min(index + 1, pathPoints.length - 1);
      const localT = scaledT - index;
      
      const current = pathPoints[index];
      const next = pathPoints[nextIndex];
      
      return {
        x: current.x + (next.x - current.x) * localT,
        y: current.y + (next.y - current.y) * localT
      };
    }
    
    generatePath();

    function animate() {
      // Update camera progress along curve
      cameraProgress += cameraSpeed;
      if (cameraProgress >= 1) {
        cameraProgress = 0;
        generatePath(); // Generate new path when loop completes
      }
      
      // Clear canvas
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Get current camera position on path
      const cameraPathPos = getPathPosition(cameraProgress);
      
      // Calculate camera direction (for bending effect)
      const futureT = (cameraProgress + 0.05) % 1;
      const futurePathPos = getPathPosition(futureT);
      const cameraDirection = {
        x: futurePathPos.x - cameraPathPos.x,
        y: futurePathPos.y - cameraPathPos.y
      };
      
      // Apply bending effect to the entire view
      const bendStrength = 80;
      const viewTiltX = -cameraDirection.x * bendStrength;
      const viewTiltY = -cameraDirection.y * bendStrength;
      
      // Draw tunnel segments moving toward viewer (forward motion)
      for (let segment = 0; segment < tubeSegments; segment++) {
        // Simple linear movement from far to near
        const segmentOffset = (segment / tubeSegments) * maxDepth;
        const z = maxDepth - segmentOffset - (cameraProgress * maxDepth);
        
        // Wrap z smoothly when it goes below 0
        let actualZ = z;
        if (actualZ <= 0) {
          actualZ = actualZ + maxDepth;
        }
        if (actualZ > maxDepth) {
          actualZ = actualZ - maxDepth;
        }
        
        // Skip rings that are too close or too far
        if (actualZ < 1 || actualZ > maxDepth - 1) continue;
        
        // Get path position for this ring
        const pathT = (cameraProgress + (actualZ / maxDepth) * 0.5) % 1;
        const segmentPathPos = getPathPosition(pathT);
        const currentPathPos = getPathPosition(cameraProgress);
        
        // Calculate relative offset from current camera position
        const relativeX = segmentPathPos.x - currentPathPos.x;
        const relativeY = segmentPathPos.y - currentPathPos.y;
        
        // 3D to 2D projection - rings get bigger as they approach
        const perspective = 800 / (actualZ + 50);
        const projectedRadius = tubeRadius * perspective;
        
        // Viewer stays centered, distant rings show path curvature
        const pathInfluence = Math.min(1, actualZ / (maxDepth * 0.7)); // Only distant rings show path
        const baseX = center.x + relativeX * 40 * perspective * pathInfluence;
        const baseY = center.y + relativeY * 40 * perspective * pathInfluence;
        
        // Apply view bending effect based on camera direction
        const bendInfluence = 1 - (actualZ / maxDepth); // Closer rings bend more
        const screenX = baseX + viewTiltX * bendInfluence;
        const screenY = baseY + viewTiltY * bendInfluence;
        
        // Only draw if within reasonable bounds and not too small
        if (projectedRadius > 1.5 && perspective > 0.03) {
          const alpha = Math.max(0.1, Math.min(0.9, perspective * 1.2));
          
          // Draw radial segments (dots forming the tunnel ring)
          for (let radial = 0; radial < radialSegments; radial++) {
            const angle = (radial / radialSegments) * Math.PI * 2;
            const x = screenX + Math.cos(angle) * projectedRadius;
            const y = screenY + Math.sin(angle) * projectedRadius;
            
            // Only draw if dot is on screen
            if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
              const dotSize = Math.max(0.8, perspective * 4);
              
              // Main dot
              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.fill();
              
              // Glow effect
              if (perspective > 0.2) {
                ctx.beginPath();
                ctx.arc(x, y, dotSize * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
                ctx.fill();
              }
            }
          }
        }
      }
      
      // Draw central black hole at the depth limit
    //   const blackHoleRadius = Math.min(canvas.width, canvas.height) * 0.08;
    //   const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, blackHoleRadius * 2);
    //   gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    //   gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.9)');
    //   gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      
    //   ctx.beginPath();
    //   ctx.arc(center.x, center.y, blackHoleRadius, 0, Math.PI * 2);
    //   ctx.fillStyle = gradient;
    //   ctx.fill();

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'black' }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <div className="max-w-4xl mx-auto w-full">
          <h1 
            className="font-bold text-white animate-pulse leading-none"
            style={{ 
              fontSize: 'clamp(1rem, 12vw, 10rem)',
              marginBottom: 'clamp(1rem, 3vw, 2rem)'
            }}
          >
            404
          </h1>
          
          <div 
            className="mb-8"
            style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            <h2 
              className="font-semibold text-gray-200 leading-tight"
              style={{ 
                fontSize: 'clamp(0.875rem, 4vw, 2.5rem)',
                marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)'
              }}
            >
              You've reached the end of the internet
            </h2>
            <p 
              className="text-gray-400 leading-relaxed max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' }}
            >
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/25 group"
            style={{ 
              padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1.5rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)'
            }}
          >
            <span className="mr-2">Go back to homepage</span>
            <svg 
              className="transition-transform group-hover:translate-x-1" 
              style={{ 
                width: 'clamp(1rem, 2.5vw, 1.5rem)', 
                height: 'clamp(1rem, 2.5vw, 1.5rem)' 
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
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