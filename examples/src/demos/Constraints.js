import * as THREE from 'three'
import React from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Physics, useSphere, useBox, useSpring } from 'use-cannon'

const Box = React.forwardRef((props, ref) => {
  return (
    <mesh ref={ref} position={props.position}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshStandardMaterial attach="material" />
    </mesh>
  )
})

const Ball = React.forwardRef((props, ref) => {
  return (
    <mesh ref={ref} position={props.position}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]}></sphereBufferGeometry>
      <meshStandardMaterial attach="material" />
    </mesh>
  )
})

const BoxAndBall = props => {
  const [ball, api] = useSphere(() => ({ type: 'Static', mass: 1, args: 0.5, position: [1, 0, 0] }))
  const [box] = useBox(() => ({ mass: 1, args: [0.5, 0.5, 0.5], position: [-1, 0, 0] }))

  useSpring(box, ball, { restLength: 1, stiffness: 100, damping: 2 })

  useFrame(e => {
    api.setPosition((e.mouse.x * e.viewport.width) / 2, (e.mouse.y * e.viewport.height) / 2, 0)
  })

  return (
    <>
      <Box ref={box} position={[1, 0, 0]}></Box>
      <Ball ref={ball} position={[-1, 0, 0]}></Ball>
    </>
  )
}

const Test = () => {
  return (
    <Canvas shadowMap sRGB camera={{ position: [0, 5, 20], fov: 50 }}>
      <color attach="background" args={['#171720']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
      <Physics gravity={[0, -40, 0]} allowSleep={false}>
        <BoxAndBall />
      </Physics>
    </Canvas>
  )
}

export default Test