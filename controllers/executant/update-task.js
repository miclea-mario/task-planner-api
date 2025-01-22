const { error } = require('../../functions');
const { knex } = require('../../db');

module.exports = async (req, res) => {
  const { me } = req.user;
  const { id } = req.params;
  const { status } = req.body;

  if (!id) {
    throw error(400, 'Task ID is required');
  }

  // Check if the task exists
  const task = await knex('tasks').where({ id, assignee_id: me }).first();
  if (!task) {
    throw error(404, 'Task not found');
  }

  // Validate the status if provided
  const validStatuses = ['completed'];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    throw error(400, `Invalid status: Must be one of ${validStatuses.join(', ')}`);
  }

  // Prepare the fields to update
  const updateFields = {};
  if (status !== undefined) updateFields.status = status.toLowerCase();

  // Update the task in the database
  const [updatedTask] = await knex('tasks')
    .where({ id })
    .update(updateFields)
    .returning(['id', 'title', 'description', 'assignee_id', 'status', 'created_at']);

  return res.status(200).json({
    message: 'Task updated successfully',
    task: updatedTask,
  });
};
