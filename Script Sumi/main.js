// Email form handler for index.html
document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('emailForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailInput = e.target.email.value;
      if (emailInput) {
        document.getElementById('formMessage').textContent = `Thanks for subscribing, ${emailInput}!`;
        e.target.reset();
      }
    });
  }
});
