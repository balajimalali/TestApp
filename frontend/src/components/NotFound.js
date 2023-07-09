import React from 'react'
import img404 from '../imgs/404.jpg'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div id='notfound'>
            <div className="inner-text">
                <Link to="/" id='home-btn'>GO TO HOME</Link>
            </div>
            <img src={img404} id='img404' alt="404" />
        </div>
    )
}
