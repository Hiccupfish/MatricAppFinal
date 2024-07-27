const { faker } = require('@faker-js/faker');

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      location: faker.address.city(),
      privacy_settings: 'public' // Example privacy setting
    });
  }
  return users;
};

const generateLessons = (numLessons) => {
  const lessons = [];
  for (let i = 0; i < numLessons; i++) {
    lessons.push({
      title: faker.lorem.words(3),
      content: faker.lorem.paragraphs(2)
    });
  }
  return lessons;
};

const generateQuestions = (numQuestions, numLessons) => {
  const questions = [];
  for (let i = 0; i < numQuestions; i++) {
    questions.push({
      text: faker.lorem.sentence(),
      difficulty: faker.random.arrayElement(['easy', 'medium', 'hard']),
      options: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      correct_answer: faker.random.number({ min: 0, max: 3 }),
      lesson_id: faker.random.number({ min: 1, max: numLessons })
    });
  }
  return questions;
};

const generateAnswers = (users, questions) => {
  const answers = [];
  users.forEach(user => {
    questions.forEach(question => {
      answers.push({
        user_id: user.username,
        question_id: question.text,
        selected_answer: faker.random.number({ min: 0, max: 3 }),
        is_correct: faker.random.boolean()
      });
    });
  });
  return answers;
};

const generateProgress = (users, lessons) => {
  const progress = [];
  users.forEach(user => {
    lessons.forEach(lesson => {
      progress.push({
        user_id: user.username,
        lesson_id: lesson.title,
        score: faker.random.number({ min: 0, max: 100 }),
        completion_status: faker.random.boolean()
      });
    });
  });
  return progress;
};

const generateConnections = (users) => {
  const connections = [];
  for (let i = 0; i < users.length - 1; i++) {
    for (let j = i + 1; j < users.length; j++) {
      connections.push({
        user1_id: users[i].username,
        user2_id: users[j].username,
        status: faker.random.arrayElement(['pending', 'accepted', 'rejected'])
      });
    }
  }
  return connections;
};

module.exports = {
  generateUsers,
  generateLessons,
  generateQuestions,
  generateAnswers,
  generateProgress,
  generateConnections
};
