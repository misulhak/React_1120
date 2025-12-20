import React, { useReducer, useRef} from 'react'
import './App.css'
import Header from './component/Header'
import TodoEditor from './component/TodoEditor'
import TodoList from './component/TodoList'

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createDate: new Date().getTime(),
  },
]

function reducer(state, action){

  switch(action.type){
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map( (it) => it.id === action.id ? {...it, isDone: !it.isDone}: it )
    case "DELETE":
      return state.filter(it => it.id !== action.id)
    default:
      return state;
  }
}

export const TodoContext = React.createContext();

function App() {
  
  const [todo, dispatch] = useReducer(reducer, mockTodo)
  const idRef = useRef(3);
  
  /* 데이타 추가 하기*/
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content: content,
        isDone: false,
        createDate: new Date().getTime()
      }
    })
    idRef.current += 1;
  };

  /* 데이타 수정 하기*/
  const OnUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      id: targetId
    });
  };

  /* 데이타 삭제 하기*/
  const onDelete = (targetId) =>{
    dispatch({
      type: "DELETE",
      id: targetId
    });
  };
  
  return (
    <div className="App">

      {/* <TestComp /> */}

      <Header />

      <TodoContext.Provider value ={{todo, onCreate, OnUpdate , onDelete }}>        
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>

    </div>
  )
}

export default App
