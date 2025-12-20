import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <li>
                        <Link to="/about">소개</Link>
                    </li>
                    <li>
                        <Link to="/projects">프로젝트</Link>
                    </li>
                    <li>
                        <Link to="/contact">연락처</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;