document.addEventListener('DOMContentLoaded', () => {
    const base_URL = 'https://api.github.com'
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const toggleButton = document.getElementById('toggle-search');
    const searchTypeIndicator = document.getElementById('search-type');
    let currentSearchType = 'user'; // Default search type
  
    toggleButton.addEventListener('click', () => {
      // Toggle the search type between 'user' and 'repo'
      currentSearchType = currentSearchType === 'user' ? 'repo' : 'user';
  
      // Update the search type indicator
      searchTypeIndicator.textContent = `Searching for ${currentSearchType === 'user' ? 'Users' : 'Repos'}`;
    });
  
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const searchTerm = searchInput.value.trim();
  
      if (currentSearchType === 'user') {
        // Searching users using the User Search Endpoint
        const users = await searchUsers(searchTerm);
        displayUsers(users);
      } else {
        // Searching repos using the Repo Search Endpoint
        const repos = await searchRepos(searchTerm);
        displayRepos(repos);
      }
    });
  
    // Searching users and repos
    async function searchUsers(term) {
      const response = await fetch(`${base_URL}/search/users?q=${term}`, {
        headers: {
          'Content-Type' : 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
      return data.items;
    }
  
    async function searchRepos(term) {
      const response = await fetch(`${base_URL}/search/repositories?q=${term}`, {
        headers: {
          'Content-Type' : 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
      return data.items;
    }
  
    // Functions for displaying users and repos
    function displayUsers(users) {
        const userList = document.getElementById('user-list');
        // Clear existing content
        userList.innerHTML = '';
      
        // Iterate through each user and create elements for display
        users.forEach(user => {
          const userItem = document.createElement('li');
          userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
          `;
          userList.appendChild(userItem);
        });
    }
  
    function displayRepos(repos) {
        const reposList = document.getElementById('repos-list');
        // Clear existing content
        reposList.innerHTML = '';
      
        // Iterate through each repository and create elements for display
        repos.forEach(repo => {
          const repoItem = document.createElement('li');
          repoItem.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          reposList.appendChild(repoItem);
        });
    }
});
  