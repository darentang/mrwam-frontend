import React, { useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import moment from 'moment-timezone';
import socketIOClient from 'socket.io-client';


function Health(props) {
    const [health, setHealth] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(sessionStorage.getItem('api-host'));
        socket.on("wod", data=> {
            console.log(data);
            setHealth(data);
            // console.log(data);
        })
    }, []);
    return(<div>
                <h2>Whole Orbit Data</h2>
                {(health != null) &&
                    <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td>Time (Local Time)</td>
                                <td>{moment.unix(health.time).format("DD/MM/YYYY HH:mm:ss")}</td>
                            </tr>
                            <tr>
                                <td>Mode</td>
                                <td>{health.mode}</td>
                            </tr>
                            <tr>
                                <td>Battery Voltage (V)</td>
                                <td>{Math.round(health.v_batt*100)/100}</td>
                            </tr>
                            <tr>
                                <td>Battery Current (mA)</td>
                                <td>{Math.round(health.i_batt*100)/100}</td>
                            </tr>
                            <tr>
                                <td>3.3V Bus Current (mA)</td>
                                <td>{Math.round(health.v_33*100)/100}</td>
                            </tr>
                            <tr>
                                <td>5V Bus Current (mA)</td>
                                <td>{Math.round(health.v_5*100)/100}</td>
                            </tr>
                            <tr>
                                <td>Communications Subsystem Temp (deg C)</td>
                                <td>{Math.round(health.t_comm*100)/100}</td>
                            </tr>
                            <tr>
                                <td>EPS Temp (deg C)</td>
                                <td>{Math.round(health.t_eps*100)/100}</td>
                            </tr>
                            <tr>
                                <td>Battery Temp (deg C)</td>
                                <td>{Math.round(health.t_batt*100)/100}</td>
                            </tr>
                            </tbody>
                    </Table>
                }
               </div>
    );
}

export default Health;