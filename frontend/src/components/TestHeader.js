import React, { useEffect } from 'react'

export default function TestHeader(props) {
  useEffect(() => {
    console.log('testheader');
  }, [])


  return (
    <div id='testHeader'>
      <h3 id='title'>{props.title}</h3>
      <div className='flex timer'>

        <div id="timer">
          {("0" + props.time.min).slice(-2)}:{("0" + props.time.sec).slice(-2)}
        </div>
        {props.user && <div id='userInfo'>
          <p>{props.user.first_name} {props.user.last_name}</p>
        </div>}

      </div>
    </div>
  )
}
