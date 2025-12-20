import React, { useReducer, useState } from 'react';


function reducer(state, action){

    switch(action.type){
        case "INCREASE":
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        default:
            return state;
    }
}

const TestComp = () => {

    const [count, dispatch] = useReducer(reducer, 0);

    const ins = () => dispatch({
        type: "INCREASE",
        data: 1
    });
  
    const des = () => dispatch({
        type: "DECREASE",
        data: 1
    });

    return (
        <div>
            <h4>테스트 컴포런트</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <button onClick={ ins } >+</button>
            <button onClick={ des }>-</button>
        </div>
    );
};

export default TestComp;