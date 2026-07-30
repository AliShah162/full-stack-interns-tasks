import { useState } from 'react'

const NotesApp = () => {
    const [note, setNote] = useState('')
    const [notes, setNotes] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('')

    function handleChange(e) {
        setNote(e.target.value)
    }

    function handleAddNote() {
        if (note.trim() === '') return
        setNotes([...notes, note])
        setNote('')
    }

    function handleDeleteNote(index) {
        const newNotes = [...notes]
        newNotes.splice(index, 1)
        setNotes(newNotes)
        if (editIndex === index) {
            setEditIndex(null)
            setEditText('')
        }
    }

    function handleEditNote(index) {
        setEditIndex(index)
        setEditText(notes[index])
    }

    function handleSaveEdit() {
        if (editText.trim() === '') return
        const newNotes = [...notes]
        newNotes[editIndex] = editText
        setNotes(newNotes)
        setEditIndex(null)
        setEditText('')
    }

    function handleCancelEdit() {
        setEditIndex(null)
        setEditText('')
    }

    return (
        <div style={{
            maxWidth: '600px',
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
                Notes Saver
            </h1>

            {/* Add new note */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '30px'
            }}>
                <textarea
                    onChange={handleChange}
                    placeholder='Write your note here...'
                    value={note}
                    rows="3"
                    style={{
                        padding: '12px 15px',
                        border: '2px solid #cccccc',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontFamily: 'Arial, sans-serif',
                        resize: 'vertical',
                        outline: 'none',
                        color: '#1a1a1a'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#666666'}
                    onBlur={(e) => e.target.style.borderColor = '#cccccc'}
                />
                <button
                    onClick={handleAddNote}
                    style={{
                        padding: '12px 25px',
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        alignSelf: 'flex-end'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1a1a1a'}
                >
                    Add Note
                </button>
            </div>

            {/* Notes list */}
            {notes.length === 0 ? (
                <p style={{
                    textAlign: 'center',
                    color: '#999999',
                    padding: '40px 0',
                    fontSize: '16px'
                }}>
                    No notes yet. Write your first note above!
                </p>
            ) : (
                <div>
                    {notes.map((note, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '15px',
                                marginBottom: '12px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '6px',
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            {editIndex === index ? (
                                // EDIT MODE
                                <div>
                                    <textarea
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        autoFocus
                                        rows="2"
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '2px solid #666666',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            fontFamily: 'Arial, sans-serif',
                                            resize: 'vertical',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && e.shiftKey) {
                                                // Allow Shift+Enter for new line
                                            } else if (e.key === 'Enter') {
                                                e.preventDefault()
                                                handleSaveEdit()
                                            }
                                            if (e.key === 'Escape') handleCancelEdit()
                                        }}
                                    />
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        marginTop: '8px',
                                        justifyContent: 'flex-end'
                                    }}>
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
                                </div>
                            ) : (
                                // NORMAL MODE
                                <div>
                                    <div style={{
                                        color: '#1a1a1a',
                                        fontSize: '16px',
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                        marginBottom: '10px'
                                    }}>
                                        {note}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <button
                                            onClick={() => handleEditNote(index)}
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
                                            onClick={() => handleDeleteNote(index)}
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
                        </div>
                    ))}
                </div>
            )}

            {/* Show total notes */}
            {notes.length > 0 && (
                <p style={{
                    textAlign: 'center',
                    color: '#999999',
                    marginTop: '20px',
                    fontSize: '14px',
                    borderTop: '1px solid #e0e0e0',
                    paddingTop: '15px'
                }}>
                    Total: {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                </p>
            )}
        </div>
    )
}

export default NotesApp