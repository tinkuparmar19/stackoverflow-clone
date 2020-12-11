import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ApiData(page) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    

    useEffect(() => {
        //console.log(page)
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: `https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=${page}`,
        })
        .then(result => {
            //console.log('result is ',result.data.items.map(item => item))
            setData(prevdata => {
                //console.log([...prevdata, ...result.data.items.map(item => item)])
                return [...prevdata, ...result.data.items.map(item => item)]
            })
            setLoading(false)
        })
        .catch(e => {
            setError(true)
            console.log('error is ',e)
        })
    }, [page])
    return { data, loading, error }
}

