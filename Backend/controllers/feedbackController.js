const { Feedback, User } = require('../models');


exports.createFeedback = async (req, res) => {
  try {
    const { project_id, comment } = req.body;
    const user_id = req.user.id; 

    if (!comment) {
        return res.status(400).json({ error: 'Feedback comment cannot be empty.' });
    }

    const feedback = await Feedback.create({
      comment,
      project_id,
      user_id,
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback', details: err.message });
  }
};


exports.getFeedbackForProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const feedbackList = await Feedback.findAll({
      where: { project_id: projectId },
      include: [{
        model: User,
        attributes: ['name', 'role'], 
      }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback', details: err.message });
  }
};
