import React from 'react';

const Header = ({phone, adress}) => {

    return (
        <nav className="uk-navbar-container">
            <div className="uk-container" data-uk-navbar>
                <div className="uk-navbar-left">

                    <ul className="uk-navbar-nav">
                        <li className="uk-active"><a href="#">Active</a></li>
                        <li>
                            <a href="#">Parent</a>
                            <div className="uk-navbar-dropdown">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li className="uk-active"><a href="#">Active</a></li>
                                    <li><a href="#">Item</a></li>
                                    <li><a href="#">Item</a></li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="#">Item</a></li>
                    </ul>

                </div>

                <div className="uk-navbar-right">phone: {phone}, adress: {adress}</div>
            </div>
        </nav>
        
    )
}

export default Header;