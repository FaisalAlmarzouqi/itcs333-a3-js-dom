
// ITCS333 Assignment 3 - To-Do App

(() => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    let currentFilter = 'all';

    // Update the counter
    function updateCounter() {
        const items = list.querySelectorAll('li');
        const remaining = [...items].filter(
            item => !item.classList.contains('completed')
        ).length;

        counter.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} left`;
    }

    // Apply the selected filter
    function applyFilter() {
        const items = list.querySelectorAll('li');

        items.forEach(item => {
            const completed = item.classList.contains('completed');

            if (currentFilter === 'active') {
                item.style.display = completed ? 'none' : '';
            } else if (currentFilter === 'done') {
                item.style.display = completed ? '' : 'none';
            } else {
                item.style.display = '';
            }
        });
    }

    // Add a new task
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = input.value.trim();

        if (text === '') {
            errorMsg.classList.remove('hidden');
            errorMsg.style.display = '';
            return;
        }

        errorMsg.classList.add('hidden');

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);

        input.value = '';

        applyFilter();
        updateCounter();
    });

    // Event delegation for completing and deleting tasks
    list.addEventListener('click', (event) => {
        const deleteBtn = event.target.closest('.delete-btn');

        if (deleteBtn && list.contains(deleteBtn)) {
            deleteBtn.closest('li').remove();
            applyFilter();
            updateCounter();
            return;
        }

        const itemText = event.target.closest('.item-text');

        if (itemText && list.contains(itemText)) {
            itemText.closest('li').classList.toggle('completed');
            applyFilter();
            updateCounter();
        }
    });

    // Filter buttons
    document.getElementById('filter-all').addEventListener('click', () => {
        currentFilter = 'all';
        applyFilter();
    });

    document.getElementById('filter-active').addEventListener('click', () => {
        currentFilter = 'active';
        applyFilter();
    });

    document.getElementById('filter-done').addEventListener('click', () => {
        currentFilter = 'done';
        applyFilter();
    });

    updateCounter();
})();
