document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close');
    const modal = document.getElementById('modal');

   
    function openModal() {
        modal.style.display = 'block';
    }

    
    function closeModal() {
        modal.style.display = 'none';
        window.location.href = 'index.html';
    }


    openModalBtn.addEventListener('click', openModal);

    
    closeModalBtn.addEventListener('click', closeModal);

   
    function checkPasswords() {
        const passwordInput = document.getElementById('password');
        const passwordConfirmationInput = document.getElementById('passwordconfirmation');
        const passwordError = document.getElementById('passwordconfirmation_error');
        let myBool = false
        if (passwordInput.value ===''&& passwordConfirmationInput.value ==='') {
            passwordError.textContent = 'Les champs de mot de passe ne peuvent pas être vide';
            passwordError.style.color = 'red';
        } else if(passwordInput.value === passwordConfirmationInput.value) {
            passwordError.textContent = 'OK';
            passwordError.style.color = 'green';
            myBool= true;
        }
         else {
            passwordError.textContent = 'Votre confirmation de mot de passe n\'est pas identique à votre mot de passe';
            passwordError.style.color = 'red';
        }
        return myBool;
    }

   
    const passwordConfirmationInput = document.getElementById('passwordconfirmation');
    passwordConfirmationInput.addEventListener('input', checkPasswords);

   
    function togglePasswordVisibility(input, icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Ajouter des écouteurs d'événements pour les icônes de l'œil
    const togglePasswordIcon = document.getElementById('togglePassword');
    const togglePasswordConfirmationIcon = document.getElementById('togglePasswordConfirmation');
    const passwordInput = document.getElementById('password');

    togglePasswordIcon.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, togglePasswordIcon);
    });

    togglePasswordConfirmationIcon.addEventListener('click', function() {
        togglePasswordVisibility(passwordConfirmationInput, togglePasswordConfirmationIcon);
    });

  
    function saveDataToLocalStorage() {
        const rememberMeCheckbox = document.getElementById('rememberMe');
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('surname', document.getElementById('surname').value);
            localStorage.setItem('name', document.getElementById('name').value);
            localStorage.setItem('email', document.getElementById('email').value);
        } else {
            localStorage.removeItem('surname');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
        }
    }

 
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let validity = checkPasswords();
        if(validity){
            saveDataToLocalStorage();
        }
        
    
    });

   
    function fillFormFromLocalStorage() {
        if (localStorage.getItem('surname')) {
            document.getElementById('surname').value = localStorage.getItem('surname');
        }
        if (localStorage.getItem('name')) {
            document.getElementById('name').value = localStorage.getItem('name');
        }
        if (localStorage.getItem('email')) {
            document.getElementById('email').value = localStorage.getItem('email');
        }
    }


    fillFormFromLocalStorage();
});

