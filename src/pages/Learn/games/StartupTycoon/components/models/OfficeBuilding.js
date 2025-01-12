// src/pages/Learn/games/StartupTycoon/components/models/OfficeBuilding.js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function OfficeBuilding(props) {
  const { nodes, materials } = useGLTF('/models/office_building.glb');
  
  return (
    <group {...props} dispose={null}>
      {/* Your 3D model structure here */}
    </group>
  );
}

useGLTF.preload('/models/office_building.glb');