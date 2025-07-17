import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1>Welcome to the Authentication System</h1>
            <div style={styles.buttonContainer}>
                <button 
                    onClick={() => navigate('/emoji-login')} 
                    style={styles.button}
                >
                    Login with Emoji Password
                </button>
                <button 
                    onClick={() => navigate('/number-login')} 
                    style={styles.button}
                >
                    Login with Number Password
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#6200EE',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        outline: 'none',
    },
};
