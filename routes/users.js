//ROTAS DA API 

import express from "express";
import { addProduto, deleteProduto, getProdutos, updateProduto} from "../controllers/user.js";

const router = express.Router()

router.get("/", getProdutos)

router.post("/", addProduto)

router.put("/:id", updateProduto)

router.delete("/:id", deleteProduto)

export default router
