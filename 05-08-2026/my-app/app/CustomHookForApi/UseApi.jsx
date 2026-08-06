import React from 'react'
import { useState, useEffect } from 'react'

const UseApi = (url) => {
    const [data, setData] = useState()
//so a custom that will fetch any api we can use this instead of "fetch" keyword like UseApi('your api url here')
    const get = () => {
        fetch(url)//means fetch the url your'e given and then json it and add in setData, simple!
            .then(res => res.json())
            .then((json) => {
                setData({data: json,})
            })
    }
    return { get, ...data }
}

export default UseApi