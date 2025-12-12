import './About.css'; // About.css 파일을 불러옵니다.

function About() {
    return (
        <div className="about-container">
            <h2 className="about-title">(예시)저를 소개합니다</h2>
            <p className="about-bio">(예시)저는 프론트엔드 개발자가 되고 싶은 학생입니다. React와 JavaScript를 배우는 것을 즐깁니다.</p>
            <ul className="skills-list">
                <li>React</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Git & GitHub</li>
            </ul>
        </div>
    );
}
export default About;