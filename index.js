import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";
const app = express();
app.use(bodyParser.json());
const PORT = 3000;
const connectionString = "server=DSN1191061623;Database=produtos_db;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";
app.get("/produtos", (req, res) => {
    sql.query(connectionString, "SELECT * FROM produtos", (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post("/produtos", (req, res) => {
    const { nome, descricao, custo, preco } = req.body;
    sql.query(
        connectionString,
        `INSERT INTO produtos VALUES ('${nome}', '${descricao}', '${custo}', '${preco}')`,
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});

app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    sql.query(connectionString, `SELECT * FROM produtos WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno do Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

app.put("/produtos/:id",(req,res) => {
    const{id} = req.params;
    const {nome, descricao, custo, preco} = req.body;
    sql.query(
        connectionString, 
        `UPDATE produtos SET nome = '${nome}', marca = '${descricao}', custo = '${custo}', preco = '${preco}' WHERE id = ${id};`,
        (erro, rows)=>{
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Atualizado com Sucesso");
            }
        }
    );
});

app.delete("/produtos/:id", (req,res) => {
    const{id} = req.params;
    sql.query(
        connectionString,
        `DELETE FROM produtos WHERE id=${id}`,
        (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Excluído com Sucesso!");
            } 
        }    
    )
});


app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));