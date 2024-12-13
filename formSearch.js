// formSearch.js

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments nécessaires
    const formSearch = document.getElementById('formSearch');
    const formSearchInput = document.getElementById('formSearchInput');
    const validateSearchButton = document.getElementById('validateSearchButton');
    const lightSection = document.getElementById('light');
    const defaultCards = lightSection.querySelectorAll('.card');
  
    // Catégories de filtrage
    const categories = [
      "marketing", "actualités", "développement web", "design", "ux",
      "expérience utilisateur", "accessibilité", "numérique responsable", "sécurité"
    ];
  
    // Fonction pour sauvegarder les données dans le localStorage
    function saveToLocalStorage(query) {
      localStorage.setItem('searchQuery', query);
    }
  
    // Fonction pour filtrer les cartes en fonction des mots tapés
    function filterCards(query) {
      const matchingCategories = categories.filter(category => category.includes(query.toLowerCase()));
      if (matchingCategories.length > 0) {
        defaultCards.forEach(card => card.style.display = 'none');
        matchingCategories.forEach(category => {
          const matchingCard = Array.from(defaultCards).find(card => card.textContent.toLowerCase().includes(category));
          if (matchingCard) {
            matchingCard.style.display = 'block';
          }
        });
      } else {
        defaultCards.forEach(card => card.style.display = 'none');
        lightSection.innerHTML += '<p>Aucun résultat trouvé</p>';
      }
    }
  
    // Fonction pour suggérer des mots en fonction des lettres tapées
    function suggestWords(query) {
      const suggestions = categories.filter(category => category.includes(query.toLowerCase()));
      // Afficher les suggestions (vous pouvez personnaliser cette partie en fonction de votre interface utilisateur)
      console.log('Suggestions:', suggestions);
    }
  
    // Gestionnaire d'événements pour le bouton et la touche Entrée
    function handleSearch(event) {
      event.preventDefault();
      const query = formSearchInput.value.trim();
      if (query) {
        saveToLocalStorage(query);
        filterCards(query);
      }
    }
  
    // Gestionnaire d'événements pour l'input
    function handleInputChange(event) {
      const query = event.target.value.trim();
      suggestWords(query);
    }
  
    // Ajouter les gestionnaires d'événements
    formSearch.addEventListener('submit', handleSearch);
    formSearchInput.addEventListener('input', handleInputChange);
    validateSearchButton.addEventListener('click', handleSearch);
  
    // Restaurer les données de l'input depuis le localStorage si disponible
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      formSearchInput.value = savedQuery;
      filterCards(savedQuery);
    }
  });
  