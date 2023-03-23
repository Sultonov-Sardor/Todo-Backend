let token = localStorage.getItem('token');

if(token){
  location.replace('todo.html')
}


let loginBtn = document.querySelector('.js-btn-login');
let registrBtn = document.querySelector('.js-btn-registr');

loginBtn.addEventListener('click', () => {
  location.replace('login.html')
})

registrBtn.addEventListener('click', () => {
  location.replace('registr.html')
})