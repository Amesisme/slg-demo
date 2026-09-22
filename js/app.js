let customers = [];
let orders = [];

async function loadData() {
    const customerResponse = await fetch("data/customers.json");
    customers = await customerResponse.json();

    const orderResponse = await fetch("data/orders.json");
    orders = await orderResponse.json();

    displayCustomers(customers);
}

function displayCustomers(customerList) {
    const customerContainer = document.getElementById("customerList");

    customerContainer.innerHTML = "";

    customerList.forEach(customer => {
        const customerOrders = orders.filter(
            order => order.customerId === customer.id
        );

        const customerCard = document.createElement("div");

        customerCard.className = "customer-card";

        customerCard.innerHTML = `
            <h2>${customer.name}</h2>
            <p><strong>Phone:</strong> ${customer.phone}</p>
            <p><strong>Address:</strong> ${customer.address}</p>
            <p><strong>Alternative Address:</strong> ${customer.alternativeAddress}</p>
            <p><strong>Orders:</strong> ${customerOrders.length}</p>
        `;

        customerContainer.appendChild(customerCard);
    });
}

function searchCustomers() {
    const searchValue = document
        .getElementById("customerSearch")
        .value
        .toLowerCase();

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchValue)
    );

    displayCustomers(filteredCustomers);
}

loadData();
