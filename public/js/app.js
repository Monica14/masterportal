var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$location){
	//alert("dsadsa");
	//$scope.author='dsf';
	$scope.options = [
      {id:1, name:'Starbuck'},
      {id:2, name:'Appolo'},
      {id:3, name:'Saul Tigh'},
      {id:4, name:'Adama'}
    ]
	$scope.submit = function()
	{
		alert($scope.fname);
		console.log("In Angular");
		var data = {
	        form_name: $scope.fname
	    };
	 //        //console.log($scope);
	 //$location.path('/form');
		$http.post("/core_master/savedata",data).then(function(data,status){
			alert(data.data)
			$scope.fname = '';
			//$location.path('/form');
			//window.location.href = '/form';
		});
		// $http.get("/tab/getdata",data).then(function(data){
		// 	$scope.value = data;
		// });
	}

	$scope.settings_tablename = "settings";
	$scope.setgoal_settings = "setgoal_from,setgoal_to,settings_tablename,databasename";
	$scope.setgoal_settings1 = "setgoal_from,setgoal_to,key_id,settings_tablename,databasename";
	$scope.midgoal_settings = "midyear_from,midyear_to,settings_tablename,databasename";
	$scope.midgoal_settings1 = "midyear_from,midyear_to,key_id,settings_tablename,databasename";
	//$scope.title = 'sdasdas'
    $scope.savedata = function(data,flag,tablename)
	{
		//var a=new Date( "dd-mm-yy", new Date("2016-04-26"));
		// var a = moment("July 1, 1994").format('DD-MM-YYYY');
		//alert(tablename);
		list = data.split(',')
		list_items = '';
		for (var i = 0; i < list.length-2; i++) {
			// if (list[i].trim() == "settings_tablename") 
			// {
			// 	$scope[list[i]] = $scope[list[i]]
			// }
			// else
			// {
			// 	$scope[list[i]] = moment($scope[list[i]]).format('DD-MM-YYYY');
			// }
			//alert($scope[list[i]]);
			if (i==0) 
			{
				list_items = list[i]+" : "+$scope[list[i]]
			}
			else
			{
				
				list_items = list_items +','+ list[i]+" : "+$scope[list[i]]
			}
		};
		console.log(list_items);
		if (flag == "save") 
		{
			current_yr = new Date().getFullYear();
			prev_yr = new Date().getFullYear()+1
			id = new Date().getTime();
			list_items = list_items+',year : '+current_yr+'-'+prev_yr+',key_id : '+id;	
		};		
		$http.post("/settings/savedata",{list_items:list_items,flag:flag,tablename : tablename,where : $scope.key_id}).then(function(data,status){
			alert("Setgoal Saved")			
		});
		
		//console.log(data)
	}

	$scope.deleterecord = function(data,tablename,database)
	{
		details = data.split(':');
		where = 'where '+details[1]+' = "'+details[0]+'"';
		console.log(data);
		console.log(where)
		$http.post("/settings/deletedata",{tablename : tablename.trim(),where : where}).then(function(data,status){
			window.location.href = '/employee_master';
		});
	}

	$scope.editdata = function(data,tablename,database)
	{
		//alert(data)
		
		
		list = data.split(',')
		list_items = '';
		for (var i = 0; i < list.length; i++) {			
			if (i==0) 
			{
				list_items = list[i]
			}
			else
			{
				
				list_items = list_items +','+ list[i]
			}
		};
		var details = {
			list_items : list_items,
			tablename : tablename
		}
		
		//alert("sdsadsa")
		for (var i = 0; i < list.length-2; i++) {			
			if (i==0) 
			{
				where = list[i]+"  IS NOT NULL"
			}
			else
			{
				
				where = where +' and '+ list[i]+"  IS NOT NULL"
			}
		};
		console.log($scope.editset)
		if ($scope.editset) 
		{alert("Asdasds");
			$http.post("/settings/getdata",{list_items : list_items,tablename : tablename,where : where}).then(function(data,status){
			
				for (var i = 0; i < list.length-2; i++) {
					field = list[i].trim();
					$scope[list[i]] = data.data[0][field]
					console.log($scope[list[i]])
				};	
			});
			angular.element(document.getElementsByClassName("updatebtn")).css('display','');
		}
		else
		{
			for (var i = 0; i < list.length-2; i++) {
				field = list[i].trim();
				$scope[list[i]] = ''					
			};
			angular.element(document.getElementsByClassName("updatebtn")).css('display','none');
		}
		if ($scope.editset_yearend) 
		{
			$http.post("/settings/getdata",{list_items : list_items,tablename : tablename,where : where}).then(function(data,status){
			
				for (var i = 0; i < list.length-2; i++) {
					field = list[i].trim();
					$scope[list[i]] = data.data[0][field]
					console.log($scope[list[i]])
				};	
			});
			angular.element(document.getElementsByClassName("updatebtn2")).css('display','');
		}
		else
		{
			for (var i = 0; i < list.length-2; i++) {
				field = list[i].trim();
				$scope[list[i]] = ''					
			};
			angular.element(document.getElementsByClassName("updatebtn2")).css('display','none');
		}
		if ($scope.editset_mid) 
		{
			$http.post("/settings/getdata",{list_items : list_items,tablename : tablename,where : where}).then(function(data,status){
				//detail = JSON.parse(data.data)
				//console.log(list.length-2)
				for (var i = 0; i < list.length-2; i++) {
					//$scope[list[i]] = data.data[0].list[i];
					field = list[i].trim();
					// console.log(data.data[0])
					// console.log(field)
					// console.log(data.data[0][field])
					//console.log(data.data[0].list[i])
					// $scope.setgoal_from = data.data[0].list[i]
					$scope[list[i]] = data.data[0][field]
					console.log($scope[list[i]])
				};	
			});
			angular.element(document.getElementsByClassName("updatebtn1")).css('display','');
		}
		else
		{
			for (var i = 0; i < list.length-2; i++) {
				field = list[i].trim();
				$scope[list[i]] = ''					
			};
			angular.element(document.getElementsByClassName("updatebtn1")).css('display','none');
		}
		
	}

	$scope.editpage = function(event)
	{
		//alert("ASdsad");
		var data = {
			id : event.target.id,
			// dbname: $scope.dbname1,
	  //       tablename: $scope.tablename1,
		};
		$http.post("/core_master/edit",data).then(function(response,status){
			$scope.DataService = response.data;
			//$scope.ftp = DataService[0].field_type;
			//$scope.tableeditdata = $scope.DataService[0].field_type;
			$scope.field_name = $scope.DataService[0].field_name;
			$scope.field_type = $scope.DataService[0].field_type;

			var other_info = $scope.DataService[0].field_extra_info;
			other_details = other_info.split('@');
			angular.element(document.getElementById("other_information_chekbox_num")).val(other_details[0]);
			angular.element(document.getElementById("other_information_chekbox")).val(other_details[1]);
			angular.element(document.getElementById("other_information_chekbox")).val(other_details[1]);
			//angular.element(document.getElementByClassName("update_field")).css('display','');
			$scope.other_information_chekbox_num = other_details[0];
			$scope.other_information_chekbox = other_details[1];
			$scope.regular_exp = $scope.DataService[0].validate;
			$scope.form_name2 = $scope.DataService[0].form_name;
			$scope.tab_name1 = $scope.DataService[0].tab_name;
			$scope.namefield = $scope.DataService[0].namefield;
			$scope.error_message = $scope.DataService[0].error_message;
			$scope.compulsory = $scope.DataService[0].compulsory;
			$scope.dbname1 = $scope.DataService[0].dbname;
			$scope.tablename1 = $scope.DataService[0].tablename;
			$scope.columnname = $scope.DataService[0].columnname;
			$scope.coltype = $scope.DataService[0].coltype;
			$scope.fieldstatus = $scope.DataService[0].status;
			angular.element(document.getElementById("save_field")).css('display','none');
			if ($scope.DataService[0].compulsory == 'yes') 
			{
				angular.element(document.getElementById("comp_yes")).prop('checked',true);
			}
			else if ($scope.DataService[0].compulsory == 'no')
			{
				angular.element(document.getElementById("comp_no")).prop('checked',true);
			}
			if ($scope.DataService[0].status == 'Active') 
			{
				angular.element(document.getElementById("Active")).prop('checked',true);
			}
			else if ($scope.DataService[0].status == 'Inactive')
			{
				angular.element(document.getElementById("Inactive")).prop('checked',true);
			}
			if ($scope.DataService[0].field_type == 'textbox') 
			{
				angular.element(document.getElementById("textbox")).prop('checked',true);
			}
			else if ($scope.DataService[0].field_type == 'dropdown')
			{
				angular.element(document.getElementById("dropdown")).prop('checked',true);
			}
			else if ($scope.DataService[0].field_type == 'chekbox')
			{
				angular.element(document.getElementById("chekbox")).prop('checked',true)
			}
			else if ($scope.DataService[0].field_type == 'password')
			{
				angular.element(document.getElementById("password")).prop('checked',true)
			}
			else if ($scope.DataService[0].field_type == 'radio')
			{
				angular.element(document.getElementById("radio")).prop('checked',true);
			}
			else if ($scope.DataService[0].field_type == 'textarea')
			{
				angular.element(document.getElementById("textarea")).prop('checked',true);
			}
			angular.element(document.getElementById("dbname1")).val($scope.DataService[0].dbname)
			angular.element(document.getElementById("tablename1")).val($scope.DataService[0].tablename)
			angular.element(document.getElementById("form_name2")).val($scope.DataService[0].form_name)
			angular.element(document.getElementById("tab_name1")).val($scope.DataService[0].tab_name)
			console.log($scope.DataService);
			//window.location.href = '/core_master';
		});
	}

	$scope.update_field = function(event)
	{
		//alert($scope.field_name);
		var data = {
			form_name: $scope.form_name2,
	        tab_name: $scope.tab_name1,
	        field_name: $scope.field_name,
	        field_type:$scope.field_type,
	        field_extra_info:$scope.other_information_chekbox_num+'@'+$scope.other_information_chekbox,
	        validate: $scope.regular_exp,
	        compulsory: $scope.compulsory,
	        error_message: $scope.error_message,
	        namefield: $scope.namefield,	        
	        dbname: $scope.dbname1,
	        tablename: $scope.tablename1,
	        columnname: $scope.columnname,
	        coltype : $scope.coltype,
	        status : $scope.fieldstatus,
	        id : event.target.id
		};
		var data1 = {
			dbname: $scope.dbname1,
	        tablename: $scope.tablename1,
	        columnname: $scope.columnname,
	        coltype : $scope.coltype,
	        id : event.target.id
		};

		//console.log(data);
		//alert($scope.field_type);
		//alert($scope.compulsory);
		$http.post("/core_master/updatedata",data).then(function(data,status){
			window.location.href = '/core_master';
		});

		$http.post("/core_master/columnedit",data1).then(function(data,status){
			//alert(data.data)
			window.location.href = '/core_master';
		});
	}

	$scope.authlogin = function()
	{
		//alert($scope.databsename);
		console.log("In Angular");
		var data = {
	        username: $scope.username,
	        password : $scope.password
	    };
	 
		$http.post("/login/auth",data).then(function(data,status){
			//alert(data.data)
			window.location.href = '/';
		});		
	}

	$scope.authloginadmin = function()
	{
		//alert($scope.databsename);
		console.log("In Angular");
		var data = {
	        username: $scope.username,
	        password : $scope.password
	    };
	 
		$http.post("/login/auth",data).then(function(data,status){
			//alert(data.data)
			window.location.href = '/dashboard';
		});		
	}

	$scope.savedatabase = function()
	{
		//alert($scope.databsename);
		console.log("In Angular");
		var data = {
	        databsename: $scope.databsename
	    };
	 
		$http.post("/form/savedatabase",data).then(function(data,status){
			alert(data.data)
			window.location.href = '/form';
		});		
	}

	$scope.savetable = function()
	{
		alert($scope.table_colnumber);
		db = $scope.dbname_table
		tablename = $scope.create_tablename
		var data = {
	        dbname_table: db.trim(),
	        create_tablename: tablename.trim(),
	        table_colnumber: $scope.table_colnumber,
	        table_colname: $scope.table_colname,
	        table_coltype: $scope.table_coltype
	    };
	 	console.log(data)
		$http.post("/form/savetable",data).then(function(data,status){
			alert(data.data)
			//window.location.href = '/form';
		});		
	}

	$scope.generateReport = function()
	{
		report_details = '';
		report_col = '';
		jsreport.serverUrl = 'http://localhost:5488';  
		data = {
			report_name : 'new report'
		};
		$http.post("/reportformat/getreportdata",data).then(function(data,status){
			$scope.report_col = data.data;		
			//return report_col;
		});
		$http.post("/reportformat/getreportdata2",data).then(function(data,status){
			$scope.report_details = data.data;
			//console.log(report_details.length);
		});
		//$scope.report_col1 = $scope.report_col;
		//report_details1 = $scope.report_details;
		report_col = $scope.report_col.split(',');
		//report_details = $scope.report_details.split(',');
		console.log($scope.report_details.length);
		var html_data = '';html_data1 = '';
			for (var i = 0; i < $scope.report_details.length; i++) {
				for (var j = 0; j < report_col.length; j++) {

					if (j == 0) 
					{
						html_data = '"'+report_col[j]+'":"'+$scope.report_details[i][report_col[j]]+'"';
					}
					else
					{
						html_data = html_data+','+'"'+report_col[j]+'":"'+$scope.report_details[i][report_col[j]]+'"';
					}					
				}
				if (i == 0) 
				{
					html_data1 = '{'+html_data+'}';
				}
				else
				{
					html_data1 = html_data1+',{'+html_data+'}';
				}
				
			};
			html_data1 = '['+html_data1+']';
			console.log(html_data1);
			html_data2 = [
			{"username":"ritesh.prajapati.admin@vvfltd.com","password":"e11170b8cbd2d74102651cb967fa28e5"},
			{"username":"jitendra.koli@vvfltd.com","password":"a54c37c1c06e209797c80d32bb1ed5aa"},
			{"username":"ramesh.khanavkar@vvfltd.com","password":"6d5271782d10d5d7be6695649d02db14"},
			{"username":"ramchandra.jadhav@vvfltd.com","password":"b5d51cbbcb2034a0bafbb87b6f051281"},
			{"username":"satish.jadhav@vvfltd.com","password":"86dc012688b948715c013b60d5a76d0e"},
			{"username":"j.khan@vvfltd.com","password":"4baae3c46f59f2b61635cdb543b5dbdc"},
			{"username":"sachin.lohar@vvfltd.com","password":"4cf74b4a34b4aae5217c9ecf9523e158"},
			{"username":"dinesh.danav@vvfltd.com","password":"bfade38f56da8225eb6252e6c091ab9b"},
			{"username":"nagesh.sawant@vvfltd.com","password":"7b2930f165c365d11e347c162bd58cff"},
			{"username":"sanjay.prajapati@vvfltd.com","password":"444e7575a4134bf2153b4df8c0a81ef6"},
			{"username":"mahendra.bartakke@vvfltd.com","password":"a68501bb4d636850653051f8d77b78b3"},
			{"username":"pintu.patil@vvfltd.com","password":"b47f7fb05c1d82225b9783f5f81cb20b"},
			{"username":"amresh.patange@vvfltd.com","password":"6909f43c2218cc2b4463f5f06e95982f"},
			{"username":"sudesh.nair@vvfltd.com","password":"4334717fcb23f2f90df7eeebac72af93"},
			{"username":"amit.mukherjee@vvfltd.com","password":"835528b5bf8c628036fd4a50b87bcd54"},
			{"username":"avik.banerjee@vvfltd.com","password":"137037b8a8202822b9c50f5067673159"},
			{"username":"neeraj.sharma@vvfltd.com","password":"df78414b8eba498fab1ae5a808d6ad5c"},
			{"username":"partha.banerjee@vvfltd.com","password":"e10adc3949ba59abbe56e057f20f883e"},
			{"username":"sankar.chakraborty@vvfltd.com","password":"50d3faef4b6e2d84b55ad4dc15710ced"},
			{"username":"santanu.panja@vvfltd.com","password":"fd6f9d403aa847bf18ed2f5b0710bd21"},
			{"username":"soumen.pine@vvfltd.com","password":"f4e1f2ad1e5e96be717c5bf92a53ee22"},
			{"username":"sreela.chakraborty@vvfltd.com","password":"aa247e6fd8b8c27e197a5e3329768f1a"},
			{"username":"shyju.kurineth@vvfltd.com","password":"652347f53eccf574e9f0822c273d1c0d"},
			{"username":"Payal.shah@vvfltd.com","password":"6f9dff5af05096ea9f23cc7bedd65683"},
			{"username":"dinesh.mistry@vvfltd.com","password":"da1b834888d50eb6c529a334620eccef"},
			{"username":"hitesh.patel@vvfltd.com","password":"da1b834888d50eb6c529a334620eccef"}]
		var json_data = {
  "people": html_data2
}
rowdata = '';
for (var j = 0; j < report_col.length; j++) {
	if (j == 0) 
	{
		rowdata = '<c t="inlineStr" s="{{@root.$removedItem.c.['+j+'].$.s}}"><is><t>{{'+report_col[j]+'}}</t></is></c>';
	}
	else
	{
		rowdata = rowdata+'<c t="inlineStr" s="{{@root.$removedItem.c.['+j+'].$.s}}"><is><t>{{'+report_col[j]+'}}</t></is></c>';
	}					
}
rowdata = '<row>'+rowdata+'</row>';
console.log(rowdata);
var request = {  
        template: {  
              name: 'Population',
              content : '{{xlsxRemove "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row" 1}}{{#each people}}{{#xlsxAdd "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row"}}'+rowdata+'{{/xlsxAdd}}{{/each}}{{{xlsxPrint}}}'  
             }, 

                   data: json_data  
        };  
jsreport.render($("#placeholder"), request);    
	}

	$scope.create_tab = function()
	{
		var data = {
	        form_name: $scope.form_name1,
	        tab_name: $scope.tab_name,
	        field_name: '',
	        validate: '',
	        compulsory: '',
	        field_type: '',
	    };
	    //alert($scope.tab_name);
		$http.post("/core_master/savedata",data).then(function(data,status){
			$scope.form_name1 = '';			
		});
	}
	$scope.create_field = function()
	{
		frmname = $scope.form_name2;tabname = $scope.tab_name1;
		var data = {
			form_name: frmname.trim(),
	        tab_name: tabname.trim(),
	        field_name: $scope.field_name,
	        field_type:$scope.field_type,
	        field_extra_info:$scope.other_information_chekbox_num+'@'+$scope.other_information_chekbox,
	        validate: $scope.regular_exp,
	        compulsory: $scope.compulsory,
	        error_message: $scope.error_message,
	        namefield: $scope.namefield,	        
	        dbname: $scope.dbname1,
	        tablename: $scope.tablename1,
	        columnname: $scope.columnname,
	        coltype : $scope.coltype,
	        status : $scope.fieldstatus
		};
		var data1 = {
			dbname: $scope.dbname1,
	        tablename: $scope.tablename1,
	        columnname: $scope.columnname,
	        coltype : $scope.coltype
		};

		console.log(data1);
		//alert($scope.field_type);
		//alert($scope.compulsory);
		$http.post("/core_master/savedata",data).then(function(data,status){
			window.location.href = '/core_master';
		});

		$http.post("/core_master/columnadd",data1).then(function(data,status){
			//alert(data.data);
			window.location.href = '/core_master';
		});
	}

	$scope.delcol = function(event)
	{
		
		var list = event.target.id;
		var flist = list.split(',');
		alert(flist);
		var data = {
			dbname: flist[2].trim(),
			tablename: flist[1].trim(),
			colname : flist[0].trim()
		};

		var data1 = {
			dbname: flist[2].trim(),
			tablename1: 'form_name',
			colname : flist[0].trim()
		};

		$http.post("/core_master/delrow",data1).then(function(data,status){
			//alert(data.data)
			//window.location.href = '/core_master';
		});

		$http.post("/core_master/columndel",data).then(function(data,status){
			window.location.href = '/core_master';
		});
	}

	$scope.reportdata = function(event)
	{
		db = $scope.dbname;
		dbname = db.trim();
		alert(dbname);
		// var data = {
		// 	dbname: $scope.dbname,
	 //        tablename: $scope.tablename,
	 //        columnname: $scope.columnname,
	 //        coltype : $scope.coltype
		// };

		// $http.post("/core_master/columndel",data).then(function(data,status){
		// 	window.location.href = '/core_master';
		// });
	}
// $scope.columnname = "monica";
	$scope.getreport = function(event)
	{		
		//alert(event.target.id)
		value = event.target.id;
		var data = {
			report_name : value.trim()
		}
		//alert(value.trim())
		$http.get("/report_data").then(function(response){
			//details = response.data
			// reportdata = details.split('@@@')
			// $scope.columnname = reportdata[0]
			// $scope.columnname = "wewqeqwew"		
			// console.log($scope.columnname);
			assigndata();
			// $http.get("/report_data").then(function(response){
			// 	$scope.columnname = "wewqeqwew";alert($scope.columnname)
			
			// });		
		});
		
	}

	function assigndata()
	{
		$scope.columnname = 'asdsadasdsa';
		console.log($scope.columnname);
		//window.location.href = '/report_data';
	}

	$scope.getrprt = function()
	{

		window.location.href = '/jsreportexcel';
	}

	$scope.text_field = function(event)
	{
		//alert(event.target.value);
		$scope.fn = event.target.value;
		
		//$("#other_information_"+$scope.fn).css('color','red')	
		// if ($scope.fn == "textbox") 
		// {
		// 	alert($scope.fn);	
		// 	//$("#other_information_textbox").css('display','')
		// 	angular.element(document.getElementById("other_information_textbox")).css('display','')
		// }
		
	}
	$scope.ft = "date";
	$http.get("/core_master/getdata").then(function(response){
			$scope.tabledata1 = response.data;			
	});

	$http.get("/core_master/getreportdata").then(function(response){
			$scope.reportdata = response.data;			
	});

	$http.get("/reportformat/databsenames").then(function(response){
			$scope.databsenames = response.data;			
	});

	$http.get("/core_master/getdata1").then(function(response){
			$scope.tabledata2 = response.data;	
			console.log(response.data);		
	});

	$http.get("/core_master/get_columndata").then(function(response){
			$scope.columndata = response.data;	
			//console.log(response.data['COLUMN_NAME']);		
	});

	$http.get("/core_master/tablenames").then(function(response){
			$scope.tablenames = response.data;	
			//console.log(response.data['COLUMN_NAME']);		
	});

	$scope.getcheckcol1 = function()
	{
		alert($scope.colcheckval);
	}

	$scope.showSelectedValues = function()
	{
	  checked = $('.checkthis:checked').map(
	     function () {return this.value;}).get().join(",");
	  	tablename = $scope.tablename;
		tablename = tablename.trim();
		dbname = $scope.dbname;
		dbname = dbname.trim();
		//alert(checked);
		  data = {
		  	columnname : checked,
		  	tablename : tablename,
		  	dbname : dbname,
		  	report_name : $scope.report_name
		  }	
		  console.log(data);
	  	$http.post("/reportformat/save",data).then(function(data,status){
			console.log(data)
		});
	}

	$scope.getcol = function()
	{
		col_details = '';
		//alert($scope.tablename.trim());
		 data = {
		  	tablename : $scope.tablename.trim()
		  }	
		//angular.element(document.getElementsByClassName("colclass")).css('display','')
		$http.post("/core_master/get_columndata_dynamic",data).then(function(response){
			col_details = response.data
		});
		$http.get("/").then(function(response){			
			$scope.coldata = 'dbdata in '+col_details;
			var html_data = '';
			for (var i = 0; i < col_details.length; i++) {
				console.log(col_details[i]);
				if (i == 0) 
				{
					html_data = '<tr><td class="scope=`row`">'+col_details[i].COLUMN_NAME+'</td><td><input type="checkbox" value="'+col_details[i].COLUMN_NAME+'" name="'+col_details[i].COLUMN_NAME+'" class="colcheckval checkthis"></td></tr>';
				}
				else
				{
					html_data = html_data+'<tr><td class="scope=`row`">'+col_details[i].COLUMN_NAME+'</td><td><input type="checkbox" value="'+col_details[i].COLUMN_NAME+'" name="'+col_details[i].COLUMN_NAME+'" class="colcheckval checkthis"></td></tr>';
				}
			};
			angular.element(document.getElementsByClassName("msgdiv1")).html("<table class='table'><tr><td class='scope=`row`'>Field</td><td class='scope=`row`'>Select</td></tr>"+html_data+"</table>")
			//console.log(response.data[5].TABLE_NAME);		
		});
	}

	$scope.getfd = function()
	{
		//alert("SAsa");
		angular.element(document.getElementsByClassName("ftype")).prop('type','date')
		//$scope.ft = "date";
	}
});
app.controller('validateCtrl', function($scope) {
    $scope.author = 'John Doe';
    //$scope.email = 'john.doe@gmail.com';
});
