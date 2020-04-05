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
    try {
      const newBoard = await boardService.createBoard(req.body);
      res
        .status(200)
        .json(newBoard)
        .end();
    } catch (e) {
      res
        .status(400)
        .json(e)
        .end();
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardService.getBoardById(req.params.id);
    res.status(200).json(board);
  })
  .put(async (req, res) => {
    const newBoard = await boardService.updateBoard(req.params.id, req.body);
    res.status(200).json(newBoard);
  })
  .delete(async (req, res) => {
    const board = await boardService.deleteBoard(req.params.id);
    if (board) {
      res.status(204).end();
    } else {
      res.status(400).end();
    }
  });

module.exports = router;
