import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import token from './funcs'
import '../css/Tests.css'

export default function Report() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState(null)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_LINK}/api/result/${id}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Authorization: "Bearer " + token('jwt'),
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.status !== 200) {
                navigate('/results');
            }
            else {
                const data = await res.json();
                setResult(data);
                console.log(data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [navigate, id])

    const classD = (question, option) => {
        let ans = 'answer'
        if(question.choice && option.selected){
            // ans = ans + ' choice'
            if (question.answer !== option.id) {
                ans = ans + ' wrong'
            }
        }

        if (question.answer === option.id) {
            ans = ans + ' correct'
        }


        return ans
    }

    return (
        <>
            {result &&
                <div className="result">
                    <Link to="/results" className='back'>Back</Link>
                    <h3>{result.title}</h3>
                    {
                        result.section.map((section) => {
                            return <div className='section' key={section.id}>
                                <h4>{section.title.toUpperCase()}</h4>
                                {
                                    section.question.map((question, j) => {
                                        return <div className='question' key={question.id}>
                                            <p>{j + 1}) {question.question}</p>
                                            {
                                                question.option.map(option => {
                                                    return <div key={option.id}>
                                                        <p className={classD(question, option)}>{(question.choice && option.selected) ?  <span>&#10003; &nbsp;</span> : <span>&nbsp; &nbsp; &nbsp;</span> }{option.value}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            }
        </>
    )
}
