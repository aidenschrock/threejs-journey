import { useFrame } from "@react-three/fiber";
import {
  useHelper,
  OrbitControls,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();
  const contactShadows = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    // cube.current.rotation.y += delta * 0.2;
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 1, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* <Environment
        background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      > */}
      {/* <color args={["black"]} attach="background" />
        <Lightformer
          position-z={-5}
          scale={5}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}
      {/* <BakeShadows /> */}
      {/* <SoftShadows
        frustum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      /> */}
      {/* <Sky sunPosition={sunPosition} /> */}
      {/* <ContactShadows
        ref={contactShadows}
        color={color}
        opacity={opacity}
        blur={blur}
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        frames={1}
      /> */}

      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows>
      ; */}
      {/* <ambientLight intensity={0.5} /> */}
      {/* <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
    </>
  );
}
