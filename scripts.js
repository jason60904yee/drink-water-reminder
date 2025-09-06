let countdown;
let intervalMinutes;
let timeLeft;
let drinkCount = 0;

// 啟動計時器
function startTimer() {
  clearInterval(countdown);
  intervalMinutes = parseInt(document.getElementById("interval").value);
  if (isNaN(intervalMinutes) || intervalMinutes <= 0) {
    alert("請輸入正確的分鐘數！");
    return;
  }
  timeLeft = intervalMinutes * 60;
  updateCountdown();

  countdown = setInterval(() => {
    timeLeft--;
    updateCountdown();

    if (timeLeft <= 0) {
      remindDrink();
      timeLeft = intervalMinutes * 60; // 重設倒數
    }
  }, 1000);

  document.getElementById("reminderMsg").innerText = "提醒中...";
}

// 更新倒數顯示
function updateCountdown() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("countdown").innerText =
    `下一次喝水倒數：${minutes}分${seconds}秒`;
}

// 彈出提醒
function remindDrink() {
  alert("該喝水啦！💧");

  // 加入喝水計數
  drinkCount++;
  document.getElementById("count").innerText = drinkCount;

  if (Notification.permission === "granted") {
    new Notification("喝水提醒 🚰", {
      body: "時間到！快喝一口水吧～",
      icon: "https://cdn-icons-png.flaticon.com/512/744/744522.png"
    });
  }
}

// 啟用通知權限
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}
