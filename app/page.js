"use client"

import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'

export default function Home() {
  const [input, setInput] = useState('')
  const [data, setData] = useState(['Awaiting Results'])
  const timeout = useRef()

  
  function handleInput(e) {
    e.preventDefault()
    //useDebounce(setInput(e.target.value), 1000)
    setInput(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
  };
  
  useEffect(() => {
    //clearTimeout(timeout.current)
    //for useEffect cleanup
    //if true, will not update state
    let ignore = false
    
    /*
     * @param {string} input
     */
    async function fetchData() {
      if (input) {
        let requestOptions = {
          method: 'POST',
          body: JSON.stringify(input),
          headers: { 'content-type': 'application/json' },
        };
          try{
            let response = await fetch('/api/test', requestOptions)
            //console.log(response)
            let jsonResponse = await response.json()
            console.log(jsonResponse)
            jsonResponse.ok && !ignore ? setData(jsonResponse):''
            console.log('triggered')
          } catch (error) {
            console.log(error)
          }
      }
      else {
        setData('')
      }
    }
    fetchData();

    //const debounceFetch = debounce(fetchData, 1000);

    return (() => ignore=true)
  }, [input])
  

  return (
    <main className='grid place-content-center h-full'>
      <form action='/api/test' 
        method='POST' 
        onSubmit={handleSubmit}>
        <input placeholder='Address' value={input} onChange={handleInput} required/>
      </form>
      <p>{data?data:''}</p>
    </main>
  )
}

//{data.length && data.map((address, i) => {
//    return <p key={i}>
//      {address}
//    </p>
//})}