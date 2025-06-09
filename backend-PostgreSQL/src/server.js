const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_cliente', // ou 'crud', dependendo da sua base de dados
    password: 'senai',         // ou 'password', conforme seu setup
    port: 5432,
});

///////////////////////////////////////////////////////////////////////
//                            ROTAS DE CLIENTES                      //
///////////////////////////////////////////////////////////////////////

// Buscar todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// Buscar cliente por ID
app.get('/clientes/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

// Criar cliente
app.post('/clientes', async (req, res) => {
    const { nome, endereco, email, telefone } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clientes (nome, endereco, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, endereco, email, telefone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
});

// Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
    const { nome, endereco, email, telefone } = req.body;
    try {
        const result = await pool.query(
            'UPDATE clientes SET nome = $1, endereco = $2, email = $3, telefone = $4 WHERE id = $5 RETURNING *',
            [nome, endereco, email, telefone, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// Deletar cliente
app.delete('/clientes/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
});

///////////////////////////////////////////////////////////////////////
//                           ROTAS DE EXERCÍCIOS                     //
///////////////////////////////////////////////////////////////////////

app.get('/exercicios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exercicios ORDER BY id_exer ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Erro ao listar exercícios');
    }
});

app.get('/exercicios/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exercicios WHERE id_exer = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Exercício não encontrado');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao buscar exercício');
    }
});

app.post('/exercicios', async (req, res) => {
    const { nome_exer, repeticoes_exer, descricao_exer } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO exercicios (nome_exer, repeticoes_exer, descricao_exer) VALUES ($1, $2, $3) RETURNING *',
            [nome_exer, repeticoes_exer, descricao_exer]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao adicionar exercício');
    }
});

app.put('/exercicios/:id', async (req, res) => {
    const { nome_exer, repeticoes_exer, descricao_exer } = req.body;
    try {
        const result = await pool.query(
            'UPDATE exercicios SET nome_exer = $1, repeticoes_exer = $2, descricao_exer = $3 WHERE id_exer = $4 RETURNING *',
            [nome_exer, repeticoes_exer, descricao_exer, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).send('Exercício não encontrado');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao atualizar exercício');
    }
});

app.delete('/exercicios/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM exercicios WHERE id_exer = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Exercício não encontrado');
        res.status(200).send('Exercício deletado');
    } catch (err) {
        res.status(500).send('Erro ao deletar exercício');
    }
});

///////////////////////////////////////////////////////////////////////
//                            ROTAS DE DIETAS                        //
///////////////////////////////////////////////////////////////////////

app.get('/dietas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dietas');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Erro ao buscar dietas');
    }
});

app.get('/dietas/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dietas WHERE id_dieta = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Dieta não encontrada');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao buscar dieta');
    }
});

app.post('/dietas', async (req, res) => {
    const { horario_dieta, ingredientes_dieta } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO dietas (horario_dieta, ingredientes_dieta) VALUES ($1, $2) RETURNING *',
            [horario_dieta, ingredientes_dieta]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao adicionar dieta');
    }
});

app.put('/dietas/:id', async (req, res) => {
    const { horario_dieta, ingredientes_dieta } = req.body;
    try {
        const result = await pool.query(
            'UPDATE dietas SET horario_dieta = $1, ingredientes_dieta = $2 WHERE id_dieta = $3 RETURNING *',
            [horario_dieta, ingredientes_dieta, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).send('Dieta não encontrada');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Erro ao atualizar dieta');
    }
});

app.delete('/dietas/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM dietas WHERE id_dieta = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Dieta não encontrada');
        res.status(200).send('Dieta deletada');
    } catch (err) {
        res.status(500).send('Erro ao deletar dieta');
    }
});

///////////////////////////////////////////////////////////////////////
//                           INICIAR SERVIDOR                        //
///////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
