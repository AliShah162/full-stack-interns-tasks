import { useState } from 'react'

const ExpenseTracker = () => {
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [expenses, setExpenses] = useState([])

    
    //handle to add
    function handleAdd() {
        if (description === '' || amount === '') return

        setExpenses([...expenses, {
            description: description,
            amount: Number(amount)
        }])
        setDescription('')
        setAmount('')
    }


    //handle to delete
    function handleDelete(index) {
        const newExpenses = [...expenses]
        newExpenses.splice(index, 1)
        setExpenses(newExpenses)
    }
    //calculations for total, help from ai
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    return (
        <div style={{
            maxWidth: '500px',
            margin: '50px auto',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                color: '#1a3a5c',
                textAlign: 'center',
                fontSize: '28px',
                marginBottom: '25px'
            }}>
                 Expense Tracker
            </h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '25px'
            }}>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        padding: '10px 14px',
                        border: '2px solid #d0e0f0',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4a90d9'}
                    onBlur={(e) => e.target.style.borderColor = '#d0e0f0'}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px 14px',
                            border: '2px solid #d0e0f0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4a90d9'}
                        onBlur={(e) => e.target.style.borderColor = '#d0e0f0'}
                    />

                    <button
                        onClick={handleAdd}
                        style={{
                            padding: '10px 25px',
                            backgroundColor: '#4a90d9',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#3a7bc8'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4a90d9'}
                    >
                        Add
                    </button>
                </div>
            </div>

            {expenses.length === 0 ? (
                <p style={{
                    textAlign: 'center',
                    color: '#7a9bb5',
                    padding: '30px 0',
                    fontSize: '16px'
                }}>
                    No expenses yet. Add one above!
                </p>
            ) : (
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                }}>
                    {expenses.map((expense, index) => (
                        <li key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 15px',
                            marginBottom: '8px',
                            backgroundColor: '#f0f6fe',
                            borderRadius: '8px',
                            border: '1px solid #d0e0f0'
                        }}>
                            <span style={{
                                color: '#1a3a5c',
                                fontSize: '16px'
                            }}>
                                {expense.description}
                                <span style={{
                                    marginLeft: '12px',
                                    color: '#4a90d9',
                                    fontWeight: 'bold'
                                }}>
                                    - PKR {expense.amount}
                                </span>
                            </span>

                            <button
                                onClick={() => handleDelete(index)}
                                style={{
                                    padding: '5px 14px',
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {expenses.length > 0 && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#4a90d9',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <span style={{ fontSize: '14px', opacity: 0.9 }}>
                        Total Expenses:
                    </span>
                    <span style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        marginLeft: '10px'
                    }}>
                        PKR {total}
                    </span>
                </div>
            )}
        </div>
    )
}

export default ExpenseTracker

