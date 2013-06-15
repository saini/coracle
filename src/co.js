var co_context = co_context || {'targets':[]};
(function(){

	var debugme = function(msg){
		var print = true;
		if(print){
			console.log(msg);
		}
	};

	debugme("executing co.js");
	var getAllFunctionNames =  function(context){
		var methods = [];
		for (var m in context) {
		    if (context[m].constructor == Function) {
		    	var str = context[m].toString();
	    		debugme("name is : "+m);
		        methods.push(m);
		    }
		}
		return methods;
	};

	var prepareExecutionSet = function(){
		var sendData = {};
		var execution_set = [];
		sendData.time = (new Date).getTime();// time since epoch
		var storage = window.localStorage;
		for (key in storage){
			var obj = $.parseJSON(storage[key])
			execution_set.push(obj);
			//debugme(obj.method);
		}
		sendData.execution_set=execution_set;
		window.localStorage.clear();
		return sendData;
	};

	var sendExecutionInfo = function(){
		var data = prepareExecutionSet();
		sendData(data);
	};

	var sendData = function(data){
		debugme("inside sendData");
		var prod = "http://crowdoracle.appspot.com/";
		var loc = "http://localhost:8080/"
		if(null!=data && data.execution_set.length>0){
			debugme(JSON.stringify(data));
			var request = $.ajax({
				url: prod,
		  		type: "POST",
		  		data: {co_data:JSON.stringify(data)},
		  		dataType: "jsonp",
			});
		}
	};


	var scheduleRepeatJob = function(){
		var delay = 1000;
		debugme("scheduling job with delay : "+ delay);
		setInterval(sendExecutionInfo, delay);
	};

	
	var flagLastExecutionSet = function(){
		debugme("flagging execution");
		var key = 'e'+(localStorage.length-1);
		var objstr = window.localStorage.getItem(key);
		var obj = $.parseJSON(objstr);
		obj.flag = true;
		window.localStorage.setItem(key,JSON.stringify(obj));
	};

	$.each(co_context.targets,function(index,value){
		debugme("inside "+ index + " : "+ typeof (value));
		var funcs = getAllFunctionNames(value);
		$.each(funcs,function(i,func){
			debugme("instrumenting "+ func + " function of target at index "+ i );
			$.aop.around( {target: value, method: func}, 
				function(x){
				  	debugme(x);
				  	debugme("hi i am called before");	
				  	var output = x.proceed();
				  	var execution_set = {
				  		"method":x.method,
				  		"input_args":x.arguments,
				  		"output": output || "no_return_val"
				  	};
				  	debugme("execution_set");
				  	debugme(execution_set);
				  	window.localStorage.setItem('e'+localStorage.length,JSON.stringify(execution_set));
				  	return output;
			  	}
			);
		});
	});

	scheduleRepeatJob();

})();
var respHandler = function(resp){
		console.log("inside resphandler");
		console.log(JSON.stringify(resp));
	}