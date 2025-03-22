// routes/api.js
const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('./auth');
const {
  Quiz,
  QuizQuestion,
  QuizAttempt,
  Challenge,
  ChallengeAttempt,
  Project,
  Course,
  UserCourse,
  CourseTask,
  UserTask
} = require('../models');

// -----------------------------
// Quiz Endpoints
// -----------------------------
router.post('/quizzes', authenticateJWT, async (req, res) => {
  const { title, description = "", category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "Title and category are required" });
  }

  try {
    const newQuiz = await Quiz.create({ title, description, category });
    res.status(201).json({ msg: "Quiz added", quiz_id: newQuiz.quiz_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET /api/quizzes - Retrieve all quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    const data = quizzes.map(quiz => ({
      quiz_id: quiz.quiz_id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category  // Include category in response
    }));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/quizzes/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const quizzes = await Quiz.findAll({ where: { category } });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this category" });
    }

    const data = quizzes.map(quiz => ({
      quiz_id: quiz.quiz_id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});




// GET /api/quizzes/:quiz_id/questions - Retrieve questions for a quiz
router.get('/quizzes/:quiz_id/questions', async (req, res) => {
  const { quiz_id } = req.params;
  try {
    const questions = await QuizQuestion.findAll({ where: { quiz_id } });
    const data = questions.map(q => ({
      question_id: q.question_id,
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d
    }));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/quiz_attempts - Record a quiz attempt (requires auth)
router.post('/quiz_attempts', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { quiz_id, answers } = req.body; // `answers` is an array of objects { question_id, selected_option }

  // Basic validation
  if (!quiz_id || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid request payload. Must include quiz_id and answers array." });
  }

  try {
    // Fetch the questions for the given quiz_id with only necessary fields
    const questions = await QuizQuestion.findAll({
      where: { quiz_id },
      attributes: ['question_id', 'correct_option']
    });

    // Build a lookup for correct answers: { question_id: correct_option }
    const correctAnswers = {};
    questions.forEach(question => {
      correctAnswers[question.question_id] = question.correct_option;
    });

    // Calculate score (for simplicity, 1 point per correct answer)
    let score = 0;
    answers.forEach(answer => {
      if (correctAnswers[answer.question_id] && correctAnswers[answer.question_id] === answer.selected_option) {
        score++;
      }
    });

    // Store the quiz attempt in the database
    const attempt = await QuizAttempt.create({ user_id: userId, quiz_id, score });

    res.status(201).json({ msg: "Quiz attempt recorded", score, attempt_id: attempt.attempt_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// -----------------------------
// Challenge Endpoints
// -----------------------------

// GET /api/challenges - Retrieve all challenges
router.get('/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    const data = challenges.map(ch => ({
      challenge_id: ch.challenge_id,
      title: ch.title,
      description: ch.description
    }));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/challenge_attempts - Record a challenge attempt (requires auth)
router.post('/challenge_attempts', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { challenge_id, code_submitted, status = "pending" } = req.body;
  try {
    await ChallengeAttempt.create({
      user_id: userId,
      challenge_id,
      code_submitted,
      status
    });
    res.status(201).json({ msg: "Challenge attempt recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------------
// Project Endpoints
// -----------------------------

// GET /api/projects - Retrieve all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    const data = projects.map(p => ({
      project_id: p.project_id,
      user_id: p.user_id,
      title: p.title,
      description: p.description,
      zip_file_path: p.zip_file_path,
      submitted_at: p.submitted_at
    }));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/projects - Submit a project (requires auth)
router.post('/projects', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { title, description, zip_file_path } = req.body;
  try {
    await Project.create({ user_id: userId, title, description, zip_file_path });
    res.status(201).json({ msg: "Project submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------------
// Course Endpoints
// -----------------------------

// GET /api/courses - Retrieve all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    const data = courses.map(c => ({
      course_id: c.course_id,
      title: c.title,
      description: c.description,
      video_link: c.video_link
    }));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/user_courses - Enroll or update course progress (requires auth)
router.post('/user_courses', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { course_id, progress = 0 } = req.body;
  try {
    let userCourse = await UserCourse.findOne({ where: { user_id: userId, course_id } });
    if (userCourse) {
      userCourse.progress = progress;
      await userCourse.save();
    } else {
      await UserCourse.create({ user_id: userId, course_id, progress });
    }
    res.status(200).json({ msg: "Course enrollment/progress updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/user_tasks - Update task status (requires auth)
router.post('/user_tasks', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { task_id, status = "completed" } = req.body;
  try {
    let userTask = await UserTask.findOne({ where: { user_id: userId, task_id } });
    if (userTask) {
      userTask.status = status;
      await userTask.save();
    } else {
      await UserTask.create({ user_id: userId, task_id, status });
    }
    res.status(200).json({ msg: "Task status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------------
// Additional Endpoints for Adding Content
// -----------------------------

// POST /api/quizzes - Add a new quiz (requires auth)


// POST /api/quizzes/:quiz_id/questions - Add a new quiz question (requires auth)
router.post('/quizzes/:quiz_id/questions', authenticateJWT, async (req, res) => {
  const { quiz_id } = req.params;
  const { question, option_a, option_b, option_c, option_d, correct_option } = req.body;
  if (!question || !option_a || !option_b || !option_c || !option_d || !correct_option) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // Check if the quiz exists
    const quiz = await Quiz.findByPk(quiz_id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    const newQuestion = await QuizQuestion.create({
      quiz_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option
    });
    res.status(201).json({ msg: "Quiz question added", question_id: newQuestion.question_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/challenges - Add a new challenge (requires auth)
router.post('/challenges', authenticateJWT, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Both title and description are required" });
  }
  try {
    const newChallenge = await Challenge.create({ title, description });
    res.status(201).json({ msg: "Challenge added", challenge_id: newChallenge.challenge_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/courses - Add a new course (requires auth)
router.post('/courses', authenticateJWT, async (req, res) => {
  const { title, description = "", video_link } = req.body;
  if (!title || !video_link) {
    return res.status(400).json({ error: "Title and video_link are required" });
  }
  try {
    const newCourse = await Course.create({ title, description, video_link });
    res.status(201).json({ msg: "Course added", course_id: newCourse.course_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/course_tasks - Add a new course task (requires auth)
router.post('/course_tasks', authenticateJWT, async (req, res) => {
  const { course_id, task_description } = req.body;
  if (!course_id || !task_description) {
    return res.status(400).json({ error: "Both course_id and task_description are required" });
  }
  try {
    // Optionally verify the course exists
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const newTask = await CourseTask.create({ course_id, task_description });
    res.status(201).json({ msg: "Course task added", task_id: newTask.task_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
