// models/index.js
const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('./config');

// For demonstration, we are using SQLite.
const sequelize = new Sequelize(
    config.database.database,  // Database name
    config.database.username,  // Username
    config.database.password,  // Password
    {
      host: config.database.host,
      dialect: config.database.dialect,
      logging: false, // Set to true to see SQL queries
    }
  );

  sequelize.authenticate()
  .then(() => console.log('Connection to MySQL has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// -----------------------------
// User Model
// -----------------------------
class User extends Model {
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, { sequelize, modelName: 'User', tableName: 'users', timestamps: false });

// Before creating a user, hash the password.
User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// -----------------------------
// Quiz Models
// -----------------------------
class Quiz extends Model {}
Quiz.init({
  quiz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING(255), allowNull: false }  // Added category field
}, { 
  sequelize, 
  modelName: 'Quiz', 
  tableName: 'quizzes', 
  timestamps: false 
});

class QuizQuestion extends Model {}
QuizQuestion.init({
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quiz_id: { type: DataTypes.INTEGER, allowNull: false },
  question: { type: DataTypes.TEXT, allowNull: false },
  option_a: { type: DataTypes.TEXT, allowNull: false },
  option_b: { type: DataTypes.TEXT, allowNull: false },
  option_c: { type: DataTypes.TEXT, allowNull: false },
  option_d: { type: DataTypes.TEXT, allowNull: false },
  correct_option: { type: DataTypes.STRING(1), allowNull: false }
}, { sequelize, modelName: 'QuizQuestion', tableName: 'quiz_questions', timestamps: false });

class QuizAttempt extends Model {}
QuizAttempt.init({
  attempt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  quiz_id: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  attempted_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { sequelize, modelName: 'QuizAttempt', tableName: 'quiz_attempts', timestamps: false });

// -----------------------------
// Challenge Models
// -----------------------------
class Challenge extends Model {}
Challenge.init({
  challenge_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false }
}, { sequelize, modelName: 'Challenge', tableName: 'challenges', timestamps: false });

class ChallengeAttempt extends Model {}
ChallengeAttempt.init({
  attempt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  challenge_id: { type: DataTypes.INTEGER, allowNull: false },
  code_submitted: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('pending', 'passed', 'failed'),
    defaultValue: 'pending'
  },
  attempted_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { sequelize, modelName: 'ChallengeAttempt', tableName: 'challenge_attempts', timestamps: false });

// -----------------------------
// Project Model
// -----------------------------
class Project extends Model {}
Project.init({
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  zip_file_path: { type: DataTypes.TEXT, allowNull: false },
  submitted_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { sequelize, modelName: 'Project', tableName: 'projects', timestamps: false });

// -----------------------------
// Course and Task Models
// -----------------------------
class Course extends Model {}
Course.init({
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  video_link: { type: DataTypes.TEXT, allowNull: false }
}, { sequelize, modelName: 'Course', tableName: 'courses', timestamps: false });

class UserCourse extends Model {}
UserCourse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  course_id: { type: DataTypes.INTEGER, allowNull: false },
  progress: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { sequelize, modelName: 'UserCourse', tableName: 'user_courses', timestamps: false });

class CourseTask extends Model {}
CourseTask.init({
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_id: { type: DataTypes.INTEGER, allowNull: false },
  task_description: { type: DataTypes.TEXT, allowNull: false }
}, { sequelize, modelName: 'CourseTask', tableName: 'course_tasks', timestamps: false });

class UserTask extends Model {}
UserTask.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  task_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { 
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  }
}, { sequelize, modelName: 'UserTask', tableName: 'user_tasks', timestamps: false });

module.exports = {
  sequelize,
  User,
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
};
