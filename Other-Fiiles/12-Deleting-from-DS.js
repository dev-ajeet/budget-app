/********************
 * Yet another method to loop over an array: map;
 * How to remove elements from an array using the splice method.
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
    },
    budget: 0,
    percentage: -1
  };
  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });

    //Now storing the value in exp or inc total
    data.totals[type] = sum;
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

    deleteItem: function(type, id){
          var ids, index;
          /**id = 3; we cannot select like this data.allItems[type][id]; This would have worked if we are certian that IDs are all in order like 0, 1, 2, 3, 4, 5 ....But that is not the case. 
           * id = 6
           * ids = [1,2,4,6,8] this is a sample array we get after the 'map' function is executed
           * index = 3; 
           * 
           * */
            ids = data.allItems[type].map(function(current) {
                /****
                 * map is very similar to forEach method, it also receives a callback function which also has access to the  current element ,current index, and entire array. But the difference between map and forEach is that map actually returns a brand new Array.  
                 * suppose we return 2; then we will end up with brand new array with the same length as the all item types array, but with number 2 in all of the elements.  
                 */
                return current.id;
          });
          console.log(ids);
          //now we need to get the index where the 'id' is stored in the ids array that we got just now.
          //this indexOf method will returns the index number  of the element of the array that we input here. index = -1 when it did not find the element. 
          index = ids.indexOf(id); //Ye sab jugad bas index value of item jaane ke liye hua hai, so that we can delete that index from the array. 
          if(index !== -1 ){
                //To remove the elements from an array we use the 'splice'.
                data.allItems[type].splice(index, 1);
          }      
                      


    },

    calculateBudget: function() {
      // Calculate total income and expanses
      calculateTotal("exp");
      calculateTotal("inc");

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //Calculate the percentage of the income that we spent.
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will either be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      //Create HTML list with placeholder tag.
      // console.log("Inside addListItem");
      var html, newHtml, element;
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace the placeholder text will some actual data.
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //Insert the HTML into the DOM.
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      ); //We get list from using this
      fieldsArr = Array.prototype.slice.call(fields); //converting list into array.

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });
      fieldsArr[0].focus();
    },
    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
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
    document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
  } 

  var updateBudget = function() {
    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the Budget.
    var budget = budgetCtrl.getBudget();
    // console.log(budget);

    //3. Display the budge on UI.
    UICtrl.displayBudget(budget);
  };
  //this function is the control center of the application, it tells the other controller what it should do and then get it data back, that it can use in other things.

  var ctrlAddItem = function() {
    var input, newItem;
    //1. Get the field input data
    input = UICtrl.getInput();
    // console.log(input.description);
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budge controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // budgetCtrl.displayItem();

      //3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4. Clear the fields
      UICtrl.clearFields();

      //5. Calculate and Update budget.
      updateBudget();
    }
  };
  var ctrlDeleteItem = function(event) {
    
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
    if (itemID) {
      
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);
      //Now we have both the ID and type. Both the things require to delete items from both UI and dataStructure.

      //1. Delete the item from the dataStructure
      budgetCtrl.deleteItem(type, ID);

      //2. Delete the item from the UI

      //3. Update and show the new budget.
      } 
   };
  

  return {
    init: function() {
      console.log("Application is started");
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
    }
  };
})(budgetController, uiController);

controller.init();
