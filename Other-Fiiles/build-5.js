/********************
 * Creating Income and expense function constructor. 
 * How to choose function constructors that meet our application's need. 
 * How to setup a proper data structure for our budget controller. 
 * We need a data model in budgeController for income and expenses. Each new item has description and value. 
 * Also we need a way to distinguish between different incomes and expenses. We want them to have a unique ID number. 
 * For storing this type of data, we are going for object. So an object that will have description, value, and an ID.
 * As we need lots of objects of same data type, so we need function constructor for this. From function constructor we can create lot of income and expenses objects. And like that, we basically create custom data type for income and expanses. Two function constructor will be needed for income and expense. 
 */

var budgetController = (function() {
  console.log("Inside budgetController");
  var Expense = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };
  var Income = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

  /********************* 
   * var allExpanses = [];
   * var allIncomes = [];
   *  var totalExpanses = 0;
   * var totalIncome = 0;
   * var totalBudge = 0; 
   * 
   * We could have created variables like this, but this is not the best solution, each time we can aggregate a lot of information into one data structure we should definitely do that. It is always better to have one data structure where all of our data goes, instead of having a lot of random variables floating around.
   */
  var data = {
    //   allExpanses: [],
    //   allIncomes:  []
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    }     

  }  


  //Some Code
})();


var uiController = (function() {
  console.log("Inside uiController");
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will either be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
      /****
       * So here we are exposing the DOMstrings object to the public.
       */
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  console.log("Inside controller");

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings(); //We are receiving the DOMstring Object here in the DOM object.
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  //Now we need to call this function and the best way to do it is to create public initialization function.

  var ctrlAddItem = function() {
    //1. Get the field input data
    var input = UICtrl.getInput();
    console.log(input.description);

    //2. Add the item to the budge controller

    //3. Add the item to the UI

    //4. Calculate the budget

    //5. Display the budge on UI.
  };

  return {
    init: function() {
      console.log("Application is started");
      setupEventListeners();
    }
  };
})(budgetController, uiController);

controller.init();
