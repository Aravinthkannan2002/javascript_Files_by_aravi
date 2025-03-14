document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
    });
  });
  
  function openModal(){
    let modal= document.querySelector('#modal-window');
    modal.classList.add("showModal");
  }
  
  export function closeM(){
      let m= document.querySelector('#modal-window');
    m.classList.remove("showModal");
  }
  
  document.getElementsByClassName('.mode-switch').onclick = function() {
    document.body.classList.toggle('dark');
  }
  
  export const cardItems = document.querySelectorAll('.main-card');
  export const modalHeader = document.querySelector('.modalHeader-js');
  export const modalCardPrice = document.querySelector('.amount');
  
