const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(boards.map(Board.toResponse()));
});

module.exports = router;
