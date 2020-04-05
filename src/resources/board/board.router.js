const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();
    res
      .status(200)
      .json(boards.map(Board.toResponse))
      .end();
  })
  .post(async (req, res) => {
    const newBoard = await boardService.createBoard(req.body);
    res
      .status(200)
      .json(newBoard)
      .end();
  });

module.exports = router;
