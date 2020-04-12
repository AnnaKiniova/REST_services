const router = require('express').Router();
const boardService = require('./board.service');

const asyncWrap = require('../../async_wrap');

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
  .get(
    asyncWrap(async (req, res) => {
      const board = await boardService.getBoardById(req.params.id);
      res.status(200).json(board);
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      const newBoard = await boardService.updateBoard(req.params.id, req.body);
      res.status(200).json(newBoard);
    })
  )
  .delete(
    asyncWrap(async (req, res) => {
      await boardService.deleteBoard(req.params.id);
      res.status(204).end('The task has been deleted');
    })
  );

module.exports = router;
