import React, { useState } from 'react';

function AuctionDetailModal({ auction, closeModal, setAuctions }) {
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');

    const handleBid = (e) => {
        e.preventDefault();
        const amount = parseInt(bidAmount);

        // 현재 입찰가보다 높은지 확인
        if (!amount || amount <= auction.currentBid) {
            setError(`현재가보다 높은 금액을 입력해주세요.`);
            return;
        }

        // 입찰 업데이트 로직
        setAuctions(prev => prev.map(item => 
            item.id === auction.id ? { ...item, currentBid: amount } : item
        ));
        
        alert(`${amount.toLocaleString()}원으로 입찰되었습니다!`);
        closeModal();
    };

    return (
        <div className="auction-modal-backdrop" onClick={closeModal}>
            <div className="auction-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                
                <div className="modal-body">
                    {/* 📸 좌측: 이미지 섹션 */}
                    <div className="image-section">
                        <img 
                            src={auction.imageUrl} 
                            alt={auction.title} 
                            className="detail-image" 
                        />
                    </div>

                    {/* 📝 우측: 상세 정보 섹션 */}
                    <div className="auction-details">
                        <h2>{auction.title}</h2>
                        <p className="artist-name">{auction.artist} 작가</p>
                        <hr className="modal-divider" />
                        
                        <div className="current-bid-info">
                            <span className="label">현재 입찰가</span>
                            <span className="current-price">{auction.currentBid.toLocaleString()}원</span>
                        </div>
                        
                        <form className="bid-form" onSubmit={handleBid}>
                            <label>입찰 금액 입력</label>
                            <input 
                                type="number" 
                                placeholder="금액을 입력하세요"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                            />
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="place-bid-btn">입찰하기</button>
                        </form>
                        <p className="min-bid-info">* 입찰 후에는 취소가 불가능합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetailModal;