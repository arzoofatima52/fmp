

const todoContainer = document.getElementById('todo-container')

//gretings
var myDate = new Date();
var hrs = myDate.getHours();

var greet;
if (hrs < 12){
    greet = 'Good Morning';

}else if (hrs >= 12 && hrs <= 17) {
    greet = 'Good  Afternoon';
} else {
    greet = 'Good Evening' ;
}
document.getElementById('greetings').innerHTML = greet;


// username


// var list = document.getElementById('todos') ;

// function addlist(){

//   var li = document.createElement("li");
//   var inputValue = document.getElementById("todos").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   li.setAttribute('class', 'w-100 todo-box')
//   if (inputValue === '') {
//     alert("Please fill the space");
//   } else {
//     document.getElementById("todos").appendChild(li);
//   }
//   document.getElementById("todos").value = "";


// }
