document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const usersList = document.getElementById('usersList');
    const reposList = document.getElementById('reposList');

    searchForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const username = searchInput.value.trim();

      try {

        const usersResponse = await fetch(`https://api.github.com/search/users?q=${username}`);
        const usersData = await usersResponse.json();
        const users = usersData.items;


        usersList.innerHTML = '';
        users.forEach(user => {
          const userElement = document.createElement('div');
          userElement.innerHTML = `
            <p>Username: ${user.login}</p>
            <img src="${user.avatar_url}" alt="${user.login} avatar">
            <a href="#" data-username="${user.login}" class="userLink">View Repositories</a>
          `;
          usersList.appendChild(userElement);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });


    usersList.addEventListener('click', async function(event) {
      if (event.target.classList.contains('userLink')) {
        const username = event.target.dataset.username;
        try {

          const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
          const reposData = await reposResponse.json();
          const repos = reposData;

          reposList.innerHTML = '';
          repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.innerHTML = `
              <p>Repository: <a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
            `;
            reposList.appendChild(repoElement);
          });
        } catch (error) {
          console.error('Error fetching repositories:', error);
        }
      }
    });
  });

