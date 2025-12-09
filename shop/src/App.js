import { useState } from "react";
import "./App.css";
import { Button, Navbar, Container, Nav } from 'react-bootstrap'
import data from "./db/fruit";
import Products from "./components/Products";
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './components/Detail';

function App() {

  const [fruit] = useState(data);
  console.log(fruit);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">과일농장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">홈으로</Nav.Link>
            <Nav.Link href="#detail">상세페이지</Nav.Link>
            <Nav.Link href="#cart">장바구니</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="slider"></div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                {
                  fruit.map((fruit) =>
                    <Products {...fruit} key={fruit.id} />
                  )
                }
              </div>
            </div>
          </>
        }
        />
        <Route path="detail" element={<Detail />} />
      </Routes>

    </div>
  );
}

export default App;
