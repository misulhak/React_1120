import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h2 className="home-title">안녕하세요! </h2>
            <p className="home-intro">React로 만든 저의 포트폴리오 웹사이트에 오신 것을 환영합니다.</p>
            <a href="/projects" className="cta-button">프로젝트 보러가기</a>
        </div>
    );
}
export default Home;