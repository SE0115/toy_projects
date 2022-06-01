export default class DatePicker {
  monthData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  #calendarDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assignElement();
    this.setDateInput();
    this.addEvent();
  }

  assignElement() {
    this.datePickerEl = document.getElementById("date-picker");
    this.dateInputEl = this.datePickerEl.querySelector(".date-input");
    this.calendarEl = this.datePickerEl.querySelector(".calendar");
    this.calendarMonthEl = this.calendarEl.querySelector(".month");
    this.monthContentEl = this.calendarMonthEl.querySelector(".content");
    this.prevBtnEl = this.calendarMonthEl.querySelector(".prev");
    this.nextBtnEl = this.calendarMonthEl.querySelector(".next");
    this.calendarDatesEl = this.calendarEl.querySelector(".dates");
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();

    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }
  initSelectedDate() {
    this.selectedDate = { ...this.#calendarDate };
  }
  setDateInput() {
    this.dateInputEl.textContent = `${this.selectedDate.year}. ${
      this.selectedDate.month + 1
    }. ${this.selectedDate.date}`;
  }

  addEvent() {
    this.dateInputEl.addEventListener("click", this.toggleCalander.bind(this));
    this.prevBtnEl.addEventListener("click", this.prevBtnHandler.bind(this));
    this.nextBtnEl.addEventListener("click", this.nextBtnHandler.bind(this));
    this.calendarDatesEl.addEventListener("click", this.selectDate.bind(this));
  }

  toggleCalander() {
    if (this.calendarEl.classList.contains("active")) {
      this.#calendarDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle("active");
    this.updateMonth();
    this.updateDates();
  }

  updateMonth() {
    this.monthContentEl.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  updateDates() {
    this.calendarDatesEl.innerHTML = "";
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0
    ).getDate();

    const fragmentEl = new DocumentFragment();
    for (let d = 0; d < numberOfDates; d++) {
      const dateEl = document.createElement("div");
      dateEl.classList.add("date");
      dateEl.textContent = d + 1;
      dateEl.dataset.date = d + 1;
      fragmentEl.appendChild(dateEl);
    }
    fragmentEl.firstChild.style.gridColumnStart =
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1;
    this.calendarDatesEl.appendChild(fragmentEl);

    this.markToday();
    this.markSelectedDate();
    this.colorSat();
    this.colorSun();
  }

  prevBtnHandler() {
    this.#calendarDate.month -= 1;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.month = 11;
      this.#calendarDate.year -= 1;
    }
    this.updateMonth();
    this.updateDates();
  }

  nextBtnHandler() {
    this.#calendarDate.month += 1;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.month = 0;
      this.#calendarDate.year += 1;
    }
    this.updateMonth();
    this.updateDates();
  }

  selectDate(event) {
    if (event.target.dataset.date) {
      this.calendarDatesEl
        .querySelector(".selected")
        ?.classList.remove("selected");
      event.target.classList.add("selected");
      this.selectedDate = {
        data: new Date(
          this.#calendarDate.year,
          this.#calendarDate.month,
          event.target.dataset.date
        ),
        year: this.#calendarDate.year,
        month: this.#calendarDate.month,
        date: event.target.dataset.date,
      };
      this.setDateInput();
    }
  }

  markToday() {
    const curDate = new Date();
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth();
    const curDay = curDate.getDate();

    if (
      curYear === this.#calendarDate.year &&
      curMonth === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${curDay}']`)
        .classList.add("today");
    }
  }

  markSelectedDate() {
    if (
      this.selectedDate.year === this.#calendarDate.year &&
      this.selectedDate.month === this.#calendarDate.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add("selected");
    }
  }

  colorSat() {
    const satEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`
    );
    for (let s = 0; s < satEls.length; s++) {
      satEls[s].style.color = "blue";
    }
  }

  colorSun() {
    const sunEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        8 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`
    );
    for (let s = 0; s < sunEls.length; s++) {
      sunEls[s].style.color = "red";
    }
  }
}
