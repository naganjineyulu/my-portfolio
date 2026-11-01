import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group } from 'three';

interface ThreeSceneProps {
  active: boolean;
}

interface SceneObjectsProps {
  particleCount: number;
}

function SceneObjects({ particleCount }: SceneObjectsProps) {
  const sceneGroup = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const particles = useMemo(() => {
    const points = new Float32Array(particleCount * 3);

    for (let index = 0; index < points.length; index += 3) {
      points[index] = (Math.random() - 0.5) * 20;
      points[index + 1] = (Math.random() - 0.5) * 12;
      points[index + 2] = (Math.random() - 0.5) * 12;
    }

    return points;
  }, [particleCount]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!sceneGroup.current) return;

    const elapsed = state.clock.elapsedTime;
    sceneGroup.current.rotation.y += delta * 0.025;
    sceneGroup.current.rotation.x = Math.sin(elapsed * 0.14) * 0.035;
    state.camera.position.x +=
      (pointer.current.x * 0.22 - state.camera.position.x) * 0.018;
    state.camera.position.y +=
      (-pointer.current.y * 0.14 - state.camera.position.y) * 0.018;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight color="#55d8ff" intensity={18} position={[-4, 3, 3]} />
      <pointLight color="#6174ff" intensity={12} position={[4, -2, -2]} />

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={particles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#9eeaff"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.58}
          depthWrite={false}
        />
      </points>

      <group ref={sceneGroup}>
        <Float speed={0.45} rotationIntensity={0.12} floatIntensity={0.22}>
          <mesh position={[-3.2, 1.45, -1.8]} rotation={[0.4, 0.35, 0.2]}>
            <icosahedronGeometry args={[0.72, 1]} />
            <meshStandardMaterial
              color="#102c43"
              emissive="#0879a7"
              emissiveIntensity={0.38}
              metalness={0.75}
              roughness={0.24}
              transparent
              opacity={0.42}
              depthWrite={false}
              wireframe
            />
          </mesh>
        </Float>

        <Float speed={0.34} rotationIntensity={0.08} floatIntensity={0.16}>
          <mesh position={[3.2, -1.35, -2.6]} rotation={[0.7, 0.3, 0.45]}>
            <torusGeometry args={[1.05, 0.012, 12, 120]} />
            <meshBasicMaterial color="#46b9ea" transparent opacity={0.28} />
          </mesh>
        </Float>

        <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.18}>
          <mesh position={[3.3, -1.35, -2.65]} rotation={[-0.3, 0.5, 0.7]}>
            <torusGeometry args={[0.77, 0.008, 10, 100]} />
            <meshBasicMaterial color="#5b72dd" transparent opacity={0.22} />
          </mesh>
        </Float>

        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.28}>
          <mesh position={[2.4, 1.9, -4]} rotation={[0.3, 0.45, 0.2]}>
            <octahedronGeometry args={[0.44, 0]} />
            <meshStandardMaterial
              color="#152e48"
              emissive="#125179"
              emissiveIntensity={0.42}
              metalness={0.82}
              roughness={0.2}
              transparent
              opacity={0.38}
              depthWrite={false}
              wireframe
            />
          </mesh>
        </Float>
      </group>
    </>
  );
}

export default function ThreeScene({ active }: ThreeSceneProps) {
  const isCompact = window.matchMedia('(max-width: 767px)').matches;

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={isCompact ? 1 : [1, 1.4]}
        frameloop={active ? 'always' : 'never'}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <SceneObjects particleCount={isCompact ? 260 : 720} />
      </Canvas>
    </div>
  );
}
