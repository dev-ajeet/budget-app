/***********************
 * Pushing element into our arrays in data object .i.e 'exp' and 'inc'.
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

  var data = { //object to store data
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  

  return { //Creating scope for outside access. 
    addItem: function(type, des, val) {
      var newItem,ID;
      ID = 0; // id is a unique number  

      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      

      if(type === 'exp') {
        newItem = new Expense(ID, des, val);
      }else if (type === 'inc'){
        newItem = new Income(ID, des, val);
      }
      //After we have a newItem we can add it to our data structure .i.e inside the 'data' object 'allItems' either in exp or inc array. 
      data.allItems[type].push(newItem);
      // console.log(newItem);
      return newItem;

        
    },
    removeItem: function(){},
    displayItem: function(){
        return ;
    }
    
  };
})();

//Testing to push elements into the array
// var newItems = budgetController();
var xx = budgetController.addItem('exp', 'New-Item', 10);
console.log(xx);


var test = {
  allItems: {
      exp: [],
      inc: []
  },
  totals: {
      exp: 0,
      inc: 0
  }
};

//This is one method of pushing element in the array, when we know in which array we are going to put the element
test.allItems.exp.push(test);
console.log(test.allItems.exp[0]);
//This is another method of doing the same thing but, here we don't know in which array we are going to push the element. 
type = 'exp';
test.allItems[type].push('Element-1');
console.log(test.allItems.exp[1]);





