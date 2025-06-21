const { Project, Task, User } = require('../models');

// Helper function to generate all tasks for a project's cycle
const getTasksForCycle = (cycle, year) => {
  const allTasks = [];

  // 1. Define Annual Evaluation Review (AER) and Statutory tasks
  const janCycleStaticTasks = [
    { name: 'Annual review visit', due_date: `${year}-11-15` },
    { name: 'AER Submission', due_date: `${year}-12-10` },
    { name: 'Disbursal date (AER)', due_date: `${year + 1}-01-31` },
    { name: 'Utilization Certificate', due_date: `${year + 1}-02-28` },
    { name: 'Income tax returns', due_date: `${year}-12-07` },
    { name: 'Foreign Contributions returns (FC-4)', due_date: `${year + 1}-01-31` },
    { name: 'Consolidated audit reports, 10B', due_date: `${year}-10-31` },
  ];

  const julyCycleStaticTasks = [
    { name: 'Annual review visit', due_date: `${year + 1}-05-15` },
    { name: 'AER Submission', due_date: `${year + 1}-06-10` },
    { name: 'Disbursal date (AER)', due_date: `${year + 1}-07-31` },
    { name: 'Utilization Certificate', due_date: `${year}-08-31` },
    { name: 'Income tax returns', due_date: `${year}-12-07` },
    { name: 'Foreign Contributions returns (FC-4)', due_date: `${year + 1}-01-31` },
    { name: 'Consolidated audit reports, 10B', due_date: `${year}-10-31` },
  ];

  allTasks.push(...(cycle === 'January' ? janCycleStaticTasks : julyCycleStaticTasks));

  // 2. Define Quarters and generate quarterly DRS tasks
  const quarters = cycle === 'January'
    ? [
        { quarter: 1, endMonth: 3, year: year }, // Mar
        { quarter: 2, endMonth: 6, year: year }, // Jun
        { quarter: 3, endMonth: 9, year: year }, // Sep
        { quarter: 4, endMonth: 12, year: year },// Dec
      ]
    : [
        { quarter: 1, endMonth: 9, year: year }, // Sep
        { quarter: 2, endMonth: 12, year: year },// Dec
        { quarter: 3, endMonth: 3, year: year + 1 }, // Mar
        { quarter: 4, endMonth: 6, year: year + 1 }, // Jun
      ];

  quarters.forEach(q => {
    const submissionDate = new Date(q.year, q.endMonth, 25); // 25th of month after quarter ends
    const visitDate = new Date(q.year, q.endMonth - 1, 25); // 25th of last month of quarter

    allTasks.push(
        { name: `Q${q.quarter} Project Monitoring and Evaluation Visit`, due_date: visitDate.toISOString().split('T')[0] },
        { name: `Q${q.quarter} Planned date of DRS Submission for approval`, due_date: submissionDate.toISOString().split('T')[0] },
        { name: `Q${q.quarter} Planned date of DRS Submission to Finance`, due_date: submissionDate.toISOString().split('T')[0] }
    );
  });

  return allTasks;
};


exports.createProject = async (req, res) => {
  const { name, cycle, frontliner_id, ngo_partner_id } = req.body;

  try {
    const project = await Project.create({
      name,
      cycle,
      frontliner_id,
      ngo_partner_id,
    });

    const projectStartDate = new Date();
    const year = projectStartDate.getFullYear();
    const tasksToCreate = getTasksForCycle(cycle, year).map(task => ({
      ...task,
      project_id: project.id,
    }));

    await Task.bulkCreate(tasksToCreate);

    res.status(201).json({ message: 'Project and all tasks created successfully', project, task_count: tasksToCreate.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [
                { model: User, as: 'Frontliner' },
                { model: User, as: 'NgoPartner' },
                { model: Task }
            ],
            order: [[Task, 'due_date', 'ASC']]
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
    }
};