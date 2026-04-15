document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    // form exists check
    if (!contactForm) {
        console.error("ფორმა ID-ით 'contact-form' ვერ მოიძებნა!");
        return;
    }

    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    // 1. password hide/show functionality
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', () => {
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // 2. form validation on submit
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("ღილაკს დაეჭირა, ვალიდაცია დაიწყო...");

        let isValid = true;
        const username = document.getElementById('username');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const message = document.getElementById('message');

        const showError = (input, msg) => {
            input.classList.add('invalid');
            const errorElement = input.parentElement.querySelector('.error-text');
            if (errorElement) errorElement.innerText = msg;
            isValid = false;
        };

        const showSuccess = (input) => {
            input.classList.remove('invalid');
            input.classList.add('valid');
            const errorElement = input.parentElement.querySelector('.error-text');
            if (errorElement) errorElement.innerText = "";
        };

        // field validations
        const nameRegex = /^[a-zA-Zა-ჰ\s]+$/; 
        if (username.value.trim() === "") {
            showError(username, "სახელის ველი ცარიელია");
        } else if (!nameRegex.test(username.value.trim())) {
            showError(username, "მხოლოდ ასოები");
        } else { showSuccess(username); }

        const phoneRegex = /^5\d{8}$/; 
        if (!phoneRegex.test(phone.value.trim())) {
            showError(phone, "ფორმატი: 5XXXXXXXX");
        } else { showSuccess(phone); }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, "არასწორი მეილი");
        } else { showSuccess(email); }

        if (password.value.length < 6) {
            showError(password, "მინ. 6 სიმბოლო");
        } else { showSuccess(password); }

        if (message.value.trim().length < 10) {
            showError(message, "მინ. 10 სიმბოლო");
        } else { showSuccess(message); }

        // if all fields are valid, show success message
        if (isValid) {
            console.log("ფორმა ვალიდურია!");
            const successMsg = document.getElementById('form-success');
            if (successMsg) {
                successMsg.style.display = 'block';
                successMsg.textContent = "წარმატებით გაიგზავნა!";
                contactForm.reset();
                [username, phone, email, password, message].forEach(el => el.classList.remove('valid'));
                setTimeout(() => { successMsg.style.display = 'none'; }, 3000);
            }
        }
    });
});