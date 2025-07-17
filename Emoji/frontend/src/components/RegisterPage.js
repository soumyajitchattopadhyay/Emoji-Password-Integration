import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const emojiList = [
    '😀', '😂', '😍', '😎', '😜',
    '😇', '😈', '🤔', '🤓', '😴',
    '🙄', '😱', '😡', '🥳', '🤯',
    '🤑', '😭', '😋', '🤪', '😵',
    '🤠', '😷', '🥺', '😢', '😤'
];

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // ✅ Handle emoji selection
    const handleEmojiClick = (emoji) => {
        if (selectedEmojis.includes(emoji)) {
            setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
        } else {
            setSelectedEmojis([...selectedEmojis, emoji]);
        }
    };

    // ✅ Handle registration
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        // ✅ Validation
        if (selectedEmojis.length < 4) {
            setError('Password must contain at least 4 emojis.');
            return;
        }

        // ✅ Save to localStorage
        const newUser = {
            username,
            emoji_password: selectedEmojis.join(''),
        };

        const existingUsers = JSON.parse(localStorage.getItem('emoji_users')) || [];
        const userExists = existingUsers.some(user => user.username === username);

        if (userExists) {
            setError('Username already exists.');
            return;
        }

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('emoji_users', JSON.stringify(updatedUsers));

        setSuccessMessage('Registration successful!');

        // ✅ Redirect to Emoji Login Page after success
        setTimeout(() => navigate('/emoji-login'), 1000);
    };

    return (
        <div style={styles.container}>
            <h2>Register with Emoji Password</h2>
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
                
                {/* ✅ Emoji Display Box */}
                <input
                    type="text"
                    value={selectedEmojis.join('')}
                    readOnly
                    placeholder="Select emojis..."
                    style={styles.emojiDisplay}
                />

                {/* ✅ Emoji Grid */}
                <div style={styles.emojiGrid}>
                    {emojiList.map((emoji) => (
                        <button
                            key={emoji}
                            type="button"
                            onClick={() => handleEmojiClick(emoji)}
                            style={{
                                ...styles.emojiButton,
                                backgroundColor: selectedEmojis.includes(emoji) ? '#4CAF50' : '#eee',
                                border: selectedEmojis.includes(emoji) ? '2px solid #4CAF50' : '2px solid #ddd',
                                transform: selectedEmojis.includes(emoji) ? 'scale(1.1)' : 'scale(1)',
                            }}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>

                {/* ✅ Submit Button */}
                <button type="submit" style={styles.submitButton}>
                    Register
                </button>

                {/* ✅ Error and Success Messages */}
                {error && <p style={styles.error}>{error}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                {/* ✅ Login Link */}
                <p style={styles.registerLink}>
                    Already have an account? 
                    <Link to="/emoji-login" style={styles.link}> Login Here</Link>
                </p>
            </form>
        </div>
    );
}

// ✅ Updated CSS Styling
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '450px',
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
        width: '100%',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        textAlign: 'center',
        marginBottom: '10px',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
    },
    emojiDisplay: {
        padding: '10px',
        width: '100%',
        fontSize: '20px',
        border: '1px solid #6200EE',
        borderRadius: '5px',
        backgroundColor: '#fafafa',
        textAlign: 'center',
        color: '#333',
        marginBottom: '15px',
        letterSpacing: '2px',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
    },
    emojiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 50px)', // ✅ Limit to 5 columns
        gap: '10px',
        marginTop: '10px',
        justifyContent: 'center',
    },
    emojiButton: {
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
