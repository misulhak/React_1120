import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtistInquiry.css';

function ArtistInquiry() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        genre: '',
        artworkCount: '',
        portfolio: null,
        message: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'portfolio') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. 랜덤 작가 인증 코드 생성 (예: ART-7239)
        const randomCode = 'ART-' + Math.floor(1000 + Math.random() * 9000);

        // 2. 가상의 DB(localStorage)에 작가 정보 저장
        // 기존에 저장된 작가 목록을 가져옵니다.
        const existingArtists = JSON.parse(localStorage.getItem('registeredArtists') || '[]');

        // 새 작가 객체 생성
        const newArtist = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            artistCode: randomCode, // 생성된 코드 저장
            genre: formData.genre
        };

        // 목록에 추가 후 다시 저장
        localStorage.setItem('registeredArtists', JSON.stringify([...existingArtists, newArtist]));

        // 3. 사용자에게 코드 안내
        console.log("문의 양식 및 코드 생성됨:", newArtist);
        alert(
            `작가 등록 문의가 성공적으로 접수되었습니다!\n\n` +
            `[중요] 작가 인증 코드: ${randomCode}\n` +
            `로그인 시 위 코드를 입력해야 작가 권한으로 접속이 가능합니다.`
        );

        // 폼 초기화
        setFormData({
            name: '',
            email: '',
            phone: '',
            genre: '',
            artworkCount: '',
            portfolio: null,
            message: ''
        });
        navigate('/login');
    };

    return (
        <div className="inquiry-container">
            <h2>작가 등록 문의</h2>
            <p className="inquiry-description">
                저희 갤러리와 함께할 실력 있는 아티스트를 찾습니다. 아래 양식을 작성해 주시면 검토 후 개별적으로 연락드리겠습니다.
            </p>

            <form onSubmit={handleSubmit} className="inquiry-form">
                <fieldset>
                    <legend>기본 정보</legend>
                    <div className="form-group">
                        <label>성함 *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>이메일 *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>연락처 *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="010-xxxx-xxxx" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>작품 및 활동 정보</legend>
                    <div className="form-group">
                        <label htmlFor="genre">주요 작품 장르 *</label>
                        <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required placeholder="예: 유화, 조각, 디지털 아트 등" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="artworkCount">보유 작품 수 (대략) *</label>
                        <input type="number" id="artworkCount" name="artworkCount" value={formData.artworkCount} onChange={handleChange} required min="1" />
                    </div>

                    <div className="form-group file-upload-group">
                        <label htmlFor="portfolio">포트폴리오 / 작품 이미지 첨부 (PDF, ZIP 등) *</label>
                        <input type="file" id="portfolio" name="portfolio" onChange={handleChange} required accept=".pdf,.zip,.jpg,.png" />
                        {formData.portfolio && <small>선택된 파일: {formData.portfolio.name}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">작가 소개 및 희망 사항</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="작가님의 활동 경력, 갤러리 참여 희망 이유 등을 간략히 적어주세요."></textarea>
                    </div>
                </fieldset>

                <button type="submit" className="submit-button">문의 내용 제출</button>
            </form>
        </div>
    );
}

export default ArtistInquiry;