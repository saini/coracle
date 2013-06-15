	
		
		var entry01 = {
				id: 0,
				hired_name:"Marie Curie",
				hired_SSN: "1887",
				hired_subject: "Science",
				hired_grade:"K",
				hired_school:"Oak",
				hired_missingClass: "yes"
			};
		
		var entry02 = {
				id: 1,
				hired_name: "Caroline Herschel",
				hired_SSN: "9824",
				hired_subject: "Science",
				hired_grade: "J",
				hired_school:"Cedar",
				hired_missingClass: "yes"
		};
		
		var entry03 = {
				id: 1,
				hired_name: "Mary Anning",
				hired_SSN: "6524",
				hired_subject: "Biology",
				hired_grade: "A",
				hired_school:"Cedar",
				hired_missingClass: "no"
		};
		
		var entry04 = {
				id: 1,
				hired_name: "Rosalind Franklin",
				hired_SSN: "4324",
				hired_subject: "English",
				hired_grade: "A",
				hired_school:"Cedar",
				hired_missingClass: "no"
		};

var Contacts = {
			index: window.localStorage.getItem("Contacts:index"),
			$table: document.getElementById("contacts-table"),
			$form: document.getElementById("contacts-form"),
			$button_save: document.getElementById("contacts-op-save"),
			$button_discard: document.getElementById("contacts-op-discard"),

			init: function() {
				

				// initialize form
				document.getElementById('contacts-form').reset();
				Contacts.$form.reset();
				Contacts.$button_discard.addEventListener("click", function(event) {
					Contacts.$form.reset();
					Contacts.$form.id_entry.value = 0;
				}, true);
								
				Contacts.$form.addEventListener("submit", function(event) {
					var entry = {
						id: parseInt(this.id_entry.value),
						hired_name: this.hired_name.value,
						hired_SSN: this.hired_SSN.value,
						hired_subject: this.hired_subject.value,
						hired_grade:this.hired_grade.value,
						hired_school:this.hired_school.value,
						hired_missingClass: "no"
					};
					
					if(this.hired_missingClass.checked==true){
						entry.hired_missingClass="yes";
					}
					else{ 
						entry.hired_missingClass="no";
					}
					var op = event.target.getAttribute("id");
					if(op=="contacts-form"){
						if (entry.id == 0) { // add
							Contacts.storeAdd(entry);
							Contacts.tableAdd(entry);
						}
						else { // edit
							Contacts.storeEdit(entry);
							Contacts.tableEdit(entry);
						}

						this.reset();
						this.id_entry.value = 0;
						event.preventDefault();
					}
				}, true);

				// initialize table
				if (window.localStorage.length - 1) {
					var contacts_list = [], i, key;
					for (i = 0; i < window.localStorage.length; i++) {
						key = window.localStorage.key(i);
						if (/Contacts:\d+/.test(key)) {
							contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
						}
					}

					if (contacts_list.length) {
						contacts_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Contacts.tableAdd);
					}
				}
				// initialize storage index
				if (Contacts.index==0) {
					window.localStorage.setItem("Contacts:index", Contacts.index = 1);
					Contacts.storeAdd(entry01);
					Contacts.tableAdd(entry01);
					Contacts.storeAdd(entry02);
					Contacts.tableAdd(entry02);
					Contacts.storeAdd(entry03);
					Contacts.tableAdd(entry03);
					Contacts.storeAdd(entry04);
					Contacts.tableAdd(entry04);
				}
				
				Contacts.$table.addEventListener("click", function(event) {
					var op = event.target.getAttribute("data-op");
					
					if (/edit|remove/.test(op)) {
						var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
						if (op == "edit") {
							Contacts.$form.id_entry.value = entry.id;
							Contacts.$form.hired_name.value = entry.hired_name;
							Contacts.$form.hired_SSN.value = entry.hired_SSN;
							Contacts.$form.hired_subject.value = entry.hired_subject;
							Contacts.$form.hired_grade.value = entry.hired_grade;
							Contacts.$form.hired_school.value = entry.hired_school;
							
							console.log(entry.hired_missingClass);
							if(entry.hired_missingClass=="yes"){ 
								Contacts.$form.hired_missingClass.checked=true;
							}
							else{ 
								Contacts.$form.hired_missingClass.checked=false;
							}
							
						}
						else if (op == "remove") {
							if (confirm('Are you sure you want to remove "'+ entry.hired_name +' '+ entry.hired_SSN +'" from your contacts?')) {
								Contacts.storeRemove(entry);
								Contacts.tableRemove(entry);
							}
						}
						event.preventDefault();
					}
				}, true);
			},

			storeAdd: function(entry) {
				entry.id = Contacts.index;
				window.localStorage.setItem("Contacts:index", ++Contacts.index);
				window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
			},
			storeEdit: function(entry) {
				window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
			},
			storeRemove: function(entry) {
				window.localStorage.removeItem("Contacts:"+ entry.id);
			},

			tableAdd: function(entry) {
				var $tr = document.createElement("tr"), $td, key;
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'">Edit</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
				$tr.appendChild($td);
				$tr.setAttribute("id", "entry-"+ entry.id);
				Contacts.$table.appendChild($tr);
			},
			tableEdit: function(entry) {
				var $tr = document.getElementById("entry-"+ entry.id), $td, key;
				$tr.innerHTML = "";
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'">Edit</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
				$tr.appendChild($td);
			},
			tableRemove: function(entry) {
				Contacts.$table.removeChild(document.getElementById("entry-"+ entry.id));
			}
		};
		Contacts.init();
		

		
	