(function () {
  let timer;
  const buttons = document.querySelectorAll("[data-time]");
  const custom = document.querySelector("#custom");
  const timerDisplay = document.querySelector(".display__time-left");
  const endTime = document.querySelector(".display__end-time");

  function startTimer(sec) {
    clearInterval(timer);
    const now = Date.now();
    const end = now + sec * 1000;
    // 倒数计时
    setCountDown(end);
    // 显示计时结束的时间
    showEndTime(end);
  }

  function setCountDown(end) {
    timer = setInterval(function () {
      let secLeft = Math.floor((end - Date.now()) / 1000);

      if (secLeft >= 0) {
        let displayMin = Math.floor(secLeft / 60);
        let displaySec = secLeft % 60;
        timerDisplay.innerText = `${displayMin}:${displaySec}`;
      } else {
        clearInterval(timer);
        timerDisplay.innerText = "计时结束";
      }
    }, 16);
  }

  function showEndTime(time) {
    const endDate = new Date(time);
    let min = endDate.getMinutes();
    let hour = endDate.getHours();
    min = min < 10 ? "0" + min : min;
    endTime.innerText = `Back at ${hour}:${min}`;
  }

  function setTime() {
    const sec = parseInt(this.dataset.time);
    startTimer(sec);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", setTime);
  });

  custom.addEventListener("submit", function (e) {
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    if (mins) {
      startTimer(mins * 60);
    }
  });
})();
