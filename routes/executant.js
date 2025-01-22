const { Router } = require('express');
const { authenticate, authorize } = require('../middleware');
const { Executant } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all routes
router.all('/executant', authenticate, authorize('executant'));
router.all('/executant/*', authenticate, authorize('executant'));

router.get('/executant/tasks', Executant.listTasks);
router.put('/executant/task/:id', Executant.updateTask);
