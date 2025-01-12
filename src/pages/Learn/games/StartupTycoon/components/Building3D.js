// src/pages/Learn/games/StartupTycoon/components/Building3D.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// 3D Model Component
const OfficeModel = ({ level }) => {
  const modelRef = useRef();
  const { scene } = useGLTF('/models/office/scene.gltf');

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });

  const scale = 0.02 * (1 + (level - 1) * 0.2);

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={[scale, scale, scale]}
        position={[0, -1, 0]}
        castShadow
        receiveShadow
      />
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#242832" />
      </mesh>
    </group>
  );
};

// Fallback Building Component
const FallbackBuilding = ({ level, businessType }) => {
  const buildingRef = useRef();
  const height = 1 + level * 0.8;
  const isHightech = businessType === 'tech';

  useFrame(() => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={buildingRef}>
      {/* Main Building */}
      <mesh position={[0, height/2, 0]} castShadow>
        <boxGeometry args={[2, height, 2]} />
        <meshStandardMaterial 
          color="#2191FB"
          transparent
          opacity={0.8}
          metalness={isHightech ? 0.8 : 0.2}
          roughness={isHightech ? 0.2 : 0.7}
        />
      </mesh>

      {/* Windows */}
      {Array.from({ length: level * 2 }).map((_, i) => (
        <group key={i}>
          <mesh position={[0, i * 0.4 - height/2 + 0.4, 1.01]}>
            <planeGeometry args={[0.4, 0.3]} />
            <meshStandardMaterial 
              color="#ECE5F0" 
              emissive="#ECE5F0"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[1.01, i * 0.4 - height/2 + 0.4, 0]} rotation={[0, Math.PI/2, 0]}>
            <planeGeometry args={[0.4, 0.3]} />
            <meshStandardMaterial 
              color="#ECE5F0"
              emissive="#ECE5F0"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Ground */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#242832" />
      </mesh>
    </group>
  );
};

// Main Building3D Component
const Building3D = ({ level = 1, businessType = 'tech' }) => {
  const [modelLoaded, setModelLoaded] = React.useState(false);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-[#1b1f27]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Scene Content */}
        <React.Suspense fallback={<FallbackBuilding level={level} businessType={businessType} />}>
          <OfficeModel 
            level={level} 
            onLoad={() => setModelLoaded(true)}
          />
          <Environment preset="city" />
        </React.Suspense>

        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/2}
        />
        
        {/* Effects */}
        <fog attach="fog" args={['#1b1f27', 10, 30]} />
      </Canvas>

      {/* Loading Overlay */}
      {!modelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#242832] px-4 py-2 rounded-lg text-[#ECE5F0]">
            Loading Building...
          </div>
        </div>
      )}
    </div>
  );
};

export default Building3D;

// Preload the model
useGLTF.preload('/models/office/scene.gltf');