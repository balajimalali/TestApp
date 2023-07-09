import React, { useEffect, useState } from 'react'
import Controls from './Controls'

export default function MainArea(props) {

  const [que, setque] = useState(undefined)

  const choose = (id) => {
    const temp = { ...que }
    temp.choice = id;
    temp.option.forEach(opt => {
      if (opt.id === id) {
        opt.selected = true;
      }
      else if (opt.selected) {
        opt.selected = false
      }
    })
    setque(temp)
  }

  useEffect(() => {
    if (props.status.section) {
      const section = props.status.section[props.status.activeSection - 1];
      const question = section.question[props.status.activeQuestion - section.starts];
      setque(question)
    }
  }, [props.status])

  return (
    <div id='mainArea'>
      <div id="QueTitle">
        <p id='queNo'>Question {props.status.activeQuestion}</p>
        <p id='type'>Single Select Type</p>
      </div>

      <div id="Question">
        {que && que.question}
      </div>
      {/* <div className="options">
        <div className="marker selected">
        </div>
        <p>40 N</p>
      </div> */}

      {que &&
        que.option.map((option) =>
          <div className="options" key={option.id} onClick={() => choose(option.id)} >
            <div className={"marker " + ((que.choice === option.id) ? 'selected' : '')} onClick={() => choose(option.id)} >
            </div>
            <p>{option.value}</p>
          </div>

        )
      }


      <Controls dispatch={props.dispatch} que={que} queNo={props.status.activeQuestion} sync={props.sync} />
    </div>
  )
}
