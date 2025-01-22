const { Router } = require('express');
const { authenticate, authorize } = require('../middleware');
const { Manager } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all routes
router.all('/manager', authenticate, authorize('manager'));
router.all('/manager/*', authenticate, authorize('manager'));

router.get('/manager/tasks', Manager.listTasks);

router.post('/manager/task', Manager.addTask);
router.put('/manager/task/:id', Manager.updateTask);
