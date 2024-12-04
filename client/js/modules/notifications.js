// notifications.js

export const afficherToast = (message, type = 'info', titre = 'Notification', avecConfirmation = false, callbackConfirmation = null) => {
    const toastElement = document.getElementById('toastMessage'); // Sélection de l'élément du toast
    const toastTitle = document.getElementById('toastTitle'); // Sélection du titre du toast
    const messageContent = document.getElementById('messageContent'); // Sélection du contenu du message
    const btnConfirmer = document.getElementById('btnConfirmer'); // Bouton "Confirmer"
    const btnAnnuler = document.getElementById('btnAnnuler'); // Bouton "Annuler"

    // Mise à jour du contenu du message
    messageContent.textContent = message;

    // Mise à jour du titre de la notification
    toastTitle.textContent = titre;

    // Application des styles en fonction du type de message
    toastElement.className = 'toast'; // Réinitialisation des classes
    if (type === 'success') {
        toastElement.classList.add('bg-success', 'text-white');
    } else if (type === 'error') {
        toastElement.classList.add('bg-danger', 'text-white');
    } else if (type === 'warning') {
        toastElement.classList.add('bg-warning', 'text-dark');
    } else {
        toastElement.classList.add('bg-info', 'text-white');
    }

    // Gestion de l'affichage des boutons de confirmation
    if (avecConfirmation) {
        // Affiche les boutons "Confirmer" et "Annuler"
        btnConfirmer.style.display = 'inline-block';
        btnAnnuler.style.display = 'inline-block';

        // Ajoute les événements aux boutons
        btnConfirmer.onclick = () => {
            if (callbackConfirmation) callbackConfirmation(); // Appelle la fonction de confirmation si elle est définie
            hideToast(); // Cache le toast après confirmation
        };

        btnAnnuler.onclick = hideToast; // Cache le toast si l'utilisateur annule
    } else {
        // Cache les boutons si aucune confirmation n'est nécessaire
        btnConfirmer.style.display = 'none';
        btnAnnuler.style.display = 'none';
    }

    // Affiche le toast
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
};

// Fonction pour cacher le toast
export const hideToast = () => {
    const toastElement = document.getElementById('toastMessage');
    const toast = new bootstrap.Toast(toastElement);
    toast.hide();
};
