

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
// import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import { getDatabase ,set,ref,get,child,update,remove,onValue ,push} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBa2CSj4eZ9fzNT-KXnh2bWkd62HgeRG-g",
    authDomain: "arzoofatima-fac49.firebaseapp.com",
    databaseURL: "https://arzoofatima-fac49-default-rtdb.firebaseio.com",
    projectId: "arzoofatima-fac49",
    storageBucket: "arzoofatima-fac49.appspot.com",
    messagingSenderId: "822140104858",
    appId: "1:822140104858:web:78d37adfc7dbe94465af23"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase(app);
  btn.addEventListener('click' , (e) => {
    let obj = {};
    obj.name = document.getElementById('name').value;
    obj.email = document.getElementById('email').value;
    obj.message = document.getElementById('Message').value
    e.preventDefault();
    // alert('data received')
     
    const postListRef = ref(database, 'users');
    const newPostRef = push(postListRef);
    set(newPostRef,obj)
    .then(() => {
            //    alert('Your Message has been received successfully')
               
            document.getElementsByClassName('alert')[0].style.display="block";

            setTimeout(function(){
                document.getElementsByClassName('alert')[0].style.display="none";
        
            },3000)
              })
              .catch((error) => {
               
                    const errorMessage = error.message;
                    alert('error' + errorMessage)
              });

  })


/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        var sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


