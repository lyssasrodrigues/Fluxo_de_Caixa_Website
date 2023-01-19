import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; //é o feedback que da em tela quando o usuario faz alguma acao
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const Container = styled.div`     //ESTILIZACAO DO COMPONENTE Container
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;     //string vazia porque o titulo nao vai ter uma estilizacao especifica


function App() {
  
  const [produtos, setProdutos] = useState([]);          //receber os produtos do banco de dados
  const [onEdit, setOnEdit] = useState(null);           //para editar esses produtos

  const getProdutos = async () => {                  //async porque vai esperar o banco de dados retornar os produtos
    try {
      const res = await axios.get("http://localhost:8800");                         //local do nosso projeto
      setProdutos(res.data.sort((a, b) => (a.descricao> b.descricao ? 1 : -1)));    //vai ordenar a descricao dos produtos na tabela por ordem alfabetica
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {               //useeffect recebe a funcao e faz seu recarregamento
    getProdutos();
  }, [setProdutos]);

  return (
    <>

    <Container>  
      <Title>FLUXO DE CAIXA</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getProdutos={getProdutos} />
        <Grid setOnEdit={setOnEdit} produtos={produtos} setProdutos={setProdutos} />    //receber no grid os produtos
    </Container>
    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />             //POSICAO DO FEEDBACK
    <GlobalStyle />
    
    </>


  );
  }

export default App
