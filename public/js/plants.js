//TODO ADD PLANTS JS BASED ON BLOG.JS
// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  const plantContainer = document.querySelector(".plant-container");

  // Variable to hold our plants
  let plants;

  const getPlants = (user) => {
    userId = user || "";
    if (userId) {
      userId = `/?user_id=${userId}`;
    }

    fetch(`/api/plants${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        plants = data;
        console.log("Success in getting plants:", data);
        if (!data || !data.length) {
          displayEmpty(user);
        } else {
          initializeRows();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Get a plant from a specific user
  const url = window.location.search;
  let userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPlants(userId);
  } else {
    getPlants();
  }

  // Front end call to DELETE (kill) a plant
  const deletePlant = (id) => {
    fetch(`/api/plants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(getPlants());
  };

  // Create HTML rows for the blog container **UPDATE: blogContainer name**
  const initializeRows = () => {
    plantContainer.innerHTML = "";
    const plantsToAdd = [];

    plants.forEach((plant) => plantsToAdd.push(createNewRow(plant)));
    plantsToAdd.forEach((plant) => plantContainer.append(plant));
  };

  const createNewRow = (plant) => {
    console.log("createNewRow -> plant", plant);

    const formattedDate = new Date(plant.createdAt).toLocaleDateString();

    const newPlantCard = document.createElement("div");
    newPlantCard.classList.add("card");

    const newPlantCardHeading = document.createElement("div");
    newPlantCardHeading.classList.add("card-header");

    // Delete button **UPDATE PostDelete**
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete", "btn", "btn-danger");
    deleteBtn.addEventListener("click", handlePlantDelete);

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "EDIT";
    editButton.classList.add("edit", "btn", "btn-info");
    editButton.addEventListener("click", handlePlantEdit);

    const newPlantName = document.createElement("h2");
    const newPlantDate = document.createElement("small");
    const newPlantUser = document.createElement("h5");

    newPlantUser.textContent = `Written by: ${plant.User.name}`;
    newPlantUser.style.float = "right";
    newPlantUser.style.color = "blue";
    newPlantUser.style.marginTop = "-10px";

    const newPlantCardBody = document.createElement("div");
    newPlantCardBody.classList.add("card-body");

    const newPlantBody = document.createElement("p");
    newPlantName.textContent = plant.name;
    newPlantBody.textContent = plant.note;
    newPlantDate.textContent = ` (${formattedDate})`;
    newPlantName.append(newPlantDate);
    newPlantCardHeading.append(deleteBtn);
    newPlantCardHeading.append(editButton);
    newPlantCardHeading.append(newPlantName);
    newPlantCardHeading.append(newPlantUser);
    newPlantCardBody.append(newPlantBody);
    newPlantCard.append(newPlantCardHeading);
    newPlantCard.append(newPlantCardBody);
    newPlantCard.setAttribute("data-plant", JSON.stringify(plant));

    console.log("createNewRow -> newPlantCard", newPlantCard);
    return newPlantCard;
  };

  // Helper function to display something when there are no plants
  const displayEmpty = (id) => {
    const query = window.location.search;
    let partial = "";
    if (id) {
      partial = ` for User #${id}`;
    }
    //***Update blogContainer name
    plantContainer.innerHTML = "";
    const messageH2 = document.createElement("h2");
    messageH2.style.textAlign = "center";
    messageH2.style.marginTop = "50px";
    messageH2.innerHTML = `No plants in${partial}, navigate <a href='/cms${query}'>here</a> in order to get your GreenHaus started.`;
    plantContainer.append(messageH2);
  };

  // Handle when we click the delete plant button
  const handlePlantDelete = (e) => {
    const currentPlant = JSON.parse(
      e.target.parentElement.parentElement.dataset.plant
    );

    deletePlant(currentPlant.id);
  };

  // Handle when we click the edit plant button
  const handlePlantEdit = (e) => {
    const currentPlant = JSON.parse(
      e.target.parentElement.parentElement.dataset.plant
    );

    window.location.href = `/?plant_id=${currentPlant.id}`;
  };
});
