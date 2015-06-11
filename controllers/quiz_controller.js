var models=require('../models/models.js');

exports.load = function (req, res, next, quizId) {
    models.Quiz.findById(quizId).then(
    function (quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error('No existe quizId= ' + quizId));
        }
    })
}

exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz });
};
exports.answer = function (req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
        resultado= 'Correcto'
    }
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado
    });
}

exports.index = function (req, res) {
    var busqueda='%';
    if (req.query.search) {
        busqueda='%'+req.query.search+'%';
        busqueda=busqueda.replace(" ","%");
        console.log(busqueda);
    } 
    models.Quiz.findAll({ where: { pregunta: { $like: busqueda}} }).then(function (quizes) {
        res.render('quizes/index.ejs', { quizes: quizes });
    })
};