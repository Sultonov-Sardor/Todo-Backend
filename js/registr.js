let elForm = document.querySelector('.js-form');
let elName = document.querySelector('.js-input-userName');
let elPhone = document.querySelector('.js-input-phone');
let elEmail = document.querySelector('.js-input-email');
let elPassword = document.querySelector('.js-input-password');

let elBack = document.querySelector('.js-backBtn');
let elLogin = document.querySelector('.js-registerBtn');

elBack.addEventListener('click', () => {
  location.replace('index.html')
})

elForm.addEventListener('submit',(evt) => {
  evt.preventDefault();

    fetch('http://192.168.100.8:5000/user/register',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: elName.value,
        phone: elPhone.value,
        email: elEmail.value,
        password: elPassword.value
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.token){
        localStorage.setItem('token', data.token);
        location.replace('index.html')
      }
    })
    .catch((err) => console.log(err))
})

