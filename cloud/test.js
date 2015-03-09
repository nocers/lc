function hello(request,response){
	var name = request.params.name;
	if(name){
		response.success('name'+'@@@'+name);
	}else{
		response.error('name?');
	}
}
exports.hello=hello;