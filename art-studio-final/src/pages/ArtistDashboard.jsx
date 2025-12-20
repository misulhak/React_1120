import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';
import './ArtistDashboard.css';

const GENRE_OPTIONS = ["회화", "조각", "사진", "디지털 아트", "공예", "설치 미술"];

function ArtistDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => Storage.getCurrentUser());
    const [artworks, setArtworks] = useState([]);
    const [modal, setModal] = useState({ open: false, type: '', data: null });

    // 1. 초기 권한 체크 및 데이터 로드 (하나의 흐름으로 통합)
    useEffect(() => {
        if (!user || user.role !== 'artist') {
            alert('작가 전용 페이지입니다.');
            navigate('/');
            return;
        }

        const allItems = Storage.get('galleryItems') || [];
        setArtworks(allItems.filter(item => item.artistName === user.name));
    }, [user, navigate]);

    // 2. 통계 계산 (useMemo 활용 최적화)
    const stats = useMemo(() => ({
        count: artworks.length,
        views: artworks.reduce((acc, cur) => acc + (Number(cur.views) || 0), 0)
    }), [artworks]);

    // 3. 공통 데이터 동기화 함수 (가독성 개선)
    const syncWithStorage = useCallback((updatedArtworks, updatedUser = user) => {
        const others = (Storage.get('galleryItems') || []).filter(item => item.artistName !== user.name);
        Storage.set('galleryItems', [...updatedArtworks, ...others]);
        
        if (updatedUser !== user) {
            Storage.set('currentUser', updatedUser);
            setUser(updatedUser);
        }
        
        setArtworks(updatedArtworks);
        setModal({ open: false, type: '', data: null });
    }, [user]);

    // 4. 이벤트 핸들러 정리
    const handleStatusChange = (id, newStatus) => {
        const updated = artworks.map(a => a.id === id ? { ...a, status: newStatus } : a);
        syncWithStorage(updated);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            syncWithStorage(artworks.filter(a => a.id !== id));
        }
    };

    // 5. 이미지 파일 변환 도우미
    const getBase64 = (file) => new Promise(res => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => res(reader.result);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());

        if (modal.type === 'profile') {
            const genres = fd.getAll('genre').join(', ');
            syncWithStorage(artworks, { ...user, ...data, genre: genres });
            return;
        }

        // 작품 등록/수정 로직
        let image = modal.data?.image;
        if (fd.get('image').size > 0) image = await getBase64(fd.get('image'));

        let updatedList;
        if (modal.data?.id) {
            updatedList = artworks.map(a => a.id === modal.data.id ? { ...a, ...data, image, price: Number(data.price) } : a);
        } else {
            const newArt = {
                ...data,
                id: Date.now(),
                artistName: user.name,
                date: new Date().toLocaleDateString(),
                status: '전시 중',
                views: 0,
                image,
                price: Number(data.price)
            };
            updatedList = [newArt, ...artworks];
        }
        syncWithStorage(updatedList);
    };

    if (!user) return null;

    return (
        <div className="user-dash-container">
            <header className="user-dash-header">
                <h1>Artist Dashboard</h1>
            </header>
            
            <div className="user-dash-content">
                <aside className="user-sidebar">
                    <div className="user-profile-card">
                        <div className="user-avatar">{user.name?.[0]}</div>
                        <h2 className="user-profile-name">{user.name}</h2>
                        <p className="user-email">{user.email}</p>
                        <span className="user-badge">{user.genre || '전문 작가'}</span>

                        <div className="profile-stats">
                            <div className="stat-box"><span>등록 작품</span><strong>{stats.count}</strong></div>
                            <div className="stat-box"><span>총 조회수</span><strong>{stats.views}</strong></div>
                        </div>
                        <button className="profile-edit-btn" onClick={() => setModal({ open: true, type: 'profile', data: user })}>
                            정보 수정
                        </button>
                    </div>
                </aside>

                <main className="user-main-area">
                    <div className="section-title">
                        <h3>작품집 관리</h3>
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
                                <div className="status-control-group">
                                    <span className="p-price">₩{Number(art.price).toLocaleString()}</span>
                                    <select
                                        className={`status-select ${art.status === '판매 완료' ? 'is-sold-out' : ''}`}
                                        value={art.status}
                                        onChange={(e) => handleStatusChange(art.id, e.target.value)}
                                    >
                                        <option value="전시 중">전시 중</option>
                                        <option value="판매 완료">판매 완료</option>
                                    </select>
                                </div>
                                <div className="action-cells">
                                    <button onClick={() => setModal({ open: true, type: 'artwork', data: art })}>수정</button>
                                    <button onClick={() => handleDelete(art.id)} className="delete-btn">삭제</button>
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
                                    <div className="form-group">
                                        <label>활동 장르</label>
                                        <div className="genre-checkbox-group">
                                            {GENRE_OPTIONS.map(g => (
                                                <label key={g} className="genre-check-item">
                                                    <input type="checkbox" name="genre" value={g} defaultChecked={user.genre?.includes(g)} />
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
                                <button type="button" className="cancel-prod-btn" onClick={() => setModal({ open: false, type: '', data: null })}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistDashboard;