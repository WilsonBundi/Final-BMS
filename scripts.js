document.addEventListener('DOMContentLoaded', function () {
    const data = [
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
        labels: data.map(d => d.bloodType),
        datasets: [{
          label: 'Units',
          data: data.map(d => d.units),
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
  });