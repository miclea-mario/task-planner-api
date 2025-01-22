const { error } = require('../../functions');
const { knex } = require('../../db');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignee_id, status } = req.body;

  if (!id) {
    throw error(400, 'Task ID is required');
  }

  // Check if the task exists
  const task = await knex('tasks').where({ id }).first();
  if (!task) {
    throw error(404, 'Task not found');
  }

  // Validate the new assignee if provided
  if (assignee_id) {
    const executant = await knex('identities')
      .where({ id: assignee_id, role: 'executant' })
      .first();
    if (!executant) {
      throw error(400, 'Invalid assignee: Must be an executant');
    }
  }

  // Validate the status if provided
  const validStatuses = ['open', 'pending', 'completed', 'closed'];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    throw error(400, `Invalid status: Must be one of ${validStatuses.join(', ')}`);
  }

  // Prepare the fields to update
  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (assignee_id !== undefined) updateFields.assignee_id = assignee_id || null;
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
