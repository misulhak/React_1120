import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./page/Home";
import New from "./page/New";
import Diary from "./page/Diary";
import Edit from "./page/Edit";
import React, { useEffect, useReducer, useRef, useState } from 'react';

function reducer(state, action){
  switch(action.type){
    case "CREATE":{
      return [action.data, ...state]
    }
    /*[
      {id:1, date: 12-4, content: xxxx, emtionId:1},
      {id:2, date: 12-5, content: xxxx, emtionId:3},
      {id:3, date: 12-6, content: xxxx, emtionId:6}
    ] 
    [ 
      {id:4, date: 12-9, content: xxxx, emtionId:3},
      {id:1, date: 12-4, content: xxxx, emtionId:1},
      {id:2, date: 12-5, content: xxxx, emtionId:3}, 
      {id:3, date: 12-6, content: xxxx, emtionId:6}
    ]  
    */

    // data : {id:2, date:12=10, content: -----, emotionId:5} 
    case "UPDATE":{
      return state.map((it)=>
        String(it.id) === String(action.data.id) ? {...action.data} :  it
      );
    }
    /*
      [
        {id:4, date: 12-9, content: xxxx, emtionId:3} ,
        {id:1, date: 12-4, content: xxxx, emtionId:1},
        {id:2, date:12=10, content: -----, emotionId:5} ,
        {id:3, date: 12-6, content: xxxx, emtionId:6}
      ]
    */
    case "DELETE":{
      return state.filter((it)=> String(it.id) !== String(action.targetId))
    }
    /*
      action.targetId => 2
      [
        {id:4, date: 12-9, content: xxxx, emtionId:3} ,
        {id:1, date: 12-4, content: xxxx, emtionId:1},
        {id:3, date: 12-6, content: xxxx, emtionId:6}
      ]
    */
    case "INIT":
      return action.data;
      
    default:{
      return state;
    }    
  }
}

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() ,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime(),
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime(),
    content: "mock3",
    emotionId: 3,
  }
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isDataLoaded, setIsDataLoaded]  = useState(false);
  const idRef = useRef(0);

  useEffect(()=>{
    dispatch({
      type: "INIT",
      data: mockData
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = ({ date, content, emotionId }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content: content,
        emotionId: emotionId
      }
    });
    idRef.current += 1;
  }

  const OnUpdate = ({id, date, content, emotionId}) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    });
  };

  const OnDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId     
    })
  };

  if(!isDataLoaded){
    return <div><h1>데이터를 불러오는 중입니다</h1></div>
  }else{
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider 
                value={{onCreate, OnUpdate, OnDelete}}>
          <div className="App">
            <Routes>
              <Route path="/" element={ <Home />} />
              <Route path="/new" element={ <New />} />
              <Route path="/diary/:id" element={ <Diary />} />   
              <Route path="/edit/:id" element={ <Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
