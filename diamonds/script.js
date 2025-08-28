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