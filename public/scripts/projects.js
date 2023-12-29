$(document).ready(function () {
  $(".projectTr").on("click", function () {
    const projectId = $(this).attr("data-project-id");

    if (projectId !== "") {
      window.location.href = `/projects/${projectId}`;
    }

    // $.ajax({
    //     url: `/api/v1/projects/${projectId}`,
    //     method: "GET",
    //     dataType: "json",
    //     contentType: "application/json",
    //     success: function (response) {

    //       window.location.href = "/projects";
    //     },
    //     error: function (error) {
    //       console.error("Error during login validation:", error);
    //     },
    //   });
  });
});
