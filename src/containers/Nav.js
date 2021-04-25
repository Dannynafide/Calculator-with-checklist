import React from 'react';
import styled from 'styled-components';

import { routes } from '../routes';
import ButtonNav from '../components/ButtonNav';

const Nav = () => {
  return (
    <StyledNav>
      <StyledLinks>
        <li>
          <ButtonNav exact to={routes.home} label="Lets calc!" />
        </li>
        <li>
          <ButtonNav to={routes.check} label="Lets check!" />
        </li>
      </StyledLinks>
    </StyledNav>
  );
};
const StyledNav = styled.nav``;

const StyledLinks = styled.ul`
  /* Remove bullets */
  list-style-type: none;
  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
`;

export default Nav;
