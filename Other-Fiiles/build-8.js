/********************
 * How to clear HTML fields.
 * How to use querySelectorAll,
 * How to convert a list to an array
 * A better way to loop over an array then for loop; foreach
 * 
 * To select multiple elements/classes/felids we use var hold = document.querySelectorAll('.class1' + ',' + '.class2')
 * And 'hold' variable hold the result of the of the selection. But the problem is that the querySelectorAll method
 * does not return a nice array, which we can use and loop over, but instead it return a list. 
 * A list is a list is bit similar to an array, but it doesn't have all of these nice methods that we have for arrays. 
 * So the solution is to convert the list into an array. We use array method 'slice' Slice return the copy of the array it is called on. Usually we call this method on array and it then return another array. But we can kind of trick this method and pass the list into it and then it will still return an array. 
 * But we cannot use hold.slice(); because this is not an array. We use:
 * Array.prototype.slice.call(hold);
 *
 */

//Budget Controller Module. or Data Structure and Algo Module .
var budgetController = (function() {
  console.log("Inside budgetController");
  var Expense = function(id, description, value) {
    //function constructor for expense
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    //function constructor for income
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
    addItem: function(type, des, val) {
      var newItem, ID;
      /* id is a unique number that we want to assign to each new item that we put it either in the expense or income arrays for the all item. Because if we want to retrieve and element from the array, we need ID of that particular element.  
      
      *  */
      if (data.allItems[type].length > 0) {
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

    displayItem: function() {
      console.log(data);
    }
  };
})();

//UI Controller Module

var uiController = (function() {
  console.log("Inside uiController");
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will either be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function(obj, type) {
      //Create HTML list with placeholder tag.
      console.log("Inside addListItem");
      var html, newHtml, element;
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace the placeholder text will some actual data.
      newHtml = html.replace("%id", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //Insert the HTML into the DOM.
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function(){
          var fields, fieldsArr;
          fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue); //We get list from using this
          fieldsArr = Array.prototype.slice.call(fields); //converting list into array. 
          /***
           * forEach is a special function that can be applied to an array, It has a call back function, which take max three parameters i.e. current, index and array - which have any name we want.  
           * current is the current element, so current.value = ""; is equivalent to document.queryStructure.(DOM.inputDescription).value = "";
           * index is the position of the element in the array.
           * array is the whole array
           * This forEach method loops over all the element of the field array and then set the value of all of them back to empty string. And we have access of the current element due to the callBack function here. The call back function has access to three arguments. 
           */
          fieldsArr.forEach(function(current, index, array){
                current.value = "";
          });
          fieldsArr[0].focus();

    },

    getDOMstrings: function() {
      return DOMstrings;
      /****
       * So here we are exposing the DOMstrings object to the public.
       */
    }
  };
})();

//Main Controller Module
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

  //this function is the control center of the application, it tells the other controller what it should do and then get it data back, that it can use in other things.

  var ctrlAddItem = function() {
    var input, newItem;
    //1. Get the field input data
    input = UICtrl.getInput();
    // console.log(input.description);

    //2. Add the item to the budge controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // budgetCtrl.displayItem();

    //3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    //4. Clear the fields 
    UICtrl.clearFields();

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
