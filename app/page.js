"use client"

import { useState, useEffect, useRef } from 'react'
import Display from './components/display'

export default function Home() {
  const [input, setInput] = useState('')
  const [returnedAddress, setReturnedAddress] = useState('')
  const timeout = useRef()


  function handleInput(e) {
    e.preventDefault()
    setInput(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
  };
  
  useEffect(() => {  
    //reset timer
    clearTimeout(timeout.current)

    //for useEffect cleanup
    //if true, will not update state
    let ignore = false
    
    timeout.current = setTimeout(() => {
      async function fetchData() {
        if (input.trim() && input.length >= 5) {
          let requestOptions = {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 'content-type': 'application/json' },
          };
            let response = await fetch('/api/test', requestOptions)
            console.log(response)
            if (response.ok && !ignore){
              let jsonResponse = await response.json()
              console.log(jsonResponse)
              setReturnedAddress(jsonResponse)
            }
        }
        else {
          setReturnedAddress('')
        }
      }
      fetchData();
    }, 1000)


    return (() => {
      ignore=true;
      clearTimeout(timeout.current);
    })
  }, [input])
  


  return (
    <main className='grid place-content-center bg-slate-500 h-1/2 w-3/4 p-6 border-2 border-black rounded drop-shadow-lg '>
      <form className='grid w-full justify-items-center'
        action='/api/test' 
        method='POST' 
        onSubmit={handleSubmit}>
        <input className='text-gray-200 placeholder-slate-200 bg-slate-700 place-content-center' placeholder='Address' value={input} onChange={handleInput} required/>
      </form>
      <Display returnedAddress={returnedAddress}/>

    </main>
  )
}

//{data.length && data.map((address, i) => {
//    return <p key={i}>
//      {address}
//    </p>
//})}

/*
<p>Corrected address: {returnedAddress.results?.length > 0 ? returnedAddress.results[0].formatted_address : "awaiting input"}</p>
<p>{returnedAddress.results?.length > 0 ? "lat: " + returnedAddress.results[0].geometry.location.lat : ''}</p>
<p>{returnedAddress.results?.length > 0 ? "long: " + returnedAddress.results[0].geometry.location.lng : ''}</p>
*/