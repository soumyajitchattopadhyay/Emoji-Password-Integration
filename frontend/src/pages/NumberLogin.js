import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const numberPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function NumberLogin() {
    const [username, setUsername] = useState('');
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // ✅ Handle number pad selection
    const handleNumberClick = (number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };

    // ✅ Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        if (selectedNumbers.length < 4) {
            setError('Password must contain at least 4 digits.');
            return;
        }

        // ✅ Fetch user data from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('number_users')) || [];
        const user = storedUsers.find(user => 
            user.username === username && 
            user.number_password === selectedNumbers.join('')
        );

        if (user) {
            setSuccessMessage('Login successful!');

            // ✅ Save login info to localStorage for session handling
            localStorage.setItem('current_user', JSON.stringify(user));

            // ✅ Redirect to Dashboard after success
            setTimeout(() => navigate('/dashboard'), 1000);
        } else {
            setError('Invalid username or number password.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login with Number Password</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* ✅ Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />

                {/* ✅ Number Display Box */}
                <input
                    type="text"
                    value={selectedNumbers.join('')}
                    readOnly
                    placeholder="Select numbers..."
                    style={styles.numberDisplay}
                />

                {/* ✅ Number Pad */}
                <div style={styles.numberGrid}>
                    {numberPad.map((number) => (
                        <button
                            key={number}
                            type="button"
                            onClick={() => handleNumberClick(number)}
                            style={{
                                ...styles.numberButton,
                                backgroundColor: selectedNumbers.includes(number) ? '#4CAF50' : '#eee',
                                border: selectedNumbers.includes(number) ? '2px solid #4CAF50' : '2px solid #ddd',
                                transform: selectedNumbers.includes(number) ? 'scale(1.1)' : 'scale(1)',
                            }}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                {/* ✅ Centered '0' under 8 */}
                <div style={styles.centeredZero}>
                    <button
                        type="button"
                        onClick={() => handleNumberClick('0')}
                        style={{
                            ...styles.numberButton,
                            backgroundColor: selectedNumbers.includes('0') ? '#4CAF50' : '#eee',
                            border: selectedNumbers.includes('0') ? '2px solid #4CAF50' : '2px solid #ddd',
                            transform: selectedNumbers.includes('0') ? 'scale(1.1)' : 'scale(1)',
                        }}
                    >
                        0
                    </button>
                </div>

                {/* ✅ Submit Button */}
                <button type="submit" style={styles.submitButton}>
                    Login
                </button>

                {/* ✅ Error and Success Messages */}
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                {/* ✅ Register Link */}
                <p style={styles.registerLink}>
                    Don't have an account? 
                    <Link to="/number-register" style={styles.link}> Register Here</Link>
                </p>
            </form>
        </div>
    );
}

// ✅ CSS Styling
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    input: {
        padding: '10px',
        width: '250px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        textAlign: 'center',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
    },
    numberDisplay: {
        padding: '10px',
        width: '250px',
        fontSize: '20px',
        border: '1px solid #6200EE',
        borderRadius: '5px',
        backgroundColor: '#fafafa',
        outline: 'none',
        textAlign: 'center',
        color: '#333',
        marginTop: '10px',
        letterSpacing: '2px',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
    },
    numberGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 50px)',
        gap: '10px',
        marginTop: '10px',
    },
    centeredZero: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
    },
    numberButton: {
        fontSize: '24px',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-in-out',
        outline: 'none',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        width: '50px',
        height: '50px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#6200EE',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: '#d32f2f',
        fontSize: '14px',
        marginTop: '10px',
    },
    success: {
        color: '#4CAF50',
        fontSize: '14px',
        marginTop: '10px',
    },
    registerLink: {
        marginTop: '15px',
        fontSize: '14px',
    },
    link: {
        color: '#6200EE',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
    },
};

