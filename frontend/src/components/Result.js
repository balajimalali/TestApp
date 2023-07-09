import React, { useState, useEffect } from 'react'
import '../css/Tests.css'
import token from './funcs'
import { Link, useNavigate } from 'react-router-dom'

export default function Result() {
    const [instances, setInstances] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LINK}/api/result`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Authorization: "Bearer " + token('jwt'),
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.status === 200) {
                let data = await res.json();
                data.forEach((item, index) => {
                    data[index].result = JSON.parse(item.result);
                    // data[index].start = new Date(item.start);
                });
                setInstances(data)
            } else if (res.status === 405) {
                navigate('/')
            }
        }).catch(error => console.log(error))
    }, [navigate])


    return (
        <>
            <div id='heading'>
                <h3>Your Results</h3>
            </div>
            <br />
            <div id='tests'>
                {instances.map((item) => {
                    return <div key={item.id}>
                        {item.end ?
                            <Link to={'/results/' + item.id}>
                                <div className="test">
                                    {
                                        item.result ?
                                            <div>
                                                <h3 className='inline'>{item.result.title}</h3>
                                                <p className='inline float-right'>At: {new Date(item.start).toLocaleDateString()} {new Date(item.start).toLocaleTimeString()}</p>
                                                <div className="instructions">

                                                    <p className="col-2-stack"><b> Correct Answers:</b> {item.result.correct}</p>
                                                    <p className="col-2-stack"><b> Wrong Answers :</b> {item.result.wrong}</p>
                                                    <p className="col-2-stack"><b> Not Attempted :</b> {item.result.notAttempted}</p>
                                                    <p className="col-2-stack"><b> Score :</b> {item.result.score}</p>
                                                </div>

                                            </div>
                                            :
                                            <div>
                                                <h3 className='inline'>Unknown</h3>
                                                <p className='inline float-right'>At: {new Date(item.start).toLocaleDateString()} {new Date(item.start).toLocaleTimeString()}</p> <br />
                                                <p className='instructions'>Result not yet evaluated. Open to evaluate.</p>
                                            </div>
                                    }
                                </div>
                            </Link>
                            : <></>}
                    </div>
                })}
            </div>
        </>
    )
}
