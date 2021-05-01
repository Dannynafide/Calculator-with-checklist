import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

import { MdMenu, MdExitToApp, MdDelete, MdCreate } from 'react-icons/md';
import { Accordion, AccordionSummary } from '@material-ui/core';

import {
  selectExpenses,
  selectCurrentExpense,
  setCurrentExpense,
  addNewExpense,
  removeExpense,
} from '../features/calculator/calculatorSlice';
import { logoutAsync, selectCurrentUser } from '../features/auth/authSlice';
import Button from '../components/Button';
import { routes } from '../routes';

const AppBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);

  const currentExpense = useSelector(selectCurrentExpense);
  const nameCurrentExpense = currentExpense
    ? currentExpense.name || 'No name'
    : '';

  const [isAccordion, setIsAccordion] = useState(false);
  const isUser = useSelector(selectCurrentUser);

  return isUser ? (
    <StyledAppBar>
      <StyledAccordion expanded={isAccordion}>
        <StyledAccordionSummary
          expandIcon={<StyledHamburgerBtn />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setIsAccordion(!isAccordion)}
        >
          <span>{nameCurrentExpense}</span>
        </StyledAccordionSummary>
        <StyledOptionsPanel>
          <Button
            secondary
            onClick={() =>
              dispatch(addNewExpense()) &&
              !setIsAccordion(!isAccordion) &&
              !history.push(routes.home)
            }
          >
            Add new calculate
          </Button>
          <Button
            onClick={() =>
              dispatch(logoutAsync()) &&
              !setIsAccordion(!isAccordion) &&
              !history.push(routes.login)
            }
          >
            <StyledFlexYCenter>
              Logout
              <StyledExitToAppIcon size="1.5em" />
            </StyledFlexYCenter>
          </Button>
        </StyledOptionsPanel>
        <StyledCalculationList>
          {expenses.length > 0 ? (
            expenses.map((item) => {
              const cost = item.toDo.reduce(
                (acc, val) => acc + evaluate(val.cost),
                0
              );
              return (
                <StyledCalculationItem key={item.id}>
                  <StyledFlexYCenter>
                    <Link
                      to={`/editExpense/${item.id}`}
                      onClick={() => setIsAccordion(!isAccordion)}
                    >
                      <StyledCreateIcon fontSize="small" />
                    </Link>
                    <StyledNameItem
                      onClick={() =>
                        dispatch(setCurrentExpense(item.id)) &&
                        setIsAccordion(!isAccordion)
                      }
                    >
                      {item.name || 'No name'}
                    </StyledNameItem>
                  </StyledFlexYCenter>
                  <StyledFlexYCenter>
                    <span>{cost}</span>
                    <StyledDeleteIcon
                      fontSize="small"
                      onClick={() => dispatch(removeExpense(item.id))}
                    />
                  </StyledFlexYCenter>
                </StyledCalculationItem>
              );
            })
          ) : (
            <StyledNoExpenses>
              Don<span>&#39;</span>t wait! Add a new calculate! 😀
            </StyledNoExpenses>
          )}
        </StyledCalculationList>
      </StyledAccordion>
    </StyledAppBar>
  ) : (
    <></>
  );
};
const StyledAppBar = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.background};
  padding: 0px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.fontColor.primary};
`;

const StyledHamburgerBtn = styled(MdMenu)`
  && {
    border: none;
    background-color: ${(props) => props.theme.color.background};
    color: ${(props) => props.theme.fontColor.primary};

    :hover {
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const StyledAccordion = styled(Accordion)`
  && {
    font-size: ${(props) => props.theme.fontSize.s};
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.fontColor.primary};
    box-shadow: none;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  && {
    font-size: ${(props) => props.theme.fontSize.m};
    margin: 0px;
    padding: 0px;
    border: none;
    overflow: hidden;

    :hover {
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const StyledOptionsPanel = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 5px 0px;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  align-items: center;
`;

const StyledCalculationList = styled.ul`
  list-style-type: none;
  margin: 10px 0px;
  padding: 0px;
  padding-bottom: 10px;
`;

const StyledCalculationItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  margin: 5px 0px;
  padding: 5px 0px;
`;

const StyledNameItem = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.color.primary};
  }
`;

const StyledFlexYCenter = styled.div`
  display: flex;
  align-items: center;
`;

const StyledExitToAppIcon = styled(MdExitToApp)`
  margin-left: 5px;
`;

const StyledDeleteIcon = styled(MdDelete)`
  margin-left: 10px;
  color: ${(props) => props.theme.fontColor.hidden};
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.color.error};
  }
`;

const StyledCreateIcon = styled(MdCreate)`
  margin-right: 10px;
  color: ${(props) => props.theme.fontColor.hidden};
  :hover {
    color: ${(props) => props.theme.color.primary};
  }
`;

const StyledNoExpenses = styled.div`
  width: 100%;
  text-align: center;
  margin: 40px 0px 20px 0px;
`;

export default AppBar;
