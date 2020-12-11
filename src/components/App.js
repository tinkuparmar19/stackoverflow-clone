import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, Route } from 'react-router-dom';
import Question from './Question'
import QuestionModel from './QuestionModel'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [qidata, setQidata] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
        method: 'GET',
        url: `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=${page}`,
    })
    .then(result => {
        setData(prevdata => {
            return prevdata.concat(result.data.items.map(item => item))
        })
        setLoading(false)
    })
    .catch(e => {
        setError(true)
        console.log('error is ',e)
    })
  }, [page])

  let searchData
  if(query.trim().length > 1 && data.length > 0) {
      searchData = data.filter(item => {
        return item.title.toLowerCase().includes(query.trim().toLowerCase()) || item.owner.display_name.toLowerCase().includes(query.trim().toLowerCase())
  })
  } else {
      searchData = data
  }

  return (
    <>
      <Route 
         exact path='/'
         render={() => (
          <div className='home'>
            <input 
              className='form-control searchbox' 
              type='text' 
              placeholder='search by author name or question title'
              value={query} 
              onChange={(e) => setQuery(e.target.value) }
            />
            <InfiniteScroll
              dataLength={searchData.length}
              next={() => setPage(page => page + 1)}
              hasMore={true}
              className='scroll' 
            >
            {
            searchData.length > 0 && searchData.map((item, index) => {
                  return (
                    <Link to={'/questions/'+item.question_id} onClick={() => setQidata(item)}>
                      <Question item={item} key={item.owner.user_id}/>
                    </Link>
                  )
            })
            }
            </InfiniteScroll>
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
          </div>
         )}
      />
      
      <Route 
        path={'/questions/'+qidata.question_id}
        render={() => (
          <QuestionModel item={qidata}/>
        )}
      />
    </>
  );
  }



export default App
