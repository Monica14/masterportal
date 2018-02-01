var task_app = angular.module('task_manage',[]);
task_app.controller('task',function($scope,$http,$filter,$timeout,$window,$location){
    $scope.create_task = function()
    {        
        start_date = $filter('date')($scope.start_date, 'dd/MM/yyyy');
        end_date = $filter('date')($scope.end_date, 'dd/MM/yyyy');
        
        project_data = {
            project_name : $scope.project_name,
            department : $scope.project_dept,
            status : $scope.project_status,
            manager_name : $scope.project_manager,
            start_date : start_date,
            end_date : end_date,
            project_id : new Date().getTime(),
            sub_module_id : new Date().getTime(),
            table_name : 'project_data'
        }
        $http.post('http://localhost:3005/create_task/save',project_data).then(function(res){
            $timeout(function(){
                alert("Task Created");
                $window.location.href = 'http://localhost:3005/create_task';
                // $location.path('/create_task1');
            },1000);
            
        })
    }
})