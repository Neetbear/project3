import {Outlet, Link} from 'react-router-dom';
import styled, { css } from "styled-components";
import Navbar from './Navbar';

const Layout = () => {
    const navStyle ={
        // display: 'flex'
    }

    const ulStyle = {
        display: 'flex',
        
        // position: 'relative'

    }

    const liStyle = {
        padding: '10px',
        border: 'dotted',
        // display: 'none'
        'list-style': 'none'
    }
   
    const onLogoutHandler  = () => {
        window.localStorage.clear("loginUser")
        window.location.replace("/")
    };

    if ( window.localStorage.getItem("loginStatus") ) {
        return(
            <>
            <Navbar />
                <Outlet />
            </>
        );
    } else {
        return(
            <>
     
                <Outlet />
            </>
        );
    };
};

export default Layout;