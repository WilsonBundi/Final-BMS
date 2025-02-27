document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('donorForm');
    const donorTable = document.getElementById('donorTable').getElementsByTagName('tbody')[0];
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Clear previous errors
      clearErrors();
  
      // Validate form
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const bloodType = document.getElementById('bloodType').value;
      const age = document.getElementById('age').value.trim();
      const weight = document.getElementById('weight').value.trim();
  
      let isValid = true;
  
      if (fullName.length < 2) {
        showError('fullName', 'Name must be at least 2 characters');
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
  
      if (!bloodType) {
        showError('bloodType', 'Please select a blood type');
        isValid = false;
      }
  
      if (isNaN(age) || Number(age) < 18) {
        showError('age', 'Age must be 18 or older');
        isValid = false;
      }
  
      if (isNaN(weight) || Number(weight) < 50) {
        showError('weight', 'Weight must be at least 50 kg');
        isValid = false;
      }
  
      if (isValid) {
        // Add donor to the table
        const newRow = donorTable.insertRow();
        newRow.innerHTML = `
          <td>${fullName}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${bloodType}</td>
          <td>${age}</td>
          <td>${weight}</td>
        `;
  
        // Reset form
        form.reset();
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
      errorMessages.forEach(msg => {
        msg.textContent = '';
        msg.style.display = 'none';
      });
  
      const errorFields = document.querySelectorAll('.error');
      errorFields.forEach(field => field.classList.remove('error'));
    }
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });