import './Contact.css'; // Contact.css 파일을 불러옵니다.

function Contact() {
    return (
        <div className="contact-container">
            <h2 className="contact-title">연락처</h2>
            <p>연락을 원하시면 아래 양식을 작성해 주세요.</p>

            <form className="contact-form">
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">이메일:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">메시지:</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <button type="submit" className="submit-btn">보내기</button>
            </form>
        </div>
    );
}
export default Contact;