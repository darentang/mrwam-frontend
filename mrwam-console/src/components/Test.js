import React, { useEffect, useState, useRef } from "react";
import socketIOClient from 'socket.io-client';
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const mesh = useRef()
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        scale={2}
        ref={mesh}>
        <boxGeometry args={[1, 1, 3]} />
        <meshStandardMaterial color={'hotpink'} />
      </mesh>
    )
  }

function Test () {
    const [eul, setEul] = useState({x: 0, y:0, z:0});

    useEffect(() => {
        const socket = socketIOClient(sessionStorage.getItem('api-host'));
        socket.on("eul", data=> {
            setEul(data);
            // console.log(data);
        })
    }, []);

    return (
        <div>
            <p>
                <br/>
                x: {Math.round(eul.x * 180 / Math.PI, 2)} 
                <br/>
                y: {Math.round(eul.y * 180 / Math.PI, 2)} 
                <br/>
                z: {Math.round(eul.z * 180 / Math.PI, 2)} 
            </p>
            <div className="modelcontainer">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[0,0,0]} rotation={[eul.x, eul.y, eul.z]} />
                </Canvas>
            </div>
        </div>
    );
}
export default Test;