// Helper functions to show/hide elements
const show = (el) => {
  el.style.display = "block";
};

// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get references to the note, name, form and user
  const noteInput = document.getElementById("note");
  const nameInput = document.getElementById("name");
  const cmsForm = document.getElementById("cms");
  const userSelect = document.getElementById("user");

  // Get query parameter
  const url = window.location.search;
  let plantId;
  let userId;
  let updating = false;

  // Get plant data for editing/adding
  const getPlantData = (id, type) => {
    const queryUrl =
      type === "plant" ? `/api/plants/${id}` : `/api/users/${id}`;

    fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Success in getting plant:", data);

          // Populate the form for editing
          nameInput.value = data.name;
          noteInput.value = data.note;
          userId = data.UserId || data.id;

          // We are updating
          updating = true;
        }
      })
      .catch((err) => console.error(err));
  };

  // If plant exists, grab the content of the plant
  if (url.indexOf("?plant_id=") !== -1) {
    plantId = url.split("=")[1];
    getPlantData(plantId, "plant");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our user
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Event handler for when the plant for is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make sure the form isn't empty
    if (
      !nameInput.value.trim() ||
      !noteInput.value.trim() ||
      !userSelect.value
    ) {
      return;
    }

    // Object that will be sent to the db
    const newPlant = {
      name: nameInput.value.trim(),
      note: noteInput.value.trim(),
      UserId: userSelect.value,
    };

    // Update a plant if flag is true, otherwise submit a new one
    if (updating) {
      newPlant.id = plantId;
      updatePlant(newPlant);
    } else {
      submitPlant(newPlant);
    }
  };

  // Attach an event listener to the form on submit
  cmsForm.addEventListener("submit", handleFormSubmit);

  // Submits new plant then redirects
  const submitPlant = (plant) => {
    fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    })
      .then(() => {
        window.location.href = "/plants";
      })
      .catch((err) => console.error(err));
  };

  // Render a list of users or redirect if no users
  const renderUserList = (data) => {
    console.log("renderUserList -> data", data);
    if (!data.length) {
      window.location.href = "/users";
    }
    if (document.querySelector(".hidden")) {
      show(document.querySelector(".hidden"));
    }

    const rowsToAdd = [];

    data.forEach((user) => rowsToAdd.push(createUserRow(user)));

    userSelect.innerHTML = "";
    console.log("renderUserList -> rowsToAdd", rowsToAdd);
    console.log("userSelect", userSelect);

    rowsToAdd.forEach((row) => userSelect.append(row));
    userSelect.value = userId;
  };

  // Build user dropdown
  const createUserRow = ({ id, name }) => {
    const listOption = document.createElement("option");
    listOption.value = id;
    listOption.textContent = name;
    return listOption;
  };

  // A function to get Users and then call the render function
  const getUsers = () => {
    fetch("api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => renderUserList(data))
      .catch((err) => console.error(err));
  };

  // Get the users, and their plants
  getUsers();

  // Update a plant then redirect to plants
  const updatePlant = (plant) => {
    fetch("/api/plants", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    })
      .then(() => {
        window.location.href = "/plants";
      })
      .catch((err) => console.error(err));
  };
});
