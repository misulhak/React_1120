import React, { useState, useMemo, useEffect, useCallback } from 'react';
import './Gallery.css';
import CheckoutModal from './CheckoutModal';
import ArtworkModal from './ArtworkModal';
import GalleryControls from './GalleryControls';

import imgGreen from '../images/green.jpg'; 
import imgPuddle from '../images/puddle.jpg';
import imgForest from '../images/forest.jpg';
import imgDream from '../images/dream.jpg';
import imgflower from '../images/flower.jpg';
import imgGoldFish from '../images/goldFish.jpg';
import imgMelonSoda from '../images/melonSoda.jpg';
import imgTiezang from '../images/tiezang.jpg';
import imgGarden from '../images/garden.jpg';
import imgHangOut from '../images/hangout.jpg';
import imgSaffron from '../images/saffron.jpg';
import imgSparkle from '../images/sparkle.jpg';
import imgSunset from '../images/sunset.jpg';
import imgYellowGreen from '../images/yellowGreen.jpg';
import imgFlowerAndButterfly from '../images/flowerAndButterfly.jpg';

const INITIAL_ARTWORKS = [
    { id: 'seed-1', title: "밀밭", artistName: "이아름", date: "2025-12-21", price: 1111111, image: imgGreen, description: "산들산들", status: "전시 중", views: 10 },
    { id: 'seed-2', title: "웅덩이", artistName: "이한나", date: "2020-12-20", price: 1111111, image: imgPuddle, description: "일렁일렁", status: "전시 중", views: 10 },
    { id: 'seed-3', title: "숲", artistName: "선하영", date: "2018-10-01", price: 1111111, image: imgForest, description: "구불구불", status: "전시 중", views: 10 },
    { id: 'seed-4', title: "꿈", artistName: "최명헌", date: "2009-05-17", price: 1111111, image: imgDream, description: "아른아른", status: "전시 중", views: 10 },
    { id: 'seed-5', title: "꽃", artistName: "백종현", date: "2025-02-22", price: 1111111, image: imgflower, description: "흔들흔들", status: "전시 중", views: 10 },
    { id: 'seed-6', title: "금붕어", artistName: "오창준", date: "2015-06-10", price: 1111111, image: imgGoldFish, description: "뻐끔뻐끔", status: "전시 중", views: 10 },
    { id: 'seed-7', title: "메론소다", artistName: "안창현", date: "2025-12-21", price: 1111111, image: imgMelonSoda, description: "호록호록", status: "전시 중", views: 10 },
    { id: 'seed-8', title: "볕뉘", artistName: "김영준", date: "2013-07-22", price: 1111111, image: imgTiezang, description: "반짝반짝", status: "전시 중", views: 10 },
    { id: 'seed-9', title: "정원", artistName: "김상준", date: "2015-08-13", price: 1111111, image: imgGarden, description: "하늘하늘", status: "전시 중", views: 10 },
    { id: 'seed-10', title: "놀이", artistName: "함창주", date: "2024-10-30", price: 1111111, image: imgHangOut, description: "총총", status: "전시 중", views: 10 },
    { id: 'seed-11', title: "사프란", artistName: "이송아", date: "2016-02-07", price: 1111111, image: imgSaffron, description: "", status: "솔솔", views: 10 },
    { id: 'seed-12', title: "윤슬", artistName: "정규원", date: "2019-05-08", price: 1111111, image: imgSparkle, description: "", status: "촤르르르", views: 10 },
    { id: 'seed-13', title: "연두", artistName: "고건우", date: "2004-01-01", price: 1111111, image: imgYellowGreen, description: "초롱초롱", status: "전시 중", views: 10 },
    { id: 'seed-14', title: "해질녘", artistName: "정용준", date: "2013-11-15", price: 1111111, image: imgSunset, description: "뉘엿뉘엿", status: "전시 중", views: 10 },
    { id: 'seed-15', title: "화접", artistName: "이희정", date: "2023-09-17", price: 1111111, image: imgFlowerAndButterfly, description: "팔랑팔랑", status: "전시 중", views: 10 }
];

function Gallery() {
    const [allArtworks, setAllArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [checkoutArtwork, setCheckoutArtwork] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('year_desc');
    const [selectedArtist, setSelectedArtist] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [visibleCount, setVisibleCount] = useState(9);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const loadGalleryData = useCallback(() => {
        const localStorageData = JSON.parse(localStorage.getItem('galleryItems') || '[]');
        const savedItems = localStorageData.length > 0 ? localStorageData : INITIAL_ARTWORKS;
        
        // 만약 로컬스토리지에 데이터가 아예 없었다면 초기 데이터 저장
        if (localStorageData.length === 0) {
            localStorage.setItem('galleryItems', JSON.stringify(INITIAL_ARTWORKS));
        }

        const formatted = savedItems.map(item => ({
            id: item.id,
            title: item.title,
            artist: item.artistName || "등록 작가",
            year: item.date ? new Date(item.date).getFullYear() : new Date().getFullYear(),
            price: Number(item.price),
            imageUrl: item.image,
            description: item.description,
            views: item.views || 0,
            status: item.status // '판매 완료' 혹은 '전시 중'
        }));
        setAllArtworks(formatted);

        if (currentUser) {
            const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.email}`) || '[]');
            setWishlist(savedWishlist);
        }
    }, [currentUser?.email]);

    useEffect(() => {
        loadGalleryData();
        window.addEventListener('storage', loadGalleryData);
        return () => window.removeEventListener('storage', loadGalleryData);
    }, [loadGalleryData]);

    useEffect(() => {
        setVisibleCount(9);
    }, [searchTerm, selectedArtist, selectedYear]);

    // ✅ 결제 완료 처리 로직 (이 부분이 정확해야 중복 구매가 안 됩니다)
    const handlePaymentSuccess = (artworkId) => {
        // 1. LocalStorage 원본 데이터(galleryItems) 업데이트
        const savedItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
        const updatedStorage = savedItems.map(item => 
            item.id === artworkId ? { ...item, status: '판매 완료' } : item
        );
        localStorage.setItem('galleryItems', JSON.stringify(updatedStorage));

        // 2. 현재 메모리(State) 업데이트
        setAllArtworks(prev => prev.map(item => 
            item.id === artworkId ? { ...item, status: '판매 완료' } : item
        ));
        
        setCheckoutArtwork(null);
        setSelectedArtwork(null); // 혹시 열려있을 상세창도 닫기
        alert("결제가 완료되었습니다! 판매 완료 표시를 확인하세요.");
    };

    const toggleWishlist = (e, artwork) => {
        e.stopPropagation();
        if (!currentUser) return alert("로그인 후 이용 가능합니다.");
        const wishlistKey = `wishlist_${currentUser.email}`;
        const isExist = wishlist.some(item => item.id === artwork.id);
        const newWishlist = isExist
            ? wishlist.filter(item => item.id !== artwork.id)
            : [...wishlist, artwork];
        localStorage.setItem(wishlistKey, JSON.stringify(newWishlist));
        setWishlist(newWishlist);
    };

    const handleArtworkClick = (artwork) => {
        // ✅ 이미 판매 완료된 작품이면 아무것도 하지 않음 (중복 구매 원천 봉쇄)
        if (artwork.status === '판매 완료') return;

        setSelectedArtwork(artwork);
        if (!artwork.id) return;
        
        const savedItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
        const updated = savedItems.map(item =>
            item.id === artwork.id ? { ...item, views: (item.views || 0) + 1 } : item
        );
        localStorage.setItem('galleryItems', JSON.stringify(updated));
        setAllArtworks(prev => prev.map(item =>
            item.id === artwork.id ? { ...item, views: item.views + 1 } : item
        ));
    };

    const filteredArtworks = useMemo(() => {
        return allArtworks
            .filter(art => {
                const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    art.artist.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesArtist = !selectedArtist || selectedArtist === '모든 작가' || art.artist === selectedArtist;
                const matchesYear = !selectedYear || selectedYear === '모든 연도' || art.year.toString() === selectedYear.toString();
                return matchesSearch && matchesArtist && matchesYear;
            })
            .sort((a, b) => {
                if (sortCriteria === 'year_desc') return b.year - a.year;
                if (sortCriteria === 'year_asc') return a.year - b.year;
                return a.title.localeCompare(b.title);
            });
    }, [allArtworks, searchTerm, selectedArtist, selectedYear, sortCriteria]);

    const artists = useMemo(() => {
        const sortedArtists = [...new Set(allArtworks.map(a => a.artist))].sort();
        return ['모든 작가', ...sortedArtists];
    }, [allArtworks]);

    const years = useMemo(() => ['모든 연도', ...new Set(allArtworks.map(a => a.year))].sort((a, b) => b - a), [allArtworks]);

    return (
        <div className="gallery-container">
            <header className="gallery-header">
                <h2>그림방</h2>
                <p>총 {filteredArtworks.length}개의 작품이 전시 중입니다.</p>
            </header>

            <GalleryControls
                {...{
                    searchTerm, setSearchTerm, sortCriteria, setSortCriteria,
                    selectedArtist, setSelectedArtist, selectedYear, setSelectedYear, artists, years
                }}
            />

            <div className="artwork-grid">
                {filteredArtworks.slice(0, visibleCount).map((artwork) => {
                    const isSoldOut = artwork.status === '판매 완료';
                    
                    return (
                        <div 
                            key={artwork.id} 
                            className={`artwork-card ${isSoldOut ? 'is-sold-out' : ''}`}
                            // ✅ 판매 완료된 카드는 클릭 이벤트를 실행하지 않음
                            onClick={() => !isSoldOut && handleArtworkClick(artwork)}
                            style={{ cursor: isSoldOut ? 'default' : 'pointer' }}
                        >
                            {isSoldOut && <div className="card-sold-out-badge">SOLD OUT</div>}

                            <button
                                className={`wish-icon-btn ${wishlist.some(item => item.id === artwork.id) ? 'active' : ''}`}
                                onClick={(e) => toggleWishlist(e, artwork)}
                            >
                                {wishlist.some(item => item.id === artwork.id) ? '❤️' : '🤍'}
                            </button>

                            <div className="image-container">
                                <img src={artwork.imageUrl} alt={artwork.title} className="artwork-image" loading="lazy" />
                            </div>

                            <div className="artwork-info">
                                <h3>{artwork.title}</h3>
                                <p className="artist-name">{artwork.artist} <span className="art-year">({artwork.year})</span></p>
                                <p className="art-price">
                                    {isSoldOut ? <span className="price-sold" style={{color: 'red', fontWeight: 'bold'}}>판매완료</span> : `₩${artwork.price.toLocaleString()}`}
                                </p>
                                <div className="card-footer">
                                    <span className="view-count-badge">👁️ {artwork.views}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="load-more-container">
                {visibleCount < filteredArtworks.length ? (
                    <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + 9)}>
                        작품 더보기
                    </button>
                ) : (
                    filteredArtworks.length > 9 && (
                        <button className="load-more-btn close-btn" onClick={() => {
                            setVisibleCount(9);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                            작품 접기 ▲
                        </button>
                    )
                )}
            </div>

            {selectedArtwork && (
                <ArtworkModal 
                    artwork={selectedArtwork} 
                    closeModal={() => setSelectedArtwork(null)} 
                    handlePurchase={setCheckoutArtwork} 
                />
            )}
            
            {checkoutArtwork && (
                <CheckoutModal 
                    artwork={checkoutArtwork} 
                    closeModal={() => setCheckoutArtwork(null)} 
                    onPaymentSuccess={() => handlePaymentSuccess(checkoutArtwork.id)} 
                />
            )}
        </div>
    );
}

export default Gallery;