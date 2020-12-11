import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Route } from 'react-router-dom';
import Question from './Question'
import Search from './Search';
import QuestionModel from './QuestionModel'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [qidata, setQidata] = useState([])

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
        method: 'GET',
        url: `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=${page}`,
    })
    .then(result => {
        setData(prevdata => {
            //return [...new Set([...prevdata, ...result.data.items.map(item => item)])]
            return prevdata.concat(result.data.items)
        })
        setLoading(false)
    })
    .catch(e => {
        setError(true)
        console.log('error is ',e)
    })
  }, [page])

  console.log(data)

  const observer = useRef()
  const lastQuestion = useCallback(node => {
      if(loading) {
          return 
      }
      if(observer.current) {
          observer.current.disconnect()
      }
      observer.current = new IntersectionObserver(entries => {
          if(entries[0].isIntersecting) {
              setPage(prevPage => prevPage+1)
          }
      })
      if(node) {
          observer.current.observe(node)
      }
  },[loading])

  const getQuestionId = (id) => {
    setQidata((qidata) => data.filter(item => item.question_id === id))
  }

  return (
    <div className="App">
      <Search />
      <Route 
         exact path='/'
         render={() => (
          <div>
          {
            data.map((item, index) => {
                if(item.length === index+1) {
                    return <Question ref={lastQuestion} item={item} getQuestionId={getQuestionId} key={item.owner.user_id}/>
                } else {
                    return <Question item={item} getQuestionId={getQuestionId} key={item.owner.user_id}/>
                }
            })
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
          </div>
         )}
      />
      <Route 
        path={'/questions/' + qidata.question_id}
        render={() => (
          <QuestionModel qidata={qidata}/>
        )}
      />
    </div>
  );
  }



export default App
