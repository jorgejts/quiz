var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' ,errors:[]});
});
router.param('quizId', quizControllers.load);

router.get('/quizes', quizControllers.index);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quizes/new',quizControllers.new);
router.post('/quizes/create',quizControllers.create);
router.get('/quizes/:quizId(\\d+)/edit',quizControllers.edit);
router.put('/quizes/:quizId(\\d+)',quizControllers.update);

router.get('/author', function(req, res) {
  res.render('author', {});
});

module.exports = router;
