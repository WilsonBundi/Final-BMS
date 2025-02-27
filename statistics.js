document.addEventListener('DOMContentLoaded', function () {
    // Initialize Chart.js for Blood Type Distribution
    const bloodTypeData = [
      { bloodType: "A+", units: 120 },
      { bloodType: "A-", units: 45 },
      { bloodType: "B+", units: 88 },
      { bloodType: "B-", units: 32 },
      { bloodType: "AB+", units: 25 },
      { bloodType: "AB-", units: 12 },
      { bloodType: "O+", units: 150 },
      { bloodType: "O-", units: 65 },
    ];
  
    const ctx = document.getElementById('bloodTypeChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bloodTypeData.map(d => d.bloodType),
        datasets: [{
          label: 'Units',
          data: bloodTypeData.map(d => d.units),
          backgroundColor: '#3182CE',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
  
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
  
        // Add active class to the clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
      });
    });
  });