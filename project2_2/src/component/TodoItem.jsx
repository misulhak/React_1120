import React from 'react';
import "./TodoItem.css";
import { useContext } from 'react';
import { TodoContext } from '../App';

const TodoItem = ({id, content, isDone, createDate }) => {

    const {OnUpdate, onDelete} = useContext(TodoContext);

    return (
        <div className='TodoItem'>
            <div className='checkbox_col'>
                <input type="checkbox" 
                onClick={ ()=> OnUpdate(id)}
                checked={isDone} />
            </div>

            <div className='title_col'>
                {content}
            </div>

            <div className='date_col'>
                {new Date(createDate).toLocaleDateString()}
            </div>

            <div className='btn_col'>
                <button onClick={() =>onDelete(id) }>삭제</button>
            </div>
        </div>
    );
};

export default TodoItem;