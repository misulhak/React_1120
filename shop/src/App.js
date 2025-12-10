import { useState } from "react";
import "./App.css";
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import data from "./db/fruit";
import Products from "./components/Products";
import { Routes, Route, useNavigate} from 'react-router-dom';
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Member from "./components/Member";
import Location from "./components/Location";
import Title from "./components/Title";

function App() {

  const [fruit, setFruit] = useState(data);
  const navigate = useNavigate();

  console.log(fruit);

  const sortByName = () => {
    let sortedFruit = [...fruit].sort((a, b) => (a.title > b.title ? 1 : -1));
    setFruit(sortedFruit);
    console.log(sortedFruit);
  };

  const sortByPriceLowToHigh = () => {
    let sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit);
    console.log(sortedFruit);
  };

  const sortByPriceHighToLow = () => {
    let sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit);
    console.log(sortedFruit);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">과일농장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>홈으로</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link> 
            <Nav.Link onClick={() => { navigate('/about') }}>회사소개</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    
      <Routes>
          <Route path="/" element={<div>            
            <div className="slider"></div>
              <Title />

              <div class="container">
                <div class="row">
                  <div style={{ textAlign: "center" }}>
                    <Button className="me-2" variant="outline-primary" onClick={sortByName}>이름순 정렬</Button>
                    <Button className="me-2" variant="outline-secondary" onClick={sortByPriceLowToHigh}>낮은가격순 정렬</Button>
                    <Button variant="outline-success" onClick={sortByPriceHighToLow}>높은가격순 정렬</Button>
                  </div>
                  </div>
              </div>

              <div className="container" style={{marginTop:'30px'}}>
              <div className="row">                    
                {
                  fruit.map((fruit) =>  
                    <Products {...fruit} key={fruit.id} />
                  )
                }
              </div>
              </div>
          </div> } />
          
          <Route path="/detail/:paramId" element={<Detail fruit = {fruit} />} />
          
          <Route path="/about" element={<About />} >
            <Route path="member" element={<Member />} />
            <Route path="location" element={<Location />} />
          </Route>


          <Route path="/*" element={ <NotFound /> } />      
        </Routes>
    </div>
  );
}


export default App;
