document.addEventListener('DOMContentLoaded', function() {
    const menuSection = document.getElementById('menu');

    fetch('/api/menu')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load menu');
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.innerHTML = `<strong>${item.name}</strong> - $${item.price}`;
                menuSection.appendChild(menuItem);
            });
        })
        .catch(error => {
            console.error('Error loading menu items:', error);
            menuSection.innerHTML = '<p>Error loading menu items.</p>';
        });

    // Simplified event listener setup
    setupOrderForm();
    setupAddMenuItemForm();
});

function setupOrderForm() {
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(orderForm);
            const items = {};
            formData.forEach((value, key) => {
                if (value) items[key] = value;
            });

            fetch('/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items })
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to place order');
                return response.json();
            })
            .then(data => alert('Order placed! Order ID: ' + data.order_id))
            .catch(error => console.error('Error placing order:', error));
        });
    }
}

function setupAddMenuItemForm() {
    document.getElementById('addMenuItemForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const itemsToAdd = [
            { name: "Sandwich Durum", price: 30 },
            { name: "Sandwich Durum Double", price: 60 },
            { name: "Arabian Plate Small", price: 50 },
            { name: "Arabian Plate Large", price: 75 },
            { name: "French Fries", price: 40 }
        ];

        itemsToAdd.forEach(item => {
            fetch('/api/menu/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add menu item');
                return response.json();
            })
            .then(data => console.log('Item added:', data.message))
            .catch(error => console.error('Error adding menu item:', error));
        });
    });
}

function enterWithoutLogin() {
    // Redirect to index page or any other desired page without authentication
    window.location.href = "/index";
}
