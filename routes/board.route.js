var router = require('express').Router();
var board = require('../api/board.api');

// CRUD
router.get('/', board.index);
router.post('/', board.create);
router.get('/:id', board.create);
router.put('/:id', board.update);
router.delete('/:id', board.delete);

module.exports = router;
