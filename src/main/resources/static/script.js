// This tells the browser: "Look for the API on whatever website I am currently on"
const API_URL = window.location.origin + "/api/members";

document.addEventListener("DOMContentLoaded", fetchMembers);

function fetchMembers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => renderTable(data));
}

function renderTable(data) {
    const tableBody = document.getElementById("memberTableBody");
    tableBody.innerHTML = data.map(member => {
        let pillClass = member.status === 'PRESENT' ? 'bg-present' : (member.status === 'ABSENT' ? 'bg-absent' : 'bg-pending');

        return `
        <tr class="border-secondary">
            <td>
                <div class="fw-bold">${member.name}</div>
                <div class="small text-secondary">${member.phone} | ${member.email}</div>
            </td>
            <td>${member.city || 'N/A'}</td>
            <td><span class="status-pill ${pillClass}">${member.status}</span></td>
            <td class="text-end">
                <div class="btn-group">
                    <button onclick="updateStatus(${member.id}, 'PRESENT')" class="btn btn-sm btn-outline-success border-secondary"><i class="bi bi-check-lg"></i></button>
                    <button onclick="updateStatus(${member.id}, 'ABSENT')" class="btn btn-sm btn-outline-danger border-secondary"><i class="bi bi-x-lg"></i></button>
                    <button onclick="deleteMember(${member.id})" class="btn btn-sm btn-outline-dark text-danger border-secondary ms-2"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        </tr>`;
    }).join('');
}

function addMember() {
    const memberData = {
        name: document.getElementById('mName').value,
        email: document.getElementById('mEmail').value,
        phone: document.getElementById('mPhone').value,
        age: document.getElementById('mAge').value,
        height: document.getElementById('mHeight').value,
        weight: document.getElementById('mWeight').value,
        addressLine1: document.getElementById('mAddr1').value,
        addressLine2: document.getElementById('mAddr2').value,
        city: document.getElementById('mCity').value,
        status: "PENDING"
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData)
    }).then(() => {
        location.reload();
    });
}

function updateStatus(id, status) {
    fetch(`${API_URL}/${id}/status?status=${status}`, { method: "PUT" }).then(() => fetchMembers());
}

function deleteMember(id) {
    if(confirm("Delete this member?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => fetchMembers());
    }
}