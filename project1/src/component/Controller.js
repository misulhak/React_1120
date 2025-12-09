import React from 'react';

const Controller = ({handleSetCount}) => {
    
    const handleClick = () => {
        handleSetCount(-1);
    }

    const handleClick2 = () => {
        handleSetCount(-10);
    }

    const handleClick3 = () => {
        handleSetCount(-100);
    }

    return (
        <div>
            <button onClick={handleClick}>-1</button>
            <button onClick={handleClick2}>-10</button>
            <button onClick={handleClick3}>-100</button>
            <button onClick={()=>{handleSetCount(100)}}>+100</button>
            <button onClick={()=>{handleSetCount(10)}}>+10</button>
            <button onClick={()=>{handleSetCount(1)}}>+1</button>
        </div>
    );
};

export default Controller;