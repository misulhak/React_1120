import React, { useState } from 'react';

function AuctionDetailModal({ auction, closeModal, setAuctions }) {
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const BID_UNIT = 10000; // 자동 추가 단위 (1만 원)

    // ✅ 공통 입찰 실행 함수
    const executeBid = (finalAmount) => {
        // 1. 유효성 검사 (현재가보다 높아야 함)
        if (!finalAmount || finalAmount <= auction.currentBid) {
            setError(`현재 입찰가(${auction.currentBid.toLocaleString()}원)보다 높은 금액을 입력해주세요.`);
            return;
        }

        const isConfirm = window.confirm(`${finalAmount.toLocaleString()}원으로 입찰하시겠습니까?`);
        if (!isConfirm) return;

        // 2. 부모 데이터 업데이트 (setAuctions 활용)
        setAuctions(prev => prev.map(item => 
            item.id === auction.id ? { ...item, currentBid: finalAmount } : item
        ));
        
        alert(`${finalAmount.toLocaleString()}원으로 입찰되었습니다!`);
        closeModal();
    };

    // 직접 입력 입찰 핸들러
    const handleDirectBid = (e) => {
        e.preventDefault();
        setError('');
        executeBid(parseInt(bidAmount));
    };

    // 자동 +1만 원 퀵 입찰 핸들러
    const handleQuickBid = () => {
        setError('');
        const nextAmount = auction.currentBid + BID_UNIT;
        executeBid(nextAmount);
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
                        
                        {/* ✅ 선택 1: 자동 퀵 입찰 영역 */}
                        <div className="quick-bid-section">
                            <button 
                                type="button" 
                                className="quick-bid-btn" 
                                onClick={handleQuickBid}
                            >
                                + {BID_UNIT.toLocaleString()}원 추가 입찰하기
                            </button>
                            <p className="helper-text">현재가에 1만 원을 더해 빠르게 입찰합니다.</p>
                        </div>

                        <div className="or-divider"><span>또는 직접 입력</span></div>

                        {/* ✅ 선택 2: 직접 입력 폼 */}
                        <form className="bid-form" onSubmit={handleDirectBid}>
                            <div className="input-group">
                                <input 
                                    type="number" 
                                    placeholder="입찰가 입력"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                />
                                <button type="submit" className="place-bid-btn">입찰하기</button>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                        </form>
                        
                        <p className="min-bid-info">* 입찰 후에는 낙찰 시 취소가 불가능합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetailModal;