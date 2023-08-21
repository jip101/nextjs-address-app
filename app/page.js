"use client"

import { useState, useEffect, useRef } from 'react'

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
    console.log(JSON.stringify(e))
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
    <main className='grid place-content-center h-full'>
      <form action='/api/test' 
        method='POST' 
        onSubmit={handleSubmit}>
        <input placeholder='Address' value={input} onChange={handleInput} required/>
      </form>
      <p>Corrected address: {returnedAddress.results?.length > 0 ? returnedAddress.results[0].formatted_address : "awaiting input"}</p>
      <p>{returnedAddress.results?.length > 0 ? "lat: " + returnedAddress.results[0].geometry.location.lat : ''}</p>
      <p>{returnedAddress.results?.length > 0 ? "long: " + returnedAddress.results[0].geometry.location.lng : ''}</p>


    </main>
  )
}

//{data.length && data.map((address, i) => {
//    return <p key={i}>
//      {address}
//    </p>
//})}