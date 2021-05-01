import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { MdCheck } from 'react-icons/md';

const ItemDetails = ({ item, removeMathOperation, setComplite }) => {
  const { id, name, cost, complite } = item;
  const classActive = complite ? ' active' : '';

  return (
    <>
      <StyledDetailsWrapper>
        <StyledRemoveBtn onClick={removeMathOperation}>
          <span>&#215;</span>
        </StyledRemoveBtn>
        <StyledName to={`/edit/${id}`} className={classActive}>
          {name || 'No name'}
        </StyledName>
        <StyledCost className={classActive}>{cost}</StyledCost>
        <StyledBtnChecked onClick={setComplite} className={classActive}>
          <MdCheck fontSize="small" />
        </StyledBtnChecked>
      </StyledDetailsWrapper>
      <StyledUnderline />
    </>
  );
};
const StyledDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  align-items: center;
  grid-gap: 10px;
  margin: 10px 0;
`;

const StyledName = styled(Link)`
  color: white;
  text-decoration: none;
  &.active {
    color: ${(props) => props.theme.fontColor.hidden};
  }
  &:hover {
    color: ${(props) => props.theme.color.primary};
  }
`;

const StyledCost = styled.div`
  color: white;

  text-overflow: ellipsis;
  overflow: hidden;
  text-align: right;
  &.active {
    color: ${(props) => props.theme.fontColor.hidden};
  }
`;

const StyledBtnChecked = styled.button`
  border: 2px solid ${(props) => props.theme.color.border};
  color: rgba(255, 255, 255, 0.1);
  background-color: transparent;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &.active {
    border: 2px solid ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.color.primary};
  }

  &:hover {
    color: ${(props) => props.theme.color.primary};
  }
`;

const StyledUnderline = styled.hr`
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
`;

const StyledRemoveBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.m};
  color: ${(props) => props.theme.fontColor.hidden};
  background: transparent;
  border: none;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.color.error};
  }
`;
ItemDetails.propTypes = {
  removeMathOperation: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    complite: PropTypes.bool.isRequired,
  }).isRequired,
  setComplite: PropTypes.func.isRequired,
};

export default ItemDetails;
