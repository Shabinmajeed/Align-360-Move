document.addEventListener('DOMContentLoaded', () => {
  // 1. Fetch Bottom Nav Component
  fetch('components/bottom nav.html?v=2')
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('bottom-nav-container');
      if (container) {
        container.innerHTML = data;
        
        // Re-initialize icons
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        
        // Setup 'More' Menu toggling logic
        const moreMenuBtn = document.getElementById('moreMenuBtn');
        const moreMenuPanel = document.getElementById('moreMenuPanel');
        const menuOverlay = document.getElementById('menuOverlay');

        if (moreMenuBtn && moreMenuPanel && menuOverlay) {
          // Bind click handlers dynamically after injection
          moreMenuBtn.onclick = function(e) {
            e.preventDefault();
            const isVisible = moreMenuPanel.classList.contains('visible');
            if (isVisible) {
              moreMenuPanel.classList.remove('visible');
              menuOverlay.classList.remove('visible');
            } else {
              moreMenuPanel.classList.add('visible');
              menuOverlay.classList.add('visible');
            }
          };

          menuOverlay.onclick = function() {
            moreMenuPanel.classList.remove('visible');
            menuOverlay.classList.remove('visible');
          };
        }

        // Automatically highlight the correct tab based on the URL path
        const navItems = document.querySelectorAll('.bottom-nav .nav-item, .bottom-nav-bar .nav-item');
        if (navItems.length > 0) {
          navItems.forEach(el => el.classList.remove('active'));
          const path = window.location.pathname.toLowerCase();
          
          if (path.includes('home')) {
            if (navItems[0]) navItems[0].classList.add('active');
          } else if (path.includes('task')) {
            if (navItems[1]) navItems[1].classList.add('active');
          } else if (path.includes('calendar')) {
            if (navItems[2]) navItems[2].classList.add('active');
          } else if (path.includes('communications') || path.includes('message') || path.includes('trip') || path.includes('report') || path.includes('journey')) {
            if (navItems[3]) navItems[3].classList.add('active');
          }
        }
      }
    })
    .catch(err => console.error('Error loading bottom nav:', err));

  // 2. Task Item selection logic (migrated from app.js)
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(item => {
    item.addEventListener('click', function () {
      taskItems.forEach(el => el.classList.remove('task-item-active'));
      this.classList.add('task-item-active');
    });
  });
});