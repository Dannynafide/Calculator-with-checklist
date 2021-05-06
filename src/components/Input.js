import styled from 'styled-components';

const Input = styled.input`
  align-self: flex-end;
  width: 100%;
  padding: 7px 0px;
  margin-top: 15px;
  font-weight: 300;

  text-align: left;
  font-size: 14px;
  background: transparent;
  border: none;
  caret-color: ${(props) => props.theme.color.primary};
  overflow: hidden;
  color: ${(props) => props.theme.fontColor.primary};
  letter-spacing: 1px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.color.borderActive};
  }
  &::placeholder {
    color: ${(props) => props.theme.fontColor.secondary};
    padding: 0px 1px;
  }

  :hover {
    border-bottom: 1px solid ${(props) => props.theme.color.borderActive};
  }
`;

export default Input;
