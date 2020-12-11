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
  const [hasmore, setHasMore] = useState(false)
  const [qidata, setQidata] = useState(null)

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
            return prevdata.concat(result.data.items.map(item => item))
            //console.log(prevdata.concat(result.data.items.map(item => item))
            
        })
        setHasMore(result.data.items.length > 0)
        setLoading(false)
    })
    .catch(e => {
        setError(true)
        console.log('error is ',e)
    })
  }, [page])

  console.log(data)

  const observer = useRef(null)

  const lastBookElementRef = useCallback(node => {
    console.log('tinku')
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasmore) {
        setPage(page => page + 1)
      }
    })
    if (node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasmore])


  const getQuestionId = (id) => {
    setQidata(data.filter(item => item.question_id === id))
  }

  return (
    <>
      <Search />
      <Route 
         exact path='/'
         render={() => (
          <div>
          {
            data.length > 0 && data.map((item, index) => {
                if(data.length === index+1) {
                  return <Question ref={lastBookElementRef} item={item} getQuestionId={getQuestionId} key={item.owner.user_id}/>
                } else {
                  return <Question item={item} getQuestionId={getQuestionId} />
                }
                //return <Question item={item} getQuestionId={getQuestionId} />
            })
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
          </div>
         )}
      />
      
      {/* <Route 
        path={'/questions/' + qidata}
        render={() => (
          <QuestionModel qidata={qidata}/>
        )}
      /> */}
    </>
  );
  }



export default App
