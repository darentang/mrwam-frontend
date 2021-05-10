import React from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import moment from 'moment';


function Download(props) {
    var download = props.download;
    return(
        <div>
                <h2>Available Files</h2>
                {(download != null) &&
                    <div>
                    <Table striped bordered >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Size (Bytes)</th>
                                <th>Created Time (Local Time)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {download.files.map((e, i) => {
                                return(
                                <tr key={i}>
                                    <td>{e.filename}</td>
                                    <td>{e.size}</td>
                                    <td>{moment.unix(e.created_time).format("DD/MM/YYYY HH:mm:ss")}</td>
                                    <td>
                                        <Button onClick={()=>{
                                            window.open(sessionStorage.getItem('api-host')+'download?'+
                                                new URLSearchParams({name: e.filename})
                                            );
                                        }}>
                                            Download Image
                                        </Button>
                                    </td>
                                </tr>
                                );
                            })
                            }
                            
                        </tbody>
                    </Table>
                    </div>
                }
        </div>
    );
}

export default Download;