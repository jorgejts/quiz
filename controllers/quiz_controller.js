var models=require('../models/models.js');

exports.load = function (req, res, next, quizId) {
    models.Quiz.find({
        where:{id:Number(quizId)},
        include:[{model:models.Comment}]
    }).then(
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
    res.render('quizes/show', { quiz: req.quiz , errors:[]});
};
exports.answer = function (req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
        resultado= 'Correcto'
    }
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado,
        errors:[]
    });
}

exports.index = function (req, res) {
    var busqueda='%';
    if (req.query.search) {
        busqueda='%'+req.query.search+'%';
        busqueda=busqueda.replace(" ","%");
        models.Quiz.findAll({ where: { pregunta: { $like: busqueda}} }).then(function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes, errors:[] });
        })
    }else if(req.query.tipado){
        busqueda='%'+req.query.tipado+'%';
        models.Quiz.findAll({ where: { tipo: { $like: busqueda}} }).then(function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes, errors:[] });
        })
    }else{
        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes, errors:[] });
        })
    }
};
exports.new = function(req,res){
    var quiz=models.Quiz.build(
        {pregunta:'pregunta',respuesta:'respuesta',tipo:'tipo'});
    res.render('quizes/new',{quiz:quiz, errors:[]});
};
exports.create = function(req,res){
    var quiz=models.Quiz.build(req.body.quiz);
    quiz.validate().then(function(err){
        if(err){
            res.render('quizes/new',{quiz:quiz, errors: err.errors});
        }else{
           quiz.save({fields:["pregunta","respuesta","tipo"]}).then(function(){
            res.redirect('/quizes');
            }) 
        }
    })
};
exports.edit=function(req,res){
    var quiz=req.quiz;
    res.render('quizes/edit',{quiz:quiz,errors:[]});
};
exports.update=function(req,res){
    req.quiz.pregunta=req.body.quiz.pregunta;
    req.quiz.respuesta=req.body.quiz.respuesta;
    req.quiz.tipo=req.body.quiz.tipo;

    req.quiz.validate().then(
            function(err){
                if(err){
                    res.render('quizes/edit',{quiz:req.quiz,errors:err.errors});
                }else{
                    req.quiz.save({fields:['pregunta','respuesta','tipo']})
                    .then(function(){res.redirect('/quizes')});
                }
            }
        );
};
exports.destroy=function(req,res){
    req.quiz.destroy().then(function(){
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
};