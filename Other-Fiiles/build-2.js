/****************
 * Setting Up different modules and adding Event listeners in the controller. 
 */

var budgetController = (function() {
    console.log('Inside budgetController')

  //Some Code

})();

var uiController = (function() {

    console.log("Inside uiController");

  //Some Code later

})();


var controller = (function(budgetCtrl, UICtrl) {
  var ctrlAddItem = function() {
    console.log("Inside ctrlAddItem");

    //1. Get the field input data

    //2. Add the item to the budge controller

    //3. Add the item to the UI

    //4. Calculate the budget

    //5. Display the budge on UI.
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

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