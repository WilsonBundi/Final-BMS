document.addEventListener('DOMContentLoaded', function () {
    const inventoryBody = document.getElementById('inventoryBody');
  
    // Initial mock data
    let inventory = [
      {
        id: 1,
        bloodType: "A+",
        quantity: 120,
        lastUpdated: "2024-02-20",
        location: "Main Storage",
        status: "Available",
      },
      {
        id: 2,
        bloodType: "B+",
        quantity: 45,
        lastUpdated: "2024-02-20",
        location: "Main Storage",
        status: "Low",
      },
      {
        id: 3,
        bloodType: "O-",
        quantity: 15,
        lastUpdated: "2024-02-20",
        location: "Emergency Storage",
        status: "Critical",
      },
    ];
  
    // Render inventory table
    function renderInventory() {
      inventoryBody.innerHTML = inventory
        .map(
          (item) => `
            <tr>
              <td>${item.bloodType}</td>
              <td>
                ${item.editing ? `
                  <input type="number" value="${item.quantity}" id="edit-${item.id}" />
                ` : item.quantity}
              </td>
              <td>
                <span class="status status-${item.status.toLowerCase()}">
                  ${item.status}
                </span>
              </td>
              <td>${item.location}</td>
              <td>${item.lastUpdated}</td>
              <td class="actions">
                ${item.editing ? `
                  <button onclick="saveQuantity(${item.id})">Save</button>
                ` : `
                  <button onclick="editQuantity(${item.id})">Edit</button>
                `}
              </td>
            </tr>
          `
        )
        .join("");
    }
  
    // Edit quantity
    window.editQuantity = function (id) {
      inventory = inventory.map((item) => ({
        ...item,
        editing: item.id === id ? true : false,
      }));
      renderInventory();
    };
  
    // Save quantity
    window.saveQuantity = function (id) {
      const newQuantity = parseInt(document.getElementById(`edit-${id}`).value);
      if (isNaN(newQuantity) || newQuantity < 0) {
        alert("Invalid quantity. Please enter a valid number greater than or equal to 0.");
        return;
      }
  
      inventory = inventory.map((item) => {
        if (item.id === id) {
          const status =
            newQuantity <= 15
              ? "Critical"
              : newQuantity <= 50
              ? "Low"
              : "Available";
          return {
            ...item,
            quantity: newQuantity,
            status,
            lastUpdated: new Date().toISOString().split("T")[0],
            editing: false,
          };
        }
        return item;
      });
  
      renderInventory();
      alert("Inventory updated successfully.");
    };
  
    // Initial render
    renderInventory();
  });