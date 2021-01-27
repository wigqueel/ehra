import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import HeaderContainer from './styled';
import DesctopIcon from '../../../../assets/icons/desktop.svg';
import DropdownIcon from '../../../../assets/icons/dropdown.svg';

const Header = () => {

    return (
        <HeaderContainer>
            <div className="menu-wrapper">
                <ul>
					<li><NavLink to="/admiral-admin">Dashboard</NavLink></li>
					<li><NavLink to="/admiral-admin/themes">Themes</NavLink></li>
					<li><NavLink to="/admiral-admin/languages">Languages</NavLink></li>
					<li><NavLink to="/admiral-admin/pages">Pages</NavLink></li>
				</ul>
            </div>

            <div className="personal-wrapper">
                <NavLink to="/" className="personal-item pretty-hover"><img src={DesctopIcon} alt="" /></NavLink>
                <div className="personal-item clickable">
					<div className="dropdown-activator" aria-expanded="false">
						<img src="https://picsum.photos/100" alt="" className="small-avatar" />
						<div className="dropdown-button">
							<img src={DropdownIcon} alt="" />
						</div>
					</div>

					<HeaderDropdown />
				</div>
			</div>
        </HeaderContainer>
    )
}

export default Header;