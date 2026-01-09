import React, { useState, useEffect } from 'react';

function AuctionCard({ auction, onClick }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const diff = +new Date(auction.endTime) - +new Date();
            if (diff <= 0) {
                setTimeLeft("경매 마감");
                clearInterval(timer);
            } else {
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / 1000 / 60) % 60);
                const s = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${h}h ${m}m ${s}s`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [auction.endTime]);

    return (
        <div className={`auction-card ${!auction.isLive ? 'ended' : ''}`} onClick={onClick}>
            <div className="image-container">
                <img src={auction.imageUrl} alt={auction.title} className="auction-image" />
                {auction.isLive && <span className="badge-live">LIVE</span>}
            </div>

            <div className="auction-info">
                <div className="info-header">
                    <h3>{auction.title}</h3>
                    <p className="artist-name">{auction.artist}</p>
                </div>

                <div className="bid-status">
                    <span className="label">현재 입찰가</span>
                    <strong className="current-bid">{auction.currentBid.toLocaleString()}원</strong>
                </div>

                <div className="timer-box">
                    <span className="clock-icon">⏳</span>
                    <span className="timer-text">{timeLeft}</span>
                </div>

                <button className="bid-button" disabled={!auction.isLive}>
                    {auction.isLive ? '입찰 참여하기' : '경매 종료'}
                </button>
            </div>
        </div>
    );
}

export default AuctionCard;