document.addEventListener('DOMContentLoaded', function () {
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(item => {
    item.addEventListener('click', function () {
      taskItems.forEach(el => el.classList.remove('task-item-active'));
      this.classList.add('task-item-active');
    });
  });
});
