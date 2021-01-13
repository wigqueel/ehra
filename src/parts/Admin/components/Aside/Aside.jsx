import React from 'react';
import AsideContainer from './styled';
import logo from '../../../../assets/images/logo.svg';
import 'simplebar';
import 'simplebar/dist/simplebar.css';


const Aside = () => {
    return (
        <AsideContainer>
            <div className="sidebar-header">
				<div className="logo-wrapper"><img src={logo} alt="" /></div>
				<div className="cn-wrapepr">Admiral Admin</div>
			</div>

			<div className="sidebar-body" data-simplebar>
            	<div className="sidebar-section">
					<ul uk-nav="toggle: > a span.expand-menu" className="uk-nav">
						<li className="uk-parent">
							<a href="/main-page">
                                <span data-uk-icon="home"/>
								<span>Головна</span>
								<span className="expand-menu uk-icon" uk-icon="icon: chevron-left"></span>
							</a>
							<ul className="uk-nav-sub" hidden="">
                                <li><a href="/reviews">Рецензії</a></li>
							</ul>
						</li>
						
						<li className="uk-parent">
							<a href="/for-partners-settings">
                                <span data-uk-icon="users"/>
								<span>Для партнерів</span>
								<span className="expand-menu uk-icon" uk-icon="icon: chevron-left"></span>
							</a>
							<ul className="uk-nav-sub" hidden="">
								<li><a href="/goods-benefits">Переваги продукту</a></li>
								<li><a href="/partners">Наші Партнери</a></li>
								<li><a href="/company-benefits">Переваги компанії</a></li>
								<li><a href="/industrial-exhibitions">Виставки</a></li>
								<li><a href="/team">Команда</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
        </AsideContainer>
    )
}

export default Aside;