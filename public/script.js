// localStorage.clear();
document.addEventListener("DOMContentLoaded", function () {
  // Slide to the textsPage
  const sendTo = document.getElementById("sendTo");
  const userRadioInputs = document.querySelectorAll('input[name="radio"]');
  const goBack = document.getElementById("goBack");
  userRadioInputs.forEach((radioInput) => {
    radioInput.addEventListener("change", function () {
      if (radioInput.checked) {
        window.scrollTo({ left: window.innerWidth, behavior: "smooth" });
        if (radioInput.value == "userA") {
          sendTo.innerHTML = "Send messages to userB";
        } else {
          sendTo.innerHTML = "Send messages to userA";
        }
      }
    });
  });
  goBack.addEventListener("click", function () {
    window.scrollTo({ left: 0, behavior: "smooth" });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const messageBox = document.getElementById("messageBox");
  const socket = io();

  // sent msgs
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = messageInput.value.trim();

    if (message !== "") {
      const user = document.querySelector('input[name="radio"]:checked').value;
      socket.emit('chat message', { user, message });
      
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.push({ user, message });
      localStorage.setItem("messages", JSON.stringify(messages));
      messageInput.value = "";
      messageBox.innerHTML = messages
        .map(msg => `<p class="${msg.user}"><strong>${msg.user}:</strong>${msg.message}</p>`)
        .join("");
    }
  });
  
  // received msgs
  socket.on('chat message', function (user, message) {
    messageBox.innerHTML += `<p class="${user}"><strong>${user}:</strong>${message}</p>`;
  });
});
