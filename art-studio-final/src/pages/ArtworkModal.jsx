import React from 'react';
import './Gallery.css';

function ArtworkModal({ artwork, closeModal, handlePurchase }) {
    if (!artwork) return null;

    const isSoldOut = artwork.status === '판매 완료';

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content artwork-detail-modal" onClick={e => e.stopPropagation()}>

                <button className="modal-close-btn" onClick={closeModal} aria-label="닫기">&times;</button>

                <div className="modal-image-container">
                    {isSoldOut && <div className="sold-out-badge">SOLD OUT</div>}
                    <img
                        src={artwork.imageUrl || artwork.image}
                        alt={artwork.title}
                        className="modal-image"
                    />
                </div>

                {/* 작품 정보 섹션 */}
                <div className="modal-info">
                    <h2 className="modal-title">{artwork.title}</h2>
                    <div className="modal-meta">
                        <div className="info-item">
                            <span className="info-label">작가</span>
                            <span className="info-value">{artwork.artist || artwork.artistName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">제작 연도</span>
                            <span className="info-value">{artwork.year || '2024'}년</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">가격</span>
                            <span className="info-value price">
                                {Number(artwork.price).toLocaleString()}원
                            </span>
                        </div>
                    </div>

                    <div className="artwork-description-box">
                        <span className="desc-label">작품 설명</span>
                        <p className="desc-text">
                            {artwork.description || "등록된 상세 설명이 없습니다."}
                        </p>
                    </div>

                    <button
                        className={`purchase-btn ${isSoldOut ? 'sold-out' : ''}`}
                        onClick={() => !isSoldOut && handlePurchase(artwork)}
                        disabled={isSoldOut}
                    >
                        {isSoldOut ? '판매 완료된 작품입니다' : '소장하기'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArtworkModal;