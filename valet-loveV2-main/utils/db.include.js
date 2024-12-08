const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const dbName = 'tata'; // Nom de la base de données

// Configuration du pool MySQL
const poolConfig = {
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'Mysql',
    database: dbName,
};

// Fonction principale pour initialiser la base de données
const initialiserBaseDeDonnees = async () => {
    try {
        console.log('[DB] Début de l\'initialisation de la base de données...');

        // Étape 1 : Créer la base de données si elle n'existe pas
        const connection = await mysql.createConnection({
            ...poolConfig,
            database: undefined, // Pas de base spécifiée pour permettre la création
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`[DB] Base de données "${dbName}" créée ou déjà existante.`);
        await connection.end();

        // Étape 2 : Appliquer le modèle SQL
        const pool = mysql.createPool(poolConfig);

        const appliquerModeleSQL = async () => {
            const sqlFilePath = path.join(__dirname, 'valet_love.sql');
            try {
                const sqlContent = await fs.promises.readFile(sqlFilePath, 'utf8');
                const sqlQueries = sqlContent.split(';').filter(query => query.trim().length);

                const connection = await pool.getConnection();
                try {
                    for (const query of sqlQueries) {
                        await connection.query(query);
                    }
                    console.log('[DB] Modèle SQL appliqué avec succès.');
                } finally {
                    connection.release();
                }
            } catch (err) {
                console.error('[DB] Erreur lors de la lecture ou de l\'exécution du modèle SQL :', err.message);
                throw err;
            }
        };

        await appliquerModeleSQL();
        console.log('[DB] Initialisation de la base de données terminée avec succès.');
    } catch (err) {
        console.error('[DB] Erreur lors de l\'initialisation :', err.message);
    }
};

// Exporter le pool pour d'autres fichiers
const pool = mysql.createPool(poolConfig);

// Appeler l'initialisation au démarrage
initialiserBaseDeDonnees();

module.exports = pool;
