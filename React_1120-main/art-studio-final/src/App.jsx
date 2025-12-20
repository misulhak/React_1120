import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ArtistInquiry from './pages/ArtistInquiry.jsx';
import AuctionPage from './pages/AuctionPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ArtistUpload from './pages/ArtistUpload.jsx';
import ArtistDashboard from './pages/ArtistDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import './App.css';

const Layout = ({ isLoggedIn, onLogout }) => {
    return (
        <div className="layout-container">
            <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main className="main-content">
                <div className="content-wrapper">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('currentUser') !== null;
    });

    // 1. 로그인 로직
    const handleLogin = () => setIsLoggedIn(true);

    // 2. 로그아웃 로직 (window.location.href 대신 navigate 권장하지만, 현재 구조 유지)
    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem('currentUser');
            setIsLoggedIn(false);
            window.location.href = '/Gallery/gallery'; 
        }
    };

    // 3. ✅ 마이페이지/대시보드 통합 관리 컴포넌트
    const MyPageRoute = () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return <Navigate to="/login" replace />;
        return user.role === 'artist' ? <ArtistDashboard /> : <UserDashboard />;
    };

    return (
        <Router basename="/Gallery">
            <Routes>
                {/* 메인 홈 */}
                <Route path="/" element={<Home />} />

                {/* 레이아웃 적용 구간 */}
                <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/auction" element={<AuctionPage />} />
                    <Route path="/inquiry" element={<ArtistInquiry />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/upload" element={<ArtistUpload />} />

                    {/* ✅ [해결] Header.jsx에서 /dashboard와 /mypage 모두를 사용하므로 두 경로 모두 등록 */}
                    <Route path="/mypage" element={<MyPageRoute />} />
                    <Route path="/dashboard" element={<MyPageRoute />} /> 
                </Route>
            </Routes>
        </Router>
    );
}

export default App;