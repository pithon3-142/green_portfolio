/*
const xhtml = new XMLHttpRequest();

xhtml.open("GET", "https://api.github.com/users/pithon3-142/repos", true);

xhtml.send();
// populate table when response arrives
xhtml.onreadystatechange = function () {
    if (xhtml.readyState !== 4) return;

    const tbody = document.querySelector('#repo-data');
    if (!tbody) return console.error('#repo-data element not found');

    if (xhtml.status === 200) {
        const repos = JSON.parse(xhtml.responseText);
        console.log('repos', repos);

        // clear existing rows
        tbody.innerHTML = '';

        repos.forEach(repo => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${repo.name || ''}</td>
                <td>${repo.description || ''}</td>
                <td>${repo.language || ''}</td>
                <td>${repo.visibility || (repo.private ? 'private' : 'public')}</td>
                <td>${repo.created_at ? new Date(repo.created_at).toLocaleDateString() : ''}</td>
                <td>${repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : ''}</td>
            `;

            tbody.appendChild(row);
        });
    } else {
        console.error('GitHub API request failed', xhtml.status, xhtml.statusText);
    }
};
*/

$(document).ready(function () {

    $('#git-repo-table').DataTable({
        ajax: {
            url: 'https://api.github.com/repositories',
            dataSrc: ''
        },
        error: function (xhr, error, thrown) {
            console.log("Status:", xhr.status);
            console.log("Error:", error);
            console.log("Thrown:", thrown);
            console.log("Response:", xhr.responseText);
        },
        columns: [
            {data: 'name'},
            {data: 'description'},
            {data: 'languages_url'},
            {data: 'visibility'},
            {data: 'created_at'},
            {data: 'updated_at'}
        ]
    })
});