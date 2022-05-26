import "../css/style.css";
import ImageSlider from "./imageSlider";

new ImageSlider();

const ulEl = document.querySelector(".slider");
const liEl = ulEl.querySelectorAll("li");

liEl.forEach((li) => {
  const divEl = li.querySelector("div");

  divEl.style.backgroundColor = divEl.className;
});
