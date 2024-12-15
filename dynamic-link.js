// dynamic-link.js
export function someFunction() {
  document.addEventListener("DOMContentLoaded", () => {
    // Sélection de tous les liens ayant un attribut href.
    const links = document.querySelectorAll("a[href]");

    // Ajout d'un gestionnaire d'écouteur d'évènements au click
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // Empêche la navigation par défaut du navigateur
        console.log("Vous avez cliqué sur le lien:", link.href); // Affichage de l'URL du lien cliqué

        // Récupère l'URL ciblée
        const url = link.getAttribute("href");

        if (url.startsWith("#")) {
          const target = document.querySelector(url); // Récupération de l'élément ciblé

          if (target) {
            // Vérification de l'existence de l'élément ciblé
            target.scrollIntoView({ behavior: "smooth" }); // Scroll vers le ciblé en utilisant la méthode scrollIntoView
            console.log("Scroll vers l'élément:", url);
          } else {
            showMessage('La section demandée est introuvable.');
            console.log("Redirection vers 404.html");
            window.location.href = '404.html'; // Redirection vers la page 404
          }
        } else {
          console.log(`Redirection vers : ${url}`);

          if (url.startsWith('http') && !url.includes(window.location.hostname)) {
            console.log("Ouverture dans un nouvel onglet:", url);
            window.open(url, '_blank');
          } else {
            console.log("Redirection vers:", url);
            window.location.href = url;
          }

          if (link.classList.contains('restricted') && !userIsLoggedIn) {
            showMessage('Veuillez vous connecter pour accéder à cette page.');
            console.log("Redirection vers connexion.html");
            window.location.href = 'connexion.html'; // Redirection vers la page de connexion
          }
        }
      });
    });

    // Base des URLs des réseaux sociaux
    const socialMediaLinks = {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      youtube: "https://www.youtube.com/",
      linkedin: "https://www.linkedin.com/"
    };

    // Sélectionne tous les liens avec l'attribut data-platform
    const platformLinks = document.querySelectorAll("[data-platform]");

    // Parcourt les liens
    platformLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const platform = link.getAttribute("data-platform").toLowerCase();

        if (!confirm(`Voulez-vous visiter notre page ${platform.toUpperCase()}?`)) {
          event.preventDefault(); // Empêche la navigation par défaut du navigateur
        } else {
          if (socialMediaLinks[platform]) {
            link.setAttribute("href", socialMediaLinks[platform]);
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer"); // Améliore la sécurité
            console.log("Redirection vers:", socialMediaLinks[platform]);
          } else {
            console.warn(`Aucune URL configurée pour: ${platform}`);
          }
        }
      });
    });

    const spaceBlocks = document.querySelectorAll(".space-block");

    spaceBlocks.forEach((block) => {
      block.addEventListener("click", (event) => {
        const url = block.getAttribute("data-href");
        if (url) {
          console.log("Redirection vers:", url);
          window.location.href = url;
        }
      });
    });

    // Sélection de tous les boutons dans la section category
    const categoryButtons = document.querySelectorAll(".category button");

    // Ajout d'un gestionnaire d'écouteur d'évènements au click
    categoryButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const url = button.getAttribute("data-href");
        if (url) {
          console.log("Redirection vers:", url);
          window.location.href = url;
        }
      });
    });
  });

  // Récupérer les valeurs du localStorage
  let storageToken = localStorage.getItem('token');
  let storageSession = localStorage.getItem('session');
  let storageExpiresAt = localStorage.getItem('expiresAt');

  // Vérifier si les valeurs existent
  if (storageToken && storageSession && storageExpiresAt) {
    // Convertir storageExpiresAt en objet Date
    let expiresAt = new Date(storageExpiresAt);

    // Vérifier si le jeton est toujours valide
    if (expiresAt > new Date()) {
      console.log('Le jeton est toujours valide.');
      // Utiliser le jeton pour authentifier l'utilisateur
    } else {
      console.log('Le jeton a expiré.');
      // Rediriger l'utilisateur vers la page de connexion ou renouveler le jeton
    }
  } else {
    console.log('Aucune session active trouvée.');
    // Rediriger l'utilisateur vers la page de connexion
  }
}

function showMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.position = 'fixed';
  messageElement.style.top = '10px';
  messageElement.style.left = '50%';
  messageElement.style.transform = 'translateX(-50%)';
  messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  messageElement.style.color = 'white';
  messageElement.style.padding = '10px';
  messageElement.style.borderRadius = '5px';
  messageElement.style.zIndex = '1000';

  document.body.appendChild(messageElement);

  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 3000); // Le message disparaît après 3 secondes
}
