// serveur.js
const express = require('express'); // Importation du module Express
const fs = require('fs'); // Module pour manipuler les fichiers
const path = require('path'); // Module pour gérer les chemins de fichiers
const cors = require('cors'); // Module pour autoriser les requêtes cross-origin (CORS)

const app = express(); // Création de l'application Express
const PORT = 3000; // Port sur lequel le serveur va écouter

// Chemin vers le fichier JSON des cocktails
// Puisque `serveur.js` est maintenant dans le dossier `serveur/` et que `cocktails.json` est dans `serveur/donnees/`
const filePath = path.join(__dirname, 'donnees', 'cocktails.json');

// Middleware pour autoriser les requêtes cross-origin
app.use(cors());
// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Servir les fichiers statiques à partir du dossier '../client'
// Étant donné que `serveur.js` est dans `serveur/`, le dossier `client/` est un niveau au-dessus
app.use(express.static(path.join(__dirname, '..', 'client')));

// Route pour obtenir la liste des cocktails
app.get('/liste', (req, res) => {
    // Lecture du fichier JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            return res.status(500).json({ error: 'Erreur lors de la lecture' });
        res.json(JSON.parse(data)); // Envoi de la liste des cocktails en réponse
    });
});

// Route pour ajouter un nouveau cocktail
app.post('/liste', (req, res) => {
    const nouvelElement = req.body; // Récupération du nouveau cocktail depuis le corps de la requête
    // Lecture du fichier JSON existant
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            return res.status(500).json({ error: 'Erreur lors de la lecture' });
        const liste = JSON.parse(data);
        liste.push(nouvelElement); // Ajout du nouveau cocktail à la liste
        // Écriture de la liste mise à jour dans le fichier JSON
        fs.writeFile(filePath, JSON.stringify(liste, null, 2), 'utf8', err => {
            if (err)
                return res.status(500).json({ error: 'Erreur lors de l\'écriture' });
            res.status(201).json({ message: 'Ajout réussi' }); // Envoi d'une réponse de succès
        });
    });
});

// Route pour modifier un cocktail existant
app.put('/liste/:id', (req, res) => {
    const id = parseInt(req.params.id); // Récupération de l'ID du cocktail à modifier depuis les paramètres de l'URL
    const elementModifie = req.body; // Récupération des nouvelles données du cocktail

    // Lecture du fichier JSON existant
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            return res.status(500).json({ error: 'Erreur lors de la lecture' });
        let liste = JSON.parse(data);
        const index = liste.findIndex(e => e.id === id); // Recherche de l'index du cocktail à modifier
        if (index !== -1) {
            liste[index] = elementModifie; // Mise à jour du cocktail dans la liste
            // Écriture de la liste mise à jour dans le fichier JSON
            fs.writeFile(filePath, JSON.stringify(liste, null, 2), 'utf8', err => {
                if (err)
                    return res.status(500).json({ error: 'Erreur lors de l\'écriture' });
                res.json({ message: 'Modification réussie' }); // Envoi d'une réponse de succès
            });
        } else {
            res.status(404).json({ error: 'Élément non trouvé' }); // Si le cocktail n'est pas trouvé
        }
    });
});

// Route pour supprimer un cocktail
app.delete('/liste/:id', (req, res) => {
    const id = parseInt(req.params.id); // Récupération de l'ID du cocktail à supprimer depuis les paramètres de l'URL

    // Lecture du fichier JSON existant
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err)
            return res.status(500).json({ error: 'Erreur lors de la lecture' });
        let liste = JSON.parse(data);
        const newList = liste.filter(e => e.id !== id); // Filtrage de la liste pour exclure le cocktail à supprimer
        // Écriture de la nouvelle liste dans le fichier JSON
        fs.writeFile(filePath, JSON.stringify(newList, null, 2), 'utf8', err => {
            if (err)
                return res.status(500).json({ error: 'Erreur lors de l\'écriture' });
            res.json({ message: 'Suppression réussie' }); // Envoi d'une réponse de succès
        });
    });
});

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
