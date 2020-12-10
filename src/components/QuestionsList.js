import React, {useState, useEffect } from 'react'
import Question from './Question'

const QuestionsList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const url = 'https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=1'
        fetch(url)
        .then(res => res.json())
        .then(result => {
            //console.log(result.items)
            setData(result.items)
        })     
    }, [])
    const name = 'tinku'
    return (
        <div>
            {
             data.length > 0 && (data.map(item => {
                 return (
                    <Question item={item} key={item.owner.user_id}/>
                 )
             }))
             }
             {/* <Question name={name}/> */}
        </div>
    )
}


export default QuestionsList
