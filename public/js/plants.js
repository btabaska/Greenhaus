//TODO ADD PLANTS JS BASED ON BLOG.JS
// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');
  
    const plantContainer = document.querySelector('.plant-container');
  
    // Variable to hold our posts
    let plants;
  
    const getPlants = (user) => {
    userId = user || '';
    if (userId) {
        userId = `/?user_id=${userId}`;
    }
  
    fetch(`/api/plants${userId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
        posts = data;
        console.log('Success in getting posts:', data);
        if (!data || !data.length) {
            displayEmpty(user);
        } else {
            initializeRows();
        }
        })
        .catch((error) => console.error('Error:', error));
    };

    // Get a plant from a specific user
    const url = window.location.search;
    let userId;
    if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
    getPlants(userId);
    } else {
    getPlants();
    }

    // Front end call to DELETE (kill) a plant
    const deletePlant = (id) => {
    fetch(`/api/plants/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    }).then(getPlants());
    };
  
    // Create HTML rows for the blog container **UPDATE: blogContainer name**
    const initializeRows = () => {
    plantContainer.innerHTML = '';
    const plantsToAdd = [];

    plants.forEach((plant) => plantsToAdd.push(createNewRow(plant)));
    plantsToAdd.forEach((plant) => plantContainer.append(plant));
    };

    const createNewRow = (plant) => {
    console.log('createNewRow -> plant', plant);

    const formattedDate = new Date(plant.createdAt).toLocaleDateString();

    const newPostCard = document.createElement('div');
    newPostCard.classList.add('card');

    const newPostCardHeading = document.createElement('div');
    newPostCardHeading.classList.add('card-header');
  
      // Delete button **UPDATE PostDelete**
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';
    deleteBtn.classList.add('delete', 'btn', 'btn-danger');
    deleteBtn.addEventListener('click', handlePostDelete);
  
      // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.classList.add('edit', 'btn', 'btn-info');
    editButton.addEventListener('click', handlePostEdit);

    const newPostTitle = document.createElement('h2');
    const newPostDate = document.createElement('small');
    const newPostAuthor = document.createElement('h5');

    newPostAuthor.textContent = `Written by: ${plant.User.name}`;
    newPostAuthor.style.float = 'right';
    newPostAuthor.style.color = 'blue';
    newPostAuthor.style.marginTop = '-10px';

    const newPostCardBody = document.createElement('div');
    newPostCardBody.classList.add('card-body');

    const newPostBody = document.createElement('p');
    newPostTitle.textContent = `${plant.title} `;
    newPostBody.textContent = plant.body;
    newPostDate.textContent = ` (${formattedDate})`;
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editButton);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.setAttribute('data-plant', JSON.stringify(plant));

    console.log('createNewRow -> newPlantCard', newPlantCard);
    return newPlantCard;
    };

    // Helper function to display something when there are no posts
    const displayEmpty = (id) => {
    const query = window.location.search;
    let partial = '';
    if (id) {
        partial = ` for User #${id}`;
    }
    //***Update blogContainer name
    plantContainer.innerHTML = '';
    const messageH2 = document.createElement('h2');
    messageH2.style.textAlign = 'center';
    messageH2.style.marginTop = '50px';
    messageH2.innerHTML = `No plants in${partial}, navigate <a href='/cms${query}'>here</a> in order to get your GreenHaus started.`;
    plantContainer.append(messageH2);
    };
  
    // Handle when we click the delete post button
    const handlePlantDelete = (e) => {
    const currentPlant = JSON.parse(
        e.target.parentElement.parentElement.dataset.plant
    );

    deletePost(currentPost.id);
    };
  
    // Handle when we click the edit post button
    const handlePostEdit = (e) => {
    const currentPlant = JSON.parse(
        e.target.parentElement.parentElement.dataset.plant
    );

    window.location.href = `/?plant_id=${currentPost.id}`;
    };
});
