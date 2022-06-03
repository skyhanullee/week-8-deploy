import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/github/search">Github Search</Link>
            </li>
            <li>
                <Link to="/github/users/bhague1281">Brian's Github</Link>
            </li>
            <li>
                <Link to="/github/users/surryjm">Surry's Github</Link>
            </li>
            <li>
                Version: {process.env.REACT_APP_VERSION}
            </li>
        </ul>
    );
}