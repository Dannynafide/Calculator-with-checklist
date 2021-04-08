import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonNav from './ButtonNav/ButtonNav';
import './Navigation.scss';
import { routes } from '../../routes';
import { withRouter } from 'react-router';

class Navigation extends React.Component {
  getNavLinkClass = (path) => {
    return this.props.location.pathname === path ? 'active' : '';
  };

  render() {
    return (
      <nav className="navigation">
        <ul className="no-bullets">
          <ButtonNav addClassName={this.getNavLinkClass(routes.home)}>
            <NavLink exact to={routes.home}>
              Lets calc!
            </NavLink>
          </ButtonNav>
          <ButtonNav addClassName={this.getNavLinkClass(routes.check)}>
            <NavLink to={routes.check}>Lets check!</NavLink>
          </ButtonNav>
        </ul>
      </nav>
    );
  }
}
export default Navigation = withRouter(Navigation);
