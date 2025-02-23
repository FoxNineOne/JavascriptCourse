'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const btnsShowModal = document.querySelectorAll('.show-modal');

// Open Modal Function
const openModal = function () {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
  // Alternative, but not as efficient
  //modal.style.display = 'block';
};

// Close Modal Function
const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add('hidden');
};

//Clicking on a Modal Button will activate the Modal window
for (let i = 0; i < btnsShowModal.length; i++)
  btnsShowModal[i].addEventListener(`click`, openModal);

// Button close or clicking overlay will activate Close Modal Function
btnCloseModal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);

//Key Press Event "Esc" should close Modal also
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
