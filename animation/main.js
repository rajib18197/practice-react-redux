"use strict";

const container = document.querySelector(".container");
const containerCoords = container.getBoundingClientRect();
console.log(containerCoords);
const BOX_SIZE = 15;
const boxLength = containerCoords.width / BOX_SIZE;

Array.from({ length: 240 }, (_, i) => {
  const boxElement = document.createElement("box");
  boxElement.classList.add("box");
  container.appendChild(boxElement);
  if (i === 25){
      boxElement.style.animation = `pulsate 1s cubic-bezier(.84,.23,.99,1.17) infinite alternate`;
      boxElement.style.animationDuration = '2s'
  }

  if(i === 10){
    boxElement.style.animationDelay = '2s';
  }

  if(i === 35){
    boxElement.style.animationDelay = '4s';
  }

  if(i === 23){
    boxElement.style.animationDelay = '1s';
  }

  if(i === 50){
    boxElement.style.animationDelay = '3s';
    boxElement.style.animationDuration = '4s'
    boxElement.style.animationName = 'pulsate1'
  }
});
