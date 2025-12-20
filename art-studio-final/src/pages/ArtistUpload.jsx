import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';
import './ArtistUpload.css';

function ArtistUpload() {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageBase64, setImageBase64] = useState(""); 
    const user = Storage.getCurrentUser();

    // 1. 보안 및 권한 체크 (useEffect 하나로 관리)
    useEffect(() => {
        if (!user || user.role !== 'artist') {
            alert('작가 권한이 필요한 페이지입니다.');
            navigate('/');
        }
    }, [user, navigate]);

    // 2. 메모리 관리 (미리보기 URL 해제)
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // 3. 파일 처리 로직 (Base64 변환 도우미)
    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 미리보기 생성
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(file));

        // 저장을 위한 변환
        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        reader.readAsDataURL(file);
    }, [previewUrl]);

    // 4. 제출 로직
    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);

        const newArtwork = {
            id: Date.now(),
            title: fd.get('title'),
            category: fd.get('category'),
            artistName: user.name,
            price: Number(fd.get('price')),
            description: fd.get('description'),
            image: imageBase64,
            date: new Date().toLocaleDateString(),
            views: 0,
            status: "전시 중"
        };

        const existingItems = Storage.get('galleryItems') || [];
        Storage.set('galleryItems', [newArtwork, ...existingItems]);

        alert('작품이 성공적으로 등록되었습니다!');
        navigate('/gallery');
    };

    if (!user || user.role !== 'artist') return null;

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>새 작품 등록</h2>
                <p className="upload-desc">작가님의 소중한 작품을 갤러리에 소개해보세요.</p>

                <form onSubmit={handleSubmit} className="upload-form">
                    {/* 왼쪽: 이미지 섹션 */}
                    <div className="image-upload-section">
                        <div className={`image-preview ${!previewUrl ? 'empty' : ''}`}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="미리보기" />
                            ) : (
                                <span>작품 이미지를 선택해주세요</span>
                            )}
                        </div>
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            required 
                            id="file-input"
                        />
                        <label htmlFor="file-input" className="file-label">이미지 찾기</label>
                    </div>

                    {/* 오른쪽: 정보 입력 섹션 */}
                    <div className="form-fields">
                        <FormGroup label="작품명 *">
                            <input name="title" type="text" placeholder="제목을 입력하세요" required />
                        </FormGroup>

                        <div className="input-row">
                            <FormGroup label="카테고리">
                                <select name="category">
                                    <option value="painting">회화</option>
                                    <option value="sculpture">조각</option>
                                    <option value="digital">디지털 아트</option>
                                    <option value="photo">사진</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="희망 판매가 (₩)">
                                <input name="price" type="number" placeholder="가격 입력" required />
                            </FormGroup>
                        </div>

                        <FormGroup label="작품 설명">
                            <textarea 
                                name="description" 
                                rows="5" 
                                placeholder="작품의 의미를 설명해주세요"
                            />
                        </FormGroup>

                        <button type="submit" className="upload-btn">작품 등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// 가독성을 위한 내부 컴포넌트 분리
const FormGroup = ({ label, children }) => (
    <div className="input-group">
        <label>{label}</label>
        {children}
    </div>
);

export default ArtistUpload;