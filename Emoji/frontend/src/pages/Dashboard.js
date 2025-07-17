import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Mock user data for demo (Replace with API call if needed)
        const mockUserData = {
            username: localStorage.getItem('username') || 'demo',
            password: localStorage.getItem('password') || null,
            emoji_password: localStorage.getItem('emojiPassword') || null,
        };

        if (!mockUserData.username) {
            setError('Failed to load user data');
        } else {
            setUser(mockUserData);
        }
    }, []);

    // ✅ Handle logout
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('emojiPassword');
        navigate('/'); // Redirect to landing page after logout
    };

    return (
        <div style={styles.container}>
            <h2>Welcome to the Dashboard!</h2>

            {/* ✅ Error Handling */}
            {error && <p style={styles.error}>{error}</p>}

            {/* ✅ Display User Info */}
            {user ? (
                <div style={styles.userInfo}>
                    <p><strong>Username:</strong> {user.username}</p>
                    {user.emoji_password ? (
                        <p><strong>Emoji Password:</strong> {user.emoji_password}</p>
                    ) : (
                        <p><strong>Number Password:</strong> {user.password}</p>
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            {/* ✅ Logout Button */}
            <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
            </button>
        </div>
    );
}

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
    userInfo: {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        display: 'inline-block',
        textAlign: 'left',
        width: '100%',
    },
    error: {
        color: '#d32f2f',
        fontSize: '14px',
        marginTop: '10px',
    },
    logoutButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#ff5252',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    }
};
