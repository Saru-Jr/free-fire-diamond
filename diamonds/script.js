document.querySelectorAll('.cards p').forEach(card => {
    card.addEventListener('click', () => {
        showLoginPopup();
    });
});

function showLoginPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Login Required</h3>
            <p>Please login with your account to continue</p>
            <div class="popup-buttons">
                <button onclick="closePopup()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

function redirectToLogin() {
    // Scroll to login section
    const loginSection = document.querySelector('.login');
    loginSection.scrollIntoView({ behavior: 'smooth' });
    closePopup();
}

function submitid(event) {
    event.preventDefault();
    const idInput = document.getElementById("idinput");
    const id = idInput.value.trim();

    if (!id) {
        alert("Please enter your Player ID");
        return;
    }

    // Disable input and button while submitting
    idInput.disabled = true;
    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;

    fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("ID submitted successfully!");
            idInput.value = "";
        } else {
            throw new Error(data.error || "Failed to submit ID");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error submitting ID. Please try again.");
    })
    .finally(() => {
        // Re-enable input and button
        idInput.disabled = false;
        submitButton.disabled = false;
    });
}