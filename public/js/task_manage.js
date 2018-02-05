var task_app = angular.module('task_manage',["ngFileUpload"]);

// task_app.service('fileUpload', ['$http', function ($http) {
//     this.uploadFileToUrl = function(file, uploadUrl){
//        var fd = new FormData();
//        fd.append('file', file);
//        $http.post(uploadUrl, fd, {
//         //   transformRequest: angular.identity,
//         //   headers: {'Content-Type': undefined}
//        })
//        .success(function(res){
//            console.log(res.data)
//        })
//        .error(function(){
//        });
//     }
//  }]);

task_app.controller('task',function($scope,$http,$filter,$timeout,$window,$location,Upload){
    var vm = this;
    vm.create_task = function()
    {   
        //console.log(vm)
       // console.log(vm.file[0].type)
        if(vm.upload_form.file.$valid && vm.file)
        {
            vm.upload(vm.file); //call upload function
        }
        else{
            alert("Only Jpg files are allowed")
        }
        //console.log($scope.project_data)     
        // start_date = $filter('date')($scope.start_date, 'dd/MM/yyyy');
        // end_date = $filter('date')($scope.end_date, 'dd/MM/yyyy');
        // var file = $scope.project_data;
        // var uploadUrl = "http://localhost:3005/create_task/save";
        // fileUpload.uploadFileToUrl(file, uploadUrl);
        //project_data1 = {
            // project_name : $scope.project_name,
            // department : $scope.project_dept,
            // status : $scope.project_status,
            // manager_name : $scope.project_manager,
            // start_date : start_date,
            // end_date : end_date,
            // project_id : new Date().getTime(),
            // sub_module_id : new Date().getTime(),
            //table_name : 'project_data',
            //project_data : $scope.project_data
        //}
        // $http.post('http://localhost:3005/create_task/save',project_data1).then(function(res){
        //     console.log(res.data);
            // $timeout(function(){
            //     alert("Task Created");
            //     $window.location.href = 'http://localhost:3005/create_task';
            //     // $location.path('/create_task1');
            // },1000);
            
        //})        
    }
    vm.upload = function(file)
    {
        // start_date = $filter('date')(all_details.start_date, 'dd/MM/yyyy');
        // end_date = $filter('date')(all_details.end_date, 'dd/MM/yyyy');
        console.log(file)
        console.log("////////////////////////")
        Upload.upload({
            url:'http://localhost:3005/create_task/save',
            data:{file:file}
                // ,start_date:start_date,end_date:end_date,project_name:all_details.project_name,department:all_details.department,status:all_details.status,manager_name:all_details.manager_name,project_id:all_details.project_id,sub_module_id:all_details.sub_module_id,table_name:'project_data'
        }).then(function(res){
            console.log(res.data)
        })
    }
    vm.del_img = function(file1)
    {        
        console.log(vm.file.length);
        vm.file.splice(file1,1);
        console.log(vm.file.length);
    }
    $http.post('http://localhost:3005/create_task/get',{'where':'where 1'}).then(function(res){
        $scope.list = res.data;
        //console.log(res.data);
        //alert("dfdsfsd")
    })
    $scope.edit_data = function(id)
    {
        $http.post('http://localhost:3005/create_task/get',{'where':'where id='+id}).then(function(res){
            $scope.update_task = res.data;
            //console.log($scope.update_task['0']['project_name']);
            //alert("dfdsfsd")
        })
    }

    $scope.update_data = function(id)
    {
        //alert(id);
        start_date = $filter('date')($scope.start_date, 'dd/MM/yyyy');
        end_date = $filter('date')($scope.end_date, 'dd/MM/yyyy');
        setdata = {
            project_name : $scope.project_name,
            department : $scope.project_dept,
            status : $scope.project_status,
            manager_name : $scope.project_manager,
            start_date : start_date,
            end_date : end_date 
        }
        console.log(setdata)
        $http.post('http://localhost:3005/create_task/update',{'setdata':setdata,'where':'where id='+id}).then(function(res){
            //$scope.update_task = res.data;
            console.log("Task Updated");
            //alert("dfdsfsd")
        })
    }
})