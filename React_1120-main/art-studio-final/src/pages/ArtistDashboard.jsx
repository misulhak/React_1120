import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';
import './ArtistDashboard.css';

function ArtistDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => Storage.getCurrentUser());
    const [artworks, setArtworks] = useState([]);
    const [modal, setModal] = useState({ open: false, type: '', data: null });

    // ✅ 선택 가능한 장르 목록
    const genreOptions = ["회화", "조각", "사진", "디지털 아트", "공예", "설치 미술"];

    useEffect(() => {
        if (!user || user.role !== 'artist') {
            alert('작가 전용 페이지입니다.');
            navigate('/');
        }
    }, [user, navigate]);

    const loadData = () => {
        if (user?.name) {
            const allItems = Storage.get('galleryItems') || [];
            const myItems = allItems.filter(item => item.artistName === user.name);
            setArtworks(myItems);
        }
    };

    useEffect(() => { loadData(); }, [user?.name]);

    const stats = useMemo(() => ({
        count: artworks.length,
        views: artworks.reduce((acc, cur) => acc + (Number(cur.views) || 0), 0)
    }), [artworks]);

    const handleStatusChange = (id, newStatus) => {
        const updated = artworks.map(a => a.id === id ? { ...a, status: newStatus } : a);
        syncAll(updated);
    };

    const handleDelete = (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        const updated = artworks.filter(a => a.id !== id);
        syncAll(updated);
    };

    const syncAll = (newMyArtworks, updatedUser = user) => {
        const others = Storage.get('galleryItems').filter(item => item.artistName !== user.name);
        Storage.set('galleryItems', [...newMyArtworks, ...others]);
        if (updatedUser !== user) {
            Storage.set('currentUser', updatedUser);
            setUser(updatedUser);
        }
        setModal({ open: false, type: '', data: null });
        setArtworks(newMyArtworks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());

        if (modal.type === 'profile') {
            // ✅ 장르 다중 선택 처리
            const selectedGenres = fd.getAll('genre').join(', ');
            syncAll(artworks, { ...user, ...data, genre: selectedGenres });
        } else {
            let img = modal.data?.image;
            if (fd.get('image').size > 0) {
                img = await new Promise(res => {
                    const r = new FileReader();
                    r.onload = (ev) => res(ev.target.result);
                    r.readAsDataURL(fd.get('image'));
                });
            }

            let updatedArts;
            if (modal.data?.id) {
                // [수정 모드]
                updatedArts = artworks.map(a =>
                    (a.id === modal.data.id ? { ...a, ...data, image: img, price: Number(data.price) } : a)
                );
            } else {
                // [신규 등록 모드] ✅ ID 중복 방지 강화 (시간 + 랜덤)
                const newArt = {
                    ...data,
                    id: Date.now() + Math.floor(Math.random() * 1000), // 👈 중복 절대 안 나게 수정
                    artistName: user.name,
                    date: new Date().toLocaleDateString(),
                    status: '전시 중',
                    views: 0,
                    image: img,
                    price: Number(data.price)
                };
                updatedArts = [newArt, ...artworks];
            }
            syncAll(updatedArts);
        }
    };

    if (!user) return null;

    return (
        <div className="user-dash-container">
            <header className="user-dash-header">
                <div className="header-content">
                    <h1>Artist Dashboard</h1>
                    <span className="user-name-highlight">{user.name}</span>

                    {/* 로그아웃 버튼을 header-content 밖이 아닌 안쪽 구석에 배치 */}
                    <button
                        className="top-right-logout"
                        onClick={() => { Storage.remove('currentUser'); navigate('/'); }}
                    >
                        LOGOUT
                    </button>
                </div>
            </header>

            <div className="user-dash-content">
                <aside className="user-sidebar">
                    <div className="user-profile-card">
                        <div className="user-avatar">{user.name?.[0]}</div>
                        <h2 className="user-profile-name">{user.name}</h2>
                        <p className="user-email">{user.email}</p>
                        <span className="user-badge">{user.genre || '전문 작가'}</span>
                        <button className="edit-btn" onClick={() => setModal({ open: true, type: 'profile', data: user })}>정보 수정</button>
                        <div className="profile-stats">
                            <div className="stat-box"><span>등록 작품</span><strong>{stats.count}</strong></div>
                            <div className="stat-box"><span>총 조회수</span><strong>{stats.views}</strong></div>
                        </div>
                    </div>
                </aside>

                <main className="user-main-area">
                    <div className="section-title">
                        <h3>Portfolio Management</h3>
                        <button className="text-btn" onClick={() => setModal({ open: true, type: 'artwork', data: null })}>+ 새 작품 등록</button>
                    </div>

                    {artworks.length > 0 ? artworks.map(art => (
                        <div key={art.id} className="purchase-card">
                            <img src={art.image} alt="" className="p-img" />
                            <div className="p-info">
                                <h4>{art.title}</h4>
                                <p className="p-artist">{art.date} 등록</p>
                            </div>
                            <div className="p-price-status">
                                <span className="p-price">₩{Number(art.price).toLocaleString()}</span>
                                <select
                                    className="status-select"
                                    value={art.status}
                                    onChange={(e) => handleStatusChange(art.id, e.target.value)}
                                    style={{
                                        background: art.status === '전시 중' ? '#e8f5e9' : '#fff0f0',
                                        color: art.status === '전시 중' ? '#2e7d32' : '#ff4500'
                                    }}
                                >
                                    <option value="전시 중">전시 중</option>
                                    <option value="판매 완료">판매 완료</option>
                                </select>
                                <div className="action-cells">
                                    <button onClick={() => setModal({ open: true, type: 'artwork', data: art })}>수정</button>
                                    <button onClick={() => handleDelete(art.id)} style={{ color: '#ff4500' }}>삭제</button>
                                </div>
                            </div>
                        </div>
                    )) : <div className="empty-state">등록된 작품이 없습니다.</div>}
                </main>
            </div>

            {modal.open && (
                <div className="modal-overlay" onClick={() => setModal({ open: false, type: '', data: null })}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{modal.type === 'profile' ? '작가 정보 수정' : (modal.data ? '작품 수정' : '새 작품 등록')}</h2>
                        <form onSubmit={handleSubmit} className="upload-form">
                            {modal.type === 'profile' ? (
                                <>
                                    <div className="form-group"><label>작가 이름</label><input name="name" defaultValue={modal.data?.name} required /></div>
                                    <div className="form-group"><label>이메일</label><input name="email" defaultValue={modal.data?.email} /></div>
                                    {/* ✅ 장르 체크박스 그룹 추가 */}
                                    <div className="form-group">
                                        <label>활동 장르</label>
                                        <div className="genre-checkbox-group">
                                            {genreOptions.map(g => (
                                                <label key={g} className="genre-check-item">
                                                    <input
                                                        type="checkbox"
                                                        name="genre"
                                                        value={g}
                                                        defaultChecked={user.genre?.includes(g)}
                                                    />
                                                    <span>{g}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group"><label>제목</label><input name="title" defaultValue={modal.data?.title} required /></div>
                                    <div className="form-group"><label>가격</label><input name="price" type="number" defaultValue={modal.data?.price} required /></div>
                                    <div className="form-group"><label>이미지</label><input name="image" type="file" accept="image/*" /></div>
                                    <div className="form-group"><label>설명</label><textarea name="description" defaultValue={modal.data?.description} rows="3" /></div>
                                </>
                            )}
                            <div className="modal-btns">
                                <button type="submit" className="submit-upload-btn">저장</button>
                                <button type="button" onClick={() => setModal({ open: false, type: '', data: null })} style={{ background: '#eee', color: '#666', border: 'none', borderRadius: '8px', padding: '14px', cursor: 'pointer', flex: 1 }}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistDashboard;