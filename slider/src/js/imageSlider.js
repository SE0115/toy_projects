class ImageSlider {
  #currentPosition = 0;
  #slideCnt = 0;
  #slideWidth = 0;
  sliderWrapEl;
  sliderListEl;
  nextBtnEl;
  prevBtnEl;
  indicatorEl;

  constructor() {
    this.assignElement();
    this.initSlideCnt();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.createIndicator();
    this.setIndicator();
    this.addEvent();
  }
  assignElement() {
    this.sliderWrapEl = document.getElementById("slider-wrap");
    this.sliderListEl = this.sliderWrapEl.querySelector(".slider");
    this.nextBtnEl = this.sliderWrapEl.querySelector(".next");
    this.prevBtnEl = this.sliderWrapEl.querySelector(".prev");
    this.indicatorEl = this.sliderWrapEl.querySelector(".indicator");
  }
  initSlideCnt() {
    this.#slideCnt = this.sliderListEl.querySelectorAll("li").length;
  }
  initSlideWidth() {
    this.#slideWidth = this.sliderWrapEl.clientWidth;
    console.log("width", this.#slideWidth, this.sliderWrapEl.clientWidth);
  }
  initSliderListWidth() {
    console.log(this.#slideWidth, this.#slideCnt);
    console.log(this.#slideWidth * this.#slideCnt);
    this.sliderListEl.style.width = `${this.#slideWidth * this.#slideCnt}px`;
  }
  initIndicator() {
    this.indicatorLiEl.forEach((li, idx) => {
      if (idx === this.#currentPosition) li.classList.add("active");
    });
  }
  addEvent() {
    this.nextBtnEl.addEventListener("click", this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener("click", this.moveToLeft.bind(this));
    this.indicatorEl.addEventListener(
      "click",
      this.onClickIndicotor.bind(this)
    );
  }
  moveToRight() {
    if (this.#currentPosition === this.#slideCnt - 1) {
      this.#currentPosition = 0;
    } else this.#currentPosition += 1;

    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    this.setIndicator();
  }
  moveToLeft() {
    if (this.#currentPosition === 0) {
      this.#currentPosition = this.#slideCnt - 1;
    } else this.#currentPosition -= 1;
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    this.setIndicator();
  }
  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideCnt; i++) {
      const li = document.createElement("li");
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorEl.appendChild(docFragment);
  }
  setIndicator() {
    this.indicatorEl.querySelector("li.active")?.classList.remove("active");
    this.indicatorEl
      .querySelector(`li:nth-child(${this.#currentPosition + 1})`)
      .classList.add("active");
  }
  onClickIndicotor(e) {
    if (e.target.dataset.index) {
      this.#currentPosition = +e.target.dataset.index;
      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
  }
}

export default ImageSlider;
