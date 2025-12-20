import React, { useState, useMemo, useEffect, useCallback } from 'react';
import './Gallery.css';
import CheckoutModal from './CheckoutModal';
import ArtworkModal from './ArtworkModal';
import GalleryControls from './GalleryControls';

function Gallery() {
    const [allArtworks, setAllArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [checkoutArtwork, setCheckoutArtwork] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('year_desc');
    const [selectedArtist, setSelectedArtist] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const loadGalleryData = useCallback(() => {
        const savedItems = JSON.parse(localStorage.getItem('galleryItems') || '[]');
        const formatted = savedItems.map(item => ({
            id: item.id,
            title: item.title,
            artist: item.artistName || "등록 작가",
            year: item.date ? new Date(item.date).getFullYear() : new Date().getFullYear(),
            price: Number(item.price),
            imageUrl: item.image,
            description: item.description,
            views: item.views || 0,
            status: item.status // ✅ 판매 상태 데이터 추가
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

    const artists = useMemo(() => ['모든 작가', ...new Set(allArtworks.map(a => a.artist))].sort(), [allArtworks]);
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
                {filteredArtworks.map((artwork) => {
                    const isSoldOut = artwork.status === '판매 완료'; // ✅ 변수화
                    
                    return (
                        <div 
                            key={artwork.id} 
                            className={`artwork-card ${isSoldOut ? 'is-sold-out' : ''}`} // ✅ 클래스 추가
                            onClick={() => handleArtworkClick(artwork)}
                        >
                            {/* ✅ 판매 완료 중앙 배지 추가 */}
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
                                {/* ✅ 판매 완료 시 가격에 취소선 적용 */}
                                <p className="art-price">
                                    {isSoldOut ? <span className="price-sold">품절</span> : `₩${artwork.price.toLocaleString()}`}
                                </p>
                                <div className="card-footer">
                                    <span className="view-count-badge">👁️ {artwork.views}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedArtwork && <ArtworkModal artwork={selectedArtwork} closeModal={() => setSelectedArtwork(null)} handlePurchase={setCheckoutArtwork} />}
            {checkoutArtwork && <CheckoutModal artwork={checkoutArtwork} closeModal={() => setCheckoutArtwork(null)} />}
        </div>
    );
}

export default Gallery;