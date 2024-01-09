$(document).ready(function () {
  // Event listener for the login button
  $("#loginBtn").on("click", function () {
    // Get the values from the email and password fields
    const email = $("#email").val();
    const password = $("#password").val();

    console.log(email);
    console.log(password);

    if (email.trim() === "" || password.trim() === "") {
      return res
        .status(401)
        .json({ message: "All data fields are mandatory..." });
    }

    $.ajax({
      url: "/api/v1/user/login",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
      success: function (response) {
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "/projects";
      },
      error: function (error) {
        console.error("Error during login validation:", error);
      },
    });
  });
});
