
var custom = {
	testme : function(){
		console.log("hello i am testme");
		return "hi";
	},
	test2 : function(){
		console.log("hello i am test2");
		this.testme();
	} 
}

/*$.aop.around( {target: custom, method: 'testme'}, 
  function(x){
  	console.log(x);
  	console.log("hi i am called before");	
  	var output = x.proceed();
  	return output;
  }
);
if (Function.prototype.name === undefined){
  // Add a custom property to all function values
  // that actually invokes a method to get the value
  Object.defineProperty(Function.prototype,'name',{
    get:function(){
      return /function ([^(]*)/.exec( this+"" )[1];
    }
  });
}
var native_str = "[native code]";
var getAllFunctions =  function(){
	var methods = [];
	for (var m in $) {
	    if (typeof $[m] == "function") {
	    	var str = $[m].toString();
	    	if(str.indexOf(native_str)!=-1)
	    	{
	    		//console.log("found it");
	    		//console.log(str);
	    		//break;
	    	}else{
	    		console.log("name is : "+$[m].name);
	    	}
	    	//console.log(window[m].toString());
	    	//break;
	        methods.push(m);
	    }
	}
	//console.log(methods.join(","));
}*/

