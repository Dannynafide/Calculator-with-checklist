import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MdLock } from 'react-icons/md';
import useAuth from '../hooks/useAuthUser';
import Button from '../components/Button';

function AuthTemplate({ children, label }) {
  const auth = useAuth();

  return (
    <>
      <StyledLock>
        <MdLock size="1.5em" />
      </StyledLock>
      <StyledTitle>{label}</StyledTitle>
      {auth ? (
        <div>
          <StyledParagraf>
            You are logged in. Go to the home page.
          </StyledParagraf>
          <Link to="/">
            <Button type="button">Home Page</Button>
          </Link>
        </div>
      ) : (
        children
      )}
    </>
  );
}

const StyledTitle = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.l};
  margin-top: 20px;
  margin-bottom: 35px;
`;

const StyledLock = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  svg {
    box-sizing: content-box;
    padding: 20px;
    border-radius: 100%;
    background: ${(props) => props.theme.color.secondary};
    color: ${(props) => props.theme.color.background};
  }
`;

const StyledParagraf = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

AuthTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

export default AuthTemplate;
