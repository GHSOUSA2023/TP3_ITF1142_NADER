// affichage.js

// Fonction pour afficher la liste des cocktails
export const afficherListe = (liste) => {
    const container = document.getElementById('container_cocktails'); // Sélection du conteneur principal
    container.innerHTML = ''; // On vide le conteneur avant de le remplir

    // Parcours de chaque cocktail dans la liste
    liste.forEach(({ id, nom, type, ingredients, prix, image }, index) => {
        const backgroundClass = index % 2 === 0 ? 'bg-light' : 'bg-white'; // Alternance des couleurs de fond pour les cartes

        // Création du code HTML pour une carte de cocktail
        const card = `
            <div class="col-md-12 mb-4">
                <div class="card card-horizontal ${backgroundClass}">
                    <img src="${image}" class="card-img-left" alt="${nom}">
                    <div class="card-body">
                        <h5 class="card-title">${nom}</h5>
                        <p class="card-text">Type: ${type}</p>
                        <p class="card-text">Ingrédients: ${ingredients.join(', ')}</p>
                        <p class="card-text">Prix: $${prix.toFixed(2)}</p>
                    </div>
                    <div class="buttons">
                        <!-- Bouton Modifier -->
                        <button class="btn btn-outline-primary btn-modifier me-2" data-id="${id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <!-- Bouton Supprimer -->
                        <button class="btn btn-outline-danger btn-supprimer" data-id="${id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        // Ajout de la carte au conteneur
        container.innerHTML += card;
    });
};
