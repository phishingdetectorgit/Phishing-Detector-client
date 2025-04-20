document.getElementById('checkBtn').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const url = tabs[0].url;  // Get the current URL

    // Change the result div to loading state
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Checking...';
    resultDiv.className = 'neutral';

    // Send the request to the server
    fetch('http://localhost:5000/check_url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
  if (data.is_phishing !== undefined) {
    if (data.is_phishing === 1) {
      resultDiv.textContent = `${data.url} фишинговый. Причина: ${data.reason}`;
      resultDiv.className = 'phishing';
    } else {
      resultDiv.textContent = `${data.url} безопасен.`;
      resultDiv.className = 'safe';
    }
  } else {
    console.log(data.message);
    resultDiv.textContent = data.message;
    resultDiv.className = 'neutral';
  }
})

    .catch(error => {
      console.error('Error:', error);
      resultDiv.textContent = 'Error checking the site. Please try again later.';
      resultDiv.className = 'neutral';  // Neutral color for errors
    });
  });
});
