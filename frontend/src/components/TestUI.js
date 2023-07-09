import React from 'react'
import '../css/App.css';
import TestHeader from './TestHeader'
import NavBar from './NavBar'
import MainArea from './MainArea'
import Panel from './Panel'
import { useEffect, useReducer, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import pencil from '../imgs/pencil.gif'
import token from './funcs'

export default function TestUI(props) {
  const { testID } = useParams();
  const navigate = useNavigate();

  const reducer = (state, action) => {
    let que;
    switch (action.type) {
      case ('initial'):
        // provide action.state
        state = { ...action.state }
        return state;
      case ('changeQue'):
        // provide action.que

        if (action.que > state.total) {
          action.que = 1;
        }
        else if (action.que <= 0) {
          action.que = state.total;
        }
        let cont = 0;
        while (!(state.section[cont].starts <= action.que && (action.que < state.section[cont].starts + state.section[cont].total))) {
          cont += 1;
        }
        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].isactive = false
        state.section[state.activeSection - 1].isactive = false
        state.activeSection = cont + 1;
        state.activeQuestion = action.que
        state.section[state.activeSection - 1].isactive = true
        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].isactive = true
        if (!state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].visited) {
          state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].visited = true;
          state.notVisited -= 1;
          state.notAnswered += 1;
        }
        state = { ...state }
        return state;
      case ('save'):
        que = state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts]
        if (action.que.choice) {
          if (que.choice) {
            state.answered += 1;
            if (que.marked) {
              state.ansMarked -= 1;
            }
            else {
              state.answered -= 1;
            }
          }
          else {
            state.answered += 1;
            if (que.marked) {
              state.marked -= 1;
            }
            else {
              state.notAnswered -= 1;
            }

          }
        }
        else {
          if (que.choice) {
            state.notAnswered += 1;
            if (que.marked) {
              state.ansMarked -= 1;
            }
            else {
              state.answered -= 1;
            }
          }
          else {
            state.notAnswered += 1;
            if (que.marked) {
              state.marked -= 1;
            }
            else {
              state.notAnswered -= 1;
            }
          }
        }
        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts] = action.que
        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].marked = false
        state = { ...state }
        return state
      case ('mark'):
        que = state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts]
        if (action.que.choice) {
          if (que.choice) {
            state.ansMarked += 1;
            if (que.marked) {
              state.ansMarked -= 1;
            }
            else {
              state.answered -= 1;
            }
          }
          else {
            state.ansMarked += 1;
            if (que.marked) {
              state.marked -= 1;
            }
            else {
              state.notAnswered -= 1;
            }

          }
        }
        else {
          if (que.choice) {
            state.marked += 1;
            if (que.marked) {
              state.ansMarked -= 1;
            }
            else {
              state.answered -= 1;
            }
          }
          else {
            state.marked += 1;
            if (que.marked) {
              state.marked -= 1;
            }
            else {
              state.notAnswered -= 1;
            }
          }
        }

        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts] = action.que
        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].marked = true;
        state = { ...state }
        return state;
      case ('clear'):
        que = state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts]
        if (que.choice) {
          state.notAnswered += 1;
          if (que.marked) {
            state.ansMarked -= 1;
          }
          else {
            state.answered -= 1;
          }
        }
        else {
          state.notAnswered += 1;
          if (que.marked) {
            state.marked -= 1;
          }
          else {
            state.notAnswered -= 1;
          }
        }

        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].choice = null
        state.section[state.activeSection - 1].question[state.activeQuestion - state.section[state.activeSection - 1].starts].marked = false;
        state = { ...state }
        return state;
      default:
        return state;
    }
  }

  const [Test, setTest] = useReducer(reducer, {})
  const [User, setUser] = useState(null)
  const [Time, setTime] = useState({ min: 60, sec: 0, time: 60 })
  const [Loading, setLoading] = useState(true)

  const sync = (submit = false) => {
    if (submit) {
      fetch(`${process.env.REACT_APP_LINK}/api/test/sync/${testID}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          Authorization: "Bearer " + token('tst'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "test": Test, "submit": true, "end": Date().toString })
      }).then(res => {
        if (res.status === 200) {
          navigate('/');
        }
        return res.json()
      }).then(data => {
        console.log(data.msg);
      })

    }
    else {
      fetch(`${process.env.REACT_APP_LINK}/api/test/sync/${testID}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          Authorization: "Bearer " + token('tst'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "test": Test, "submit": false, "time": Date().toString })
      }).then(res => {
        if (res.status === 200) {
          console.log('synced successfully');
        } else {
          console.log("sync failed");
        }
      })
    }

  }

  const tick = () => {
    if (Loading) {
      return;
    }

    const start = Date.parse(Time.start);
    const rem = start + Time.time * 60000 - Date.parse(Date());
    setTime({ ...Time, min: parseInt(rem / 60000), sec: parseInt(rem / 1000) - parseInt(rem / 60000) * 60 })

    if (rem === 0) {
      sync(true);
    }

  }



  useEffect(() => {

    // const jwt = () => {
    //   let cookies = document.cookie.split('; ')
    //   let ans = ''
    //   cookies.forEach(cookie => {
    //     if (cookie.startsWith('jwt')) {
    //       ans = cookie.split('%20')[1]
    //     }
    //   });

    //   return ans;
    // }


    fetch(`${process.env.REACT_APP_LINK}/api/test/${testID}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Authorization: "Bearer " + token('jwt')
      }
    }).then(res => {
      if (res.status === 403) {
        navigate('/')
        throw new Error("not logged in");
      }
      else if (res.status === 404) {
        navigate('/404')
        throw new Error("no tests available");
      }
      return res.json();
    }).then(dataobj => {
      let data = dataobj.qpaper
      setUser(dataobj.user)
      setTime({ min: parseInt(data.time), sec: 0, time: parseInt(data.time), start: dataobj.start })
      data.section[0].isactive = true
      data.section[0].question[0].isactive = true
      data.activeSection = 1
      data.activeQuestion = 1
      let no = 0
      data.section.forEach(section => {
        section.starts = no + 1
        no += section.question.length
        section.total = section.question.length
      })
      data.notVisited = no - 1
      data.notAnswered = 1
      data.answered = 0
      data.marked = 0
      data.ansMarked = 0
      data.total = no
      data.section[0].question[0].visited = true
      setTest({
        type: 'initial',
        state: data
      })

      setLoading(false)

    })
    console.log('testui')


  }, [testID, navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  })


  if (Loading) {
    return (
      <div id='downloading'>
        <img src={pencil} alt="loading" />
        <p>please wait while we download the question paper</p>
      </div>
    )
  }
  else {
    return (

      <div id='testUI'>
        <TestHeader title={Test.title} user={User} time={Time} />
        <NavBar sections={Test.section} dispatch={setTest} sync={sync} />
        <div className="horizontal-align">

          <MainArea status={Test} dispatch={setTest} sync={sync} />
          <Panel status={Test} dispatch={setTest} />
        </div>
      </div>
    )
  }
}
