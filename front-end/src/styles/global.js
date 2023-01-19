import { createGlobalStyle } from "styled-components";
//A biblioteca styled-components é uma biblioteca do react que faz a estilizacao dos componentes. Ele permita a escrita de codigos CSS dentro do JS

//ESTILIZACAO GLOBAL:
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
    outline: none;
    background-color:aliceblue;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: cadetblue;
  }
`;

export default GlobalStyle;
