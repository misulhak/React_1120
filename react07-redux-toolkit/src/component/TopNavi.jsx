import React from 'react';
import { NavLink } from 'react-router-dom';

const TopNavi = () => {
    return (
        <nav>
            <NavLink to="/ReduxBasicApp">기본사용법</NavLink>
            <NavLink to="/TodoApp">할 일 관리</NavLink>            
        </nav>
    );
};

export default TopNavi;