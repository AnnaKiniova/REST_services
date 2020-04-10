const router = require('express').Router();
const boardService = require('./board.service');
const { handleError } = require('../../errorHandler');

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
  .put(async (req, res) => {
    const newBoard = await boardService.updateBoard(req.params.id, req.body);
    if (newBoard) {
      res.status(200).json(newBoard);
    } else {
      res.status(400).end('Task not found');
    }
  })
  .delete(async (req, res) => {
    const board = await boardService.deleteBoard(req.params.id);
    if (board) {
      res.status(204).end('The task has been deleted');
    } else {
      res.status(400).end();
    }
  });
// eslint-disable-next-line no-unused-vars
router.use((e, req, res, next) => {
  handleError(e, res);
});

module.exports = router;
