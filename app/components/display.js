export default function Display ({ returnedAddress }) {
    if (!returnedAddress.status) {
        return <p>Enter Address</p>
    }

    if (returnedAddress.results.length === 0) {
        return <p>No results found</p>
    }

    if (returnedAddress.results) {
        return(
            <table className='w-full bg-slate-600 text-slate-200'>
                <tr>
                    <th>Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                    {returnedAddress.results.map((item, id) => {
                        return (
                        <tr key={id}>
                            <td>{item.formatted_address}</td> 
                            <td>{item.geometry.location.lat}</td>
                            <td>{item.geometry.location.lng}</td>
                        </tr>
                        )
                    })}
            </table>
        )
    }
}