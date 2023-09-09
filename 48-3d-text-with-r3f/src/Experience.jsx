import { Perf } from 'r3f-perf'
import { Text3D, OrbitControls, Center, useMatcapTexture } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Experience() {
    // const [torusGeometry, setTorusGeometry] = useState()
    // const [material, setMaterial] = useState()

    const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
    const material = new THREE.MeshMatcapMaterial()

    const donuts = useRef([])


    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)


    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    useFrame((state, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2
        }
    })
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />
        {/* <meshMatcapMaterial matcap={matcapTexture} ref={setMaterial} /> */}
        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                material={material}>
                HELLO R3F

            </Text3D>
        </Center>

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} /> */}


        {[...Array(100)].map((value, index) =>
            <mesh
                ref={(element) => donuts.current[index] = element}
                key={index}
                geometry={torusGeometry}
                material={material}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
            >


            </mesh>
        )}


        {/* <mesh scale={1.5}>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}

    </>
}