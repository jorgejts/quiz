var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizControllers.question);
router.get('/quizes/answer', quizControllers.answer);

module.exports = router;
