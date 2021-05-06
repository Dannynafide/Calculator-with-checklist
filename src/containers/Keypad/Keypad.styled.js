import styled from 'styled-components';
import ButtonKey from './ButtonKey';

export const InputKeypad = styled.input`
  width: 100%;
  text-align: right;
  font-size: ${(props) => props.theme.fontSize.m};
  background: transparent;
  overflow: hidden;
  caret-color: ${(props) => props.theme.color.primary};
  border: none;
  color: ${(props) => props.theme.fontColor.primary};

  :focus {
    outline: none;
  }
`;

export const StyledBracketKeys = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  > * {
    line-height: 20px;
    color: ${(props) => props.theme.color.primary};
    background: transparent;
    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: 4px;
  }
`;

export const StyledInputKeys = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 7fr 4fr;
  column-gap: 12px;
`;

export const StyledDigitKeys = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 12px;

  > * {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    color: ${(props) => props.theme.fontColor.primary};
    font-size: ${(props) => props.theme.fontSize.m};
  }
`;

export const StyledOperatorKeys = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 36px);
  grid-template-rows: repeat(4, 36px);
  column-gap: 12px;
  row-gap: 12px;
  justify-content: end;

  > * {
    background-color: ${(props) => props.theme.color.primary};
    border: none;
    border-radius: 30px;
    color: ${(props) => props.theme.color.background};
    font-size: ${(props) => props.theme.fontSize.m};
  }
`;

export const ButtonKeyDivide = styled(ButtonKey)`
  font-size: ${(props) => props.theme.fontSize.xxs};
  font-weight: bold;
  transform: rotate(10deg);
`;

export const ButtonKeyAdd = styled(ButtonKey)`
  grid-row: 2 / 4;
`;
export const ButtonKeyEquals = styled(ButtonKey)`
  grid-column: span 2;
  background: ${(props) => props.theme.color.secondary};

  display: flex;
  justify-content: center;

  > * {
    align-self: center;
  }
`;

export const ButtonKeyPercent = styled(ButtonKey)`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: bold;
`;
