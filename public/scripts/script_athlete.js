$(document).ready(function(){	
	// Скрипт для вызова формы данных	
	var showDataForm = function(formType){						
		$('#overlay, #dataForm').css('display','block');	
		$('#dataform-wrapper').show();	
		switch(formType){			
			case 1:
				$('#addRow, #cancleButton').css('display','inline');
				break;				
			case 2:
				$('#changeRow, #cancleButton').css('display','inline');
				break;			
		}		
	}	
	
	var $inputs = $('input[type=text], select, input[type=date]');
	//Скрипт для закрытия формы заполнения данных	
	$('#cancelButton').click(function(){
		closeFormFunction();
	});

	var closeFormFunction = function(){	
		$('#dataform-wrapper').hide();			
		$('#overlay, #dataForm, #addRow, #cancleButton, #changeRow').css('display','none');
		$inputs.each(function(){
			$(this).val($(this).attr('defaultValue'));
		});
	}		
	
	//Скрипты реагирования открытия, закрытия формы и заполнение внешних ключей		
	$('.showDataForm').click(function(){
		showDataForm(1);
		
		var inputData = {			
			action: 'selectInTable',
			tableNum: tNum			
		}	
		
			$.ajax({		
			url: "http://localhost:8080/",			
			type: "post",			
			data: JSON.stringify(inputData),				 
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			
			success: function(response){;
			if ( tNum == 1) {
				$('.sex').empty();
				$('.org').empty();
				$('.city').empty();
					var arr = response.split('/');
					//селект пола
					arr1 =  arr[0].split(' ');
					//селект организации
					arr2 =  arr[1].split(' ');
					//селект города
					arr3 =  arr[2].split(' ');
					var i;
					for(i = 0; i < arr.length - 1; i++) {				
						$(".sex").append( $("<option value= '" + arr1[i] + "'>" + arr1[i] + "</option>'"));
					}
					for(i = 0; i < arr.length - 1; i++) {				
						$(".org").append( $("<option value= '" + arr2[i] + "'>" + arr2[i] + "</option>'"));
					}
					for(i = 0; i < arr.length - 1; i++) {				
						$(".org").append( $("<option value= '" + arr3[i] + "'>" + arr3[i] + "</option>'"));
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
		});
	});

	
	//Скрипт для добавления строки в таблицу
	$('#addRow').click(function(){	
		var arrayOfData = new Array();
		$inputs.each(function(){			
			arrayOfData.push($(this).val());		
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
			action: 'addRowInTable',
			tableNum: tNum,
			array: arrayOfData			
		}	

		if(success == true)
			$.ajax({		
				url: "http://localhost:8080/",			
				type: "post",			
				data: JSON.stringify(inputData),				 
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
				
				success: function(response){
				$rowCells
				//при ответе True$данные
					if(response.split('$')[0] == "True")  {				
						$('#table tbody').append('<tr' + 'data-id="' + response.split('$')[1] + '"></tr>');			
						var $addedRow = $('#table tbody tr').last();		
						$inputs.each(function(){				
							$addedRow.append('<td>'+$(this).val()+'</td>');							
						});			
						$addedRow.append("<td>" + "<button class = 'btn btn-primary changeRow'>Изменить</button>" + "</td>");
						$addedRow.append("<td>" + "<button class = 'btn btn-danger deleteRow'>Удалить</button>" + "</td>");
						
						closeFormFunction();					
					}
					else 					
						alert("Не правильно введены данные!");										
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
		var inputData = {				
					action: 'deleteRowFromTable',
					rowNum: $rowCells,			
					tableNum: tNum,		
				}
				console.log(inputData);

		$.ajax({		
			url: "http://localhost:8080/",				
			type: "post",				
			data: JSON.stringify(inputData),					 
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				
			success: function(response){			
					
				if(response == "True"){						
					$changedRow.remove();						
				}
				else{						
					alert("Произошла ошибка при удалении!");
				}					
			}			
		});
	});
	

	//Скрипт для изменения строки в таблице
	$("#table").on("click", ".changeRow", function(){	
		showDataForm(2);

		$changedRow = $(this).parents("tr");
		$rowCells = $changedRow.children("td");
			if ( tNum == 1) {		
				var i = 0;
				$inputs.each(function(){				
					$(this).val($rowCells.eq(i).text());
					i++;				
				});	
			}

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
				action: 'changeRowInTable',
				tableNum: tNum,
				rowNum: $rowCells,
				array: arrayOfData			
			}

		if(success == true)
			$.ajax({		
				url: "http://localhost:8080/",				
				type: "post",				
				data: JSON.stringify(inputData),					 
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				
				success: function(response){
					if(response.split('$')[0] == "True"){	
						$changedRow.empty();	
						$changedRow.attr('data-id',response.split('$')[1]);					
						$inputs.each(function(){						
							$changedRow.append('<td>'+$(this).val()+'</td>');
						});	
					$changedRow.append("<td>" + "<button class = 'btn_task changeRow'>Изменить</button>" + "</td>");
					$changedRow.append("<td>" + "<button class = 'btn_task deleteRow'>Удалить</button>" + "</td>");
					closeFormFunction();						
					}									
					else{						
						alert("Произошла ошибка при изменении!");
					}
				}				
			});
			else{
				alert("Произошла ошибка при изменении!");
			}			
		})
	});
})
