import styled from 'styled-components';

const StyledBtn = styled.button`
  margin: 0px;
  background: ${(props) =>
    props.secondary ? props.theme.secondaryColor : props.theme.primaryColor};
  border: none;
  border-radius: 15px;
  height: 30px;
  width: 100%;
  padding: 0px 10px;
  color: ${(props) => props.theme.backgroundColor};
  text-decoration: none;

  &:active {
    background: ${(props) =>
      props.secondary
        ? props.theme.secondaryColorLighten
        : props.theme.primaryColorLighten};
    color: black;
  }
`;

export default StyledBtn;
