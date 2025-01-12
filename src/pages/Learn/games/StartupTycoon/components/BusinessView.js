// src/pages/Learn/games/StartupTycoon/components/BusinessView.js
import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

// Employee Character Component
const Employee = ({ position, index }) => {
    const employeeRef = useRef();
    const speed = 0.5 + (index * 0.1); // Different speeds for each employee
    const radius = 3 + (index * 0.5); // Different circular paths
  
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime() * speed;
      employeeRef.current.position.x = Math.sin(t) * radius;
      employeeRef.current.position.z = Math.cos(t) * radius;
      // Face the direction of movement
      employeeRef.current.rotation.y = Math.atan2(
        Math.cos(t),
        Math.sin(t)
      );
    });
  
    return (
      <group ref={employeeRef} position={position}>
        {/* Simple employee representation */}
        <mesh position={[0, 0.75, 0]}>
          <capsuleGeometry args={[0.2, 0.5, 2, 8]} />
          <meshStandardMaterial color="#2191FB" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#2191FB" />
        </mesh>
      </group>
    );
  };

// Building Component
const Building = ({ level, businessType }) => {
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
          {/* Front windows with glow effect */}
          <mesh position={[0, i * 0.4 - height/2 + 0.4, 1.01]}>
            <planeGeometry args={[0.4, 0.3]} />
            <meshStandardMaterial 
              color="#ECE5F0" 
              emissive="#ECE5F0"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Side windows with glow effect */}
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

      {/* Entrance */}
      <mesh position={[0, 0.2, 1.01]} castShadow>
        <boxGeometry args={[0.8, 0.4, 0.1]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[2.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Ground with grid pattern */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshStandardMaterial 
          color="#242832"
          wireframe={true}
          wireframeLinewidth={1}
        />
      </mesh>

      {/* Ground solid */}
      <mesh position={[0, -0.11, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#242832" />
      </mesh>
    </group>
  );
};

// Main Business View Component
const BusinessView = ({ businessType, level, employeeCount = 0 }) => {
    return (
      <div className="relative w-full h-[400px] bg-[#1b1f27] rounded-xl overflow-hidden">
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
          <Building level={level} businessType={businessType} />
          
          {/* Employees */}
          {Array.from({ length: employeeCount }).map((_, index) => (
            <Employee 
              key={index} 
              position={[0, 0, 0]} 
              index={index}
            />
          ))}
          
          <Environment preset="city" />
  
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI/4}
            maxPolarAngle={Math.PI/2}
          />
          <fog attach="fog" args={['#1b1f27', 10, 30]} />
        </Canvas>

       {/* Employee Count Overlay */}
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 bg-[#242832] px-4 py-2 rounded-lg border border-[#2191FB]/10"
      >
        <div className="flex items-center space-x-2">
          <span className="text-[#ECE5F0] font-medium">
            Employees: {employeeCount}
          </span>
        </div>
      </motion.div>

      {/* Building Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 bg-[#242832] p-4 rounded-lg border border-[#2191FB]/10"
      >
        <div className="space-y-2 text-sm">
          <div className="text-[#ECE5F0] font-medium">Building Stats</div>
          <div className="text-[#ECE5F0]/70">Property Value: £{(level * 10000).toLocaleString()}</div>
          <div className="text-[#ECE5F0]/70">Max Capacity: {level * 5} employees</div>
          <div className="text-[#ECE5F0]/70">Current Level: {level}</div>
        </div>
      </motion.div>

      {/* Level Progress */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 bg-[#242832] px-4 py-2 rounded-lg border border-[#2191FB]/10"
      >
        <div className="flex items-center space-x-2">
          <span className="text-[#ECE5F0] font-medium">Level {level}</span>
          {level < 3 && (
            <span className="text-[#2191FB]/70 text-sm">
              Next upgrade at {level * 5} employees
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessView;