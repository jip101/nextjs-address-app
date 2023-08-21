export async function POST(request) {
  const userInput = await request.json()
  if (typeof userInput !== 'string') {
    console.log("didn't work")
    return Response.json("String as input required", {status: 400})
  }
  //const address = userInput.data
  const address = encodeURIComponent(userInput.data)
  let baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='

  const apiKey = '&key=' + process.env.GMAPS

  const url = baseURL + address + apiKey

  //console.log(url)
/*
  const data = await fetch(url)
  const result = await data.json()
  console.log(result)
  if (result.status === 'OK') {
    return Response.json({ result });
  }
  else {
    return Response.json({ message:"Something went wrong" })
  }
*/
  //let data = await request.json()
  //console.log(await data.json());

  const myUrl = new URL("https://maps.googleapis.com/maps/api/geocode/json")
  myUrl.searchParams.append("address", userInput)
  myUrl.searchParams.append("key", process.env.GMAPS)

  console.log(myUrl)
  return Response.json(userInput)

}
