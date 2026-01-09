import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import ArtworkModal from './ArtworkModal';
import CheckoutModal from './CheckoutModal';

function UserDashboard() {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [checkoutArtwork, setCheckoutArtwork] = useState(null);

    const user = useMemo(() => {
        const saved = localStorage.getItem('currentUser');
        return saved ? JSON.parse(saved) : null;
    }, []);

    useEffect(() => {
        if (!user || user.role !== 'user') {
            if (!user) navigate('/login');
            else { alert("일반 회원만 접근 가능합니다."); navigate('/gallery'); }
            return;
        }
        setWishlist(JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || []);
        setPurchases(JSON.parse(localStorage.getItem(`purchases_${user.email}`)) || []);
    }, [user, navigate]);

    const handleUpdateProfile = () => {
        const newName = prompt("변경하실 이름을 입력해주세요:", user.name);
        if (newName?.trim() && newName !== user.name) {
            const updated = { ...user, name: newName };
            localStorage.setItem('currentUser', JSON.stringify(updated));
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            localStorage.setItem('users', JSON.stringify(users.map(u => u.email === user.email ? updated : u)));
            alert("성함이 변경되었습니다.");
            window.location.reload();
        }
    };

    const handleRemoveWish = (id) => {
        if (window.confirm("관심 작품에서 삭제하시겠습니까?")) {
            const updated = wishlist.filter(item => item.id !== id);
            setWishlist(updated);
            localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(updated));
        }
    };

    if (!user) return null;

    return (
        <div className="user-dash-container">
            <header className="user-dash-header">
                <p className="welcome-text">
                    안녕하세요, <span className="user-name-highlight">{user.name}</span>님! 수집하신 작품들을 확인해보세요.
                </p>
            </header>

            <div className="user-dash-content">
                <aside className="user-sidebar">
                    <div className="user-profile-card">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <h3 className="user-profile-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                        <button className="edit-btn" onClick={handleUpdateProfile}>프로필 수정</button>
                        <div className="user-badge" style={{ marginTop: '15px' }}>Classic Member</div>
                        <div className="profile-stats">
                            <div className="stat-box"><span>찜</span><strong>{wishlist.length}</strong></div>
                            <div className="stat-box"><span>구매</span><strong>{purchases.length}</strong></div>
                        </div>
                    </div>
                </aside>

                <main className="user-main-area">
                    <section>
                        <div className="section-title"><h3>📦 최근 구매 내역</h3></div>
                        {purchases.length > 0 ? (
                            purchases.map(item => (
                                <div key={item.orderId} className="purchase-card">
                                    <img src={item.imageUrl} alt="" className="p-img" />
                                    <div style={{ flex: 1 }}>
                                        <h4>{item.title}</h4>
                                        <p className="p-artist">{item.artist}</p>
                                        <p className="p-date" style={{ fontSize: '0.8rem', color: '#aaa' }}>{new Date(item.purchaseDate).toLocaleDateString()} 결제</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <strong style={{ display: 'block' }}>₩{item.price?.toLocaleString()}</strong>
                                        <span className="p-status">{item.status}</span>
                                    </div>
                                </div>
                            ))
                        ) : <div className="empty-state">최근 구매한 작품이 없습니다.</div>}
                    </section>

                    <section style={{ marginTop: '50px' }}>
                        <div className="section-title">
                            <h3>❤️ 관심 작품</h3>
                            <button className="text-btn" onClick={() => navigate('/gallery')}>그림방 가기</button>
                        </div>
                        {wishlist.length > 0 ? (
                            <div className="user-wish-grid">
                                {wishlist.map(art => (
                                    <div key={art.id} className="user-wish-card" onClick={() => setSelectedArtwork(art)}>
                                        <div className="wish-img-wrapper">
                                            <img src={art.imageUrl} alt="" />
                                            <button className="remove-wish-btn" onClick={(e) => { e.stopPropagation(); handleRemoveWish(art.id); }}>&times;</button>
                                        </div>
                                        <div className="wish-card-info">
                                            <h4>{art.title}</h4>
                                            <p style={{ fontSize: '0.85rem', color: '#888' }}>{art.artist}</p>
                                            <button className="view-detail-btn">상세보기</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <div className="empty-state">찜한 작품이 없습니다.</div>}
                    </section>
                </main>
            </div>

            {selectedArtwork && <ArtworkModal artwork={selectedArtwork} closeModal={() => setSelectedArtwork(null)} handlePurchase={(art) => { setSelectedArtwork(null); setCheckoutArtwork(art); }} />}
            {checkoutArtwork && <CheckoutModal artwork={checkoutArtwork} closeModal={() => setCheckoutArtwork(null)} />}
        </div>
    );
}

export default UserDashboard;