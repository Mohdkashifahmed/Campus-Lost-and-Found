
// ===================================
// CAMPUS LOST AND FOUND
// JAVASCRIPT FUNCTIONALITY
// ===================================


// 1. REGISTER FOUND ITEM

document.getElementById("itemForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const item = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        date_found: document.getElementById("date_found").value,
        contact: document.getElementById("contact").value
    };

    try {

        const response = await fetch("/add_item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Registration failed");
        }

        document.getElementById("message").innerText =
            result.message + " Your Item ID: " + result.item_id;

        document.getElementById("itemForm").reset();

        loadItems();

    }

    catch(error) {

        document.getElementById("message").innerText =
            error.message;

    }

});


// 2. DISPLAY AVAILABLE ITEMS

async function loadItems(search = "") {

    const itemsList = document.getElementById("itemsList");

    try {

        const response = await fetch(
            "/items?q=" + encodeURIComponent(search)
        );

        const items = await response.json();

        if (!response.ok) {
            throw new Error(items.error || "Unable to load items");
        }

        itemsList.innerHTML = "";

        if(items.length === 0) {

            itemsList.innerHTML =
                "<p>No items found.</p>";

            return;

        }

        items.forEach(function(item) {

            const card = document.createElement("div");

            card.className = "item-card";

            const heading = document.createElement("h3");
            heading.textContent = item.name;

            const id = document.createElement("p");
            id.textContent = "Item ID: " + item.item_id;

            const category = document.createElement("p");
            category.textContent = "Category: " + item.category;

            const description = document.createElement("p");
            description.textContent = item.description;

            const location = document.createElement("p");
            location.textContent = "Found at: " + item.location;

            const status = document.createElement("span");
            status.className = "status";
            status.textContent = item.status;

            card.append(
                heading,
                id,
                category,
                description,
                location,
                status
            );

            if (item.status === "Available") {

                const button = document.createElement("button");

                button.textContent = "Claim Item";

                button.addEventListener("click", function() {
                    claimItem(item.item_id);
                });

                card.appendChild(button);

            }

            itemsList.appendChild(card);

        });

    }

    catch(error) {

        itemsList.textContent = error.message;

    }

}


// 3. SEARCH ITEMS

function searchItems() {

    const search = document.getElementById("searchInput").value;

    loadItems(search);

}


// 4. CLAIM AN ITEM

async function claimItem(itemId) {

    const studentName = prompt("Enter your name:");

    if (!studentName) return;

    const contact = prompt("Enter your contact details:");

    if (!contact) return;

    const proof = prompt(
        "Describe a detail that proves this item belongs to you:"
    );

    if (!proof) return;

    const claimData = {

        student_name: studentName,
        contact: contact,
        proof: proof

    };

    try {

        const response = await fetch(
            "/claim/" + encodeURIComponent(itemId),
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(claimData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Claim failed");
        }

        alert(result.message);

        loadItems();

    }

    catch(error) {

        alert(error.message);

    }

}


// 5. ADMIN VIEW CLAIM REQUESTS

async function viewClaims() {

    const pin = document.getElementById("adminPin").value;

    const claimsList = document.getElementById("claimsList");

    if (!pin) {

        alert("Please enter Admin PIN");

        return;

    }

    try {

        const response = await fetch("/admin/claims", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                admin_pin: pin
            })

        });

        const claims = await response.json();

        if (!response.ok) {
            throw new Error(claims.error || "Unable to load claims");
        }

        claimsList.innerHTML = "";

        if(claims.length === 0) {

            claimsList.innerHTML =
                "<p>No claim requests available.</p>";

            return;

        }

        claims.forEach(function(claim) {

            const card = document.createElement("div");

            card.className = "claim-card";

            const title = document.createElement("h3");
            title.textContent = claim.student_name;

            const item = document.createElement("p");
            item.textContent = "Item: " + claim.item_id;

            const contact = document.createElement("p");
            contact.textContent = "Contact: " + claim.contact;

            const proof = document.createElement("p");
            proof.textContent = "Ownership Proof: " + claim.proof;

            const status = document.createElement("p");
            status.textContent = "Status: " + claim.status;

            card.append(title, item, contact, proof, status);

            if (claim.status === "Pending") {

                const button = document.createElement("button");

                button.textContent = "Approve & Return Item";

                button.addEventListener("click", function() {

                    approveClaim(claim._id);

                });

                card.appendChild(button);

            }

            claimsList.appendChild(card);

        });

    }

    catch(error) {

        claimsList.textContent = error.message;

    }

}


// 6. ADMIN APPROVES CLAIM

async function approveClaim(claimId) {

    const pin = document.getElementById("adminPin").value;

    const confirmApproval = confirm(
        "Have you verified the ownership? Approve this claim?"
    );

    if (!confirmApproval) return;

    try {

        const response = await fetch(
            "/admin/approve/" + claimId,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    admin_pin: pin
                })

            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Approval failed");
        }

        alert(result.message);

        viewClaims();

        loadItems();

    }

    catch(error) {

        alert(error.message);

    }

}


// 7. LOAD ITEMS WHEN WEBSITE OPENS

document.addEventListener("DOMContentLoaded", function() {

    loadItems();

});
