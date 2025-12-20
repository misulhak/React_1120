import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage'; // ✅ 만들어둔 storage 헬퍼 임포트
import './ArtistUpload.css';

function ArtistUpload() {
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageBase64, setImageBase64] = useState(""); 
    
    // ✅ 1. 현재 유저 정보 가져오기
    const user = Storage.getCurrentUser();

    // ✅ 2. 보안 로직: 로그인 정보가 없거나 작가가 아니면 메인으로 이동
    useEffect(() => {
        if (!user || user.role !== 'artist') {
            alert('작가 권한이 필요한 페이지입니다. 로그인 후 이용해주세요.');
            navigate('/');
        }
    }, [user, navigate]);

    // 메모리 누수 방지: 컴포넌트 언마운트 시 미리보기 URL 해제
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // ✅ 3. 권한이 없으면 아래 HTML을 렌더링하지 않고 중단 (깜빡임 방지)
    if (!user || user.role !== 'artist') return null;

    const handleChange = (e) => {
        const { name, files } = e.target;
        
        if (name === 'image') {
            const file = files[0];
            if (file) {
                // 이전 URL 메모리 해제 후 새 URL 생성
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(URL.createObjectURL(file));

                // 저장을 위한 Base64 변환
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageBase64(reader.result); 
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // ✅ FormData를 사용하여 코드를 더 간결하게 관리
        const fd = new FormData(e.target);
        
        // 4. 저장할 새로운 작품 객체 생성
        const newArtwork = {
            id: Date.now(),
            title: fd.get('title'),
            category: fd.get('category'),
            artistName: user.name,             // 현재 로그인한 작가 이름
            price: Number(fd.get('price')),    // 숫자로 변환
            description: fd.get('description'),
            image: imageBase64,                // 변환된 데이터
            date: new Date().toLocaleDateString(),
            views: 0,
            status: "전시 중"                   // ✅ 상태 통일
        };

        // ✅ 5. Storage 헬퍼를 사용하여 저장
        const existingItems = Storage.get('galleryItems');
        Storage.set('galleryItems', [newArtwork, ...existingItems]);

        alert('작품이 성공적으로 등록되었습니다!');
        navigate('/gallery');
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>새 작품 등록</h2>
                <p className="upload-desc">작가님의 소중한 작품을 갤러리에 소개해보세요.</p>

                <form onSubmit={handleSubmit} className="upload-form">
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
                            onChange={handleChange} 
                            required 
                            id="file-input"
                        />
                        <label htmlFor="file-input" className="file-label">이미지 찾기</label>
                    </div>

                    <div className="form-fields">
                        <div className="input-group">
                            <label>작품명 *</label>
                            <input 
                                name="title" 
                                type="text" 
                                placeholder="작품의 제목을 입력하세요" 
                                required 
                            />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label>카테고리</label>
                                <select name="category">
                                    <option value="painting">회화</option>
                                    <option value="sculpture">조각</option>
                                    <option value="digital">디지털 아트</option>
                                    <option value="photo">사진</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>희망 판매가 (₩)</label>
                                <input 
                                    name="price" 
                                    type="number" 
                                    placeholder="가격을 입력하세요" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>작품 설명</label>
                            <textarea 
                                name="description" 
                                rows="5" 
                                placeholder="작품에 담긴 의미나 설명을 작성해주세요" 
                            ></textarea>
                        </div>

                        <button type="submit" className="upload-btn">작품 등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ArtistUpload;