// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
// import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import { getDatabase ,set,ref,get,child,update,remove,onValue,onChildAdded,push} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZwd1JrBy4p4HYaIKq3qQDi_FDaLp-7OI",
    authDomain: "todoappp-3d599.firebaseapp.com",
    databaseURL: "https://todoappp-3d599-default-rtdb.firebaseio.com",
    projectId: "todoappp-3d599",
    storageBucket: "todoappp-3d599.appspot.com",
    messagingSenderId: "566480717087",
    appId: "1:566480717087:web:84eba9858ecc574fae5c2a",
    measurementId: "G-YNC444BDH6"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const user = auth.currentUser;
const dbRef = ref(getDatabase());

// =====================================SIGNUP=====================================
btn.addEventListener('click' , (e) => {
let email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const name = document.getElementById('name').value
e.preventDefault()

createUserWithEmailAndPassword(auth,email, password)
.then((userCredential) => {
    const user = userCredential.user;
 
        // alert('usercreated')
            set(ref(database, 'users/' + user.uid), {
                name: name,
                email: email,
                password:password
              })
              .then(() => {
               alert('Account created successfully')
               window.location = 'login.html'
              })
              .catch((error) => {
               
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage + 'error')
              });              
        })
    })

// =====================================LOGIN=====================================
btn2.addEventListener('click' , (e) => {
        let email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('loggedin')
            window.location = 'users.html'
           })
           .catch((error) => {
            
                 const errorCode = error.code;
                 const errorMessage = error.message;
                 console.log(errorMessage + 'error')
                 const loginError = document.getElementById('loginError');
                 loginError.innerText = error.message;
           });    
    })



// =====================================RENDER NAME IN GREETINGS=====================================
    onAuthStateChanged(auth, (user) => {
      const username = document.getElementById('username')
    if (user) {
    const uid = user.uid;
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    username.innerText = snapshot.val().name;
   
    }).catch((error) => {
    console.error(error);
    });
    }
    });

function renderdata(individualDoc){
    let parentDiv = document.createElement("li")
    parentDiv.className = 'w-100 todo-box'
    parentDiv.setAttribute('data-id', individualDoc.id)

    let todoDiv = document.createElement("p")
    todoDiv.textContent = individualDoc.data().todos;

    let trash = document.createElement("button");
    let i = document.createElement("i")
    i.className= "far fa-trash-alt"

    trash.appendChild(i)

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(trash)

    todoContainer.appendChild(parentDiv)
}

let date = new Date()
let time = date.getTime()


// =====================================RENDER TODO=====================================
const form = document.getElementById('form')
let list = document.getElementById("list");
const commentsRef = ref(database, 'todos');
onAuthStateChanged(auth, (user) => {
  if(user){
onChildAdded(commentsRef, (data) => {
    let li = document.createElement('li')
    let liText = document.createTextNode(data.val().value)
    li.appendChild(liText) 
    let delBtn = document.createElement("button")
    let delText = document.createTextNode("")
    delBtn.setAttribute("class", "far fa-trash-alt ")
    delBtn.setAttribute("id",data.val().key)
    delBtn.addEventListener("click",function(e) {
        let db=getDatabase()
        console.log((e.srcElement.id))
         remove(child(ref(db,'todos'),e.srcElement.id))
         e.srcElement.parentNode.remove()
        
    })
    delBtn.appendChild(delText)
    let editBtn = document.createElement("button")
    let editText = document.createTextNode("")
    editBtn.setAttribute("class", "fa-solid fa-pen")
    editBtn.setAttribute("id",data.val().key)
    editBtn.addEventListener("click",function(e){
        console.log(e.srcElement.parentNode.firstChild.nodeValue)
        let key =e.srcElement.id

        let editValue = prompt("Enter edit value", e.srcElement.parentNode.firstChild.nodeValue)
        let editTodo = {
            value: editValue,
            key: key
        }
        const dbRef = ref(getDatabase());
        set(child(dbRef,`todos/${key}`),editTodo)
         e.srcElement.parentNode.firstChild.nodeValue = editValue
    
    })
    editBtn.appendChild(editText)

    li.appendChild(delBtn)
    li.appendChild(editBtn)
   
    list.appendChild(li)
});
  }
});

// =====================================ADD TODO IN DATABASE=====================================
let todo_item = document.getElementById("todos")
onAuthStateChanged(auth, (user) => {
  const todouser = user.uid;
form.addEventListener('submit',function(e){
 e.preventDefault()
    let db=getDatabase()
    let database =ref(db,'todos/')
    let key = push(database);
    console.log(key.key)

    let todo = {
        userID: todouser,
        value: todo_item.value,
        key: key.key
    }
    set(key,todo)
    todo_item.value =""

})
})

// =====================================DELETE ALL=====================================
let deleteAll= document.getElementById('deleteAll')
deleteAll.addEventListener('click',function(){
    let db=getDatabase()
    remove(ref(db,'todos'))
    
    list.innerHTML = ""

})

// =====================================LOGOUT=====================================
let logout = document.getElementById('logout');
logout.addEventListener('click', (e)=>{
  signOut(auth).then(() => {
    window.location = 'login.html'
  }).catch((error) => {
    console.log(error)
  });

})
