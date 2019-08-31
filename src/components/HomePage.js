import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className= "jumbotron">
            <h1>Administration</h1>
            <p>React, Flux router for ultra-responsive web apps </p>
            <Link to="about" className="btn btn-primary">
                About
            </Link>
        </div>
    );
}

export default HomePage;