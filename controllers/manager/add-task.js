const { error } = require('../../functions');
const { knex } = require('../../db');

module.exports = async (req, res) => {
  const { me } = req.user;
  const { title, description, assignee_id } = req.body;

  if (!title || !description) {
    throw error(400, 'All fields (title, description) are required');
  }

  const [newTask] = await knex('tasks')
    .insert({
      title,
      description,
      creator_id: me,
      assignee_id: assignee_id || null,
      status: assignee_id ? 'pending' : 'open',
    })
    .returning(['title', 'description', 'creator_id']);

  return res.status(201).json({
    message: 'Task created successfully',
    user: newTask,
  });
};
