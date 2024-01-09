$(document).ready(function () {
  const data = JSON.parse(localStorage.getItem("user"));

  const user = data.user._id;

  const isOwnerLoggedIn = context.project.owner === user;
  console.log(isOwnerLoggedIn);
});
