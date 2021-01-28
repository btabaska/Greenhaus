document.addEventListener("DOMContentLoaded", () => {
  const PlantSelect = document.getElementById("plant-dropdown");
  let plantArray = [];
  const fetchAllPlants = () => {
    fetch(`/api/plants/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((plant) => {
          const newOption = document.createElement("option");
          newOption.setAttribute("value", plant.id);
          newOption.textContent = plant.name;
          console.log(newOption);
          PlantSelect.appendChild(newOption);
        });
      });
  };
  fetchAllPlants();
});
