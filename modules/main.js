import { MemoryGame } from "./memoryGame.js";
const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg"
];
const backImage = "images/back.jpg";
const game = new MemoryGame(images, backImage);
game.render();
