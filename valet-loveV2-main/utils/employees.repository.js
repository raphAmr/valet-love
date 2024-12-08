pool = require(__dirname + "\\db.include.js");

module.exports = {
    getBlankWorker() {
        return {
            id_employee: 0,         // ID par défaut
            name_employee: "Default Name", // Nom par défaut
            age_employee: 0,        // Âge par défaut
            gender_employee: "M",   // Genre par défaut (par exemple : "M", "F", "PD")
            post_employee: "Default Post", // Poste par défaut
            salary_employee: 0,     // Salaire par défaut
            id_bar: null            // Peut être défini dynamiquement en fonction du bar sélectionné
        };
    },
    
    
    async getAllEmployees() {
        try {
            const sql = "SELECT * FROM Employee";
            console.log("[EMPLOYEE] Exécution de la requête SQL pour récupérer tous les employee...");

            // Tester la connexion au pool avant d'exécuter la requête
            console.log("[DB] Vérification de la connexion au pool MySQL...");
            await pool.getConnection(); // Vérifie que le pool est accessible
            console.log("[DB] Connexion au pool MySQL réussie.");

            // Exécuter la requête SQL
            const [rows] = await pool.query(sql); // Utilisation de `query` à la place de `execute`

            // Vérifier les résultats
            if (!rows || rows.length === 0) {
                console.warn("[EMPLOYEE] Aucun employee trouvé dans la base de données.");
                return [];
            }

            console.log(`[EMPLOYEE] ${rows.length} employee récupérés.`);
            return rows;
        } catch (err) {
            console.error("[EMPLOYEE] Erreur lors de la récupération de tous les employees :", err.message);
            throw new Error("Erreur lors de la récupération de tous les employees.");
        }
    },

    async deleteEmployee(employeeId) {
        try {
            const sql = 'DELETE FROM Employee WHERE id_employee = ?';
            console.log("[EMPLOYEE] Exécution de la requête SQL pour supprimer un employee");

            const [result] = await pool.query(sql, [employeeId]); 
            return result.affectedRows;  
        } catch (err) {
            console.error('[DB] Erreur lors de la suppression de lemployee :', err.message);
            throw err;
        }
    },
    

    //version elo (pour add):

    async createEmployee(employeeData) {
        try {
            const sql = `
                INSERT INTO Employee (
                    name_employee,
                    age_employee,
                    gender_employee,
                    post_employee,
                    salary_employee,
                    id_bar
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            const {
                name_employee,
                age_employee,
                gender_employee,
                post_employee,
                salary_employee,
                id_bar
            } = employeeData;

            const [result] = await pool.query(sql, [
                name_employee,
                age_employee,
                gender_employee,
                post_employee,
                salary_employee,
                id_bar,
            ]);

            return result.insertId; // Retourne l'ID du nouvel employé
        } catch (err) {
            console.error('[DB] Erreur lors de la création d\'un employé :', err.message);
            throw err;
        }
    },
    
    
    


   

//version 1
    /*async createEmployee(employeeData) {
        try {
            const sql = `
                INSERT INTO Employee (
                    id_employee, name_employee, age_employee,
                    gender_employee, post_employee,
                    salary_employee, id_bar
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const {
                id_employee,
                name_employee,
                age_employee,
                gender_employee,
                post_employee,
                salary_employee,
                id_bar,
            } = employeeData;

            const [result] = await pool.query(sql, [
                id_employee,
                name_employee,
                age_employee,
                gender_employee,
                post_employee,
                salary_employee,
                id_bar,
            ]);

            return result.insertId; // Retourne l'ID de l'employée nouvellement créé
        } catch (err) {
            console.error('[DB] Erreur lors de la création d\'un employée :', err.message);
            throw err;
        }
    },*/

    

    async updateEmployee(employeeId, updateData) {
        try {
            // Préparer les parties SET et les valeurs dynamiques
            const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);

            // Ajouter l'ID du employee pour la condition WHERE
            values.push(employeeId);

            const sql = `UPDATE Employee SET ${fields} WHERE id_employee = ?`;

            const [result] = await pool.query(sql, values);
            return result.affectedRows; // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('[DB] Erreur lors de la mise à jour du employee :', err.message);
            throw err;
        }
    },

/*
async deleteEmployee(employeeId) {
        try {
            const sql = 'DELETE FROM Employee WHERE id_employee = ?';
            const [result] = await pool.query(sql, [employeeId]); 
            return result.affectedRows;  
        } catch (err) {
            console.error('[DB] Erreur lors de la suppression de l\'employee :', err.message);
            throw err;
        }
    },

    async updateEmployee(employeeId, updateData) {
        try {
            const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);
            values.push(employeeId);

            const sql = `UPDATE Employee SET ${fields} WHERE id_employee = ?`;
            const [result] = await pool.query(sql, values);
            return result.affectedRows;
        } catch (err) {
            console.error('[DB] Erreur lors de la mise à jour du employee :', err.message);
            throw err;
        }
    },*/




};