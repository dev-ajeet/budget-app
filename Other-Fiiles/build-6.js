/********************
 * Adding a New item to our Budget Controller
 * How to avoid conflicts in our data structures;
 * How and why to pass data from one module to another. 
 * We will create a public method in the budge controller, that will gonna allow other modules to add items into our data structure 
 * ID configuration for the elements. 
 * 
 * 
 */

var budgetController = (function() {
  console.log("Inside budgetController");
  var Expense = function(id, description, value) { //function constructor for expense
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) { //function constructor for income
    this.id = id;
    this.description = description;
    this.value = value;
  };

  
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  
  return {
    //Creating scope for outside access.
    addItem: function (type, des, val) {
      var newItem, ID;
      /* id is a unique number that we want to assign to each new item that we put it either in the expense or income arrays for the all item. Because if we want to retrieve and element from the array, we need ID of that particular element.  
      * To specify the ID the first thing that comes to mind is to simply use the length of the already existing array then add 1. 
      * Suppose we have and array of five elements [1 2 3 4 5], then next ID = 6.
      * But there is a big problem with this, that because later on if we are going to delete items from this so we would 
      * have IDs like [1 2 4 6 8 ] , so next ID can't be 6 because in that case we will have two elements at 6 id
      * [1 2 4 6 8] next ID = 9;
      * So we want ID = ID of last object + 1;
      * data.allItems[type].length - 1 will give the position of the last object of the array exp or inc based on type. And .id give the value of ID in the last object. 
      *  */
      if (data.allItems[type].length > 0){
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new Item based on inc or exp. 
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      //After we have a newItem we can add it to our data structure .i.e inside the 'data' object 'allItems' either in exp or inc array.
      data.allItems[type].push(newItem); //How this works I have given explanation is text-1.js file. 
      // console.log(newItem);
      return newItem;
    },
    
    displayItem: function () {
      console.log(data);
    }
  };

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
  
  var ctrlAddItem = function() {
    var input, newItem;
    //1. Get the field input data
    input = UICtrl.getInput();
    console.log(input.description);

    //2. Add the item to the budge controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    budgetCtrl.displayItem();

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
