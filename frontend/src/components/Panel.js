import React from 'react'

export default function Panel(props) {

  const color = (que) => {
    let ans = ''
    if (!que.visited) {
      return 'notVisited';
    }
    if (!que.choice) {
      ans = 'notAnswered'
    }
    else {
      ans = 'answered'
    }
    if (que.marked) {
      ans = 'marked'
    }
    return ans;
  }

  return (
    <div id='panel'>
      <div id="panelContent">
        <p>Question Status</p>
        <div id="queStatus">


          <div id="" className='colInfo '>
            <div className="square notVisited"><p>{props.status.notVisited}</p></div>
            <p>Not Visited</p>
          </div>

          <div id="" className='colInfo '>
            <div className="square notAnswered"><p>{props.status.notAnswered}</p></div>
            <p>Not Answered</p>
          </div>

          <div id="" className='colInfo '>
            <div className="square answered"><p>{props.status.answered}</p></div>
            <p>Answered</p>
          </div>

          <div id="" className='colInfo '>
            <div className="square marked"><p>{props.status.marked}</p></div>
            <p>Marked for Review</p>
          </div>

          <div id="" className='colInfo'>
            <div className="square ansMarked"><p>{props.status.ansMarked}</p><div className="tick">&#10004;</div></div>
            <p style={{ 'width': '75%' }}>Answered & Marked For Review</p>
          </div>

        </div>


        <div id="grid">
          <p>Choose a question</p>

          {props.status.section && props.status.section.map(((section, i) =>
            <div key={section.id}>{section.question.map((que, j) =>
              <div className={"square " + color(que)} key={que.id} onClick={() => props.dispatch({ type: 'changeQue', 'que': section.starts + j })}><p>{section.starts + j}</p>{(que.marked && que.choice) ? <div className="tick">&#10004;</div> : ''}</div>
            )}</div>
          ))}
        </div>


      </div>
    </div>
  )
}
