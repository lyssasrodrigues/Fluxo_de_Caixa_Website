import axios from "axios";
import React from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`  //FormContainer-componente (FORMULARIO DO SITE)
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  font-size: 18px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const Input = styled.input`
  width: 120px;
  padding: 5px 15px;
  border: 1px solid ;
  border-radius: 5px;
  height: 40px;
  font-size: 25px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 25px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color:aquamarine; 
  color: black;
  height: 20px;
  font-size: 15px;
`;

const Form = ({ getProdutos, onEdit, setOnEdit }) => {
    const ref = useRef();
    
  useEffect(() => {
    if (onEdit) {
      const produto = ref.current;

      produto.descricao.value = onEdit.descricao;
      produto.valor.value = onEdit.valor;
      produto.tipo.value = onEdit.tipo;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = ref.current;

    if (
      !produto.descricao.value ||
      !produto.valor.value ||
      !produto.tipo.value 
    ) {
      return toast.warn("Preencha todos os campos!");          //retornando esse texto para o usuario se as informacaoes nao forem preenchidas
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {        
          descricao: produto.descricao.value,
          valor: produto.valor.value,
          tipo: produto.tipo.value,
        })
        .then(({ data }) => toast.success(data))             
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/", {                //a diferenca para o put é que nao precisa passar o id
            descricao: produto.descricao.value,
            valor: produto.valor.value,
            tipo: produto.tipo.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    produto.descricao.value = "";
    produto.valor.value = "";
    produto.tipo.value = "";

    setOnEdit(null);           //para poder fazer uma inclusao depois da edicao sem dar conflitos
    getProdutos();
  };

  
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label htmlFor="descricao">Descrição</Label>
        <Input type="text" id="descricao" name="descricao" />       //Utilizando aqui os mesmos nomes do banco de dados
      </InputArea>
      <InputArea>
        <Label htmlFor="valor">Valor</Label>
        <Input name="valor" type="float" id="valor" />
      </InputArea>
      <InputArea>
        <Label htmlFor="tipo">Gasto/Ganho</Label>
        <Input name="tipo" type="text" id="tipo" />
      </InputArea>

      <Button type="submit">ADICIONAR</Button>
    </FormContainer>
  );
  };
  export default Form;
