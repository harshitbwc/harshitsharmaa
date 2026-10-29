import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// A quiet abstract form, not a literal illustration — standing in for
// "cinema, philosophy, longevity" the same way the hand-drawn dial icons
// stand in for the professional side, rather than reaching for stock
// photography. Just this one <Canvas> on the whole site, so none of the
// earlier WebGL-context-exhaustion problems (from mounting a dozen+
// canvases at once) apply here.
const PARTICLE_COUNT = 200;

function Particles({ reducedMotion }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3 + Math.random() * 2.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current && !reducedMotion) pointsRef.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color='#ffffff' size={0.028} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

function WireForm({ reducedMotion }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.18;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color='#4fd1c5' wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={1.24}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color='#ffffff' wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

const BioScene = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <WireForm reducedMotion={reducedMotion} />
        <Particles reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
};

export default BioScene;
