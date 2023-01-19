import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";               //icones da lixeira e da atualizacao
import { toast } from "react-toastify";                         //feedback


const Table =  styled.table`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
  font-size: 18px;
`;



export const Thead = styled.thead``;
export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {                         //isso aqui é usado para os dispositivos menores que 500px (versao mobile)
    ${(props) => props.onlyWeb && "display: none"}          
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid= ({produtos, setProdutos, setOnEdit}) => {          //recebe as ropriedades que vao vir do banco de dados
    const handleEdit = (item) => {
        setOnEdit(item);
      };
    
      const handleDelete = async (id) => {              
        await axios
          .delete("http://localhost:8800/" + id)
          .then(({ data }) => {                                                    //promise  para validar se a acao deu certo 
            const newArray = produtos.filter((produto) => produto.id !== id);      //(o data é o texto de que o usuario foi deletado com sucesso)
    
            setProdutos(newArray);
            toast.success(data);                               //para que a informacao do data fique na cor verde
          })                                            
          .catch(({ data }) => toast.error(data));
    
        setOnEdit(null);
      };
    

return (
<Table>
    <Thead>
        <Tr>
          <Th>DESCRIÇÃO</Th>
          <Th>VALOR</Th>              //Th sao as colunas
          <Th>TIPO</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
</Thead>
<Tbody>
        {produtos.map((item, i) => (                   
          <Tr key={i}>
            <Td width="30%">{item.descricao}</Td>          
            <Td width="30%">{item.valor}</Td>                 //itens na tabela do site
            <Td width="30%"> {item.tipo}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />           //icone de edicao      
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />       
            </Td>
          </Tr>
        ))}
      </Tbody>
</Table>
);

}
export default Grid;
