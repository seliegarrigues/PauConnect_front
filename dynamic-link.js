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
          } else {
            alert('La section demandée est introuvable.');
            window.location.href = '/404.html';
          }
        } else {
          console.log(`Redirection vers : ${url}`);
  
          if (url.startsWith('http') && !url.includes(window.location.hostname)) {
            window.open(url, '_blank');
          } else {
            window.location.href = url;
          }
  
          if (link.classList.contains('restricted') && !userIsLoggedIn) {
            alert('Veuillez vous connecter pour accéder à cette page.');
            window.location.href = '/login.html';
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
          } else {
            console.warn(`Aucune URL configurée pour: ${platform}`);
          }
        }
      });
    });
const spaceBlocks = document.querySelectorAll(".space-block");

  spaceBlocks.forEach((block) => {
    block.addEventListener("click",(event) => {
        const url = block.getAttribute("data-href");
        if (url) {
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
         window.location.href = url;
       }
     });
   });
});