/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/css'
import { Link} from 'react-router-dom';

function Navbar() {

    const header = css`
    background-color: #F5D5CB;
    `

    const navbarLink = css`
    text-decoration: none;
    `

    return (
        <nav className={header + ' navbar navbar-expand-lg'}>
          <div className="container-fluid">
          <Link className={navbarLink} to='/'><a className="navbar-brand" href="#"><i className="bi bi-database-fill"></i>AnimeDB</a></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={navbarLink} to='/'><a className="nav-link active" aria-current="page">Home</a></Link>
                </li>
                <li className="nav-item">
                  
                  <Link className={navbarLink} to='/collections'><a className="nav-link active" aria-current="page">Collections</a></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )

}
export default Navbar