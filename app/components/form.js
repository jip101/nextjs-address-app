import { useEffect, useRef } from "react"

export default function AddressInput({input, setInput, returnedAddress, setReturnedAddress}) {
    const timeout = useRef()
    console.log(input)

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
            if (input?.trim() && input.length >= 5) {
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
        <form action='/api/test' 
        method='POST' 
        onSubmit={handleSubmit}>
        <input placeholder='Address' value={input} onChange={handleInput} required/>
      </form>
    )
}