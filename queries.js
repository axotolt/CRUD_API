const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'axotolt',
  host: 'localhost',
  database: 'vndirector',
  password: '22082002',
  port: 5432,
});

const getUsers = (req, res) => {
  pool.query('SELECT * FROM list ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    };
    res.status(200).json(results.rows)
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM list WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    };
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { name, rank, description} = req.body;

  pool.query('INSERT INTO list (name, rank, description) VALUES ($1, $2, $3) RETURNING *', [name, rank, description], (error, results) => {
    if (error) {
      throw error
    };
    res.status(201).send(`User added with ID: ${results.rows[0].id}`);
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, rank, description } = req.body;

  pool.query(
    'UPDATE list SET name = $1, rank = $2, description = $3 WHERE id = $4',
    [name, rank, description, id],
    (error, results) => {
      if (error) {
        throw error
      };
      res.status(200).send(`User modified with ID: ${id}`)
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM list WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    };
    res.status(200).send(`User deleted with ID: ${id}`)
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
