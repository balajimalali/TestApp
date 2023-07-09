import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import token from './funcs'
import '../css/Tests.css'

export default function AllTest() {
    const navigate = useNavigate();

    const [ques, setQues] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LINK}/api/test`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Authorization: "Bearer " + token('jwt'),
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.status === 200) {
                const data = await res.json();
                setQues(data)

                // return res.json()
            } else if (res.status === 405) {
                navigate('/')
            }
        }).catch(error => console.log(error))
    }, [navigate])

    return (
        <>
            <div id='heading'>
                <h3>All active tests</h3>

            </div>
            <br />
            <div id='tests'>
                {ques.map((item) => {
                    return <div className="test" key={item.id}>
                        <div className="top">
                            <h3>{item.title}</h3>
                            <Link className='start' to={`/test/${item.id}`}>Start</Link>
                        </div>
                        <div className='instructions'>
                            <h4>Instrunctions : </h4>
                            <p className='instructions'>
                                <b>Time:</b>  {item.time} minutes <br />
                                {item.instructions}
                            </p>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}
