import {useEffect,useState} from 'react'

const UsersList = () => {
    // States
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
     const [error, setError] = useState(null)
    //to just fetch the users and then map them in return to show them
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(res=>res.json())
      .then(data=>{
        setUsers(data)
        setLoading(false)
        console.log('Users loaded:', data)
      })
       .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])


    // SSpinner
    if (loading) {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite'
            }}></div>
            <p>Loading users...</p>
            
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}




     if (error) {
        return (
            <div>
                <h1>Error: {error}</h1>
                <button onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        )
    }

    // To search filtered users
    const filteredUsers=users.filter(user=>user.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
        <h1>Users List</h1>
        <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        
        {filteredUsers.length === 0 ? (
            <p>No users found for "{search}"</p>
        ) : (
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.phone} - {user.website}
                    </li>
                ))}
            </ul>
        )}
    </div>
)
}

export default UsersList
