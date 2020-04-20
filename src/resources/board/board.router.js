const router = require('express').Router();
const path = require('path');
const HttpStatus = require('http-status-codes');

const boardService = require(path.join(__dirname, './board.service'));
const Board = require(path.join(__dirname, './board.model'));

const asyncWrap = require(path.join(__dirname, '../../async_wrap'));
const { UserError } = require(path.join(__dirname, '../../errorHandler'));

const ENTITY_NAME = 'board';

router
  .route('/')
  .get(
    asyncWrap(async (req, res) => {
      const boards = await boardService.getAll();
      res
        .status(HttpStatus.OK)
        .json(boards.map(Board.toResponse))
        .end();
    })
  )
  .post(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      const newBoard = await boardService.createBoard(req.body);
      if (newBoard) {
        res
          .status(HttpStatus.OK)
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
      res.status(HttpStatus.OK).json(Board.toResponse(board));
    })
  )
  .put(
    asyncWrap(async (req, res) => {
      if (Object.keys(req.body).length === 0) {
        throw new UserError(HttpStatus.BAD_REQUEST, 'Bad request');
      }
      const newBoard = await boardService.updateBoard(req.params.id, req.body);
      res.status(HttpStatus.OK).json(Board.toResponse(newBoard));
    })
  )
  .delete(
    asyncWrap(async (req, res) => {
      const board = await boardService.deleteBoard(req.params.id);
      if (!board) {
        throw new UserError(HttpStatus.NOT_FOUND, `${ENTITY_NAME} not found`);
      }
      res
        .status(HttpStatus.NO_CONTENT)
        .end(`The ${ENTITY_NAME} ${req.params.id} has been deleted`);
    })
  );

module.exports = router;
