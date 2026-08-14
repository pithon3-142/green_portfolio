const fallbackProjects = [
    { id: '01', project: 'Piler', technology: 'Python / PyQt5', status: 'Complete' },
    { id: '02', project: 'TK Invoice Generator', technology: 'JavaScript / HTML / CSS', status: 'Complete' },
    { id: '03', project: 'Green Excel Logger', technology: 'Python', status: 'Complete' },
    { id: '04', project: 'Alias Game', technology: 'Kotlin / HTML / CSS', status: 'Complete' },
    { id: '05', project: 'Green Portfolio', technology: 'HTML / CSS / JS', status: 'In progress' },
    { id: '06', project: 'Bi Linear Search Algorithm', technology: 'Java', status: 'Complete' },
    { id: '07', project: 'Quick Selection Sort Algorithm', technology: 'Java', status: 'Complete' }
];
let projects = [];

const details = {
    piler: {
        title: 'Piler',
        problem: 'Files left scattered across a desktop or downloads folder are difficult to find and manage.',
        solution: 'A PyQt desktop application that moves a selected file type from a chosen source directory into a matching category folder at the destination.',
        technologies: 'Python, PyQt5, os, shutil, QSS',
        contribution: 'Built the desktop interface, file-type category selection, directory picking, validation, and the file-moving workflow.',
        result: 'A quick, guided way to tidy text, image, audio, video, and archive files.'
    },
    invoice: { title: 'Invoice Management System', 
        problem: 'Manual invoice records are difficult to organise, update, and present consistently.', 
        solution: 'A central workspace for clients, items, totals, and polished printable invoices.', 
        technologies: 'JavaScript, HTML, CSS, Local Storage', 
        contribution: 'Designed the interface and built the invoice creation and calculation workflow.', 
        result: 'A faster, clearer way to produce professional invoices.' },
    attendance: { title: 'Attendance Logger', 
        problem: 'Attendance records were difficult to organise manually.', 
        solution: 'A Python application that processes attendance logs and generates organised Excel reports.', 
        technologies: 'Python, Pandas, OpenPyXL', 
        contribution: 'Built data processing, employee grouping, date handling, and Excel formatting.', 
        result: 'A repeatable reporting process with clean, readable output.' },
    alumni: { title: 'Alumni API', problem: 'Alumni information needs a consistent, accessible structure.', 
        solution: 'A REST-style service for creating, updating, and retrieving alumni profiles.', 
        technologies: 'Python, REST API, JSON', 
        contribution: 'Defined endpoints, validation, and the data flow for alumni records.', 
        result: 'A flexible backend foundation ready for a web or mobile client.' }
};

const tableBody = document.getElementById('projectData');
const searchInput = document.getElementById('projectSearch');
const statusFilter = document.getElementById('statusFilter');
const pagination = document.getElementById('pagination');
const dataCount = document.getElementById('dataCount');
let sortKey = 'id'; let sortDirection = 1; let page = 1;
const pageSize = 3;

function filteredProjects() {
    const term = searchInput.value.trim().toLowerCase();
    return projects.filter(item => (statusFilter.value === 'all' || item.status === statusFilter.value) && Object.values(item).some(value => value.toLowerCase().includes(term)))
        .sort((a, b) => a[sortKey].localeCompare(b[sortKey], undefined, { numeric: true }) * sortDirection);
}

function renderTable() {
    if (!projects.length) {
        tableBody.innerHTML = '<tr><td class="empty-state" colspan="4">Loading project data…</td></tr>';
        dataCount.textContent = 'Loading…';
        return;
    }
    const result = filteredProjects(); const totalPages = Math.max(1, Math.ceil(result.length / pageSize));
    page = Math.min(page, totalPages);
    const rows = result.slice((page - 1) * pageSize, page * pageSize);
    tableBody.innerHTML = rows.length ? rows.map(item => `<tr><td>${item.id}</td><td><strong>${item.project}</strong></td><td>${item.technology}</td><td><span class="status status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td></tr>`).join('') : '<tr><td class="empty-state" colspan="4">No matching projects found.</td></tr>';
    dataCount.textContent = `${result.length} project${result.length === 1 ? '' : 's'} found`;
    pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => `<button type="button" class="${page === index + 1 ? 'current' : ''}" aria-label="Page ${index + 1}">${index + 1}</button>`).join('');
}

function showDetails(key) {
    const item = details[key]; if (!item) return;
    document.getElementById('details-title').textContent = item.title;
    document.getElementById('detailContent').innerHTML = [['Problem', item.problem], ['Solution', item.solution], ['Technologies', item.technologies], ['My contribution', item.contribution], ['Result', item.result]].map(([label, value]) => `<article><h3>${label}</h3><p>${value}</p></article>`).join('');
    document.querySelectorAll('.project-card').forEach(card => card.classList.toggle('active', card.dataset.project === key));
}

searchInput.addEventListener('input', () => { page = 1; renderTable(); });
statusFilter.addEventListener('change', () => { page = 1; renderTable(); });
document.querySelectorAll('.sort-button').forEach(button => button.addEventListener('click', () => { sortDirection = sortKey === button.dataset.sort ? -sortDirection : 1; sortKey = button.dataset.sort; renderTable(); }));
pagination.addEventListener('click', event => { if (event.target.matches('button')) { page = Number(event.target.textContent); renderTable(); } });
document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', () => { showDetails(card.dataset.project); document.getElementById('project-details').scrollIntoView({ behavior: 'smooth', block: 'start' }); }));

showDetails('piler');
renderTable();
fetch('js/projects-data.json')
    .then(response => {
        if (!response.ok) throw new Error('Unable to load project data');
        return response.json();
    })
    .then(data => { projects = data; renderTable(); })
    .catch(() => { projects = fallbackProjects; renderTable(); });
