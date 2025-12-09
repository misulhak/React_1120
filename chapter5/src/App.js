import { useState } from 'react';
import './App.css';
import Body2 from './component/Body2';
import Footer from './component/Footer';
import Header from './component/Header';

function App() {
    
  const [MyData, setMyData] = useState({
    front: ['HTML', 'CSS', 'JavaScript', 'Jquery'],
    back: ['Java', 'Spring', 'Oracle', 'JSP'],
  })

    console.log("-----MyData-----");
    console.log(MyData);
    console.log("-----MyData.front-----");
    console.log(MyData.front);
    console.log(MyData.back);
    

  const addFront = () => {
    MyData.front.push('ReactJS');
    console.log(MyData.front);
    setMyData(MyData);
  }

  const addBack = () => {
    const newBack = [...MyData.back, 'NodeJS'];
    console.log(newBack);

    const newMyData = {...MyData, back: newBack};
    console.log("-----newMyData-----")
    console.log(newMyData);
    setMyData(newMyData);
  }

  return (
    <div className="App">
      <Header />
      {/*<Body2 />*/}
      <button onClick={addFront}>프론트엔드 추가</button>
      <button onClick={addBack}>백엔드 추가</button>
      <Footer />
    </div>
  );
}


export default App;
