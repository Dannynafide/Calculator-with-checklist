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
    background: rgba(219, 239, 180, 0.9);
    color: black;
  }
`;

export default StyledBtn;
