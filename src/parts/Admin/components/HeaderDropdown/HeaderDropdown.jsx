import React from 'react';

import HeaderDropdownConrainer from './styled';
import PhoneIcon from '../../../../assets/icons/phone.svg';
import MailIcon from '../../../../assets/icons/mail.svg';

const HeaderDropdown = () => {

    return (
        <HeaderDropdownConrainer data-uk-dropdown="mode: click; offset: 10">
            <div className="dropdown-header">
                <div className="header-avatar">
                    <img src="https://picsum.photos/200" alt="" />
                </div>
                <div className="header-fio">Nahnybida Andrii</div>
                <div className="header-role">Admin</div>
            </div>
            <div className="dropdown-body-1">
                <div className="dropdown-body-1-item">
                    <img src={PhoneIcon} alt="" />
                    <span>+38 (099) 999-99-99</span>
                </div>

                <div className="dropdown-body-1-item">
                    <img src={MailIcon} alt="" />
                    <span>prreha@gmail.com</span>
                </div>
            </div>

            <div className="dropdown-body-2">
                <div className="dropdown-body-2-item"><a href="/my-profile">Мій профіль</a></div>
                <div className="dropdown-body-2-item"><a className="signout" href="/login/logout" data-method="post">Вийти</a></div>
            </div>
        </HeaderDropdownConrainer>
    )
}

export default HeaderDropdown;