import React, { useState, useContext } from 'react'
import { userContext } from '../App'
import Register from './Register';

export default function Login(props) {
    const setUser = useContext(userContext)[1];
    const [Form, setForm] = useState({
        username: '',
        password: '',
        msg: null
    })

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_LINK}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(Form)
        }).then(async res => {
            const data = await res.json();
            if (res.status === 200) {
                setUser(data)
                props.setpopup({ open: false })
            }
            else {
                setForm({ ...Form, msg: data.msg })
            }
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className='popup' id='loginPage'>
            <h2>Login</h2>
            <form onSubmit={(e) => handleClick(e)} >

                <p className='error'>{Form.msg}</p>
                <input type="text" autoFocus value={Form.username} onChange={(e) => { setForm({ ...Form, username: e.target.value }) }} /> <br />
                <input type="password" value={Form.password} onChange={(e) => { setForm({ ...Form, password: e.target.value }) }} /> <br />
                <p onClick={() => { props.setpopup({ open: true, elem: <Register setpopup={props.setpopup} /> }) }} className='cursor' id='registernav' >Don't have an account</p> <br />
                <button>Login</button>
            </form>
        </div>
    )
}
