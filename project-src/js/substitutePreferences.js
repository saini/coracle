		
		var entry01 = {
				id: 0,
				sub_name: "Martin Luther",
				sub_PIN: 1234,
				sub_SSN: 987987987,
				sub_phone: "789 098 0998",
				sub_rating: 2,
				sub_seniority: 3,
				sub_acceptSubject: "English",
				sub_prefSubject: "Math",
				sub_acceptGradeLevel: "H",
				sub_prefGradeLevel: "K",
				sub_acceptSchool: "Oak",
				sub_prefSchool: "Cedar",
				sub_teachersSubstituted: "Marie Curie, 03/08/2012"
			};
		
		var entry02 = {
				id: 1,
				sub_name: "Harvey Milk",
				sub_PIN: 2424,
				sub_SSN: 487987987,
				sub_phone: "889 098 0993",
				sub_rating: 1,
				sub_seniority: 10,
				sub_acceptSubject: "English",
				sub_prefSubject: "Science",
				sub_acceptGradeLevel: "A",
				sub_prefGradeLevel: "J",
				sub_acceptSchool: "Cedar",
				sub_prefSchool: "Oak",
				sub_teachersSubstituted: ""
		};
		
		var entry03 = {
				id: 2,
				sub_name: "Eleanor Roosevel",
				sub_PIN: 4444,
				sub_SSN: 2879879812,
				sub_phone: "999 098 0993",
				sub_rating: 3,
				sub_seniority: 15,
				sub_acceptSubject: "Science",
				sub_prefSubject: "Math",
				sub_acceptGradeLevel: "K,J",
				sub_prefGradeLevel: "A",
				sub_acceptSchool: "Cedar",
				sub_prefSchool: "Mahogany",
				sub_teachersSubstituted: "Caroline Herschel, 04/04/2013"
		};
		
		var entry04 = {
				id: 3,
				sub_name: "Cesar Chavez",
				sub_PIN: 9980,
				sub_SSN: 6587879812,
				sub_phone: "119 098 0993",
				sub_rating: 2,
				sub_seniority: 4,
				sub_acceptSubject: "Math",
				sub_prefSubject: "Biology",
				sub_acceptGradeLevel: "K",
				sub_prefGradeLevel: "J",
				sub_acceptSchool: "Oak",
				sub_prefSchool: "Cedar",
				sub_teachersSubstituted: "Marie Curie, 03/03/2013"
		};

var Substitutes = {
			index: window.localStorage.getItem("Substitutes:index"),
			$table: document.getElementById("Substitutes-table"),
			$form: document.getElementById("Substitutes-form"),
			$button_save: document.getElementById("Substitutes-op-save"),
			$button_discard: document.getElementById("Substitutes-op-discard"),

			init: function() {
				window.localStorage.clear;
				
				

				// initialize form
				Substitutes.$form.reset();
				Substitutes.$button_discard.addEventListener("click", function(event) {
					Substitutes.$form.reset();
					Substitutes.$form.sub_id_entry.value = 0;
				}, true);
				Substitutes.$form.addEventListener("submit", function(event) {
					
					var entry = {
						id: parseInt(this.sub_id_entry.value),
						sub_name: this.sub_name.value,
						sub_PIN: this.sub_PIN.value,
						sub_SSN: this.sub_SSN.value,
						sub_phone: this.sub_phone.value,
						sub_rating: this.sub_rating.value,
						sub_seniority: this.sub_seniority.value,
						sub_acceptSubject: this.sub_acceptSubject.value,
						sub_prefSubject: this.sub_prefSubject.value,
						sub_acceptGradeLevel: this.sub_acceptGradeLevel.value,
						sub_prefGradeLevel: this.sub_prefGradeLevel.value,
						sub_acceptSchool: this.sub_acceptSchool.value,
						sub_prefSchool: this.sub_prefSchool.value,
						sub_teachersSubstituted: this.sub_teachersSubstituted.value
					};
					
					
					var op = event.target.getAttribute("id");
					//alert(op);
					if((op=="Substitutes-form")&&(Substitutes.index!=1)){
						if (entry.id == 0){ // add
							Substitutes.storeAdd(entry);
							Substitutes.tableAdd(entry);
						}
						else { // edit
							Substitutes.storeEdit(entry);
							Substitutes.tableEdit(entry);
						}
					
						this.reset();
						this.sub_id_entry.value = 0;
						event.preventDefault();
					}
				}, true);

				// initialize table
				if (window.localStorage.length - 1) {
					var Substitutes_list = [], i, key;
					for (i = 0; i < window.localStorage.length; i++) {
						key = window.localStorage.key(i);
						if (/Substitutes:\d+/.test(key)) {
							Substitutes_list.push(JSON.parse(window.localStorage.getItem(key)));
						}
					}

					if (Substitutes_list.length) {
						Substitutes_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Substitutes.tableAdd);
					}
				}
				
				// initialize storage index
				if (Substitutes.index==0) {
						window.localStorage.setItem("Substitutes:index", Substitutes.index = 1);
						Substitutes.storeAdd(entry01);
						Substitutes.tableAdd(entry01);
						Substitutes.storeAdd(entry02);
						Substitutes.tableAdd(entry02);
						Substitutes.storeAdd(entry03);
						Substitutes.tableAdd(entry03);
						Substitutes.storeAdd(entry04);
						Substitutes.tableAdd(entry04);
						console.log(Substitutes.index);
				}
				
				Substitutes.$table.addEventListener("click", function(event) {
					var op = event.target.getAttribute("data-op");
					if (/edit|remove/.test(op)) {
						var entry = JSON.parse(window.localStorage.getItem("Substitutes:"+ event.target.getAttribute("data-id")));
						if (op == "edit") {
							Substitutes.$form.sub_id_entry.value = entry.id;
							Substitutes.$form.sub_name.value = entry.sub_name;
							Substitutes.$form.sub_SSN.value = entry.sub_SSN;
							Substitutes.$form.sub_PIN.value = entry.sub_PIN;
							Substitutes.$form.sub_phone.value = entry.sub_phone;
							Substitutes.$form.sub_rating.value = entry.sub_rating;
							Substitutes.$form.sub_seniority.value = entry.sub_seniority;
							Substitutes.$form.sub_acceptSubject.value = entry.sub_acceptSubject;
							Substitutes.$form.sub_prefSubject.value = entry.sub_prefSubject;
							Substitutes.$form.sub_acceptGradeLevel.value = entry.sub_acceptGradeLevel;
							Substitutes.$form.sub_prefGradeLevel.value = entry.sub_prefGradeLevel;
							Substitutes.$form.sub_acceptSchool.value = entry.sub_acceptSchool;
							Substitutes.$form.sub_prefSchool.value = entry.sub_prefSchool;
							Substitutes.$form.sub_teachersSubstituted.value = entry.sub_teachersSubstituted;
						}
						else if (op == "remove") {
							if (confirm('Are you sure you want to remove "'+ entry.sub_name +' '+ entry.sub_SSN +'" from your Substitutes?')) {
								Substitutes.storeRemove(entry);
								Substitutes.tableRemove(entry);
							}
						}
						event.preventDefault();
					}
				}, true);
			},
			
			storeAdd: function(entry) {
				entry.id = Substitutes.index;
				window.localStorage.setItem("Substitutes:index", ++Substitutes.index);
				window.localStorage.setItem("Substitutes:"+ entry.id, JSON.stringify(entry));
			},
			storeEdit: function(entry) {
				window.localStorage.setItem("Substitutes:"+ entry.id, JSON.stringify(entry));
			},
			storeRemove: function(entry) {
				window.localStorage.removeItem("Substitutes:"+ entry.id);
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
				$tr.setAttribute("id", "sub-entry-"+ entry.id);
				Substitutes.$table.appendChild($tr);
			},
			tableEdit: function(entry) {
				var $tr = document.getElementById("sub-entry-"+ entry.id), $td, key;
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
				Substitutes.$table.removeChild(document.getElementById("sub-entry-"+ entry.id));
			}
		};
		Substitutes.init();

		
		
		
		