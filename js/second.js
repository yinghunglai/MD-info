angular
.module('app')
.controller('secondCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
    var database = [{
           "first_name":"John",
            "last_name":"Doe",
            "zip":"01234",
            "npi":12345
         },{
           "first_name":"Jane",
            "last_name":"Doe",
            "zip":"93110",
            "npi":23456
         },{
           "first_name":"Jane",
            "last_name":"Doe",
            "zip":"93130",
            "npi":23456
         },{          
           "first_name":"Bran",
            "last_name":"Doe",
            "zip":"93110",
            "npi":54321
         },{
           "first_name":"Jack",
            "last_name":"Dob",
            "zip":"94101",
            "npi":35467
         },{
           "first_name":"John",
            "last_name":"Doe",
            "zip":"54312",
            "npi":99999
         },{
           "first_name":"John",
            "last_name":"Doe",
            "zip":"54342",
            "npi":99999
         },{
           "first_name":"Jack",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23556
         },{
          "first_name":"Jason",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23557
         },{
          "first_name":"James",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23558
         },{
          "first_name":"James",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23658
         },{
          "first_name":"Johnson",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23559
         },{
          "first_name":"Jay",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23560
         },{
          "first_name":"Jade",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23561
         },{
          "first_name":"Joe",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23562
         },{
          "first_name":"Joseph",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23563
         },{
          "first_name":"Jose",
            "last_name":"Dob",
            "zip":"11002",
            "npi":23564
         },{
           "organization_name":"Johns Hopkins",
            "zip":"01234",
            "npi":22222
         },{
           "organization_name":"Mercy Hospital",
            "zip":"93110",
            "npi":33333
         },{
           "organization_name":"General Hospital",
            "zip":"11002",
            "npi":44533
         }];
         // This method check if the name in the database
        var check = function(input, part1, part2) {
          var re1, re2;  
          var nameArr = input.split(' ');
          re1 = new RegExp('^'+nameArr[0]);
          if (re1.test(part1)) {
            if (!nameArr[1]) {
              return true;
            } else {
              re2 = new RegExp('^'+nameArr[1]);
              if (re2.test(part2)) {
                return true;
              } 
            }
          }  
          return false;
        }
    // This method is triggered to generate the suggested list of the provider
    $scope.change = function() {
      var preOutput = [];
      var parts;
      $scope.Output = {};
      $scope.tmpOutput = []
      $scope.FinalOutput = [];
      $scope.myStyle = {'height':'500px'};
      $scope.myGreyStyle = {'border-color':'#fafafa','color':'#fafafa'};
      $scope.myPagesStyle = {'1':{'border-color':'#e9e9e9','color':'#000000'},
                             '2':{'border-color':'#e9e9e9','color':'#e9e9e9'},
                             '3':{'border-color':'#e9e9e9','color':'#e9e9e9'},
                             '4':{'border-color':'#e9e9e9','color':'#e9e9e9'},
                             '5':{'border-color':'#e9e9e9','color':'#e9e9e9'},
                             '6':{'border-color':'#e9e9e9','color':'#e9e9e9'},
                             '7':{'border-color':'#e9e9e9','color':'#e9e9e9'},
                             '8':{'border-color':'#e9e9e9','color':'#e9e9e9'}
                            }
      $scope.upload = true;
      if ($scope.Search.length === 0) {
        $scope.myStyle = {'height':'150px'};
        $scope.upload = false;
      }
      var fn = function() {
        $scope.upload = false;
        $scope.myGreyStyle = {'border-color':'#e9e9e9','color':'#000000'};
      }
      $timeout(fn, 2000);
      if ($scope.Search.length > 0) {
        for (var i = 0; i < database.length; i++) {
          if (database[i]['organization_name']) {
            parts = database[i]['organization_name'].split(' ');
          } else {
            parts = [database[i]['first_name'], database[i]['last_name']]
          }
          if (check($scope.Search.toLowerCase(), parts[0].toLowerCase(), parts[1].toLowerCase())) {
            preOutput.push(database[i]);
          }
        }
        for (var j = 0; j < preOutput.length; j++) {
          var key;
          if (preOutput[j]['organization_name']) {
            key = preOutput[j]['organization_name'];
          } else {
            key = preOutput[j]['first_name']+' '+preOutput[j]['last_name'];
          }
          if ($scope.Output[key]) {
            var exist = false;
            var sameLocation = false;
            for (var l=0; l<$scope.Output[key]['info'].length; l++) {
              if ($scope.Output[key]['info'][l]['npi'] === preOutput[j]['npi']) {
                exist = true;
              }
              if ($scope.Output[key]['info'][l]['zip'] === preOutput[j]['zip']) {
                sameLocation = true;
              }              
            }
            if (!exist) {
                $scope.Output[key]['count']++;
            }
            if (!sameLocation) {
                $scope.Output[key]['locations']++;
            }
            $scope.Output[key]['info'].push(preOutput[j]);
          } else {
            $scope.Output[key] = {};
            $scope.Output[key]['info'] = [preOutput[j]];
            $scope.Output[key]['count'] = 1;
            $scope.Output[key]['locations'] = 1;
          }
        }
        for (var md in $scope.Output) {
          $scope.tmpOutput.push($scope.Output[md])
        }
        $scope.page = 1;
        if ($scope.tmpOutput.length > 5) {
          $scope.FinalOutput = $scope.tmpOutput.slice(0,5);
        } else {
          $scope.FinalOutput = $scope.tmpOutput.slice(0);
        }
      }
    }
    // This method is used to switch pages if the suggested result is greater than 5
    $scope.move = function(pag) {
      var newPage, oldPage;
        oldPage = $scope.page;
      if (pag === '<') {
        $scope.page--;
        newPage = $scope.page*5;
        $scope.FinalOutput = $scope.tmpOutput.slice(newPage-5,newPage);
      } else if (pag === '>') {
        $scope.page++;
        newPage = $scope.page*5;
        if (newPage > $scope.tmpOutput.length) {
          $scope.FinalOutput = $scope.tmpOutput.slice(newPage-5,$scope.tmpOutput.length);
        } else {
          $scope.FinalOutput = $scope.tmpOutput.slice(newPage-5,newPage);        
        }
      } else {
        $scope.page = Number(pag)
        newPage = $scope.page*5;
        if (newPage > $scope.tmpOutput.length) {
          $scope.FinalOutput = $scope.tmpOutput.slice(newPage-5,$scope.tmpOutput.length);
        } else {
          $scope.FinalOutput = $scope.tmpOutput.slice(newPage-5,newPage);        
        }
      }
      $scope.myPagesStyle[oldPage.toString()] = {'border-color':'#e9e9e9','color':'#e9e9e9'};
      $scope.myPagesStyle[$scope.page.toString()] = {'border-color':'#e9e9e9','color':'#000000'};
    }
    //This method send to post requeste
    $scope.render = function(key) {
      var payload;
      for (var k = 0; k < $scope.Output[key]['info'].length; k++) {
        if ($scope.Output[key]['info'][k]['first_name']) {
          payload = JSON.stringify({
          'physician':[{'FirstName':$scope.Output[key]['info'][k]['first_name'],'LastName':$scope.Output[key]['info'][k]['last_name'],'zip':$scope.Output[key]['info'][k]['zip'],'npi':$scope.Output[key]['info'][k]['npi']}]
          });
        } else {
          payload = JSON.stringify({'organization':[{'OrganizationName':$scope.Output[key]['info'][k]['organization_name'],'zip':$scope.Output[key]['info'][k]['zip'],'npi':$scope.Output[key]['info'][k]['npi']}]});
        }
        console.log('Sending a POST request payload:',payload);
      }
    }
}]);
