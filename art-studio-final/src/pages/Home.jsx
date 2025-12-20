import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import homeImg from '../images/home.jpg';

function Home() {
    return (
        <div className="home-container">

            {/* 1. Hero Section (메인 비주얼) */}
            <section className="hero-section">
                <div className="hero-background">
                    <img
                        src={homeImg}
                        alt="갤러리 메인 이미지"
                        className="hero-image"
                    />
                </div>
                
                <div className="hero-content">
                    <h1>전자 미술관</h1>
                    <p>예술과 영감이 만나는 공간에 오신 걸 환영합니다.</p>
                    
                    {/* ✅ 버튼들을 가로로 나열하기 위한 그룹 박스 추가 */}
                    <div className="hero-action-group">
                        <Link to="/gallery" className="cta-button">
                            작품 보기
                        </Link>
                        <Link to="/login" className="login-cta-button">
                            로그인
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. About/Vision Section */}
            <section className="vision-section">
                <h2>우리의 비전</h2>
                <div className="vision-grid">
                    <div className="vision-card">
                        <h3>창작의 자유</h3>
                        <p>다양한 장르와 배경을 가진 아티스트들이 자유롭게 작품 세계를 펼치도록 지원합니다.</p>
                    </div>
                    <div className="vision-card">
                        <h3>예술과의 연결</h3>
                        <p>관람객과 작품 사이의 깊은 소통을 유도하며, 일상 속에 예술을 들여놓는 기회를 제공합니다.</p>
                    </div>
                    <div className="vision-card">
                        <h3>지속 가능한 성장</h3>
                        <p>신진 작가 발굴과 후원을 통해 한국 미술계의 건강하고 지속적인 성장에 기여합니다.</p>
                    </div>
                </div>
                <Link to="/inquiry" className="secondary-cta">
                    작가 등록 문의 바로가기 →
                </Link>
            </section>

            {/* 3. Footer */}
            <footer className="home-footer">
                <p>&copy; 2024 아트 스튜디오 갤러리. All rights reserved.</p>
            </footer>

        </div>
    );
}

export default Home;