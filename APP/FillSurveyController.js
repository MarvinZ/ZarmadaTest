(function () {
    'use strict';

    angular.module('app').controller('FillSurveyController', ProductController);

    function ProductController($http, $scope) {
        var vm = this;
        var dataService = $http;

        // Hook up public events


        vm.fillSurvey = fillSurvey;
        vm.cancelSurveyFill = cancelSurveyFill;
        vm.sendResults = sendResults;
        vm.ViewResults = ViewResults;

        vm.GetAnswers = GetAnswers;

     
        vm.surveys = [];
        vm.survey = {};
        vm.survey.Question = [];
        vm.survey.Question = {};
        vm.surveyPrint = {};
        vm.surveyPrint.Comments = "";

        vm.surveyPrint.Answers = {};



        vm.hola = function (row, value)
        {
            alert(row.Id + "  value: " + value);
        }


        const pageMode = {
            LIST: 'List',
            SURVEY: 'Survey',
            RESULTS: 'Results'

        };
        vm.uiState = {
            mode: pageMode.LIST,
            isSurveyAreaVisible: false,
            isListAreaVisible: true,
            isSurveyResultsVisible : false,
            isValid: true,
            messages: []
        };

        SurveyList();



        function setUIState(state) {
            vm.uiState.mode = state;
            vm.uiState.isListAreaVisible = (state == pageMode.LIST);
            vm.uiState.isSurveyAreaVisible = (state == pageMode.SURVEY);
            vm.uiState.isSurveyResultsVisible =(state == pageMode.RESULTS);
        }

    
        function GetAnswers(id) {
            dataService.get("http://localhost:37683/api/SurveyPrints/GetSurveyPrintAnswersBySurveyId/"+id)
            .then(function (result) {
                vm.surveyPrints = result.data;
                var suma = 0;
                for (var i = 0; i < vm.surveyPrints.length; i++) {

                    var suma = 0;
                    for (var j = 0; j < vm.surveyPrints[i].Answers.length; j++) {
                        suma = suma + vm.surveyPrints[i].Answers[j].Value;
                       

                    }
                    vm.surveyPrints[i].Average = suma / vm.surveyPrints[i].Answers.length;
                    
                }

               // vm.surveys;

              //  setUIState(pageMode.LIST);
            },
            function (error) {
                handleException(error);
            });
        }
        function SurveyList() {
            dataService.get("http://localhost:37683/api/Surveys1/GetSurveys1")
            .then(function (result) {
                vm.surveys = result.data;

                // vm.surveys;

                setUIState(pageMode.LIST);
            },
            function (error) {
                handleException(error);
            });
        }

        
        function ViewResults(id) {
            //  alert(id);
            //surveyGet(id);
            GetAnswers(id);
            setUIState(pageMode.RESULTS);
        }
        function fillSurvey(id) {
          //  alert(id);
            surveyGet(id);
            setUIState(pageMode.SURVEY);
        }

        function sendResults(id) {
            vm.surveyPrint.Id = 0;
            vm.surveyPrint.Answers = [];
            for (var i = 0 ; vm.survey.Questions.length > i; i++)
            {
              vm.surveyPrint.Answers.push({ QuestionId: vm.survey.Questions[i].Id, Value: vm.survey.Questions[i].resp });
            }


         //   vm.surveyPrint.Comments = "HARDCODED";
            vm.surveyPrint.SurveyId = vm.survey.Id;
           // vm.surveyPrint.Answers = [{ QuestionId: 1, Value: 3 }, { QuestionId: 2, Value: 3 }, { QuestionId: 3, Value: 3 }];
            insertSurveyPrint();
           // alert("yeay");
            setUIState(pageMode.LIST);
        }

        function insertSurveyPrint() {
            dataService.post(
                "http://localhost:37683/api/SurveyPrints/PostSurveyPrint",
                vm.surveyPrint)
              .then(function (result) {
                  // Update product object
                  vm.surveyPrint = result.data;

                  // Add Product to Array
                 

                  //setUIState(pageMode.LIST);
              }, function (error) {
                  handleException(error);
              });
        }


        function cancelSurveyFill() {
            
            setUIState(pageMode.LIST);
        }
        function surveyGet(id) {
            // Call Web API to get a product
            dataService.get("http://localhost:37683/api/Surveys1/GetSurvey/" + id)
              .then(function (result) {
                  // Display product
                  vm.survey = result.data;

                  //for (i = 0;1<vm.survey.Questions.lenght;i++){
                  //    vm.survey.Answers.push({id:i.Id, value:0});
                  //}

                  console.log(vm.survey);

                // Convert date to local date/time format
                //if (vm.product.IntroductionDate != null) {
                //    vm.product.IntroductionDate =
                //      new Date(vm.product.IntroductionDate).
                //      toLocaleDateString();
                //}
            }, function (error) {
                  handleException(error);
              });
        }

        function handleException(error) {
            vm.uiState.isValid = false;
            var msg = {
                property: 'Error',
                message: ''
            };

            vm.uiState.messages = [];

            switch (error.status) {
                case 400:   // 'Bad Request'
                    // Model state errors
                    var errors = error.data.ModelState;
                    //                    debugger;

                    // Loop through and get all 
                    // validation errors
                    for (var key in errors) {
                        for (var i = 0; i < errors[key].length;
                                i++) {
                            addValidationMessage(key,
                                        errors[key][i]);
                        }
                    }

                    break;

                case 404:  // 'Not Found'
                    msg.message = 'The product you were ' +
                                  'requesting could not be found';
                    vm.uiState.messages.push(msg);

                    break;

                case 500:  // 'Internal Error'
                    msg.message =
                      error.data.ExceptionMessage;
                    vm.uiState.messages.push(msg);

                    break;

                default:
                    msg.message = 'Status: ' +
                                error.status +
                                ' - Error Message: ' +
                                error.statusText;
                    vm.uiState.messages.push(msg);

                    break;
            }
        }
    }
})();