document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('hospitalForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate form
    const hospitalName = document.getElementById('hospitalName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const licenseNumber = document.getElementById('licenseNumber').value.trim();
    const contactPerson = document.getElementById('contactPerson').value.trim();
    const emergencyPhone = document.getElementById('emergencyPhone').value.trim();

    let isValid = true;

    if (hospitalName.length < 2) {
      showError('hospitalName', 'Hospital name must be at least 2 characters');
      isValid = false;
    }

    if (!validateEmail(email)) {
      showError('email', 'Invalid email address');
      isValid = false;
    }

    if (phone.length < 10) {
      showError('phone', 'Phone number must be at least 10 digits');
      isValid = false;
    }

    if (address.length < 10) {
      showError('address', 'Address must be at least 10 characters');
      isValid = false;
    }

    if (licenseNumber.length < 5) {
      showError('licenseNumber', 'License number must be at least 5 characters');
      isValid = false;
    }

    if (contactPerson.length < 2) {
      showError('contactPerson', 'Contact person name must be at least 2 characters');
      isValid = false;
    }

    if (emergencyPhone.length < 10) {
      showError('emergencyPhone', 'Emergency phone must be at least 10 digits');
      isValid = false;
    }

    if (isValid) {
      // Prepare data for submission
      const formData = {
        hospitalName,
        email,
        phone,
        address,
        licenseNumber,
        contactPerson,
        emergencyPhone,
      };

      // Submit form data to the backend API
      submitFormData(formData);
    }
  });

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMessage = field.parentElement.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    field.classList.add('error');
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => {
      msg.textContent = '';
      msg.style.display = 'none';
    });

    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach((field) => field.classList.remove('error'));
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }




  // Extract query parameters from the URL
const params = new URLSearchParams(window.location.search);

// Convert query parameters to an object
const hospitalData = {
    hospitalName: params.get('hospitalName'),
    email: params.get('email'),
    phone: params.get('phone'),
    address: params.get('address'),
    licenseNumber: params.get('licenseNumber'),
    contactPerson: params.get('contactPerson'),
    emergencyPhone: params.get('emergencyPhone')
};

// Send the data to the backend
fetch('http://127.0.0.1:5500/add-hospital', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(hospitalData)
})
.then(response => response.text())
.then(message => {
    console.log(message); // Log the response from the server
})
.catch(error => {
    console.error('Error:', error);
});

  function submitFormData(formData) {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        alert('Hospital registered successfully!');
        form.reset(); // Reset the form
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error registering hospital. Please try again.');
      });
  }
});

