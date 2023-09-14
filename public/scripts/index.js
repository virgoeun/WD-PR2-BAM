const emojies = document.getElementsByClassName("emoji-label");

// const radios = document.querySelectorAll(".emoji-container input");

// radios.forEach((r) => {
//   r.addEventListener("click", (e) => {
//     if (e.target.checked) {
//       e.target.parentElement.style.background = "yellow";
//     } else {
//       e.target.parentElement.style.background = "none";
//     }
//   });
// });

const radios = document.querySelectorAll("input[type='radio']");
radios.forEach((r) => {
  r.addEventListener("click", (e) => {
    radios.forEach((radio) => {
      if (radio !== e.target) {
        // Remove background color from previously clicked elements
        radio.parentElement.style.background = "none";
      }
    });

    if (e.target.checked) {
      // Set background color for the currently clicked element
      e.target.parentElement.style.background = "purple";
    } else {
      e.target.parentElement.style.background = "none";

    }
  });
});
