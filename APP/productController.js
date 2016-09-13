(function () {
    'use strict';

    angular.module('app').controller('ProductController', ProductController);

    function ProductController($http) {
        var vm = this;
        var dataService = $http;

        // Hook up public events

        
        vm.addClick = addClick;
        vm.cancelClick = cancelClick;
        vm.editClick = editClick;
        vm.editQuestions = editQuestions;
        vm.deleteClick = deleteClick;
        vm.saveClick = saveClick;
        vm.addQuestionClick = addQuestionClick;
        vm.cancelQuestionClick = cancelQuestionClick;
        vm.saveQuestionClick = saveQuestionClick;
        vm.editquestionClick = editquestionClick;
        vm.deleteQuestionClick = deleteQuestionClick;

        vm.product = {};
        vm.survey = {};
        vm.question = {};
        vm.categories = [];
        vm.products = [];
        vm.surveys = [];
        vm.questions = [];
        vm.product = {
            ProductId: 1,
            ProductName: 'Video Training'
        };
        vm.survey = {
            Id: 0,
            Name: ''
        };

        vm.question = {
            Id: 0,
            Name: '',
            SurveyId: vm.survey.Id
        }


        vm.searchCategories = [];
        vm.searchInput = {
            selectedCategory: {
                CategoryId: 0,
                CategoryName: ''
            },
            productName: ''
        };
        const pageMode = {
            LIST: 'List',
            EDIT: 'Edit',
            ADD: 'Add',
            QUESTIONS: 'Questions',
            ADDQUESTION: 'AddQuestions',
            EDITQUESTION: 'EditQuestions'

        };
        vm.uiState = {
            mode: pageMode.LIST,
            isDetailAreaVisible: false,
            isQuestionsAreaVisible: false,
            isAddQuestionsAreaVisible: false,
            isListAreaVisible: true,
            isSearchAreaVisible: true,
            isValid: true,
            messages: []
        };

        SurveyList();

        function addQuestionClick() {
            vm.question = initQuestionEntity();

            setUIState(pageMode.ADDQUESTION);
        }
        function addClick() {
            vm.survey = initEntity();

            setUIState(pageMode.ADD);
        }
    
        function cancelClick(productForm) {
            productForm.$setPristine();
            productForm.$valid = true;
            vm.uiState.isValid = true;

            setUIState(pageMode.LIST);
        }

        function cancelQuestionClick(productForm) {
            productForm.$setPristine();
            productForm.$valid = true;
            vm.uiState.isValid = true;

            setUIState(pageMode.QUESTIONS);
        }

        

        function editClick(id) {
            surveyGet(id)
            setUIState(pageMode.EDIT);
        }

        function editquestionClick(id) {
            questionGet(id);
            setUIState(pageMode.EDITQUESTION);
        }


        

        function editQuestions(id) {
            surveyGet(id);
            questionList(id);
            setUIState(pageMode.QUESTIONS);
        }
        

        function deleteClick(id) {
            if (confirm("Delete this Survey?")) {
                deleteData(id);
            }
        }

        function deleteQuestionClick(id) {
            if (confirm("Delete this Question?")) {
                deleteQuestionData(id);
            }
        }

        

        function saveClick(productForm) {
           // if (productForm.$valid) {
                if (validateData()) {
                    productForm.$setPristine();
                    if (vm.uiState.mode === pageMode.ADD) {
                        insertData();
                    }
                    else {
                        updateData();
                    }
                }
                else {
                    productForm.$valid = false;
                }
            //}
            //else {
            //    vm.uiState.isValid = false;
            //}
        }

        function saveQuestionClick(productForm) {
           // if (productForm.$valid) {
                if (validateData()) {
                    productForm.$setPristine();
                    if (vm.uiState.mode === pageMode.ADDQUESTION) {
                        insertQuestionData();
                    }
                    else {
                        updateQuestionData();
                    }
                }
                else {
                    productForm.$valid = false;
                }
            //}
            //else {
            //    vm.uiState.isValid = false;
            //}
        }

        

        function insertData() {
            dataService.post(
                "http://localhost:37683/api/Surveys1/PostSurvey/",
                vm.survey)
              .then(function (result) {
                  // Update product object
                  vm.survey = result.data;

                  // Add Product to Array
                  vm.surveys.push(vm.survey);

                  setUIState(pageMode.LIST);
              }, function (error) {
                  handleException(error);
              });
        }
        function insertQuestionData() {
            dataService.post(
                "http://localhost:37683/api/Questions/PostQuestion",
                vm.question)
              .then(function (result) {
                  // Update product object
                  vm.question = result.data;

                  // Add Product to Array
                  vm.questions.push(vm.question);

                  setUIState(pageMode.QUESTIONS);
              }, function (error) {
                  handleException(error);
              });
        }
        
        function deleteQuestionData(id) {
            dataService.delete(
                      "http://localhost:37683/api/Questions/DeleteQuestion/" + id)
              .then(function (result) {
                  // Get index of this product
                  var index = vm.questions.map(function (p)
                  { return p.Id; }).indexOf(id);

                  // Remove product from array
                  vm.questions.splice(index, 1);

                  setUIState(pageMode.QUESTIONS);
              }, function (error) {
                  handleException(error);
              });
        }
        function deleteData(id) {
            dataService.delete(
                      "http://localhost:37683/api/Surveys1/DeleteSurvey/" + id)
              .then(function (result) {
                  // Get index of this product
                  var index = vm.surveys.map(function (p)
                  { return p.Id; }).indexOf(id);

                  // Remove product from array
                  vm.surveys.splice(index, 1);

                  setUIState(pageMode.LIST);
              }, function (error) {
                  handleException(error);
              });
        }

        function updateData() {
            dataService.put("http://localhost:37683/api/Surveys1/PutSurvey/" +
                  vm.survey.Id,
                  vm.survey)
              .then(function (result) {
                  // Update product object
                  vm.survey = result.data;

                  //// Get index of this product
                  //var index = vm.surveys.map(function (p)
                  //{ return p.Id; })
                  //    .indexOf(vm.survey.Id);

                  //// Update product in array
                  //vm.surveys[index] = vm.survey;
                  SurveyList();

                  setUIState(pageMode.LIST);
              }, function (error) {
                  handleException(error);
              });
        }

        function updateQuestionData() {
            dataService.put("http://localhost:37683/api/Questions/PutQuestion/" +
                  vm.question.Id,
                  vm.question)
              .then(function (result) {
                  // Update product object
                 // vm.question = result.data;

                  //// Get index of this product
                  //var index = vm.surveys.map(function (p)
                  //{ return p.Id; })
                  //    .indexOf(vm.survey.Id);

                  //// Update product in array
                  //vm.surveys[index] = vm.survey;
                  questionList(vm.question.SurveyId);

                  setUIState(pageMode.QUESTIONS);
              }, function (error) {
                  handleException(error);
              });
        }

        function addValidationMessage(prop, msg) {
            vm.uiState.messages.push({
                property: prop,
                message: msg
            });
        }


        function validateData() {
            // Fix up date (IE 11 bug workaround)
            //vm.product.IntroductionDate =
            //        vm.product.IntroductionDate.
            //        replace(/\u200E/g, '');

            vm.uiState.messages = [];

            //if (vm.product.IntroductionDate != null) {
            //    if (isNaN(Date.parse(
            //          vm.product.IntroductionDate))) {
            //        addValidationMessage('IntroductionDate',
            //          'Invalid Introduction Date');
            //    }
            //}

            //if (vm.product.Url.
            //  toLowerCase().indexOf("microsoft") >= 0) {
            //    addValidationMessage('url', 'URL can not contain the words\'microsoft\'.');
            //}

            vm.uiState.isValid = (vm.uiState.messages.length == 0);

            return vm.uiState.isValid;
        }

        
        function surveyGet(id) {
            // Call Web API to get a product
            dataService.get("http://localhost:37683/api/Surveys1/GetSurvey/" + id)
              .then(function (result) {
                  // Display product
                  vm.survey = result.data;

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
        function questionGet(id) {
            // Call Web API to get a product
            dataService.get("http://localhost:37683/api/questions/QuestionById/" + id)
              .then(function (result) {
                  // Display product
                  vm.question = result.data;

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
        function setUIState(state) {
            vm.uiState.mode = state;

            vm.uiState.isDetailAreaVisible =
              (state == pageMode.ADD || state == pageMode.EDIT);
            vm.uiState.isListAreaVisible = (state == pageMode.LIST);
            vm.uiState.isSearchAreaVisible = (state == pageMode.LIST);
            vm.uiState.isQuestionsAreaVisible = (state == pageMode.QUESTIONS);
            vm.uiState.isAddQuestionsAreaVisible = (state == pageMode.ADDQUESTION || state == pageMode.EDITQUESTION);

        }


        function initEntity() {
            return {
                Id: 0,
                Name: ''
            };
        }

        function initQuestionEntity() {
            return {
                Id: 0,
                Name: '',
                SurveyId: vm.survey.Id
            };
        }
        
        

        function SurveyList() {
            dataService.get("http://localhost:37683/api/Surveys1/GetSurveys1")
            .then(function (result) {
                vm.surveys = result.data;

                setUIState(pageMode.LIST);
            },
            function (error) {
                handleException(error);
            });
        }


        function questionList(id) {
            dataService.get("http://localhost:37683/api/questions/GetQuestionBySurveyId/" + id)
            .then(function (result) {
                vm.questions = result.data;

                setUIState(pageMode.QUESTIONS);
            },
            function (error) {
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