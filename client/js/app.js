// app.js
import { afficherListe } from './modules/affichage.js'; // Importation du module pour afficher la liste
import { afficherPage, genererPagination } from './modules/pagination.js'; // Modules pour la pagination
import { ouvrirModaleAjouter, ouvrirModaleModifier } from './modules/modale.js'; // Modules pour les modales
import { fetchListe, supprimer, ajouter, modifier } from './modules/api.js'; // Modules pour les requêtes API
import { afficherToast } from './modules/notifications.js'; // Module pour les notifications

document.addEventListener('DOMContentLoaded', async () => {
    let liste = await fetchListe(); // Récupération initiale de la liste des cocktails

    const itemsPerPage = 5; // Nombre d'éléments par page
    let currentPage = 1; // Page actuelle

    afficherPage(liste, currentPage, itemsPerPage, afficherListe); // Affichage de la première page
    genererPagination(liste, itemsPerPage, afficherPage, afficherListe, currentPage); // Génération de la pagination

    // Événement pour ouvrir la modale d'ajout
    document.getElementById('btnAjouter').addEventListener('click', ouvrirModaleAjouter);

    // Événement pour les boutons de modification et suppression
    document.getElementById('container_cocktails').addEventListener('click', (e) => {
        const button = e.target.closest('button'); // Récupérer le bouton cliqué
        if (!button) return;

        const id = button.dataset.id; // Récupérer l'ID depuis l'attribut data-id
        if (!id) return;

        if (button.classList.contains('btn-modifier')) {
            // Si le bouton est "Modifier"
            ouvrirModaleModifier(liste, id); // Ouvrir la modale de modification avec les données du cocktail
        } else if (button.classList.contains('btn-supprimer')) {
            // Si le bouton est "Supprimer"
            afficherToast(
                'Êtes-vous sûr de vouloir supprimer cet élément ?',
                'warning',
                'Confirmation',
                true,
                async () => {
                    const success = await supprimer(id); // Appeler la fonction pour supprimer le cocktail
                    if (success) {
                        // Mettre à jour la liste locale en filtrant le cocktail supprimé
                        liste = liste.filter(item => item.id !== parseInt(id));
                        afficherPage(liste, currentPage, itemsPerPage, afficherListe); // Mettre à jour l'affichage
                        genererPagination(liste, itemsPerPage, afficherPage, afficherListe, currentPage);
                        afficherToast('Suppression réussie', 'success'); // Afficher une notification de succès
                    } else {
                        afficherToast('Erreur lors de la suppression', 'error'); // Afficher une notification d'erreur
                    }
                }
            );
        }
    });

    // Événement pour la soumission du formulaire d'ajout/modification
    document.getElementById('formulaire').addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        const id = document.getElementById('id').value;
        const nom = document.getElementById('nom').value;
        const type = document.getElementById('type').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(i => i.trim());
        const prix = parseFloat(document.getElementById('prix').value);
        const image = document.getElementById('image').value;

        const element = { id: id ? parseInt(id) : Date.now(), nom, type, ingredients, prix, image };

        if (id) {
            // Si un ID est présent, c'est une modification
            const success = await modifier(id, element);
            if (success) {
                const index = liste.findIndex(item => item.id === parseInt(id));
                if (index !== -1) {
                    liste[index] = element; // Mettre à jour le cocktail dans la liste locale
                    afficherPage(liste, currentPage, itemsPerPage, afficherListe); // Mettre à jour l'affichage
                    genererPagination(liste, itemsPerPage, afficherPage, afficherListe, currentPage);
                }
                afficherToast('Modification réussie', 'success'); // Notification de succès
            } else {
                afficherToast('Erreur lors de la modification', 'error'); // Notification d'erreur
            }
        } else {
            // Sinon, c'est un ajout
            const success = await ajouter(element);
            if (success) {
                liste.push(element); // Ajouter le nouveau cocktail à la liste locale
                afficherPage(liste, currentPage, itemsPerPage, afficherListe); // Mettre à jour l'affichage
                genererPagination(liste, itemsPerPage, afficherPage, afficherListe, currentPage);
                afficherToast('Ajout réussi', 'success'); // Notification de succès
            } else {
                afficherToast('Erreur lors de l\'ajout', 'error'); // Notification d'erreur
            }
        }

        // Fermer la modale
        const modal = bootstrap.Modal.getInstance(document.getElementById('modal_ajouter'));
        modal.hide();
    });
});
