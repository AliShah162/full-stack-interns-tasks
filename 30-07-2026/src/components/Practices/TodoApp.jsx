import { useState } from 'react'

const TodoApp = () => {
    const [inputVal, setinputVal] = useState('')
    const [todos, settodos] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('')

    function handleChange(e) {
        setinputVal(e.target.value)
    }

    function handleAdd() {
        if (inputVal.trim() === '') return
        settodos([...todos, inputVal])
        setinputVal('')
    }

    function handleDelete(index) {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        settodos(newTodos)
        if (editIndex === index) {
            setEditIndex(null)
            setEditText('')
        }
    }

    function handleEdit(index) {
        setEditIndex(index)
        setEditText(todos[index])
    }

    function handleSaveEdit() {
        if (editText.trim() === '') return
        const newTodos = [...todos]
        newTodos[editIndex] = editText
        settodos(newTodos)
        setEditIndex(null)
        setEditText('')
    }

    function handleCancelEdit() {
        setEditIndex(null)
        setEditText('')
    }

    return (
        <div style={{ 
            maxWidth: '500px', 
            margin: '50px auto', 
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ 
                textAlign: 'center', 
                color: '#1a1a1a',
                fontSize: '32px',
                marginBottom: '30px'
            }}>
                Todo App
            </h1>
            
            {/* Add new todo */}
            <div style={{ 
                display: 'flex', 
                gap: '10px',
                marginBottom: '30px'
            }}>
                <input 
                    onChange={handleChange} 
                    type="text" 
                    placeholder='Enter your tasks'
                    value={inputVal} 
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        border: '2px solid #cccccc',
                        borderRadius: '6px',
                        fontSize: '16px',
                        outline: 'none',
                        color: '#1a1a1a'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#666666'}
                    onBlur={(e) => e.target.style.borderColor = '#cccccc'}
                />
                <button 
                    onClick={handleAdd}
                    style={{
                        padding: '10px 25px',
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
                >
                    Add
                </button>
            </div>

            {/* Todo list */}
            {todos.length === 0 ? (
                <p style={{ 
                    textAlign: 'center', 
                    color: '#999999',
                    padding: '40px 0',
                    fontSize: '16px'
                }}>
                    No tasks yet. Add one above!
                </p>
            ) : (
                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    margin: 0
                }}>
                    {todos.map((todo, index) => (
                        <li 
                            key={index}
                            style={{
                                padding: '12px 15px',
                                marginBottom: '8px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '6px',
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            {editIndex === index ? (
                                // EDIT MODE
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '8px',
                                    alignItems: 'center'
                                }}>
                                    <input 
                                        type="text" 
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        autoFocus
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            border: '2px solid #666666',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') handleSaveEdit()
                                            if (e.key === 'Escape') handleCancelEdit()
                                        }}
                                    />
                                    <button 
                                        onClick={handleSaveEdit}
                                        style={{
                                            padding: '6px 15px',
                                            backgroundColor: '#1a1a1a',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={handleCancelEdit}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#999999',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#777777'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#999999'}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                // NORMAL MODE
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ 
                                        color: '#1a1a1a',
                                        fontSize: '16px'
                                    }}>
                                        {todo}
                                    </span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button 
                                            onClick={() => handleEdit(index)}
                                            style={{
                                                padding: '4px 12px',
                                                backgroundColor: '#e0e0e0',
                                                color: '#1a1a1a',
                                                border: '1px solid #cccccc',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '13px'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#cccccc'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(index)}
                                            style={{
                                                padding: '4px 12px',
                                                backgroundColor: '#d9534f',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '13px'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#c9302c'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#d9534f'}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Show total todos */}
            {todos.length > 0 && (
                <p style={{
                    textAlign: 'center',
                    color: '#999999',
                    marginTop: '20px',
                    fontSize: '14px',
                    borderTop: '1px solid #e0e0e0',
                    paddingTop: '15px'
                }}>
                    Total: {todos.length} {todos.length === 1 ? 'todo' : 'todos'}
                </p>
            )}
        </div>
    )
}

export default TodoApp