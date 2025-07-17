import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const numberPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function NumberRegister() {
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

        if (username.trim() === '') {
            setError('Username is required.');
            return;
        }

        if (selectedNumbers.length < 4) {
            setError('Password must contain at least 4 digits.');
            return;
        }

        // ✅ Save user data to localStorage
        const newUser = {
            username,
            number_password: selectedNumbers.join(''),
        };

        const existingUsers = JSON.parse(localStorage.getItem('number_users')) || [];
        const userExists = existingUsers.some(user => user.username === username);

        if (userExists) {
            setError('Username already exists.');
            return;
        }

        // ✅ Save new user to localStorage
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('number_users', JSON.stringify(updatedUsers));

        setSuccessMessage('Registration successful!');

        // ✅ Redirect to login after success
        setTimeout(() => navigate('/number-login'), 1000);
    };

    return (
        <div style={styles.container}>
            <h2>Register with Number Password</h2>
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
                    Register
                </button>

                {/* ✅ Error and Success Messages */}
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                {/* ✅ Redirect to Login */}
                <p style={styles.registerLink}>
                    Already have an account? 
                    <Link to="/number-login" style={styles.link}> Login Here</Link>
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
    },
    numberDisplay: {
        padding: '10px',
        width: '250px',
        fontSize: '20px',
        border: '1px solid #6200EE',
        borderRadius: '5px',
        backgroundColor: '#fafafa',
        textAlign: 'center',
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
