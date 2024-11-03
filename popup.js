function updateRequestCount() {
    chrome.runtime.sendMessage("getRequestCount", (response) => {
        if (response) {
            document.getElementById("count").textContent = response.count.toString();
        }
    });
}

setInterval(updateRequestCount, 500);

updateRequestCount();
