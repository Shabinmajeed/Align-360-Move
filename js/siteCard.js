document.addEventListener('DOMContentLoaded', () => {
  // Find containers where the site card should be injected
  // We include both a reusable class and your existing task-list-container ID
  const containers = document.querySelectorAll('.site-card-container, #task-list-container');
  
  if (containers.length > 0) {
    fetch('Components/site card.html')
      .then(response => response.text())
      .then(data => {
        containers.forEach(container => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          container.innerHTML = doc.body.innerHTML;
          
          // Execute any scripts found inside the fetched component (like toggleExpand)
          const scripts = doc.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
          });
        });
      })
      .catch(err => console.error('Error loading site card component:', err));
  }
});
