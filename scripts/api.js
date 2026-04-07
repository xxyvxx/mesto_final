//api.js

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-202',
  headers: {
    authorization: 'f636280d-201a-40e4-8adf-00fe6ebdb360',
    'Content-Type': 'application/json'
  }
}

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//     });
// }

// Функция для обработки ответа
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users.me`, {
        headers: config.headers
        })
        .then(checkResponse)
        .then(res => updateUserInfo(res.name, res.about, res.avatar));
}

function updateUserInfo(name, about, avatar){
    profileTitle.textContent = name;
    profileDesc.textContent = about;
    profileImage.src = avatar;
}