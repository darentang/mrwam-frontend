import React, { useEffect, useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import moment from 'moment-timezone';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import {set, useForm} from 'react-hook-form';


function Schedule(props) {
    var schedule = props.schedule;
    const {register, handleSubmit} = useForm();
    const [date, onChangeDate] = useState(moment());
    const [display, setDisplay] = useState(false);
    const [message, setMessage] = useState('');

    function submit(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({lat: data.lat, lon: data.lon, time: date / 1000})
        }
        fetch(sessionStorage.getItem('api-host')+'add_job', requestOptions).then(response => response.json()).then((data)=>{
            if (data.success) {
                props.setRefresh(!props.refresh)
                setDisplay(false);
            } else {
                setMessage(data.message);
            }
        })
    }


    return(
        <div>
                <h2>Job Schedule</h2>
                {(schedule != null) &&
                    <div>
                    <Table striped bordered >
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Target Latitude</th>
                                <th>Target Longitude</th>
                                <th>Imaging Time (Local Time)</th>
                                <th>Completed</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.list.map((e, i) => {
                                return(
                                <tr key={i}>
                                    <td>{e.id}</td>
                                    <td>{e.lat}</td>
                                    <td>{e.lon}</td>
                                    <td>{moment.unix(e.time).format("DD/MM/YYYY HH:mm:ss")}</td>
                                    <td>
                                        <p style={e.completed?{color: "Green"}:{color:"Red"}}>
                                            {e.completed ? "Yes" : "No"}
                                        </p>
                                    </td>
                                    <td>
                                        <Button disabled={!e.completed} onClick={()=>{
                                            window.open(sessionStorage.getItem('api-host')+'download?'+
                                                new URLSearchParams({name: e.image_name})
                                            );
                                        }}>
                                            Download Image
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={()=>{
                                            fetch(sessionStorage.getItem('api-host')+'delete_job?'+
                                                new URLSearchParams({id: e.id})
                                            ).then(props.setRefresh(!props.refresh));
                                        }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                                );
                            })
                            }
                            
                        </tbody>
                    </Table>
                    <Button onClick={()=>{setDisplay(true)}}>
                            Add
                    </Button>
                    </div>
                }
            <Modal show={display} onHide={()=>{setDisplay(false)}}>
                <Form onSubmit={handleSubmit(submit)}>
                <Modal.Header closeButton><p2>Add new job</p2></Modal.Header>
                <Modal.Body>
                        <p sytle={{color:'red'}}>{message}</p>
                        <Form.Group>
                            <Form.Label>Target Latitude:</Form.Label>
                            <Form.Control name="lat" ref={register()}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Target Longitude:</Form.Label>
                            <Form.Control name="lon" ref={register()}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image Time (Local):</Form.Label>
                            <div style={{color: 'black'}}>
                                <Datetime onChange={onChangeDate} value={date} initialValue={moment()}/>
                            </div>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Submit</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Schedule;