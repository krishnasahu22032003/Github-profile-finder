const profileContainer = document.getElementById('profile');

async function getUser() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) {
    alert('Please enter a GitHub username');
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error('User not found');

    const data = await res.json();

    profileContainer.innerHTML = `
      <div class="profile-header">
        <img src="${data.avatar_url}" alt="${data.login}" />
        <div class="profile-info">
          <h2>${data.name || data.login}</h2>
          <p>${data.bio || 'No bio available'}</p>
          <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">🔗 View Profile</a>
        </div>
      </div>
      <div class="stats">
        <span>Repos: ${data.public_repos}</span>
        <span>Followers: ${data.followers}</span>
        <span>Following: ${data.following}</span>
      </div>
    `;

    profileContainer.classList.remove('hidden');
  } catch (error) {
    profileContainer.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    profileContainer.classList.remove('hidden');
  }
}
