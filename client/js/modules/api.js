// api.js

// Fonction pour récupérer la liste des cocktails depuis le serveur
export const fetchListe = async () => {
    try {
        const response = await fetch('http://localhost:3000/liste'); // Requête GET vers le serveur
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json(); // Conversion de la réponse en JSON
        return data; // Retourne la liste des cocktails
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        return [];
    }
};

// Fonction pour ajouter un nouveau cocktail
export const ajouter = async (element) => {
    try {
        const response = await fetch('http://localhost:3000/liste', {
            method: 'POST', // Méthode POST pour ajouter
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(element), // Les données du nouveau cocktail en format JSON
        });
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'élément');
        }
        return true; // Retourne true si l'ajout est réussi
    } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
        return false;
    }
};

// Fonction pour modifier un cocktail existant
export const modifier = async (id, element) => {
    try {
        const response = await fetch(`http://localhost:3000/liste/${id}`, {
            method: 'PUT', // Méthode PUT pour modifier
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(element), // Les nouvelles données du cocktail en format JSON
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la modification de l\'élément');
        }
        return true; // Retourne true si la modification est réussie
    } catch (error) {
        console.error('Erreur lors de la modification:', error);
        return false;
    }
};

// Fonction pour supprimer un cocktail
export const supprimer = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/liste/${id}`, {
            method: 'DELETE', // Méthode DELETE pour supprimer
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'élément');
        }
        return true; // Retourne true si la suppression est réussie
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        return false;
    }
};
