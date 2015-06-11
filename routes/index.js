var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
router.param('quizId', quizControllers.load);

router.get('/quizes', quizControllers.index);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);

router.get('/author', function(req, res) {
  res.render('author', {});
});

module.exports = router;
