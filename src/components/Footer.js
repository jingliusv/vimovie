import React from 'react';

const Footer = ({email}) => {
    const getFullYear = () => {
        const d = new Date();
        return d.getFullYear();
    }

    return(
        <footer className="footer">
            <div className="footer-nav">
                <div className="copy">
                    <span><i className="copyright outline icon"></i>{getFullYear()} Jing Liu. All rights reserved. </span>
                    <span>Designed and coded by me, data provided by <a href="https://www.themoviedb.org/">TMDB</a>.</span>
                </div>

                <div className="socials">
                    <a href={"mailto:" + email}><i className="envelope icon"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;