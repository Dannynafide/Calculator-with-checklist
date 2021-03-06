import styled, { keyframes, css } from 'styled-components';

const fadein = keyframes`
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 1rem;
      opacity: 1;
    }
`;

const fadeout = keyframes`
    from {
      bottom: 1rem;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  padding: 6px 10px;
  border-radius: 5px;
  border: transparent;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.background};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${fadein} 0.5s, ${fadeout} 0.5s ${(props) => props.time};

  ${(props) =>
    props.type === 'error' &&
    css`
      background: ${props.theme.snackbar.error};
    `}
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.875rem;
  padding: 0;
  margin-left: 1rem;
  height: 1.75rem;
  width: 1.75rem;
  text-align: center;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: ${(props) => props.theme.color.background};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.secondaryLighten};
  }

  ${(props) =>
    props.type === 'error' &&
    css`
      &:hover {
        background-color: ${props.theme.snackbar.errorLighten};
      }
    `}
`;
