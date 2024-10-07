import {useState,useEffect} from 'react'
import {ApiBase} from '../utils/base_api'

const AuthFetch = (authToken,url) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(() => {
        setLoading(true)
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchData = async() =>{
        try{
            const res = await fetch(ApiBase+url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer `+String(authToken.access),
                'Content-Type': 'application/json'
              }
            },signal)
            const response=await res.json()
            
            setData(response)
            
        }catch(err){
            if (err.name === 'AbortError') {
                console.log('Request was aborted');
                return;
            }
            setError(err)
            console.log("Error",(err))
        }
        finally{
            setLoading(false)
        }
        
    }
    fetchData()
    return ()=>{
            abortController.abort();
    }

            
      }, [authToken,url])

    return {data, loading, error}


}

export default AuthFetch