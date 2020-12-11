import React, {useState, useEffect, useRef, useCallback } from 'react'
import Question from './Question'
import axios from 'axios'

const QuestionsList = () => {
    

    // useEffect(() => {
    //     setLoading(true)
    //     axios({
    //         method: 'GET',
    //         url: `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=${page}`
    //     })
    //     .then(res => res.json)
    //     .then(result => {
    //         setData(prevdata => {
    //             return [...prevdata, ...result.items.map(item => item)]
    //         })
    //         setLoading(false)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })
    // }, [page])

    

   
}


export default QuestionsList
