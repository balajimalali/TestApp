import React from 'react'

export default function Controls(props) {
  return (
    <div id='controls'>
      <div>

        <button className='blueOutBut' onClick={() => props.dispatch({ type: 'changeQue', que: props.queNo - 1 })}>Back</button>
        <button className='blueOutBut' onClick={() => props.dispatch({ type: 'changeQue', que: props.queNo + 1 })}>Next</button>
      </div>
      <div>

        <button className='blueBut' onClick={async () => { await props.dispatch({ type: 'save', que: props.que }); await props.dispatch({ type: 'changeQue', que: props.queNo + 1 }); props.sync(); }}>Save & Next</button>
        <button className='blueBut' onClick={async () => { await props.dispatch({ type: 'mark', que: props.que }); await props.dispatch({ type: 'changeQue', que: props.queNo + 1 }); props.sync(); }}>Save & Mark For Review</button>
      </div>
      <button className='greenBut' onClick={async () => { await props.dispatch({ type: 'clear' }); props.sync(); }}>Clear Response</button>
    </div>
  )
}
