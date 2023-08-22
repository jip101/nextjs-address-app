export async function POST(request) {
  const userInput = await request.json()
  if (typeof userInput !== 'string') {
    console.log("didn't work")
    return Response.json("Error", {status: 400, statusText: "Input must be string type"})
  }

  const myUrl = new URL("https://maps.googleapis.com/maps/api/geocode/json")
  myUrl.searchParams.append("address", userInput)
  myUrl.searchParams.append("key", process.env.GMAPS)

  const data = await fetch(myUrl)
  const result = await data.json()
  console.log(result)
  if (result.status) {
    return Response.json(result);
  }
  else {
    return Response.json("Error", {status: 400, statusText: "Unable to connect to Google API"})
  }
}
