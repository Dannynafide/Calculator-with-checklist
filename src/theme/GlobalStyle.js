import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
   }

   :root {
     font-size: 14px;
   }

   body {
     background-color: #7d8890;
     font-family: 'Cairo', sans-serif;
     font-weight: 400;

   }



`;
