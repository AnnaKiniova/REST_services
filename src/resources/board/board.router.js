const router = require('express').Router();
const boardService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();
    res
      .status(200)
      .json(boards)
      .end();
  })
  .post(async (req, res) => {
    const newBoard = await boardService.createBoard(req.body);
    if (newBoard) {
      res
        .status(200)
        .json(newBoard)
        .end();
    } else {
      res.status(400).end('Bad request');
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const board = await boardService.getBoardById(req.params.id);
      res.status(200).json(board);
    } catch (e) {
      // eslint-disable-next-line callback-return
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const newBoard = await boardService.updateBoard(req.params.id, req.body);

      res.status(200).json(newBoard);
    } catch (e) {
      // eslint-disable-next-line callback-return
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await boardService.deleteBoard(req.params.id);
      res.status(204).end('The task has been deleted');
    } catch (e) {
      // eslint-disable-next-line callback-return
      next(e);
    }
  });

module.exports = router;
