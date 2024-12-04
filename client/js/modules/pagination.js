// pagination.js

// Fonction pour afficher une page spécifique de la liste
export function afficherPage(liste, page, itemsPerPage, afficherListe) {
    const startIndex = (page - 1) * itemsPerPage; // Calcul de l'index de départ
    const endIndex = startIndex + itemsPerPage; // Calcul de l'index de fin
    const pageItems = liste.slice(startIndex, endIndex); // Extraction des éléments pour la page
    afficherListe(pageItems); // Affiche les éléments de la page courante
}

// Fonction pour générer les boutons de pagination
export function genererPagination(liste, itemsPerPage, afficherPage, afficherListe, currentPage) {
    const pagination = document.getElementById('pagination'); // Sélection du conteneur de pagination
    pagination.innerHTML = ''; // Vide le contenu actuel

    const pageCount = Math.ceil(liste.length / itemsPerPage); // Calcul du nombre total de pages
    const maxButtons = 5; // Nombre maximum de boutons à afficher

    // Bouton pour aller à la première page <<
    const firstButton = document.createElement('button');
    firstButton.innerHTML = '<i class="bi bi-chevron-double-left"></i>';
    firstButton.classList.add('btn', 'btn-outline-primary', 'me-2');
    firstButton.addEventListener('click', () => {
        afficherPage(liste, 1, itemsPerPage, afficherListe);
        genererPagination(liste, itemsPerPage, afficherPage, afficherListe, 1);
    });
    pagination.appendChild(firstButton);

    // Calcul des pages à afficher
    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = Math.min(startPage + maxButtons - 1, pageCount);

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    // Génération des boutons de page
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('btn', 'btn-outline-primary', 'me-2');
        if (i === currentPage) {
            button.classList.add('active'); // Marque la page actuelle
        }
        button.addEventListener('click', () => {
            afficherPage(liste, i, itemsPerPage, afficherListe);
            genererPagination(liste, itemsPerPage, afficherPage, afficherListe, i);
        });
        pagination.appendChild(button);
    }

    // Bouton pour aller à la dernière page >>
    const lastButton = document.createElement('button');
    lastButton.innerHTML = '<i class="bi bi-chevron-double-right"></i>';
    lastButton.classList.add('btn', 'btn-outline-primary');
    lastButton.addEventListener('click', () => {
        afficherPage(liste, pageCount, itemsPerPage, afficherListe);
        genererPagination(liste, itemsPerPage, afficherPage, afficherListe, pageCount);
    });
    pagination.appendChild(lastButton);
}
