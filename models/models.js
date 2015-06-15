var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null,
    { dialect: "sqlite", storage: "quiz.sqlite" }
);
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment= Comment;
sequelize.sync().then(function () {
    Quiz.count().then(function (count) {
        if (count === 0) {
            Quiz.create({ pregunta: 'Capital de Italia',
                respuesta: 'roma',
                tipo:'otro'
            });
            Quiz.create({ pregunta: 'Capital de Portugal',
                respuesta: 'lisboa',
                tipo:'otro'
            }).then(function () { console.log('Base de datos arrancá') });
        };
    });
});