import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage'; // ✅ 공통 헬퍼 임포트
import './Header.css';

function Header() {
    const navigate = useNavigate();
    
    // 1. 로그인 유저 상태 관리
    const [user, setUser] = useState(() => Storage.getCurrentUser());
    const isLoggedIn = !!user; // 유저 객체가 있으면 true
    const isArtist = user?.role === 'artist';

    // 2. 다른 탭이나 컴포넌트에서 발생하는 로그인/로그아웃 감지
    useEffect(() => {
        const syncAuth = () => {
            setUser(Storage.getCurrentUser());
        };
        window.addEventListener('storage', syncAuth);
        return () => window.removeEventListener('storage', syncAuth);
    }, []);

    // 3. 로그아웃 로직
    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('currentUser'); // 현재 유저 삭제
            window.dispatchEvent(new Event('storage')); // 전역 상태 알림
            setUser(null);
            alert('로그아웃 되었습니다.');
            navigate('/'); // 메인으로 리다이렉트
        }
    };

    return (
        <header className="main-header horizontal-header">
            <div className="header-content">
                {/* [로고] */}
                <Link to="/" className="logo">전자 미술관</Link>

                {/* [네비게이션] */}
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/gallery">작품 갤러리</Link></li>
                        <li><Link to="/auction">경매</Link></li>
                        
                        {/* 🎨 작가 전용: 작품 등록 (작가일 때만 노출) */}
                        {isArtist && (
                            <li><Link to="/upload" className="upload-link">작품 등록</Link></li>
                        )}

                        <li><Link to="/contact">문의하기</Link></li>
                        
                        {/* ✉️ 작가가 아닐 때만 노출: 등록 문의 */}
                        {!isArtist && (
                            <li><Link to="/inquiry" className="inquiry-link">작가 등록 문의</Link></li>
                        )}

                        {/* 👤 마이페이지/대시보드 (로그인 시 노출) */}
                        {isLoggedIn && (
                            <li>
                                <Link to={isArtist ? "/dashboard" : "/mypage"} className="mypage-link">
                                    {isArtist ? '작가 대시보드' : '마이페이지'}
                                </Link>
                            </li>
                        )}

                        {/* 🔑 로그인/로그아웃 버튼 */}
                        <li className="login-item">
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="login-button logout-btn">
                                    로그아웃
                                </button>
                            ) : (
                                <Link to="/login" className="login-button">로그인</Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;