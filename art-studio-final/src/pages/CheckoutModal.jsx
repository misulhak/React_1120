import React, { useState } from 'react';
import './Gallery.css';

function CheckoutModal({ artwork, closeModal }) {
    if (!artwork) return null;

    const [shippingInfo, setShippingInfo] = useState({
        recipient: '',
        address: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('card');

    const shippingFee = 5000;
    const totalPrice = artwork.price + shippingFee;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            return;
        }

        // 1. 주문 데이터 패키징 (구매 내역용)
        const orderData = {
            orderId: `ORD-${Date.now()}`,
            artworkId: artwork.id, // ID 추적을 위해 추가
            title: artwork.title,
            artist: artwork.artist,
            price: artwork.price,
            totalPrice: totalPrice,
            imageUrl: artwork.imageUrl,
            purchaseDate: new Date().toISOString(),
            shippingInfo,
            paymentMethod,
            status: "결제 완료"
        };

        // 2. 유저별 구매 내역 저장
        const purchaseKey = `purchases_${currentUser.email}`;
        const existingPurchases = JSON.parse(localStorage.getItem(purchaseKey) || "[]");
        localStorage.setItem(purchaseKey, JSON.stringify([orderData, ...existingPurchases]));

        // ✅ 3. 핵심: 전체 갤러리 데이터에서 해당 작품 상태를 '판매 완료'로 업데이트
        const savedGalleryItems = JSON.parse(localStorage.getItem('galleryItems') || "[]");
        const updatedGalleryItems = savedGalleryItems.map(item => {
            // 작품의 고유 ID(item.id)가 현재 결제 중인 artwork.id와 일치하면 상태 변경
            if (item.id === artwork.id) {
                return { ...item, status: '판매 완료' };
            }
            return item;
        });
        localStorage.setItem('galleryItems', JSON.stringify(updatedGalleryItems));

        // 4. 스토리지 이벤트 강제 발생 (Gallery 페이지 실시간 업데이트용)
        window.dispatchEvent(new Event('storage'));

        alert(`"${artwork.title}" 작품의 주문이 완료되었습니다!\n이제 갤러리에서 '판매 완료' 상태로 표시됩니다.`);
        closeModal();
    };

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                
                <h3 className="checkout-title">구매 확정 및 결제</h3>

                <form onSubmit={handleCheckout} className="checkout-form">
                    <section className="summary-section">
                        <h4>주문 요약</h4>
                        <div className="summary-list">
                            <div className="summary-item">
                                <span>작품명</span>
                                <span>{artwork.title}</span>
                            </div>
                            <div className="summary-item">
                                <span>작품 가격</span>
                                <span>{artwork.price.toLocaleString()}원</span>
                            </div>
                            <div className="summary-item">
                                <span>배송비</span>
                                <span>{shippingFee.toLocaleString()}원</span>
                            </div>
                            <div className="total-item">
                                <strong>최종 결제 금액</strong>
                                <strong>{totalPrice.toLocaleString()}원</strong>
                            </div>
                        </div>
                    </section>

                    <section className="shipping-section">
                        <h4>배송지 정보</h4>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>받는 분 *</label>
                                <input type="text" name="recipient" value={shippingInfo.recipient} onChange={handleInputChange} placeholder="성함을 입력하세요" required />
                            </div>
                            <div className="form-group">
                                <label>연락처 *</label>
                                <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleInputChange} placeholder="010-0000-0000" required />
                            </div>
                            <div className="form-group full-width">
                                <label>배송 주소 *</label>
                                <input type="text" name="address" value={shippingInfo.address} onChange={handleInputChange} placeholder="상세 주소를 입력하세요" required />
                            </div>
                        </div>
                    </section>

                    <section className="payment-section">
                        <h4>결제 수단</h4>
                        <div className="payment-options">
                            <label className={`payment-label ${paymentMethod === 'card' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                💳 신용/체크카드
                            </label>
                            <label className={`payment-label ${paymentMethod === 'transfer' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                🏦 계좌 이체
                            </label>
                        </div>
                    </section>

                    <button type="submit" className="final-checkout-btn">
                        {totalPrice.toLocaleString()}원 결제하기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutModal;