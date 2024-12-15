async function fetchBusinessCards() {
    const apiUrl = 'https://entreprise.data.gouv.fr/api/sirene/v3.11/etablissements'; // API Sirene
    try {
      const response = await fetch(`${apiUrl}?code_postal=64000`);
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
  
      // Mappage des données pour correspondre au format attendu
      return data.etablissements.map(etablissement => ({
        category: etablissement.libelle_naf || "Non spécifié",
        name: etablissement.nom_raison_sociale || "Nom inconnu",
        logo: "https://via.placeholder.com/150", // Image par défaut
        description: etablissement.activite_principale || "Description non disponible",
        moreInfoUrl: `https://entreprise.data.gouv.fr/etablissement/${etablissement.siret}`
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des entreprises :', error);
      return [];
    }
  }
  
  function displayBusinessCards(businesses) {
    const businessCardsContainer = document.getElementById('businessCards');
    businessCardsContainer.innerHTML = ''; // Efface le contenu existant
  
    businesses.forEach(business => {
      const businessCard = document.createElement('div');
      businessCard.classList.add('businessCard', 'card', 'p-3', 'shadow-sm');
      businessCard.style.width = '18rem';
  
      const category = document.createElement('div');
      category.classList.add('cat', 'mb-2', 'fw-bold');
      category.textContent = `Catégorie d'activité : ${business.category}`;
  
      const identity = document.createElement('div');
      identity.classList.add('identity', 'text-center');
  
      const name = document.createElement('h6');
      name.textContent = business.name;
  
      const logo = document.createElement('img');
      logo.src = business.logo;
      logo.alt = `Logo de ${business.name}`;
      logo.classList.add('img-fluid', 'rounded', 'mb-2');
  
      identity.appendChild(name);
      identity.appendChild(logo);
  
      const description = document.createElement('p');
      description.classList.add('middleCard', 'text-muted');
      description.textContent = business.description;
  
      const lowCard = document.createElement('div');
      lowCard.classList.add('lowCard2', 'd-flex', 'justify-content-around', 'mt-3');
  
      const enSavoirPlus = document.createElement('button');
      enSavoirPlus.textContent = 'En Savoir Plus';
      enSavoirPlus.classList.add('btn', 'btn-primary');
      enSavoirPlus.addEventListener('click', () => {
        window.location.href = business.moreInfoUrl; // URL vers plus d'informations
      });
  
      const commenter = document.createElement('a');
      commenter.href = '#';
      commenter.innerHTML = '<i class="fas fa-comment-alt"></i>';
      commenter.classList.add('text-secondary', 'fs-5');
  
      const favoris = document.createElement('a');
      favoris.href = '#';
      favoris.innerHTML = '<i class="fas fa-star"></i>';
      favoris.classList.add('text-warning', 'fs-5');
  
      const partager = document.createElement('a');
      partager.href = '#';
      partager.innerHTML = '<i class="fas fa-share-alt"></i>';
      partager.classList.add('text-secondary', 'fs-5');
  
      lowCard.appendChild(enSavoirPlus);
      lowCard.appendChild(commenter);
      lowCard.appendChild(favoris);
      lowCard.appendChild(partager);
  
      businessCard.appendChild(category);
      businessCard.appendChild(identity);
      businessCard.appendChild(description);
      businessCard.appendChild(lowCard);
  
      businessCardsContainer.appendChild(businessCard);
    });
  }
  
  // Appeler les fonctions au chargement de la page
  document.addEventListener("DOMContentLoaded", async () => {
    const businesses = await fetchBusinessCards();
    displayBusinessCards(businesses);
  });
  