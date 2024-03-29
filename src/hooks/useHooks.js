import { useState } from "react"
import { useEffect } from "react"

const useHook = (email) => {
    const [logedInEmail, setLogenInEmail] = useState([]) 

    useEffect(() => {
        if(email){
            fetch(`https://bike-re-sale-server.vercel.app/users/${email}`)
            .then(res => res.json())
            .then(data => {
                setLogenInEmail(data)
                console.log(data)
            }) 
        }
    }, [email])

    return [logedInEmail]
}

export default useHook;