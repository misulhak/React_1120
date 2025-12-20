import React, { useState, useContext } from 'react';
import "./TodoList.css";
import TodoItem from './TodoItem';
import { TodoContext } from '../App';

const TodoList = () => {

    const {todo} = useContext(TodoContext);

    const [search, setSearch] = useState("");

    const onChangeSearch = (e)=>{
        setSearch(e.target.value);
    }

    const getSearchResult = () => {
        return search === "" ? 
                todo : 
                todo.filter((it)=> 
                    it.content.toLowerCase().includes(search.toLowerCase()))
    };


    return (
    <div className='TodoList'>
        <h4>Todo List</h4>
        <input className='searchbar'
            onChange={onChangeSearch} 
            //onClick={(e) => setSearch(e.target.value)}
            placeholder='검색어를 입력하세요' />

        <div className='list_wrapper'>
            {
                getSearchResult().map( it => <TodoItem key={it.id} {...it} />)
            }
        </div>

    </div>
    );
};

export default TodoList;