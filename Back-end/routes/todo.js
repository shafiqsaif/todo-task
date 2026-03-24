

const express = require('express');
const { query } = require('../helpers/db.js');
const todoRouter = express.Router();

// GET endpoint to fetch all tasks
todoRouter.get("/", async (req, res) => {
  try {
    const result = await query('select * from task')
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error})
  }
});

// POST endpoint to add a new task
todoRouter.post("/new", async (req, res) => {
    try {
        const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description]);
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE endpoint to delete a task
todoRouter.delete("/delete/:id", async(req,res) =>{
    try {
        const id = parseInt(req.params.id);
        await query('delete from task where id = $1', [id]);
        res.status(200).json({id:id});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = todoRouter;

