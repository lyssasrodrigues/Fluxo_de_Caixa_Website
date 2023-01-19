import { db } from "../db.js";


//PARA BUSCAR OS PRODUTOS:

export const getProdutos = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//PARA ADICIONAR OS PRODUTOS:

export const addProduto = (req, res) => {
  const q =
    "INSERT INTO produtos(`descricao`, `valor`, `tipo`) VALUES(?)";

  const values = [                    //array recebendo os parametros do body
    req.body.descricao,
    req.body.valor,
    req.body.tipo,
  ];

  db.query(q, [values], (err) => {              //chamando o banco
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");            //texto que retorna para o usuario quando ele faz uma acao
  });
};

//PARA ATUALIZAR/EDITAR OS PRODUTOS:

export const updateProduto = (req, res) => {
  const q =
    "UPDATE produtos SET `descricao` = ?, `valor` = ?, `tipo` = ? WHERE `id` = ?";

  const values = [
    req.body.descricao,
    req.body.valor,
    req.body.tipo,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");      //texto que retorna para o usuario quando ele faz a acao de atualizar
  });
};
//PARA DELETAR OS PRODUTOS: 

export const deleteProduto = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");       //texto que retorna para o usuario quando ele faz a acao de excluir
  });
};
