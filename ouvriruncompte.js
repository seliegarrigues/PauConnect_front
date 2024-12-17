document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close');
    const modal = document.getElementById('modal');

    // Fonction pour ouvrir la modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Fonction pour fermer la modal et rediriger vers index.html
    function closeModal() {
        modal.style.display = 'none';
        window.location.href = 'index.html';
    }

    // Ajouter un écouteur d'événement pour ouvrir la modal
    openModalBtn.addEventListener('click', openModal);

    // Ajouter un écouteur d'événement pour fermer la modal
    closeModalBtn.addEventListener('click', closeModal);

    // Fonction pour vérifier si les mots de passe correspondent
    function checkPasswords() {
        const passwordInput = document.getElementById('password');
        const passwordConfirmationInput = document.getElementById('passwordconfirmation');
        const passwordError = document.getElementById('passwordconfirmation_error');

        if (passwordInput.value ===''&& passwordConfirmationInput.value ==='') {
            passwordError.textContent = 'Les champs de mot de passe ne peuvent pas être vide';
            passwordError.style.color = 'red';
        } else if(passwordInput.value === passwordConfirmationInput.value) {
            passwordError.textContent = 'OK';
            passwordError.style.color = 'green';
        }
         else {
            passwordError.textContent = 'Votre confirmation de mot de passe n\'est pas identique à votre mot de passe';
            passwordError.style.color = 'red';
        }
    }

    // Ajouter un écouteur d'événement pour la vérification des mots de passe
    const passwordConfirmationInput = document.getElementById('passwordconfirmation');
    passwordConfirmationInput.addEventListener('input', checkPasswords);

    // Fonction pour afficher ou masquer le mot de passe
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

    // Fonction pour sauvegarder les données dans le localStorage
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

    // Ajouter un écouteur d'événement pour la soumission du formulaire
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher la soumission du formulaire
        checkPasswords();
        saveDataToLocalStorage();
    });

    // Remplir les champs avec les données du localStorage si disponibles
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

    // Appeler la fonction pour remplir le formulaire au chargement de la page
    fillFormFromLocalStorage();
});

