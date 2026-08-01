const homeBtn = document.querySelector(".homebtn");
homeBtn.addEventListener("click", () => {
  window.location.replace("http://localhost:8000/");
  console.log("clicked");
});
