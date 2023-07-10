import React, {useContext, useState} from 'react'
import { userContext } from '../App'
import Login from './Login';

export default function Register(props) {
    const setUser = useContext(userContext)[1];
    const [Form, setForm] = useState({
        username: '',
        password: '',
        confirm: '',
        email: '',
        first_name: '',
        last_name: '',
        msg: null
    })

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_LINK}/api/register`, {
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
            <h2>Register</h2>
            <form onSubmit={(e) => handleClick(e)} >

                <p className='error'>{Form.msg}</p>
                <input type="text" autoFocus placeholder='username' value={Form.username} onChange={(e) => { setForm({ ...Form, username: e.target.value }) }} required /> <br />
                <input type="email" placeholder='email' value={Form.email} onChange={(e) => { setForm({ ...Form, email: e.target.value }) }} required /> <br />
                <input type="password" placeholder='password' value={Form.password} onChange={(e) => { setForm({ ...Form, password: e.target.value }) }} required /> <br />
                <input type="password" placeholder='confirm password' value={Form.confirm} onChange={(e) => { setForm({ ...Form, confirm: e.target.value }) }} required /> <br />
                <input type="text" placeholder='first name' value={Form.first_name} onChange={(e) => { setForm({ ...Form, first_name: e.target.value }) }} /> <br />
                <input type="text" placeholder='last name' value={Form.last_name} onChange={(e) => { setForm({ ...Form, last_name: e.target.value }) }} /> <br />
                <p onClick={() => { props.setpopup({ open: true, elem: <Login setpopup={props.setpopup} /> }) }} className='cursor' id='registernav' >Have an account</p> <br />
                <button>Register</button>
            </form>
        </div>
    )
}
