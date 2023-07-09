import React from 'react'

export default function NavBar(props) {
  return (
    <div id='NavBar'>
      <div id="sections">
        {/* <button className='blueOutBut'>Physics</button>
            <button className='blueBut'>Maths</button>
          <button className='blueBut'>Chemistry</button> */}

        {props.sections && props.sections.map((section) =>
          <button className={section.isactive ? 'blueOutBut' : 'blueBut'} key={section.id} onClick={() => props.dispatch({ type: 'changeQue', que: section.starts })}>{section.title}</button>
        )}
      </div>
      <div id="testSubmit">
        <button className='greenBut' onClick={() => props.sync(true)}>Submit</button>
      </div>
    </div>
  )
}
