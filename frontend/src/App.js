import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'; // Emoji Login
import RegisterPage from './components/RegisterPage'; // Emoji Register
import NumberLogin from './pages/NumberLogin';
import NumberRegister from './components/NumberRegister';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                {/* ✅ Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* ✅ Emoji Password Routes */}
                <Route path="/emoji-login" element={<LoginPage />} />
                <Route path="/emoji-register" element={<RegisterPage />} />

                {/* ✅ Number Password Routes */}
                <Route path="/number-login" element={<NumberLogin />} />
                <Route path="/number-register" element={<NumberRegister />} />

                {/* ✅ Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
