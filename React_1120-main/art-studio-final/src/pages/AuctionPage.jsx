import React, { useState, useMemo } from 'react';
import AuctionCard from './AuctionCard.jsx';
import AuctionDetailModal from './AuctionDetailModal.jsx';
import './AuctionPage.css';

// ✅ 이미지를 직접 import 합니다 (경로 에러 원천 차단)
import willowImg from '../images/willow.jpg';
import shadowImg from '../images/shadow.jpg';
import hometownImg from '../images/hometown.jpg';

const initialAuctionData = [
    {
        id: 101,
        title: "버드나무",
        artist: "이희정",
        startingPrice: 500000,
        currentBid: 500000,
        imageUrl: hometownImg, // import한 변수 사용
        endTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        isLive: true
    },
    {
        id: 102,
        title: "그림자",
        artist: "선하영",
        startingPrice: 500000,
        currentBid: 500000,
        imageUrl: shadowImg,
        endTime: new Date(Date.now() + 3600000 * 5).toISOString(),
        isLive: true
    },
    {
        id: 102,
        title: "고향",
        artist: "이아름",
        startingPrice: 500000,
        currentBid: 500000,
        imageUrl: willowImg,
        endTime: new Date(Date.now() + 3600000 * 5).toISOString(),
        isLive: true
    }
];

function AuctionPages() {
    const [auctions, setAuctions] = useState(initialAuctionData);
    const [selectedAuction, setSelectedAuction] = useState(null);

    return (
        <div className="auction-container">
            <header className="auction-header">
                <h1>실시간 경매</h1>
                <p>엄선된 작가들의 작품을 경매로 만나보세요.</p>
            </header>

            <div className="auction-grid">
                {auctions.map(auction => (
                    <AuctionCard
                        key={auction.id}
                        auction={auction}
                        onClick={() => setSelectedAuction(auction)}
                    />
                ))}
            </div>

            {selectedAuction && (
                <AuctionDetailModal
                    auction={selectedAuction}
                    closeModal={() => setSelectedAuction(null)}
                    setAuctions={setAuctions}
                />
            )}
        </div>
    );
}

export default AuctionPages;