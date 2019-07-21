import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = (props) => {
    return(
        <React.Fragment>
            <div className="main-nav">
                <Nav />
            </div>        
            <div className="content">
                {props.children}
            </div>       
            <Footer 
                email="jingliuweb@gmail.com" 
            />
        </React.Fragment>
    )
}

export default Layout;

