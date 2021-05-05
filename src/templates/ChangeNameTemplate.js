import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { MdArrowBack } from 'react-icons/md';
import { routes } from '../routes/index';
import Button from '../components/Button/Button';
import Input from '../components/Input';

export default function ChangeNameTemplate({ id, name, cost, submit }) {
  const [newName, setNewName] = useState(name);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(submit({ id, name: newName }));
    history.push(routes.home);
  };

  return (
    <>
      <StyledWrapperBackIcon>
        <StyledBackIconBtn to={routes.home}>
          <StyledArrowBackIosIcon fontSize="big" />
        </StyledBackIconBtn>
      </StyledWrapperBackIcon>

      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={newName}
          placeholder="name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <StyledCost>{cost}</StyledCost>

        <StyledButton>SAVE</StyledButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledWrapperBackIcon = styled.div`
  margin: 30px 0 100px 0;
`;
const StyledBackIconBtn = styled(Link)`
  background: transparent;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
`;
const StyledArrowBackIosIcon = styled(MdArrowBack)`
  && {
    color: ${(props) => props.theme.color.primary};
  }
`;
const StyledInput = styled(Input)`
  font-size: ${(props) => props.theme.fontSize.m};
`;

const StyledCost = styled.p`
  align-self: flex-end;
  color: ${(props) => props.theme.fontColor.secondary};
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 90px;
  margin: 20px 0 120px 0;
`;
ChangeNameTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  cost: PropTypes.string,
};
ChangeNameTemplate.defaultProps = {
  cost: null,
};
