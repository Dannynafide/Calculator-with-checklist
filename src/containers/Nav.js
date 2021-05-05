import React from 'react';
import styled from 'styled-components';

import { routes } from '../routes';
import ButtonNav from '../components/Button/ButtonNav';

const Nav = () => {
  return (
    <nav>
      <StyledLinks>
        <li>
          <ButtonNav exact to={routes.home} label="Lets calc!" />
        </li>
        <li>
          <ButtonNav to={routes.check} label="Lets check!" />
        </li>
      </StyledLinks>
    </nav>
  );
};

const StyledLinks = styled.ul`
  /* Remove bullets */
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
`;

export default Nav;
