import React from "react";
import Table from 'react-bootstrap/Table';
import moment from 'moment-timezone';

function Health(props) {
    var health = props.health;
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
                                <td>{health.v_batt}</td>
                            </tr>
                            <tr>
                                <td>Battery Current (mA)</td>
                                <td>{health.i_batt}</td>
                            </tr>
                            <tr>
                                <td>3.3V Bus Current (mA)</td>
                                <td>{health.v_33}</td>
                            </tr>
                            <tr>
                                <td>5V Bus Current (mA)</td>
                                <td>{health.v_5}</td>
                            </tr>
                            <tr>
                                <td>Communications Subsystem Temp (deg C)</td>
                                <td>{health.t_comm}</td>
                            </tr>
                            <tr>
                                <td>EPS Temp (deg C)</td>
                                <td>{health.t_eps}</td>
                            </tr>
                            <tr>
                                <td>Battery Temp (deg C)</td>
                                <td>{health.t_batt}</td>
                            </tr>
                            </tbody>
                    </Table>
                }
               </div>
    );
}

export default Health;