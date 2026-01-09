import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';
import './Login.css';

function Login({ onLogin }) {
    const [userType, setUserType] = useState('user');
    const [error, setError] = useState('');
    const [artistDigit, setArtistDigit] = useState('');
    const navigate = useNavigate();

    const handleArtistCodeChange = (e) => {
        const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
        setArtistDigit(onlyNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const phone = formData.get('phone');

        const artistCode = `ART-${artistDigit}`;

        if (userType === 'artist') {
            const registeredArtists = Storage.get('registeredArtists');
            const isArtistValid = registeredArtists.find(
                (artist) =>
                    artist.email === email &&
                    artist.phone === phone &&
                    artist.artistCode === artistCode
            );

            if (isArtistValid) {
                Storage.set('currentUser', { ...isArtistValid, role: 'artist' });
                if (onLogin) onLogin();
                navigate('/gallery');
            } else {
                setError('작가 정보가 일치하지 않습니다.');
            }
        } else {
            const allUsers = Storage.get('users');
            const foundUser = allUsers.find(u => u.email === email && u.password === password);

            if (foundUser) {
                Storage.set('currentUser', { ...foundUser, role: 'user' });
                if (onLogin) onLogin();
                navigate('/gallery');
            } else {
                setError('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
        }
    };

    const handleTabChange = (type) => {
        setUserType(type);
        setError('');
        setArtistDigit('');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>전자 미술관 로그인</h2>

                <div className="auth-tabs">
                    <button
                        type="button"
                        className={userType === 'user' ? 'active' : ''}
                        onClick={() => handleTabChange('user')}
                    >
                        일반 사용자
                    </button>
                    <button
                        type="button"
                        className={userType === 'artist' ? 'active' : ''}
                        onClick={() => handleTabChange('artist')}
                    >
                        작가
                    </button>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <label>이메일 주소</label>
                        <input name="email" type="email" placeholder="example@mail.com" required />
                    </div>

                    {userType === 'user' ? (
                        <div className="input-group">
                            <label>비밀번호</label>
                            <input name="password" type="password" placeholder="비밀번호를 입력하세요" required />
                        </div>
                    ) : (
                        <div className="input-group">
                            <label>등록된 연락처</label>
                            <input name="phone" type="tel" placeholder="010-xxxx-xxxx" required />
                        </div>
                    )}

                    {userType === 'artist' && (
                        <div className="input-group">
                            <label>작가 인증 코드</label>
                            <div className="artist-code-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '12px', color: '#555', fontWeight: 'bold' }}>
                                    ART-
                                </span>
                                <input
                                    type="text"
                                    placeholder="숫자만 입력"
                                    value={artistDigit}
                                    onChange={handleArtistCodeChange}
                                    style={{ paddingLeft: '55px' }}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="submit-btn">
                        {userType === 'user' ? '사용자 로그인' : '작가 로그인'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>계정이 없으신가요? <span className="link-text" onClick={() => navigate('/signup')}>회원가입</span></p>

                    {userType === 'artist' && (
                        <div className="artist-info" style={{ marginTop: '15px' }}>
                            <p>아직 정식 작가가 아니신가요?</p>
                            <span className="link-text" onClick={() => navigate('/inquiry')}>작가 등록 문의하기</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;