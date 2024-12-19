
import { someFunction } from './dynamic-link.js';

someFunction();

document.addEventListener('DOMContentLoaded', function() {
 
  const surname = localStorage.getItem('surname');
  const name = localStorage.getItem('name');

  
  const switchElement = document.getElementById('switch');
  const welcomeElement = document.getElementById('welcome');
  const personalisationTextElement = document.getElementById('personalisationText');

  
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

  
  switchElement.addEventListener('change', updateContent);


  updateContent();
});
