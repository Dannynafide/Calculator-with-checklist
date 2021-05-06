import styled from 'styled-components';

export const StyledButton = styled.button`
  overflow: hidden;
  outline: none;
  position: relative;
  cursor: pointer;
  margin: 10px 0px;
  padding: 0px 10px;
  height: 30px;
  width: 100%;
  background: ${(props) =>
    props.secondary ? props.theme.color.secondary : props.theme.color.primary};
  color: ${(props) => props.theme.color.background};
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 15px;

  :hover {
    z-index: 2;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 2.275);
    transition-duration: 400ms;
    transform: scale(1.05, 1.05) translate3d(0, 0, 0);
  }

  /* this fixes the overflow:hidden in Chrome */
  mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
`;
