import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const numberList = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0'
];

export default function RegisterNumberPage() {
    const [username, setUsername] = useState('');
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Handle number selection
    const handleNumberClick = (number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter(n => n !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        if (selectedNumbers.length < 4) {
            setError('Password must contain at least 4 numbers.');
            return;
        }

        try {
            // Save data to localStorage
            const newUser = {
                username,
                number_password: selectedNumbers.join(''),
            };

            // Get existing users from localStorage
            const existingUsers = JSON.parse(localStorage.getItem('number_users')) || [];

            // Check if username already exists
            if (existingUsers.find(user => user.username === username)) {
                setError('Username already exists. Please use a different username.');
                return;
            }

            // Add new user to the list and save in localStorage
            existingUsers.push(newUser);
            localStorage.setItem('number_users', JSON.stringify(existingUsers));

            setSuccessMessage('Registration successful! Redirecting to login...');

            setTimeout(() => navigate('/number-login'), 1500);
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register with Number Password</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />

                {/* Number Display */}
                <input
                    type="text"
                    value={selectedNumbers.join('')}
                    readOnly
                    placeholder="Select numbers..."
                    style={styles.numberDisplay}
                />

                {/* Number Grid */}
                <div style={styles.numberGrid}>
                    {numberList.map((number, index) => (
                        <button
                            key={index}
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

                {/* Submit Button */}
                <button type="submit" style={styles.submitButton}>
                    Register
                </button>

                {/* Error and Success Messages */}
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                {/* Login Link */}
                <p style={styles.link}>
                    Already have an account? 
                    <Link to="/number-login" style={styles.linkText}> Login Here</Link>
                </p>
            </form>
        </div>
    );
}

// ✅ Styling
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '30px',
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
        textAlign: 'center',
        outline: 'none',
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
        marginTop: '10px',
        letterSpacing: '2px',
    },
    numberGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 60px)',
        gap: '10px',
        marginTop: '10px',
    },
    numberButton: {
        fontSize: '24px',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-in-out',
        outline: 'none',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
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
    link: {
        fontSize: '14px',
        marginTop: '15px',
    },
    linkText: {
        color: '#6200EE',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
    }
};
