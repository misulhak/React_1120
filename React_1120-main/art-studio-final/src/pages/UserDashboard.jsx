import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [purchases, setPurchases] = useState([]);

    // 1. 세션에 저장된 현재 유저 정보 가져오기
    const user = useMemo(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'user') {
            alert("일반 회원만 접근 가능합니다.");
            navigate('/gallery');
            return;
        }

        const wishlistKey = `wishlist_${user.email}`;
        const savedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
        setWishlist(savedWishlist);

        const purchaseKey = `purchases_${user.email}`;
        const savedPurchases = JSON.parse(localStorage.getItem(purchaseKey)) || [];
        setPurchases(savedPurchases);
    }, [user, navigate]);

    // ✅ 프로필 이름 수정 함수
    const handleUpdateProfile = () => {
        const newName = prompt("변경하실 이름을 입력해주세요:", user.name);
        
        if (newName && newName.trim() !== "" && newName !== user.name) {
            // 1) 세션(currentUser) 정보 업데이트
            const updatedUser = { ...user, name: newName };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // 2) 전체 유저 목록(users) 정보 업데이트 (데이터 동기화)
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUserList = allUsers.map(u => 
                u.email === user.email ? { ...u, name: newName } : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUserList));

            alert("성함이 변경되었습니다.");
            window.location.reload(); // 변경사항 반영을 위해 새로고침
        }
    };

    // ✅ 로그아웃 함수
    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem('currentUser');
            navigate('/login');
            window.location.reload(); // 상태 초기화를 위해 권장
        }
    };

    const firstLetter = user?.name ? user.name.charAt(0) : "U";

    const handleRemoveWish = (id) => {
        if (window.confirm("관심 작품에서 삭제하시겠습니까?")) {
            const wishlistKey = `wishlist_${user.email}`;
            const updated = wishlist.filter(item => item.id !== id);
            setWishlist(updated);
            localStorage.setItem(wishlistKey, JSON.stringify(updated));
        }
    };

    if (!user) return null;

    return (
        <div className="user-dash-container">
            <header className="user-dash-header">
                <div className="header-content">
                    <h1>My Art Life</h1>
                    <p>안녕하세요, <span className="user-name-highlight">{user.name}</span>님! 수집하신 작품들을 확인해보세요.</p>
                </div>
            </header>

            <div className="user-dash-content">
                <aside className="user-sidebar">
                    <div className="user-profile-card">
                        <div className="user-avatar">{firstLetter}</div>
                        <h3 className="user-profile-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                        
                        {/* ✅ 수정 및 로그아웃 버튼 그룹 */}
                        <div className="profile-actions">
                            <button className="edit-btn" onClick={handleUpdateProfile}>프로필 수정</button>
                            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
                        </div>

                        <div className="user-badge">Classic Member</div>
                        <div className="profile-stats">
                            <div className="stat-box">
                                <span>찜</span>
                                <strong>{wishlist.length}</strong>
                            </div>
                            <div className="stat-box">
                                <span>구매</span>
                                <strong>{purchases.length}</strong>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="user-main-area">
                    <section className="dashboard-section">
                        <div className="section-title">
                            <h3>📦 최근 구매 내역</h3>
                        </div>
                        {purchases.length > 0 ? (
                            <div className="purchase-list">
                                {purchases.map(item => (
                                    <div key={item.orderId} className="purchase-card">
                                        <img src={item.imageUrl} alt={item.title} className="p-img" />
                                        <div className="p-info">
                                            <h4>{item.title}</h4>
                                            <p className="p-artist">{item.artist}</p>
                                            <p className="p-date">{new Date(item.purchaseDate).toLocaleDateString()} 결제</p>
                                        </div>
                                        <div className="p-price-status">
                                            <span className="p-price">₩{item.price.toLocaleString()}</span>
                                            <span className="p-status">{item.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">최근 구매한 작품이 없습니다.</div>
                        )}
                    </section>

                    <section className="dashboard-section" style={{ marginTop: '50px' }}>
                        <div className="section-title">
                            <h3>❤️ 관심 작품</h3>
                            <button className="text-btn" onClick={() => navigate('/gallery')}>갤러리 가기 →</button>
                        </div>
                        {wishlist.length > 0 ? (
                            <div className="user-wish-grid">
                                {wishlist.map(art => (
                                    <div key={art.id} className="user-wish-card">
                                        <div className="wish-img-wrapper">
                                            <img src={art.imageUrl} alt={art.title} />
                                            <button className="remove-wish-btn" onClick={() => handleRemoveWish(art.id)}>&times;</button>
                                        </div>
                                        <div className="wish-card-info">
                                            <h4>{art.title}</h4>
                                            <p>{art.artist}</p>
                                            <button className="view-detail-btn" onClick={() => navigate('/gallery')}>상세보기</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">찜한 작품이 없습니다.</div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default UserDashboard;