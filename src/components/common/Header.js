import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    // {" "} this is put non breaking space in JSX
    const activeStyle = { color: "orange" };
    return (
        <nav> 
            <NavLink activeStyle={activeStyle} to="/" exact>
                Home
            </NavLink>
            {" | "}
            <NavLink activeStyle={activeStyle} to="/courses">
                Courses
            </NavLink>
            {" | "}
            <NavLink activeStyle={activeStyle} to="/about">
                About
            </NavLink>   
        </nav> 
    );
}

export default Header;