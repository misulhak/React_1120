import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        if (password.length < 8) {
            setError('비밀번호는 8자 이상이어야 합니다.');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

        if (existingUsers.some(user => user.email === email)) {
            setError('이미 가입된 이메일입니다.');
            return;
        }

        const newUser = { name, email, password, role: 'user' };
        localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

        alert(`${name}님, 회원가입이 완료되었습니다!`);
        navigate('/login');
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h2>일반 회원가입</h2>
                <p className="signup-desc">전자 미술관의 회원이 되어 다양한 작품을 감상하세요.</p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <label>이름</label>
                        <input name="name" type="text" placeholder="성함을 입력하세요" required />
                    </div>

                    <div className="input-group">
                        <label>이메일</label>
                        <input name="email" type="email" placeholder="example@mail.com" required />
                    </div>

                    <div className="input-group">
                        <label>비밀번호</label>
                        <input name="password" type="password" placeholder="8자 이상 입력하세요" required />
                    </div>

                    <button type="submit" className="submit-btn">가입하기</button>
                </form>

                <div className="signup-footer">
                    <p>이미 계정이 있으신가요?
                        <span className="link-text" onClick={() => navigate('/login')}> 로그인</span>
                    </p>
                    <hr />
                    <p className="artist-guide">
                        작품을 등록하고 싶으신가요?
                        <span className="link-text" onClick={() => navigate('/inquiry')}> 작가 신청하기</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;