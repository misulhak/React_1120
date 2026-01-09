import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage'; // 기존에 사용하던 스토리지 유틸 활용
import './ArtistInquiry.css';

// 1. 초기 상태를 컴포넌트 외부로 분리 (메모리 효율 및 초기화 용이)
const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    phone: '',
    genre: '',
    artworkCount: '',
    portfolio: null,
    message: ''
};

function ArtistInquiry() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    // 2. 핸들러 최적화 (useCallback으로 불필요한 재생성 방지)
    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    }, []);

    // 3. 비즈니스 로직 분리: 작가 코드 생성 및 저장
    const registerArtistPending = (data) => {
        const artistCode = `ART-${Math.floor(1000 + Math.random() * 9000)}`;
        const existingArtists = Storage.get('registeredArtists') || [];

        const newArtist = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            genre: data.genre,
            artistCode,
            status: 'pending', // 심사 상태 추가
            createdAt: new Date().toISOString()
        };

        Storage.set('registeredArtists', [...existingArtists, newArtist]);
        return artistCode;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const authCode = registerArtistPending(formData);

            alert(
                `작가 등록 문의가 성공적으로 접수되었습니다!\n\n` +
                `[중요] 작가 인증 코드: ${authCode}\n` +
                `로그인 시 위 코드를 입력해야 작가 권한 접속이 가능합니다.`
            );

            setFormData(INITIAL_FORM_STATE);
            navigate('/login');
        } catch (error) {
            alert('접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="inquiry-container">
            <h2>작가 등록 문의</h2>
            <p className="inquiry-description">
                저희 화랑과 함께할 실력 있는 아티스트를 찾습니다. 양식을 작성해 주시면 검토 후 개별 연락드리겠습니다.
            </p>

            <form onSubmit={handleSubmit} className="inquiry-form">
                {/* 기본 정보 섹션 */}
                <fieldset>
                    <legend>기본 정보</legend>
                    <FormInput label="성함 *" name="name" value={formData.name} onChange={handleChange} required />
                    <FormInput label="이메일 *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <FormInput 
                        label="연락처 *" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="010-xxxx-xxxx" 
                        required 
                    />
                </fieldset>

                {/* 작품 정보 섹션 */}
                <fieldset>
                    <legend>작품 및 활동 정보</legend>
                    <FormInput label="주요 작품 장르 *" name="genre" value={formData.genre} onChange={handleChange} placeholder="예: 회화, 조각 등" required />
                    <FormInput 
                        label="보유 작품 수 *" 
                        name="artworkCount" 
                        type="number" 
                        value={formData.artworkCount} 
                        onChange={handleChange} 
                        min="1" 
                        required 
                    />

                    <div className="form-group file-upload-group">
                        <label>포트폴리오 첨부 (PDF, ZIP, 이미지) *</label>
                        <input type="file" name="portfolio" onChange={handleChange} accept=".pdf,.zip,.jpg,.png" required />
                        {formData.portfolio && <small>선택됨: {formData.portfolio.name}</small>}
                    </div>

                    <div className="form-group">
                        <label>작가 소개 및 희망 사항</label>
                        <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            rows="5" 
                            placeholder="경력, 참여 희망 이유 등을 적어주세요."
                        />
                    </div>
                </fieldset>

                <button type="submit" className="submit-button">문의 내용 제출</button>
            </form>
        </div>
    );
}

const FormInput = ({ label, ...props }) => (
    <div className="form-group">
        <label>{label}</label>
        <input {...props} />
    </div>
);

export default ArtistInquiry;