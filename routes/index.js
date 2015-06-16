var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController=require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' ,errors:[]});
});
router.param('quizId', quizControllers.load);
router.param('commentId',commentController.load);

router.get('/login',sessionController.new);
router.post('/login',sessionController.create);
router.get('/logout',sessionController.destroy);

router.get('/quizes', quizControllers.index);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quizes/new',sessionController.loginRequired,quizControllers.new);
router.post('/quizes/create',sessionController.loginRequired,quizControllers.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,quizControllers.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizControllers.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizControllers.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired,commentController.publish)

router.get('/author', function(req, res) {
  res.render('author', {errors:[]});
});

module.exports = router;
