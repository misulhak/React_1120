import React from 'react';
import './Gallery.css';

function ArtworkModal({ artwork, closeModal, handlePurchase }) {
    // 1. 방어 코드: 데이터가 없으면 렌더링하지 않음
    if (!artwork) return null;

    // ✅ 판매 완료 여부 확인 변수
    const isSoldOut = artwork.status === '판매 완료';

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content artwork-detail-modal" onClick={e => e.stopPropagation()}>
                
                {/* 닫기 버튼 */}
                <button className="modal-close-btn" onClick={closeModal} aria-label="닫기">&times;</button>

                {/* 작품 이미지 섹션 */}
                <div className="modal-image-container">
                    {/* ✅ 판매 완료 시 이미지 위에 배지나 흐림 효과를 주고 싶을 때 활용 가능 */}
                    {isSoldOut && <div className="sold-out-badge">SOLD OUT</div>}
                    <img src={artwork.imageUrl || artwork.image} alt={artwork.title} className="modal-image" />
                </div>

                {/* 작품 정보 섹션 */}
                <div className="modal-info">
                    <h2 className="modal-title">{artwork.title}</h2>
                    
                    <div className="modal-meta">
                        <p><strong>작가</strong> {artwork.artist || artwork.artistName}</p>
                        <p><strong>제작 연도</strong> {artwork.year || '2024'}년</p>
                    </div>

                    <p className="artwork-price">
                        {Number(artwork.price).toLocaleString()}원
                    </p>

                    {/* 작품 설명 영역 */}
                    <div className="artwork-description-box">
                        <span className="desc-label">작품 설명</span>
                        <p className="desc-text">
                            {artwork.description || "등록된 상세 설명이 없습니다."}
                        </p>
                    </div>

                    {/* ✅ 판매 상태에 따른 버튼 조건부 렌더링 */}
                    <button
                        className={`purchase-btn ${isSoldOut ? 'sold-out' : ''}`}
                        onClick={() => !isSoldOut && handlePurchase(artwork)}
                        disabled={isSoldOut} // HTML 속성으로 버튼 비활성화
                    >
                        {isSoldOut ? '판매 완료된 작품입니다' : '소장하기'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArtworkModal;