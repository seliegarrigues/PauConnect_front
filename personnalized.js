// personnalized.js
import { someFunction } from './dynamic-link.js';

someFunction();

document.addEventListener('DOMContentLoaded', function() {
  // Récupérer les informations de l'utilisateur depuis le localStorage
  const surname = localStorage.getItem('surname');
  const name = localStorage.getItem('name');

  // Sélectionner les éléments nécessaires
  const switchElement = document.getElementById('switch');
  const welcomeElement = document.getElementById('welcome');
  const personalisationTextElement = document.getElementById('personalisationText');

  // Fonction pour mettre à jour le contenu en fonction de l'état du switch
  function updateContent() {
    if (switchElement.checked) {
      if (surname && name) {
        welcomeElement.textContent = `Bienvenue ${surname} ${name}`;
      } else {
        welcomeElement.textContent = 'Bienvenue';
      }
      personalisationTextElement.textContent = 'Les suggestions d\'articles et d\'informations de cette page tiennent compte de vos préférences et de vos favoris, bonne lecture.';
    } else {
      welcomeElement.textContent = 'Bienvenue';
      personalisationTextElement.textContent = 'Personnalisez votre expérience PauConnect et retrouvez des contenus sélectionnés pour vous, adaptés à vos thématiques favorites';
    }
  }

  // Ajouter un gestionnaire d'événements pour le switch
  switchElement.addEventListener('change', updateContent);

  // Appeler la fonction initialement pour définir l'état initial
  updateContent();
});
