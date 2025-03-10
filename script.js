const apiUrls = [
    "https://api.uspeoplesearch.net/person/v3?x=",
    "https://premium_lookup-1-h4761841.deta.app/person?x="
];

async function checkDNCStatus() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    if (!phoneNumber) {
        alert("Please enter a phone number");
        return;
    }

    const resultDiv = document.getElementById("result");
    const output = document.getElementById("output");
    
    resultDiv.style.display = "none"; // Hide the result div initially
    output.textContent = "Loading...";

    try {
        const results = await getDNCResults(phoneNumber);
        output.textContent = JSON.stringify(results, null, 2);
        resultDiv.style.display = "block"; // Show results
    } catch (error) {
        output.textContent = "Error: " + error.message;
        resultDiv.style.display = "block";
    }
}

async function getDNCResults(phoneNumber) {
    const results = [];

    for (const url of apiUrls) {
        try {
            const response = await fetch(url + phoneNumber);
            if (!response.ok) {
                throw new Error("API request failed");
            }
            const data = await response.json();
            results.push(data); // Collect API response data
        } catch (error) {
            results.push({ error: error.message });
        }
    }

    return results;
}
