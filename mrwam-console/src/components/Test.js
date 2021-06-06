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
import Container from 'react-bootstrap/Container';

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

Number.prototype.clamp = function(min, max) {
return Math.min(Math.max(this, min), max);
};

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

function Test () {
    const [eul, setEul] = useState({x: 0, y:0, z:0});
    const [quat, setQuat] = useState({q1: 0, q2: 0, q3: 0, q4: 0})
    const [T, setT] = useState({x: 0, y:0, z:0});
    const controlsRef = React.useRef();

    useEffect(() => {
        const socket = socketIOClient(sessionStorage.getItem('api-host'));
        socket.on("eul", data=> {
            setEul(data);
        });
        socket.on("T", data=> {
            setT(data);
        });
        socket.on("q", data=> {
            setQuat(data);
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
                        <Container>
                            <Row style={{"margin-top":"1vw"}}>
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
                            <Row>
                            <Col>
                            Vx: {Math.round(T.x.clamp(-255, 255))} 
                            </Col>
                            <Col>
                            Vy: {Math.round(T.x.clamp(-255, 255))} 
                            </Col>
                            <Col>
                            Vz: {Math.round(T.x.clamp(-255, 255))} 
                            </Col>
                            </Row>
                            <Row style={{"margin-top":"1vw"}}>
                                <Col>
                                <ButtonGroup className="mr-2">
                                <Button 
                                onClick={()=>{
                                    fetch(sessionStorage.getItem('api-host')+
                                    'point?mode=q&axis=X'
                                    );
                                }}
                                >+X</Button>
                                <Button 
                                onClick={()=>{
                                    fetch(sessionStorage.getItem('api-host')+
                                    'point?mode=q&axis=x'
                                    );
                                }}
                                >-X</Button>
                                </ButtonGroup>
                                </Col>
                                <Col>
                                <ButtonGroup className="mr-2">
                                <Button 
                                onClick={()=>{
                                    fetch(sessionStorage.getItem('api-host')+
                                    'point?mode=q&axis=Y'
                                    );
                                }}
                                >+Y</Button>
                                <Button 
                                onClick={()=>{
                                    fetch(sessionStorage.getItem('api-host')+
                                    'point?mode=q&axis=y'
                                    );
                                }}
                                >-Y</Button>
                                </ButtonGroup>
                                </Col>
                                <Col>
                                <ButtonGroup className="mr-2">
                                <Button 
                                onClick={()=>{
                                    fetch(sessionStorage.getItem('api-host')+
                                    'point?mode=q&axis=Z'
                                    );
                                }}
                                >+Z</Button>
                                <Button 
                                onClick={()=>{
                                    fetch(sessionStorage.getItem('api-host')+
                                    'point?mode=q&axis=z'
                                    );
                                }}
                                >-Z</Button>
                                </ButtonGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Button 
                                    onClick={()=>{
                                        fetch(sessionStorage.getItem('api-host')+
                                        'point?mode=Q'
                                        );
                                    }}
                                >Stabilise</Button>
                            </Col>
                            <Col>
                                <Button variant="danger"
                                    onClick={()=>{
                                        fetch(sessionStorage.getItem('api-host')+
                                        'point?mode=r'
                                        );
                                    }}
                                >
                                    Kill
                                </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
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
                            <Button 
                            onClick={()=>{
                                fetch(sessionStorage.getItem('api-host')+
                                'test_motor?axis=X&direction=pos'
                                );
                            }}
                            >+X</Button>
                            <Button 
                            onClick={()=>{
                                fetch(sessionStorage.getItem('api-host')+
                                'test_motor?axis=X&direction=neg'
                                );
                            }}
                            >-X</Button>
                        </ButtonGroup>
                        </Col>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button 
                            onClick={()=>{
                                fetch(sessionStorage.getItem('api-host')+
                                'test_motor?axis=Y&direction=pos'
                                );
                            }}
                            >+Y</Button>
                            <Button 
                            onClick={()=>{
                                fetch(sessionStorage.getItem('api-host')+
                                'test_motor?axis=Y&direction=neg'
                                );
                            }}
                            >-Y</Button>
                        </ButtonGroup>
                        </Col>
                        <Col>
                        <ButtonGroup className="mr-2">
                            <Button 
                            onClick={()=>{
                                fetch(sessionStorage.getItem('api-host')+
                                'test_motor?axis=Z&direction=pos'
                                );
                            }}
                            >+Z</Button>
                            <Button 
                            onClick={()=>{
                                fetch(sessionStorage.getItem('api-host')+
                                'test_motor?axis=Z&direction=neg'
                                );
                            }}
                            >-Z</Button>
                        </ButtonGroup>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card style={{margin:"1vw"}}>
                    <Card.Header>Camera Test</Card.Header>
                    <Card.Body>
                        <Button onClick={() => {
                            fetch(sessionStorage.getItem('api-host')+'take_image_now')
                        }
                        }>Take Image Now</Button>
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
                            <Environment preset={"sunset"}/>
                            <Box quaternion={[quat.q1, -quat.q2, -quat.q3, -quat.q4]}/>
                            {/* <Box rotation={[0, Math.PI/2, 0]}/> */}
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