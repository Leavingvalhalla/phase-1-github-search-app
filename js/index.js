document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('github-form');
  search.addEventListener('submit', (e) => {
    e.preventDefault();
    const userQuery = document.getElementById('search').value;
    fetch('https://api.github.com/search/users?q=' + userQuery, {
      // prettier-ignore
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      body: JSON.stringify.userQuery,
    })
      .then((res) => res.json())
      .then((data) => {
        const users = data.items;
        const userList = document.getElementById('user-list');

        for (let i = 0; i < 10; i++) {
          const newUser = document.createElement('li');
          if (users[i]) {
            newUser.innerText = users[i].login;

            const avatar = document.createElement('img');
            avatar.src = users[i].avatar_url;
            avatar.style = 'width: 20%';
            newUser.append(avatar);

            const repoLink = document.createElement('a');
            repoLink.innerText = 'GitHub Repositories';
            repoLink.href = users[i].repos_url;
            newUser.appendChild(repoLink);

            newUser.className = 'user';
            newUser.id = users[i].login;

            userList.appendChild(newUser);
          }
        }
        const allUsers = document.getElementsByClassName('user');

        for (let i = 0; i < allUsers.length; i++) {
          const userName = allUsers[i].id;
          allUsers[i].addEventListener('click', () => {
            fetch(`https://api.github.com/users/${userName}/repos`, {
              // prettier-ignore
              headers: { 'Accept': 'application/vnd.github.v3+json' },
              body: JSON.stringify.userName,
            })
              .then((res) => res.json())
              .then((data) => {
                const repoDiv = document.getElementById('repos-list');
                for (let i = 0; i < data.length; i++) {
                  console.log(data[i]);
                  repoName = document.createElement('li');
                  repoName.innerText = data[i].name;
                  repoDiv.appendChild(repoName);
                }
              });
          });
        }
      });
  });

  //grab all the user li s
  // add event listener to fetch when clicked
});
