const API_URL = "/api/members";

// Load members when page opens
document.addEventListener("DOMContentLoaded", fetchMembers);

function fetchMembers() {
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => renderTable(data))
        .catch(err => console.error("Error fetching data:", err));
}

function renderTable(data) {
    const tableBody = document.getElementById("memberTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = data.map(member => {
        let pillClass = member.status === 'PRESENT' ? 'bg-present' : (member.status === 'ABSENT' ? 'bg-absent' : 'bg-pending');

        return `
        <tr class="border-secondary">
            <td>
                <div class="fw-bold">${member.name}</div>
                <div class="small text-secondary">${member.phone || 'No Phone'} | ${member.email}</div>
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

// CORRECTED ADD MEMBER FUNCTION
function addMember() {
    console.log("Attempting to save member...");

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

    console.log("Sending Data:", memberData);

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData)
    })
        .then(res => {
            if(res.ok) {
                alert("Member Successfully Saved to Database!");
                location.reload();
            } else {
                alert("Database Error: Check your SQL connection or Java Logs.");
            }
        })
        .catch(err => {
            console.error("System Error:", err);
            alert("System Error: Could not reach the server.");
        });
}

function updateStatus(id, status) {
    fetch(`${API_URL}/${id}/status?status=${status}`, { method: "PUT" })
        .then(() => fetchMembers())
        .catch(err => console.error("Update Error:", err));
}

function deleteMember(id) {
    if(confirm("Are you sure you want to delete this member?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => fetchMembers())
            .catch(err => console.error("Delete Error:", err));
    }
}