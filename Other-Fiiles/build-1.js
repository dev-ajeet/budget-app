/*******************************
 * We will use modules for our program. We created modules because we want to create pieces of code that are related to one another together, inside separate, independent and organized units.
 * Each of these modules will have variables and functions, that are private - which means they are only accessible inside of the module. Therefor no other code can override our data.
 * Besides private variables and methods we also going to have public methods. Which means we are going to expose them to public. So that other functions or modules can access and use them.
 * This is called Data Encapsulation
 * Data Encapsulation allows us to hide implementation details of a specific module from the outside scope, so that we only expose a public interface which is sometime called API.
 * We use module pattern to create application in javaScript. We need to know the concepts of 'closures' and 'IIFE'
 * The secret of the module pattern programming is that, it returns an object containing all of the function that we want to be public .i.e. the functions that we want to give the outside scope access to. 
 *
 */
var budgetController = (function (){
    var x = 23;
    

    var add = function (a) {
        return x + a;
    }
    return {
        publicTest: function(b){
            return add(b);
            
        }
    }
     
})();

/***************
 * The 'publicTest' method here used the 'add' function and the 'x' variable even after the function returned .i.e. removed from the execution stack. Remember closure working here. 
 */

 var uiController = (function(){
      //Some Code later

 })();

 /*******
  * In computer science, separation of concerns (SoC) is a design principle for separating a computer program into distinct sections, so that each section addresses a separate concern. 
  * A concern is a set of information that affects the code of a computer program.
  */
/***
 * We need there two controller connected. For Ex. we need a way to read data from user interface and add that data as new expense in the budgeController. That's why we will create a third module called appController. 
 * 
 * Modules can also receives arguments because they are just function expressions. 
 */

 var controller = (function(budgetCtrl, UICtrl){
    // we can use budgetController.publicTest() but this is not best practice. Because this would made the controller little bit less independent. As if we change the name of the module, then we would have to do this all over the code. We have to change the name everywhere. 
    var z = budgetCtrl.publicTest(5);
    
    return {
        anotherPublic: function (){
            console.log(z);
        }
    }



 })(budgetController, uiController);

 