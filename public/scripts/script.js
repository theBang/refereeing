$(document).ready(function(){

	
// Скрипт для определения таблицы в зависимости от открытой страницы	
	var url = (document.URL).split("/");	
	var pageName = url[url.length-1];
	console.log(pageName);
	var tNum;
	
	switch(pageName){
		
		case 'athlete':
			tNum = 1; 
			break;
			
		case 'addAthleteCards.html':
			tNum = 2; 
			break;
			
		case '.html':
			tNum = 3; 
			break;
			
		case '.html':
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
	
	var $inputs = $('input[type=text], select, input[type=date]');
	//Скрипт для закрытия формы заполнения данных	
	$('#cancelButton').click(function(){
		closeFormFunction();
	});

	function getOptions() {
		$.ajax({		
			url: "/" + pageName + "s",			
			type: "GET",					
			processData: false,
			success: function(data, textStatus, xhr) {
				if (xhr.status == '200'){
					if ( tNum == 1) {
						console.log(data);
						$('.sex').empty();
						$('.org').empty();
						$('.city').empty();
						//селект пола
						var genders = data.genders;
						//селект города
						var cities =  data.cities;
						var i, j;
						for(i = 0; i < genders.length; i++) {				
							$(".sex").append( $("<option value= '" + genders[i].id + "'>" + genders[i].gender_type + "</option>'"));
						}
						for(i = 0; i < cities.length; i++) {				
							$(".city").append( $("<option value= '" + cities[i].id + "'>" + cities[i].name + "</option>'"));
						}
					}
					if ( tNum == 2) {
						console.log('222');
						$('.competitions').empty();
						$('.athlete').empty();
						$('.athleticsType').empty();
						$('.rank').empty();
						$('.appearences').empty();
						
						var arr = response.split('/');
						//селект соревнований
						arr1 =  arr[0].split(' ');
						//селект сопртсменов
						arr2 =  arr[1].split(' ');
						//селект вида
						arr3 =  arr[2].split(' ');
						//селект разряда
						arr4 =  arr[2].split(' ');
						//селект лично там не лично
						arr4 =  arr[2].split(' ');
						var i;
						for(i = 0; i < arr.length - 1; i++) {				
							$(".competitions'").append( $("<option value= '" + arr1[i] + "'>" + arr1[i] + "</option>'"));
						}
						for(i = 0; i < arr.length - 1; i++) {				
							$(".athlete").append( $("<option value= '" + arr2[i] + "'>" + arr2[i] + "</option>'"));
						}
						for(i = 0; i < arr.length - 1; i++) {				
							$(".athleticsType").append( $("<option value= '" + arr3[i] + "'>" + arr3[i] + "</option>'"));
						}
						for(i = 0; i < arr.length - 1; i++) {				
							$(".rank").append( $("<option value= '" + arr4[i] + "'>" + arr3[i] + "</option>'"));
						}
						for(i = 0; i < arr.length - 1; i++) {				
							$(".appearences").append( $("<option value= '" + arr5[i] + "'>" + arr3[i] + "</option>'"));
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

		if(success == true)
			$.ajax({		
				url: "/" + pageName,			
				type: "POST",	
				dataType: 'json',		
				contentType: "application/json",
				data: JSON.stringify(inputData),				 
				success: function(data, textStatus, xhr){
					if(xhr.status == '200')  {				
						$('#table tbody').append('<tr' + 'data-id="' + data.id + '"></tr>');			
						var $addedRow = $('#table tbody tr').last().prev();	
						data.row.forEach(function(item){				
							$addedRow.append('<td>' + item + '</td>');							
						});			
						$addedRow.append("<td>" + "<button class = 'btn btn-primary changeRow'>Изменить</button>" + "</td>");
						$addedRow.append("<td>" + "<button class = 'btn btn-danger deleteRow'>Удалить</button>" + "</td>");
						
						closeFormFunction();					
					}							
				},
				complete: function(xhr, textStatus) {
					if (xhr.status == '500') {
						alert("Не правильно введены данные!");
					}
				} 					
			});	
			else				
				alert("Не правильно введены данные!");			
	});

	var $changedRow, $rowCells;	
	
	//Скрипт для удаления строки в таблице		
	$("#table").on("click", ".deleteRow", function(){	
		$changedRow = $(this).parents("tr");
		$rowCells = $changedRow.attr("data-id");;	
		var inputData = { id: $rowCells }
		console.log(inputData);

		$.ajax({		
			url: "/" + pageName,				
			type: "DELETE",				
			dataType: 'json',	 
			contentType: "application/json",
			data: JSON.stringify(inputData),				 
			success: function(data, textStatus, xhr){
				if(xhr.status == '200')  { 
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
		

		$changedRow = $(this).parents("tr");
		$rowCells = $changedRow.children("td");
		if (tNum == 1) {		
			var i = 0;
			$inputs.each(function(){				
				$(this).val($rowCells.eq(i).text());
				i++;				
			});	
		}
		getOptions();
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

		if(success)
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
						$changedRow.append("<td>" + "<button class = 'btn btn-primary changeRow'>Изменить</button>" + "</td>");
						$changedRow.append("<td>" + "<button class = 'btn btn-danger deleteRow'>Удалить</button>" + "</td>");
						closeFormFunction();	 
					}								
				},
				complete: function(xhr, textStatus) {
					if (xhr.status == '500') {
						alert("Произошла ошибка при удалении!");
					}
				} 					
			});
			else{
				alert("Произошла ошибка при изменении!");
			}			
		})
	});
})
