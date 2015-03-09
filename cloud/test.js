var hello = function(req,res){
	var name = req.params.name;
	if(name){
		res.success('name'+'@@@'+name);
	}else{
		res.error('name?');
	}
}
exports.hello=hello;