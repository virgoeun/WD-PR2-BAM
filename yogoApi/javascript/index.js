const axios = require("axios");

const container = document.querySelector(".yoga-container");

const yogaTemplate = ({ name, benefits, description, image }) => {
  return `
  <div class="yoga-info">
    <div class="name"> ${name} </div>
    <div class="benefits">${benefits}</div>
    <div class="dsecription">${description}</div>
    <div class="image">${image}</div>
  </div>
  `;
};

window.addEventListener("load", () => {
  function getYoga() {

    axios
      .get(process.env.YOGA_API_URL)
      .then((response) => {
        const data = response.data;
        const dataContainer = document.getElementById("data-container");
        dataContainer.innerHTML = yogaTemplate(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  document.getElementById("get-Yoga-button").addEventListener("click", getYoga);
});
