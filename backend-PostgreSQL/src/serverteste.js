const express = require('express');
const { Pool } = require('pg'); // Assumindo que você está usando PostgreSQL
const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud',
    password: 'password',
    port: 5432,
});

// Listar todas as dietas
app.get('/dietas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dietas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Erro ao buscar dietas');
    }
});

// Buscar dieta por ID
app.get('/dietas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM dietas WHERE id_dieta = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Dieta não encontrada');
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Erro ao buscar dieta');
    }
});

// Criar nova dieta
app.post('/dietas', async (req, res) => {
    const { horario_dieta, ingredientes_dieta } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO dietas (horario_dieta, ingredientes_dieta) VALUES ($1, $2) RETURNING *',
            [horario_dieta, ingredientes_dieta]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Erro ao adicionar dieta');
    }
});

// Atualizar dieta
app.put('/dietas/:id', async (req, res) => {
    const { id } = req.params;
    const { horario_dieta, ingredientes_dieta } = req.body;
    try {
        const result = await pool.query(
            'UPDATE dietas SET horario_dieta = $1, ingredientes_dieta = $2 WHERE id_dieta = $3 RETURNING *',
            [horario_dieta, ingredientes_dieta, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Dieta não encontrada');
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Erro ao atualizar dieta');
    }
});

// Deletar dieta
app.delete('/dietas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM dietas WHERE id_dieta = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Dieta não encontrada');
        }
        res.status(200).send('Dieta deletada');
    } catch (error) {
        res.status(500).send('Erro ao deletar dieta');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});