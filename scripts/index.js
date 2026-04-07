// @todo: Темплейт карточки index.js

// @todo: DOM узлы


//кнопки на сайте
const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка ред профиля
const profileAddButton = document.querySelector('.profile__add-button'); //кнопка доб постов


//работа с карточками
const placesList = document.querySelector('.places__list'); //место для карточек
const cardTemplate = document.querySelector('#card-template').content; //темплейт для карточки

const popupImage = document.querySelector('.popup__image'); //попап для показа картинки
const popupCaption = document.querySelector('.popup__caption'); //текст для попапа с картинкой


//поля имя и описание в профиле
let profileTitle = document.querySelector('.profile__title'); //имя профиля
let profileDescription = document.querySelector('.profile__description'); //описание профиля

//работа с попапами
const profileFormElement = document.querySelector('.popup__form-profile');
const cardFormElement = document.querySelector('.popup__form-card');
const popupClose = document.querySelectorAll('.popup__close'); //крестик закрытия попапа

const profilePopup = document.querySelector('.popup_type_edit'); //Поп-ап редактирования профиля 
let inputName = document.querySelector('.popup__input_type_name'); //поле ввода для имени в профиле
let inputDescription = document.querySelector('.popup__input_type_description'); //поле ввода для описания в профиле

const cardPopup = document.querySelector('.popup_type_new-card'); //Поп-ап добавления карточки
let inputNameCard= document.querySelector('.popup__input_type_card-name');
let inputUrl= document.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image'); //Поп-ап с картинкой






//функция добавления стилей для плавно открытия и закрытия попапов
function addAnimationToPopups() {
    profilePopup.classList.add('popup_is-animated');
    cardPopup.classList.add('popup_is-animated');
    imagePopup.classList.add('popup_is-animated');
}

addAnimationToPopups();


// Функция закрытия по Esc
function closeByEsc(evt) {     
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');       
    closeModal(openedPopup);      
  } 
} 


const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.addEventListener('click', function(evt) {
        // Если клик был по самому оверлею (а не по контенту)
        if (evt.target === this) {
            closeModal(this);
        }
    });
});

// @todo: функции для попапов

//функция открытия попапа
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

//функция закрытия попапа
function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

//обработчик клика для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
    openModal(profilePopup);
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
} );

//обработчик клика для открытия попапа редактирования карточек
profileAddButton.addEventListener('click', function() {
    inputUrl.value = '';
    inputNameCard.value = '';
    openModal(cardPopup);
} );

//обработчик клика для озакрытия попапа при нажатие на кретстик
popupClose.forEach(function(closeButton) {
    closeButton.addEventListener('click', function() {
        closeModal(profilePopup);
        closeModal(cardPopup);
        closeModal(imagePopup);
    });
});

//функция сохранения данные для профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 


//функция сохранения данные для карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    const card = createCard(inputUrl.value, inputNameCard.value);
    placesList.prepend(card);

    closeModal(cardPopup);
    
}
cardFormElement.addEventListener('submit', handleCardFormSubmit); 



// @todo: Функция создания карточки
function createCard(image, title){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    const likeButton = cardElement.querySelector('.card__like-button'); //лайк для карточки
    const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления карточки

    cardImage.src = image;
    cardTitle.textContent = title;

    likeButton.addEventListener('click', function(evt){
        evt.target.classList.toggle('card__like-button_is-active');
    });

    deleteButton.addEventListener('click', function(evt){
        evt.target.closest('.card').remove();
    });

    
    cardImage.addEventListener('click', function(){
        popupImage.src = image;
        popupCaption.textContent = title;
        openModal(imagePopup);
    });


    return cardElement;
};


// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
    const card = createCard(cardData.link, cardData.name);
    placesList.append(card);
});

