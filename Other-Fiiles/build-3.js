/********************
 * The controller is a place, where we tell the other modules what to do. 
 * So we write methods in the UI controller and the budgetController to get data for us or to calculate something and then in the controller we call these methods. 
 * For getting input from there UI, we will write a method in the uiController and then call it in the controller. So that we can get this data and then use it further, for example to pass it to other controllers so it can then add the input data as a new expense or new income. 
 * 
 * We will also place all the CSS string in one separate object. It will simplify our code and, if we want to change some class we just have to change at one place. 
 */


var budgetController = (function() {
  console.log("Inside budgetController");

  //Some Code


})();



var uiController = (function() {
  console.log("Inside uiController");
  var DOMstrings = {
    /***This is a central place where all out strings will be stored and we can then retrieve them and change them easily */
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  
  return {
      getInput: function() {
        /***
         * var type = document.querySelector('.add__type').value; //Will either be inc or exp
         * var description = document.querySelector('.add__description').value;
         * var value = document.querySelector('.add__value').value; 
         * As this method will be access in the controller module, we need to return these values from this function, for that we can either use array or return an object containing all these variables. We go for object here. 
         * This uiController function when executed will return 'object' having method 'getInput'. When this method is called as uiController.getInput();  This will again return an object have all three object variable, viz. type, description and value. 
         *    
         */
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
  }

})();



var controller = (function(budgetCtrl, UICtrl) {
    console.log("Inside controller");

    var DOM = UICtrl.getDOMstrings(); //We are receiving the DOMstring Object here in the DOM object. 
    

    var ctrlAddItem = function() {
    
    //1. Get the field input data
    var input = UICtrl.getInput();
    console.log(input);


    //2. Add the item to the budge controller

    //3. Add the item to the UI

    //4. Calculate the budget

    //5. Display the budge on UI.
  };

  document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function(event) {
    //Here EventListener will passes an object in the function. even.which is for some older browsers.
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, uiController);

/********************
 * The controller is a place, where we tell the other modules what to do.
 * So we write methods in the UI controller and the budgetController to get data for us or to calculate something and then in the controller we call these methods.
 */
