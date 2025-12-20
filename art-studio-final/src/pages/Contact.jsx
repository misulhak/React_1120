import React, { useState } from 'react';
import './Contact.css'; // 전용 CSS 파일 임포트

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🚨 여기에 문의 내용을 처리하는 로직을 구현합니다.
        console.log("일반 문의 제출됨:", formData);
        alert('문의가 성공적으로 접수되었습니다. 확인 후 답변드리겠습니다.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // 폼 초기화
    };

    return (
        <div className="contact-container">
            <h2>문의 및 위치</h2>

            <div className="contact-content-wrapper">

                {/* 1. 연락처 정보 및 위치 */}
                <section className="contact-info-section">
                    <h3>위치 정보</h3>
                    <p>
                        **전자 미술관**
                        <br />
                        주소: 서울특별시 강동구 천호대로157길 14 쇼핑몰나비관리단
                        <br />
                        전화: 02-1234-5678
                        <br />
                        이메일: contact@artstudio.com
                        <br />
                        운영 시간: 화-일, 10:00 - 18:00 (월요일 휴관)
                    </p>

                    {/* 2. 지도 표시 (Google Maps 임베드) */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.7153159964746!2d127.12471417683726!3d37.538207572046005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cafffbdf50a0b%3A0x2e8142f37b259de8!2z7Ie87ZWR66qw64KY67mE6rSA66as64uo!5e0!3m2!1sko!2skr!4v1765939620614!5m2!1sko!2skr"
                            title="갤러리 위치"
                            width="100%"
                            height="300"
                            style={{ border: 0 }} /* 리액트 방식의 스타일 선언 */
                            allowFullScreen={true} /* 👈 S 대문자로 수정 */
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" /* 👈 P 대문자로 수정 */
                        ></iframe>
                    </div>
                </section>

                {/* 3. 일반 문의 폼 */}
                <section className="contact-form-section">
                    <h3>일반 문의 양식</h3>
                    <form onSubmit={handleSubmit} className="contact-form">

                        <div className="form-group">
                            <label htmlFor="name">성함 *</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">이메일 *</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">제목</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">문의 내용 *</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" required></textarea>
                        </div>

                        <button type="submit" className="contact-submit-button">문의 제출</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Contact;