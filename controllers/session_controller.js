exports.loginRequired=function(req,res,next){
	if(req.session.user){
		var tiempo=new Date();
		tiempo=tiempo.getTime();
		console.log(tiempo-req.session.user.tiempo);
		if((tiempo-req.session.user.tiempo)<60000){
			req.session.user.tiempo=new Date().getTime();
			next();
		}else{
			delete req.session.user;
			res.redirect('/login');
		}
	}else{
		res.redirect('/login');
	}
};
exports.desactivated=function(req,res,next){
	if(req.session.user){
		var tiempo=new Date();
		tiempo=tiempo.getTime();
		console.log(tiempo-req.session.user.tiempo);
		if((tiempo-req.session.user.tiempo)<60000){
			req.session.user.tiempo=new Date().getTime();
			next();
		}else{
			delete req.session.user;
			res.redirect('/quizes');
		}
	}else{
		next();
	}
};
exports.new=function(req,res){
	var errors=req.session.errors||{};
	req.session.errors={};
	res.render('sessions/new',{errors:errors});
};
exports.create=function(req,res){
	var login=req.body.login;
	var password=req.body.password;
	var userController=require('./user_controller');
	userController.autenticar(login,password,function(error,user){
		if(error){
			req.session.errors=[{'message':'Se ha producido un error: '+error}];
			res.redirect('/login');
			return;
		}
		tiempo=new Date();
		tiempo=tiempo.getTime();
		req.session.user={id:user.id,username:user.username,tiempo:tiempo};
		res.redirect(req.session.redir.toString());
	});
};
exports.destroy=function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};