import styled from 'styled-components';

const StyledBtn = styled.button`
  margin: 0px;
  padding: 0px 10px;
  height: 30px;
  width: 100%;
  background: ${(props) =>
    props.secondary ? props.theme.color.secondary : props.theme.color.primary};
  color: ${(props) => props.theme.color.background};
  text-decoration: none;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:active {
    background: ${(props) =>
      props.secondary
        ? props.theme.color.secondaryDarken
        : props.theme.color.primaryDarken};
  }
`;

export default StyledBtn;
