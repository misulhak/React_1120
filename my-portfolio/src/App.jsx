import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Project.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Header와 Footer는 모든 페이지에 공통으로 표시 */}
      <main>
        <Routes>
          {/* 경로(path)와 해당 컴포넌트(element) 연결 */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;