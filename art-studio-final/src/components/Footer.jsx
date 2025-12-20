import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#f4f4f4',
            color: '#333',
            padding: '20px',
            textAlign: 'center',
            borderTop: '1px solid #ddd',
            marginTop: '40px' // 페이지 하단에 여백 추가
        }}>
            <p>&copy; {new Date().getFullYear()} 전자 미술관</p>
            <div>
                <a href="/privacy" style={{ margin: '0 10px', color: '#333' }}>개인정보처리방침</a>
                <a href="/terms" style={{ margin: '0 10px', color: '#333' }}>이용약관</a>
            </div>
        </footer>
    );
};

export default Footer;