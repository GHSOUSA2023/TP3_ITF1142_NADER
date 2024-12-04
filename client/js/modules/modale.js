// modale.js

// Fonction pour ouvrir la modale d'ajout d'un nouveau cocktail
export const ouvrirModaleAjouter = () => {
    document.getElementById('formulaire').reset(); // Réinitialise le formulaire
    document.getElementById('modalLabel').innerText = 'Ajouter'; // Change le titre de la modale
    document.getElementById('id').value = ''; // Vide le champ caché de l'ID
    const modal = new bootstrap.Modal(document.getElementById('modal_ajouter')); // Crée une instance de la modale Bootstrap
    modal.show(); // Affiche la modale
};

// Fonction pour ouvrir la modale de modification d'un cocktail existant
export const ouvrirModaleModifier = (listeCocktails, id) => {
    let cocktail = listeCocktails.find(cocktail => cocktail.id == id); // Trouve le cocktail correspondant à l'ID
    if (cocktail) {
        // Remplit les champs du formulaire avec les données du cocktail
        document.getElementById('nom').value = cocktail.nom;
        document.getElementById('type').value = cocktail.type;
        document.getElementById('ingredients').value = cocktail.ingredients.join(', ');
        document.getElementById('prix').value = cocktail.prix.toFixed(2);
        document.getElementById('image').value = cocktail.image;
        document.getElementById('id').value = cocktail.id; // Définit l'ID dans le champ caché

        document.getElementById('modalLabel').innerText = 'Modifier'; // Change le titre de la modale
        const modal = new bootstrap.Modal(document.getElementById('modal_ajouter')); // Crée une instance de la modale Bootstrap
        modal.show(); // Affiche la modale
    } else {
        alert('Cocktail introuvable'); // Message d'erreur si le cocktail n'est pas trouvé
    }
};
