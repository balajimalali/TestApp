import { useState, createContext, useEffect } from 'react';
import token from './components/funcs'
import Home from './components/Home';
import { useNavigate } from 'react-router-dom';

export const userContext = createContext();

function App() {
  const navigate = useNavigate();
  const [User, setUser] = useState({})

  useEffect(() => {

    fetch(`${process.env.REACT_APP_LINK}/api/init`, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token('jwt'),
        "Content-Type": "application/json"
      },
      credentials: 'include'
    }).then(res => {
      if (res.status !== 200) {
        navigate('/')
      }
      return res.json()
    }
    ).then(data => {
      setUser(data)
    }).catch(err => {
      console.log(err);
    })



  }, [navigate])

  useEffect(() => {
    const time = setInterval(() => {
      if(User.username){
        fetch(`${process.env.REACT_APP_LINK}/api/refresh`, {
          method: 'POST',
          headers: {
            Authorization: "Bearer " + token('jwt'),
            "Content-Type": "application/json"
          },
          credentials: 'include'
        }).then(res => {
          if (res.status !== 200) {
            navigate('/')
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }, 8 * 60 * 1000);

    return () => {
      clearInterval(time);
    }
  }, [navigate, User.username])

  return (
    <div className="App">
      <userContext.Provider value={[User, setUser]}>

        <Home />

        {/* <Link to="/test/1">go to test</Link> */}
      </ userContext.Provider>
    </div>
  );
}

export default App;
