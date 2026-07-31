import { useState, useEffect } from 'react'

const TestingApi = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)  // 👈 Loading state
    const [error, setError] = useState(null)      // 👈 Error state

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setLoading(false)  // ✅ Done loading
            })
            .catch(err => {
                setError('Failed to load posts')  // ❌ Save error
                setLoading(false)  // ✅ Done loading (with error)
            })
    }, [])

    // 👇 Show loading
    if (loading) {
        return <h1>Loading...</h1>
    }

    // 👇 Show error
    if (error) {
        return <h1>Error: {error}</h1>
    }

    // 👇 Show data (normal)
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}

export default TestingApi