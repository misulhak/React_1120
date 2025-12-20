import React, { useState } from 'react';
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

    const handleLogin = () => setIsLoggedIn(true);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem('currentUser');
            setIsLoggedIn(false);
            // 리다이렉션 시 가장 안전한 방법은 Router 내의 기능을 쓰거나 홈으로 보내는 것입니다.
            window.location.href = import.meta.env.BASE_URL; 
        }
    };

    const MyPageRoute = () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // 배포 환경에서는 /login 앞에 슬래시가 붙어야 정확히 루트 기준 이동이 됩니다.
        if (!user) return <Navigate to="/login" replace />;
        return user.role === 'artist' ? <ArtistDashboard /> : <UserDashboard />;
    };

    return (
        /* 핵심: basename 설정으로 깃허브 페이지의 서브 경로(/art-studio-final/)를 인식하게 함 */
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                {/* 1. 홈 화면 (배포 주소의 메인) */}
                <Route path="/" element={<Home />} />
                
                {/* 2. 레이아웃이 적용되는 서브 페이지들 */}
                <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/auction" element={<AuctionPage />} />
                    <Route path="/inquiry" element={<ArtistInquiry />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/upload" element={<ArtistUpload />} />
                    <Route path="/mypage" element={<MyPageRoute />} />
                    <Route path="/dashboard" element={<MyPageRoute />} /> 
                </Route>
                
                {/* 3. 잘못된 경로로 접근 시 홈으로 리다이렉트 (404 방지용) */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;