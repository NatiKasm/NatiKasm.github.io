document.getElementById('checkForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const url = document.getElementById('urlInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<em>Checking website...</em>';

  // Basic checks (SSL and URL format)
  let results = [];
  if (url.startsWith('https://')) {
    results.push('✅ <b>SSL:</b> Secure (HTTPS detected)');
  } else {
    results.push('❌ <b>SSL:</b> Not secure (site does not use HTTPS)');
  }

  // SEO and meta check (very basic, for demonstration)
  fetch(url)
    .then(response => response.text())
    .then(html => {
      // Basic title/meta check
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, 'text/html');
      let title = doc.querySelector('title');
      let metaDesc = doc.querySelector('meta[name="description"]');

      results.push(title && title.textContent.length > 0
        ? '✅ <b>SEO:</b> Title tag found'
        : '❌ <b>SEO:</b> No title tag found');

      results.push(metaDesc && metaDesc.content.length > 0
        ? '✅ <b>SEO:</b> Meta description found'
        : '❌ <b>SEO:</b> No meta description found');

      // Show results
      resultsDiv.innerHTML = '<ul>' + results.map(r => `<li>${r}</li>`).join('') + '</ul>';
    })
    .catch(() => {
      results.push('⚠️ Could not fetch the website to check SEO tags.');
      resultsDiv.innerHTML = '<ul>' + results.map(r => `<li>${r}</li>`).join('') + '</ul>';
    });
});
