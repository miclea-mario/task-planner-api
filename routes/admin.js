const { Router } = require('express');
const { authenticate, authorize } = require('../middleware');
const { Admin } = require('../controllers');

const router = Router();
module.exports = router;

// Protect all routes
router.all('/admin', authenticate, authorize('admin'));
router.all('/admin/*', authenticate, authorize('admin'));

router.get('/admin/users', Admin.listUsers);
router.post('/admin/users', Admin.addUser);
