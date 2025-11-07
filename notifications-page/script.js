const notificationsList = document.querySelector(".notifications__list");
const notificationsCount = document.querySelector(".notifications__count");
const markAllBtn = document.querySelector(".notifications__mark-all");

setNotificationCount();

function markAllReadHandler(event) {
  const allNotifications = notificationsList.querySelectorAll(".notification");
  allNotifications.forEach((notification) => {
    notification.classList.replace("unread", "read");
  });
  setNotificationCount();
}

function setNotificationCount() {
  const count = document.querySelectorAll(".notification.unread").length;
  notificationsCount.textContent = count;
}

function toggleNotificationHandler(event) {
  const notification = event.target.closest(".notification");
  notification.classList.toggle("open");
}

notificationsList.addEventListener("click", toggleNotificationHandler);
markAllBtn.addEventListener("click", markAllReadHandler);
