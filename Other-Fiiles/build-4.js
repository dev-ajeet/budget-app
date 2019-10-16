/********************
 * Creating an initialization Function. 
 */

var budgetController = (function() {
  console.log("Inside budgetController");

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
    console.log(input);

    //2. Add the item to the budge controller

    //3. Add the item to the UI

    //4. Calculate the budget

    //5. Display the budge on UI.
  };

  return {
      init: function() {
          console.log('Application is started');
          setupEventListeners();
      }
  };
  

  
})(budgetController, uiController);

controller.init();

