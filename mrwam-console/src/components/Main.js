import React, { useEffect, useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Health from './Health.js'
import Schedule from './Schedule.js'
import Download from './Download.js'
import Test from './Test.js'
import moment from 'moment-timezone';
import Card from 'react-bootstrap/Card';
import {useForm} from 'react-hook-form';


function Main() {
    const {register, handleSubmit} = useForm();

    const [key, setKey] = useState('health');
    const [health, setHealth] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [download, setDownload] = useState(null);

    useEffect(() => {
        if (key == 'health') {
            fetch(sessionStorage.getItem('api-host')+'wod').then(response => response.json()).then((data)=>{
                setHealth(data);
            })
        }

        if (key == 'schedule') {
            fetch(sessionStorage.getItem('api-host')+'list_schedule').then(response => response.json()).then((data)=>{
                console.log(data);
                setSchedule(data);
            })
        }

        if (key == "download") {
            fetch(sessionStorage.getItem('api-host')+'list_downloads').then(response => response.json()).then((data)=>{
                console.log(data);
                setDownload(data);
            })
        }
    }, [key, refresh]);

    return(
        <Container>
            
            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="health" title="Health" className="tabContent" default>
                    <Health health={health} setKey={setKey}/>
                </Tab>
                <Tab eventKey="schedule" title="Schedule" className="tabContent">
                    <Schedule schedule={schedule} setRefresh={setRefresh} refresh={refresh}/>
                </Tab>
                <Tab eventKey="download" title="Download" className="tabContent">
                    <Download download={download}/>
                </Tab>
                <Tab eventKey="test" title="Test" className="tabContent">
                    <Test />
                </Tab>
                <Tab eventKey="stream" title="Stream" className="tabContent">
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Video Stream</Card.Header>
                                <Card.Body>
                                    <img src={sessionStorage.getItem('api-host')+'video_feed'}/>
                                </Card.Body>
                                <Card.Footer>
                                    <Button>Take Image Now</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
            <Modal>

            </Modal>
        </Container>
    );
}

export default Main;