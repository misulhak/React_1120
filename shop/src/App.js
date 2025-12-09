import { useState } from 'react';
import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import data from './db/fruit';

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
      <div className="slider" />


      <div className="container" style={{ textAlign: "center" }}>
        <div className="row">
          <div className="col-md-4">
            <img src="/img/fruit1.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
            <span>가격</span>
          </div>
          <div className="col-md-4">
            <img src="/img/fruit2.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
            <span>가격</span>
          </div>
          <div className="col-md-4">
            <img src="/img/fruit3.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
            <span>가격</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
