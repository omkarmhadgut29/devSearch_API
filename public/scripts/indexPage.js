const user = localStorage?.getItem("user") || "";

console.log(user);

if (user === "" || user === null || user === undefined) {
  //   return res.redirect("/login");
  window.location.href = "/login";
} else {
  window.location.href = "/projects";
}

// return res.redirect("/projects");
