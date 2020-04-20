const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

const asyncWrap = require('../../async_wrap');
const { UserError } = require('../../errorHandler');

router
  .route('/')
  .get(
    asyncWrap(async (req, res) => {
      const boards = await boardService.getAll();
      res
        .status(200)
        .json(boards.map(Board.toResponse))
        .end();
    })
  )
  .post(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(400, 'Bad request');
      }
      const newBoard = await boardService.createBoard(req.body);
      if (newBoard) {
        res
          .status(200)
          .json(Board.toResponse(newBoard))
          .end();
      }
    })
  );

router
  .route('/:id')
  .get(
    asyncWrap(async (req, res) => {
      const board = await boardService.getBoardById(req.params.id);
      res.status(200).json(Board.toResponse(board));
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(400, 'Bad request');
      }
      const newBoard = await boardService.updateBoard(req.params.id, req.body);
      res.status(200).json(Board.toResponse(newBoard));
    })
  )
  .delete(
    asyncWrap(async (req, res) => {
      const board = await boardService.deleteBoard(req.params.id);
      if (!board) {
        throw new UserError(404, 'Task not found');
      }
      res.status(204).end('The board has been deleted');
    })
  );

module.exports = router;
