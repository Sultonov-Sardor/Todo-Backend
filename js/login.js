let elForm = document.querySelector('.js-form');
let elEmail = document.querySelector('.js-inputEmail');
let elPassword = document.querySelector('.js-inputPassword');

elForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();

  fetch('http://192.168.100.8:5000/user/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      email: elEmail.value,
      password: elPassword.value
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        location.replace('todo.html')
      }else {
        location.reload();
      }
    })
    .catch((err) => console.log(err))
})

let elBack = document.querySelector('.js-back');

elBack.addEventListener('click', () => {
  location.replace('index.html')
})