	function checkBrowser(){	
		if (Modernizr.localstorage) {
 			alert("Your browser is compatible!");
		} else {
  			alert("Your browser is not compatible, enable HTML5 and LocalStorage or please use Chrome, Firefox or Safari.");
		}
	}

	function loginFunction() {
		
		var counter = window.localStorage.length;
		for (var i = 0; i < counter; i++) {
			key = window.localStorage.key(0);
			window.localStorage.removeItem(key);	
		}
			

		var loginName =  document.getElementById("login-form").login_field.value;
		if(loginName == ""){
			alert("Please enter your UCInetID.");
		}
		else{
			var firstChar = loginName[0]; 
			window.localStorage.setItem("firstLetter",firstChar); 
			
			window.localStorage.setItem("Contacts:index",0);
			window.localStorage.setItem("Substitutes:index",0);
			window.open("./editTeacherPref.html");
		}
	}