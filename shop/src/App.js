import { useState } from "react";
import "./App.css";
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import data from "./db/fruit";
import Products from "./components/Products";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Member from "./components/Member";
import Location from "./components/Location";
import Title from "./components/Title";
import Title2 from "./components/Title2";
import data2 from "./db/veggie";
import ComVeggie from "./components/ComVeggie";
import Footer from "./components/Footer";
import axios from 'axios'
import Cart from "./components/Cart";
import Board from "./components/Board";

function App() {

  const [fruit, setFruit] = useState(data);
  let [veggie, setVeggie] = useState(data2);
  let [count, setCount] = useState(1);
  let [input, setInput] = useState("");
  const navigate = useNavigate();

  const sortByName = () => {
    let sortedFruit = [...fruit].sort((a, b) => (a.title > b.title ? 1 : -1));
    setFruit(sortedFruit);
  };

  const sortByPriceLowToHigh = () => {
    let sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit);
  };

  const sortByPriceHighToLow = () => {
    let sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>과일농장</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>홈으로</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/1') }}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>회사소개</Nav.Link>
            <Nav.Link onClick={() => { navigate("/Board"); }}> 게시판</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <div>
            <div className="slider" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/slider.jpg'})`, }}>
            </div>
            <Title />

            <div className="container">
              <div className="row">
                <div className="col-md-6" style={{ textAlign: "left" }}>
                  {/* 검색 추가 */}
                  <input
                    placeholder="상품명을 입력하세요"
                    // 검색어가 변경될 때마다 input 값을 업데이트
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    style={{
                      padding: "10px",
                      marginLeft: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      width: "250px",
                      marginRight: "10px"
                    }}
                  />

                </div>
                <div className="col-md-6" style={{ textAlign: "right" }}>
                  {/* select추가 */}
                  <select
                    onChange={(e) => {
                      if (e.target.value === "low") sortByPriceLowToHigh();
                      if (e.target.value === "high") sortByPriceHighToLow();
                      if (e.target.value === "name") sortByName();
                    }}
                    style={{
                      padding: "10px",
                      marginLeft: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      width: "150px"
                    }}>
                    <option value="">정렬 선택</option>
                    <option value="low">낮은 가격순</option>
                    <option value="high">높은 가격순</option>
                    <option value="name">이름순</option>
                  </select>
                </div>
              </div>
            </div>

            {/* <div className="container"  style={{marginTop:'30px'}}>
                      <div className="row">
                            {
                                fruit.map((ele,i)=>{
                                  return(
                                      <Products fruit={fruit[i]}  i={i}  key={fruit[i].id} />
                                  )
                                })
                            }
                      </div>
                </div> */}

            <div className="container" style={{ marginTop: "30px" }}>
              <div className="row">
                {/* 'input'에 맞는 제목을 가진 항목들만 필터링 */}
                {/* .filter(...)   조건에 맞는 데이터만 걸러냄
                      .map(...)   걸러낸 데이터를 기반으로 컴포넌트를 렌더링 */}
                {fruit
                  .filter((item) =>
                    item.title.toLowerCase().includes(input.toLowerCase()) // 제목 검색
                  )
                  .map((fruit) => (
                    <Products {...fruit} key={fruit.id} /> // 필터링된 항목 출력
                  ))}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div style={{ textAlign: "center" }}>
                  <Title2 />
                  <Button variant="outline-success"
                    count={count} onClick={() => {
                      if (count == 1) {
                        axios.get("https://dino-21.github.io/react_data/veggie2.json").

                          then((result) => {
                            let copy10 = [...veggie, ...result.data];
                            setVeggie(copy10);
                            setCount(count + 1);
                          });
                      } else if (count == 2) {
                        axios
                          .get(
                            "https://dino-21.github.io/react_data/veggie3.json"
                          )
                          .then((result) => {
                            let copy11 = [...veggie, ...result.data];
                            setVeggie(copy11);
                            setCount(count + 1);
                          });
                      }

                      if (count === 3) {
                        alert("더이상 상품이 없습니다.");
                      }
                    }}
                  > + 3개 상품 더 보기 </Button>
                </div>
              </div>
            </div>

            <div className="container mt-3">
              <div className="row">
                {veggie.map((item) => (
                  <ComVeggie {...item} key={item.id} />
                ))}
              </div>
            </div>
            <Footer />
          </div>
        }
        />

        <Route path="/detail/:paramId" element={<Detail fruit={fruit} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} >
          <Route path="member" element={<Member />} />
          <Route path="location" element={<Location />} />
        </Route>
        <Route path="/board" element={<Board />} />
      </Routes>

    </div>


  );
}



export default App;