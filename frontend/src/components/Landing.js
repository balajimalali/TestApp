import React from 'react'
import landing from '../imgs/landing.jpg'

export default function Landing() {
    return (
        <>
            <div className="left">
                <div>
                    <h2 className='m5'>Prepare for your test here</h2>
                    <h5 className='m5'>Practice makes man perfect</h5>
                    <p className='m5'>The best platform available to make assessments in a simplified way. Enjoy the free trial now.</p>
                </div>
            </div>
            <img src={landing} className="right" id='landingImg' alt="" />
        </>
    )
}
