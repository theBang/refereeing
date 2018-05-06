$(document).ready(function(){

	
// Скрипт для определения таблицы в зависимости от открытой страницы	
	var url = (document.URL).split("/");	
	var pageName = url[url.length-1];
	console.log(pageName);
	var tNum;
	var buttons = "<td>\n<button class = 'btn btn-primary changeRow'>Изменить</button>\n<button class = 'btn btn-danger deleteRow'>Удалить</button>\n</td>";

	switch(pageName){
		
		case 'athlete':
			tNum = 1; 
			break;
			
		case 'athletecard':
			tNum = 2; 
			break;
			
		case 'competition':
			tNum = 3; 
			break;
			
		case 'competitiontype':
			tNum = 4; 
			break;
			
		case '.html':
			tNum = 5; 
			break;		
	}		
	
// Скрипт для вызова формы данных	
	var showDataForm = function(formType){						
		$('#overlay, #dataForm').css('display','block');	
		$('#dataform-wrapper').show();	
		switch(formType){			
			case 'add':
				$('#addRow, #cancleButton').css('display','inline');
				break;				
			case 'change':
				$('#changeRow, #cancleButton').css('display','inline');
				break;			
		}		
	}	
	
	
	var $inputs = $('input[type=text], select, input[type=date], input[type=time], input[type=number], input[type=checkbox]');
	//Скрипт для закрытия формы заполнения данных	
	$('#cancelButton').click(function(){
		closeFormFunction();
	});

	function getOptions() {
		var setValue = arguments[0];
		var selected;
		/*if (arguments[0]) {
			console.log(arguments[0]);
		} else {
			console.log('nothingHere');
		}*/
		if (tNum != 3) {
			console.log(tNum);
			$.ajax({		
				url: "/" + pageName + "s",			
				type: "GET",					
				processData: false,
				success: function(data, textStatus, xhr) {
					if (xhr.status == '200'){
						if ( tNum == 1) {
							$('.sex').empty();
							$('.org').empty();
							$('.city').empty();
							//селект пола
							var genders = data.genders;
							//селект города
							var cities =  data.cities;
							var i, j;
							for(i = 0; i < genders.length; i++) {	
								if (setValue && setValue[4] == genders[i].gender_type) {
									selected = ' selected ';
								} else {
									selected = '';
								}			
								$(".sex").append( $("<option value= '" + genders[i].id + "'" + selected + ">" + genders[i].gender_type + "</option>'"));
							}
							for(i = 0; i < cities.length; i++) {		
								if (setValue && setValue[6] == cities[i].name) {
									selected = ' selected ';
								} else {
									selected = '';
								}			
								$(".city").append( $("<option value= '" + cities[i].id + "'" + selected + ">" + cities[i].name + "</option>'"));
							}
						}
						if ( tNum == 2) {
							console.log(data);
							$('.competition').empty();
							$('.athlete').empty();
							$('#athleticsType').empty();
							$('.rank').empty();
							$('.appearences').empty();
							//селект соревнований
							var competitions = data.competitions;
							//селект спортсменов
							var athletes = data.athletes;
							//селект вида
							//var athletics = data.athletics;
							//селект разряда
							var ranks = data.ranks;
							//селект лично там не лично
							//var appearences = data.appearences;
							console.log(athletes[0].first_name);
							var i;
							for(i = 0; i < competitions.length; i++) {		
								if (setValue && setValue[0] == competitions[i].name) {
									selected = ' selected ';
								} else {
									selected = '';
								}		
								$(".competition").append( $("<option value= '" + competitions[i].id + "'" + selected + ">" + competitions[i].name + "</option>'"));
							}

							for(i = 0; i < athletes.length; i++) {		
								if (setValue && setValue[1] == athletes[i].last_name) {
									selected = ' selected ';
								} else {
									selected = '';
								}		
								$(".athlete").append( $("<option value= '" + athletes[i].id + "'" + selected + ">" + athletes[i].last_name + " " + athletes[i].first_name.charAt(0) + "." + athletes[i].middle_name.charAt(0) +  ".</option>'"));
							}

							var request = {
								competition: $('#competitionsSelect').val(),
								athlete: $('#athleteSelect').val()
							}

							$.ajax({		
								url: "/" + pageName + "check",			
								type: "POST",	
								dataType: 'json',		
								contentType: "application/json",
								data: JSON.stringify(request),				 
								success: function(data, textStatus, xhr){
									if(xhr.status == '200')  {	
										$('#athleticsType').empty();	
										var athletics = data.athletics;
										for(i = 0; i < athletics.length; i++) {		
											if (setValue && setValue[2] == athletics[i].athletics_type.name) {
												selected = ' selected ';
											} else {
												selected = '';
											}		
											console.log("<option value= '" + athletics[i].id + "'>" + athletics[i].athletics_type.name + "</option>'");		
											$("#athleticsType").append( $("<option value= '" + athletics[i].id + "'" + selected + ">" + athletics[i].athletics_type.name + "</option>'"));
										}		
										console.log(data);		
									}							
								},
								complete: function(xhr, textStatus) {
									if (xhr.status == '500') {
										console.log('Options err: ');
										console.log(xhr);
									}
								} 					
							});	
							/*for(i = 0; i < athletics.length; i++) {		
								if (setValue && setValue[2] == athletics[i].name) {
									selected = ' selected ';
								} else {
									selected = '';
								}		
								$(".athleticsType").append( $("<option value= '" + athletics[i].id + "'" + selected + ">" + athletics[i].name + "</option>'"));
							}*/
							for(i = 0; i < ranks.length; i++) {		
								if (setValue && setValue[4] == ranks[i].name) {
									selected = ' selected ';
								} else {
									selected = '';
								}		
								$(".rank").append( $("<option value= '" + ranks[i].id + "'" + selected + ">" + ranks[i].name + "</option>'"));
							}
							/*for(i = 0; i < appearences.length; i++) {		
								if (setValue && setValue[5] == appearences[i].name) {
									selected = ' selected ';
								} else {
									selected = '';
								}		
								$(".appearences").append( $("<option value= '" + appearences[i].id + "'" + selected + ">" + appearences[i].name + "</option>'"));
							}*/
						}

						if (tNum == 4) {
							$('.competition').empty();
							//селект соревнований
							var competitions = data.competitions;
							var i;
							for(i = 0; i < competitions.length; i++) {		
								if (setValue && setValue[0] == competitions[i].name) { 
									selected = ' selected '; 
								} else { 
									selected = ''; 
								}	

								$(".competition").append( $("<option value= '" + competitions[i].id + "'" + selected + ">" + competitions[i].name + "</option>'"));
							}
						}
					}
				},
				complete: function(xhr, textStatus) {
					if (xhr.status == '500') {
						console.log('Options err: ');
						console.log(xhr);
					}
				} 		
			});
		}
	} 

	var closeFormFunction = function(){	
		$('#dataform-wrapper').hide();			
		$('#overlay, #dataForm, #addRow, #cancleButton, #changeRow').css('display','none');
		$inputs.each(function(){
			$(this).val($(this).attr('defaultValue'));
		});
	}		
	
	//Скрипты реагирования открытия, закрытия формы и заполнение внешних ключей		
	$('.showDataForm').click(function(){
		getOptions();
		showDataForm('add');
	});

	// Check competition types
	$('#checkTypes').click(function(){
		var request = {
			competition: $('#competitionsSelect').val(),
			athlete: $('#athleteSelect').val()
		}
		console.log($('#competitionsSelect').val());
		console.log($('#athleteSelect').val());
		console.log(request);
		$.ajax({		
			url: "/" + pageName + "check",			
			type: "POST",	
			dataType: 'json',		
			contentType: "application/json",
			data: JSON.stringify(request),				 
			success: function(data, textStatus, xhr){
				if(xhr.status == '200')  {		
					$('#athleticsType').empty();	
					var athletics = data.athletics;
					for(i = 0; i < athletics.length; i++) {		
						/*if (setValue && setValue[2] == athletics[i].name) {
							selected = ' selected ';
						} else {
							selected = '';
						}		*/
						console.log("<option value= '" + athletics[i].id + "'>" + athletics[i].athletics_type.name + "</option>'");		
						$("#athleticsType").append( $("<option value= '" + athletics[i].id + "'>" + athletics[i].athletics_type.name + "</option>'"));
					}		
					console.log(data);		
				}							
			},
			complete: function(xhr, textStatus) {
				if (xhr.status == '500') {
					console.log('Options err: ');
					console.log(xhr);
				}
			} 					
		});	
	});

	
	//Скрипт для добавления строки в таблицу
	$('#addRow').click(function(){	
		var arrayOfData = new Array();
		$inputs.each(function(){			
			arrayOfData.push($(this).val());
			console.log(arrayOfData);		
		});
		
		var i;
		var success = true;
            for(i = 0; i < arrayOfData.length; i++) {
                if(arrayOfData[i] == "") {
						console.log(arrayOfData[i]);
                   	success = false;
                    break;
				}
			}
			
		var inputData = {			
			object: arrayOfData			
		}	

		if(success == true) {
			$.ajax({		
				url: "/" + pageName,			
				type: "POST",	
				dataType: 'json',		
				contentType: "application/json",
				data: JSON.stringify(inputData),				 
				success: function(data, textStatus, xhr){
					if(xhr.status == '200')  {			
						$(".showDataForm").before('<tr' + ' data-id="' + data.id + '"></tr>');
						var $addedRow = $('#table tbody > tr:eq(-2)');	
						data.row.forEach(function(item){				
							$addedRow.append('<td>' + item + '</td>');							
						});			
						$addedRow.append(buttons);
						closeFormFunction();					
					}							
				},
				complete: function(xhr, textStatus) {
					if (xhr.status == '500') {
						console.log('500')
						alert("Неправильно введены данные!");
					}
				} 					
			});	
		} else { alert("Неправильно введены данные!");	}
	});

	var $changedRow, $rowCells;	
	
	//Скрипт для удаления строки в таблице		
	$("#table").on("click", ".deleteRow", function(){	
		$changedRow = $(this).parents("tr");
		$rowCells = $changedRow.attr("data-id");
		var inputData = { id: $rowCells };
		console.log(inputData);

		$.ajax({		
			url: "/" + pageName,				
			type: "DELETE",				
			dataType: 'json',	 
			contentType: "application/json",
			data: JSON.stringify(inputData),				 
			success: function(data, textStatus, xhr){
				if(xhr.status == '200')  { 
					console.log('ccool');
					$changedRow.remove(); 
				}								
			},
			complete: function(xhr, textStatus) {
				if (xhr.status == '500') {
					alert("Произошла ошибка при удалении!");			
				}
			} 				
		});
	});
	

//Скрипт для изменения строки в таблице
	$("#table").on("click", ".changeRow", function(){	
		console.log('--------------------');

		$changedRow = $(this).parents("tr");
		$rowCells = $changedRow.children("td");
		
		var i = 0;
		var setValue = [];

		$inputs.each(function(){				
			$(this).val($rowCells.eq(i).text());
			console.log($(this));
			setValue.push($rowCells.eq(i).text());
			i++;				
		});		
			
		getOptions(setValue);
		showDataForm('change');

		$('#changeRow, #deleteRow').unbind();
		
		$changedRow = $(this).parents("tr");
		$rowCells = $changedRow.attr("data-id");;	
			
		$('#changeRow').bind('click', function(){
			var arrayOfData = new Array();
			
			$inputs.each(function(){			
				arrayOfData.push($(this).val());		
			});		
			var success = true;
			
			for(var i = 0; i < arrayOfData.length; i++) {
				if(arrayOfData[i] == "") {
					console.log(arrayOfData[i]);
					success = false;
					break;
				}
			}					
				
			var inputData = {				
				id: $rowCells,
				object: arrayOfData			
			}

			if(success) {
				$.ajax({		
					url: "/" + pageName,				
					type: "PUT",				
					dataType: 'json',	 
					contentType: "application/json",
					data: JSON.stringify(inputData),
					success: function(data, textStatus, xhr){
						if(xhr.status == '200')  { 
							$changedRow.empty();	
							$changedRow.attr('data-id', data.id);					
							data.row.forEach(function(item){						
								$changedRow.append('<td>' + item + '</td>');
							});	
							$changedRow.append(buttons);
							closeFormFunction();	 
						}								
					},
					complete: function(xhr, textStatus) {
						if (xhr.status == '500') {
							console.log(xhr);
							alert("Произошла ошибка при изменении!");
						}
					} 					
				});
			} else { alert("Произошла ошибка при изменении!"); }			
		})
	});
})
