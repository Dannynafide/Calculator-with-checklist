import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { routes } from '../routes/index';
import Button from '../components/Button';
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
          <StyledArrowBackIosIcon fontSize="small" />
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
const StyledArrowBackIosIcon = styled(ArrowBackIosIcon)`
  && {
    color: ${(props) => props.theme.primaryColor};
  }
`;
const StyledInput = styled(Input)`
  text-align: right;
  font-size: 16px;
`;

const StyledCost = styled.p`
  align-self: flex-end;
  color: rgba(255, 255, 255, 0.6);
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  width: 90px;
  margin: 20px 0 120px 0;
`;
ChangeNameTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};
