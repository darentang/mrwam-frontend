import React, { useEffect, useState, useRef, Suspense } from "react";
import socketIOClient from 'socket.io-client';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GizmoViewport, GizmoHelper, Environment, Html, useProgress, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { Canvas, useFrame , useLoader} from '@react-three/fiber';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Box(props) {
    // This reference will give us direct access to the THREE.Mesh object
    const mesh = useRef();
    const fbx = useLoader(GLTFLoader, './sat.gltf')

    // Return the view, these are regular Threejs elements expressed in JSX
    return (
    //   <mesh
    //     {...props}
    //     scale={2}
    //     ref={mesh}>
    //     <boxGeometry args={[1, 1, 3]} />
    //     <meshStandardMaterial color={'hotpink'} />
    //   </mesh>
        <mesh ref={mesh} {...props}>
            <primitive object={fbx.scene} scale={0.5}/>
        </mesh>
    )
  }

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

function Test () {
    const [eul, setEul] = useState({x: 0, y:0, z:0});
    const controlsRef = React.useRef();

    useEffect(() => {
        const socket = socketIOClient(sessionStorage.getItem('api-host'));
        socket.on("eul", data=> {
            setEul(data);
        })
    }, []);
    const camera = useRef();
    
    return (
        <div>
            
                <Row>
                <Col>
                <Card style={{margin:"1vw"}}>
                    <Card.Header>Euler Angles</Card.Header>
                    <Card.Body>
                        <Row>
                        <Col>
                        x: {Math.round(eul.x * 180 / Math.PI, 2)} 
                        </Col>
                        <Col>
                        y: {Math.round(eul.y * 180 / Math.PI, 2)} 
                        </Col>
                        <Col>
                        z: {Math.round(eul.z * 180 / Math.PI, 2)} 
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
                
                
                <Card style={{margin:"1vw"}}>
                    <Card.Header>MTQ Test</Card.Header>
                    <Card.Body>
                        <Row>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button>+X</Button>
                            <Button>-X</Button>
                        </ButtonGroup>
                        </Col>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button>+Y</Button>
                            <Button>-Y</Button>
                        </ButtonGroup>
                        </Col>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button>+Z</Button>
                            <Button>-Z</Button>
                        </ButtonGroup>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card style={{margin:"1vw"}}>
                    <Card.Header>RW Test</Card.Header>
                    <Card.Body>
                        <Row>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button>+X</Button>
                            <Button>-X</Button>
                        </ButtonGroup>
                        </Col>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button>+Y</Button>
                            <Button>-Y</Button>
                        </ButtonGroup>
                        </Col>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button>+Z</Button>
                            <Button>-Z</Button>
                        </ButtonGroup>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Col>                    
                <Col>
            
                <Card style={{margin:"1vw"}}>
                    <Card.Header>3D Viewport</Card.Header>
                    <Card.Body>
                    <div className="modelcontainer">
                    <Canvas>
                        <Suspense fallback={<Loader/>}>
                            <PerspectiveCamera makeDefault up={[0, 0, -1]} ref={camera} position={[0, 8, 0]}/>
                            <OrbitControls camera={camera.current} enableZoom={false} ref={controlsRef} rotateSpeed={1}/>
                            <Environment preset="sunset" />
                            <Box rotation={[eul.x, eul.y, eul.z]}/>
                            <GizmoHelper
                                alignment={"bottom-right"}
                                margin={[80, 80]}
                                onTarget={() => controlsRef.current.target}
                                onUpdate={() => controlsRef.current.update()}
                            >
                            <GizmoViewport
                            axisColors={['red', 'green', 'blue']}
                            labelColor="black"
                            />
                            </GizmoHelper>
                        
                        </Suspense>
                    </Canvas>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
                </Row>
        </div>
    );
}
export default Test;