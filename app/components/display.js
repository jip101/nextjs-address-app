export default function Display ({ returnedAddress }) {
    if (!returnedAddress.status) {
        return <p>Enter Address</p>
    }

    if (returnedAddress.results.length === 0) {
        return <p>No results found</p>
    }

    if (returnedAddress.results) {
        return(
            <table className='w-full bg-slate-600 text-slate-200 table-border mt-2'>
                <tbody>
                    <tr>
                        <th className='table-border'>Address</th>
                        <th className='table-border'>Latitude</th>
                        <th className='table-border'>Longitude</th>
                    </tr>
                        {returnedAddress.results.map((item, id) => {
                            return (
                                <tr key={id}>
                                <td className='table-border p-3'>{item.formatted_address}</td> 
                                <td className='table-border'>{item.geometry.location.lat}</td>
                                <td className='table-border'>{item.geometry.location.lng}</td>
                            </tr>
                            )
                        })}
                </tbody>
            </table>
        )
    }
}