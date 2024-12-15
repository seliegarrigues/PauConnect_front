// formSearch.js
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner les éléments nécessaires
  const formSearch = document.getElementById('formSearch');
  const formSearchInput = document.getElementById('formSearchInput');
  const validateSearchButton = document.getElementById('validateSearchButton');
  const lightSection = document.getElementById('light');
  const defaultCards = lightSection.querySelectorAll('.card');
  const articleCardDiv = document.getElementById('articleCard');

  // Catégories de filtrage
  const categories = [
    "marketing", "actualités", "développement web", "design", "ux",
    "expérience utilisateur", "accessibilité", "numérique responsable", "sécurité"
  ];

  // Fonction pour sauvegarder les données dans le localStorage
  function saveToLocalStorage(query) {
    let queries = JSON.parse(localStorage.getItem('searchQueries')) || [];
    queries.push(query);
    localStorage.setItem('searchQueries', JSON.stringify(queries));
  }

  // Fonction pour filtrer les cartes en fonction des mots tapés
  function filterCards(query) {
    const matchingCategories = categories.filter(category => category.includes(query.toLowerCase()));
    if (matchingCategories.length > 0) {
      // Supprimer les anciens résultats
      while (articleCardDiv.firstChild) {
        articleCardDiv.removeChild(articleCardDiv.firstChild);
      }

      // Afficher les cartes correspondantes
      defaultCards.forEach(card => {
        if (matchingCategories.some(category => card.textContent.toLowerCase().includes(category))) {
          articleCardDiv.appendChild(card.cloneNode(true));
        }
      });
    } else {
      // Supprimer les anciens résultats
      while (articleCardDiv.firstChild) {
        articleCardDiv.removeChild(articleCardDiv.firstChild);
      }

      // Afficher le message "aucun résultat trouvé"
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "Aucun résultat trouvé";
      articleCardDiv.appendChild(noResultsMessage);

      // Afficher les 3 cartes par défaut
      defaultCards.forEach(card => {
        articleCardDiv.appendChild(card.cloneNode(true));
      });
    }
  }

  // Fonction pour suggérer des mots en fonction des lettres tapées
  function suggestWords(query) {
    const queries = JSON.parse(localStorage.getItem('searchQueries')) || [];
    const suggestions = queries.filter(q => q.includes(query.toLowerCase()));
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
  const savedQueries = JSON.parse(localStorage.getItem('searchQueries')) || [];
  if (savedQueries.length > 0) {
    const lastQuery = savedQueries[savedQueries.length - 1];
    formSearchInput.value = lastQuery;
    filterCards(lastQuery);
  }

  // Effacer la donnée inscrite dans l'input précédemment au rechargement de la page
  window.addEventListener('beforeunload', function() {
    formSearchInput.value = '';
  });

  // Afficher les 3 cartes par défaut au rechargement de la page
  defaultCards.forEach(card => {
    articleCardDiv.appendChild(card.cloneNode(true));
  });
});
