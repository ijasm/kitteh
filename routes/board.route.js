var router = require('express').Router();
var board = require('../api/board.api');

// CRUD
router.post('/', board.create);

router.get('/', board.index);
router.get('/:id', board.read);

router.put('/:id', board.update);

router.delete('/:id', board.delete);

module.exports = router;
