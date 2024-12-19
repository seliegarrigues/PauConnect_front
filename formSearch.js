 import file from "./article1.json" with {type:"json"};
 
 
// formSearch.js
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner les éléments nécessaires
  const formSearch = document.getElementById('formSearch');
  const formSearchInput = document.getElementById('formSearchInput');
  const validateSearchButton = document.getElementById('validateSearchButton');
  const lightSection = document.getElementById('light');
  const defaultCards = lightSection.querySelectorAll('.card');
  const articleCardDiv = document.getElementById('articleCard');


  const categories = [
    "marketing", "actualités", "développement web", "design", "ux",
    "expérience utilisateur", "accessibilité", "numérique responsable", "sécurité"
  ];

 
  function saveToLocalStorage(query) {
    let queries = JSON.parse(localStorage.getItem('searchQueries')) || [];
    queries.unshift(query);
    localStorage.setItem('searchQueries', JSON.stringify(queries));
  }

 
  function filterCards(query) {
    const matchingCategories = categories.filter(category => category.includes(query.toLowerCase()));
    console.log(matchingCategories)
    
   
    while (articleCardDiv. firstChild){
      articleCardDiv.removeChild(articleCardDiv.firstChild);
    }

   
    const matchingArticles = file.articles.filter(article => matchingCategories.includes
      (articles.category.toLowerCase())
    );
    if (matchingArticles.length > 0) {
      matchingArticles.forEach (article =>{
        createArticleCard(article);
      });
    } else {

     
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "Aucun résultat trouvé";
      articleCardDiv.appendChild(noResultsMessage);
    }
      
    }

   function createArticleCard(article) {
    const card = document.createElement("div");
    card.className = "card";

    const topCard = document.createElement("div");
    topCard.className = "topCard";
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("aria-label", "vers les details de l'article");
    const title = document.createElement("h6");
    title.textContent = article.title;
    const img = document.createElement("img");
    img.src = article.image;
    img.alt = article.title;
    img.loading = "lazy";
    link.appendChild(title);
    link.appendChild(img);
    topCard.appendChild(link);

    const middleCard = document.createElement("div");
    middleCard.className = "middleCard";
    const description = document.createElement("p");
    description.textContent = article.description;
    middleCard.appendChild(description);

    const lowCard = document.createElement("div");
    lowCard.className = "lowCard";
    const detail1Card = document.createElement("div");
    detail1Card.className = "detail1Card";
    const author = document.createElement("p");
    author.textContent = article.author;
    const authorImg = document.createElement("img");
    authorImg.width = "48";
    authorImg.height = "48";
    authorImg.src = "https://img.icons8.com/color/48/circled-user-male-skin-type-7--v1.png";
    authorImg.alt = "circled-user-male-skin-type-7--v1";
    authorImg.loading = "lazy";
    const readTimeIcon = document.createElement("span");
    readTimeIcon.innerHTML = '<i class="fas fa-clock"></i>';
    const readTime = document.createElement("p");
    readTime.textContent = `${article.readTime} minutes de lecture`;
    detail1Card.appendChild(author);
    detail1Card.appendChild(authorImg);
    detail1Card.appendChild(readTimeIcon);
    detail1Card.appendChild(readTime);

    const detail2Card = document.createElement("div");
    detail2Card.className = "detail2Card";
    const readMoreButton = document.createElement("button");
    readMoreButton.className = "btn-voir-plus";
    readMoreButton.textContent = "Lire la suite";
    const publishDate = document.createElement("p");
    publishDate.textContent = `Publié le ${article.publishDate}`;
    const category = document.createElement("p");
    category.textContent = article.category;
    const likes = document.createElement("span");
    likes.textContent = article.likes;
    const favoriteIcon = document.createElement("span");
    favoriteIcon.innerHTML = '<a href="favoris.html" aria-label="Favoris"><i class="fas fa-star"></i></a>';
    const shareIcon = document.createElement("span");
    shareIcon.innerHTML = '<i class="fas fa-share"></i>';
    detail2Card.appendChild(readMoreButton);
    detail2Card.appendChild(publishDate);
    detail2Card.appendChild(category);
    detail2Card.appendChild(likes);
    detail2Card.appendChild(favoriteIcon);
    detail2Card.appendChild(shareIcon);

    lowCard.appendChild(detail1Card);
    lowCard.appendChild(detail2Card);

    card.appendChild(topCard);
    card.appendChild(middleCard);
    card.appendChild(lowCard);

    articleCardDiv.appendChild(card);
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

  //
  window.addEventListener('beforeunload', function() {
    formSearchInput.value = '';
  });

  // Afficher les 3 cartes par défaut au rechargement de la page
  defaultCards.forEach(card => {
    articleCardDiv.appendChild(card.cloneNode(true));
  });
});
