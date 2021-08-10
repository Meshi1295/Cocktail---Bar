import React from 'react'
import './style.css';
import Header from '../components/header/Header'
import Footer from '../components/header/footer/Footer'

const Layout = (props) => {
    return (
        <div className= "container">
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout
