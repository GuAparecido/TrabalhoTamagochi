import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tamagotchi (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickName TEXT NOT NULL,
            imageId INTEGER NOT NULL,
            counterFun INTEGER,
            counterSleep INTEGER,
            counterHunger INTEGER,
            counterStatus INTEGER,
            dateSleep DATETIME,
            dateHunger DATETIME,
            dateFun DATETIME
        );    
    `);


    // OBS: RODA PRIMEIRO ISSO PARA PARAR DE DAR O ERRO, DEPOIS VOLTA O CODIGO DE CIMA
    // await database.execAsync(`
    //     CREATE TABLE IF NOT EXISTS tamagotchi (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         nickName TEXT NOT NULL,
    //         imageId INTEGER NOT NULL
    //     );    
    // `);
    // await database.execAsync(`
    //     ALTER TABLE tamagotchi ADD COLUMN counterFun INTEGER DEFAULT 0;
    // `);

    // await database.execAsync(`
    //     ALTER TABLE tamagotchi ADD COLUMN counterSleep INTEGER DEFAULT 0;
    // `);

    // await database.execAsync(`
    //     ALTER TABLE tamagotchi ADD COLUMN counterHunger INTEGER DEFAULT 0;
    // `);

    // await database.execAsync(`
    //     ALTER TABLE tamagotchi ADD COLUMN counterStatus INTEGER DEFAULT 0;
    // `);

    // await database.execAsync (`
    //     ALTER TABLE tamagotchi ADD COLUMN dateHunger DATETIME;    
    // `);

    // await database.execAsync (`
    //     ALTER TABLE tamagotchi ADD COLUMN dateSleep DATETIME;    
    // `);

    // await database.execAsync (`
    //     ALTER TABLE tamagotchi ADD COLUMN dateFun DATETIME;    
    // `);

    // await database.execAsync (`
    //     DELETE FROM tamagotchi;    
    // `);

    // const staticDate = '2024-09-05 8:44:18';

    // // Consulta SQL direta
    // const query = `
    //     UPDATE tamagotchi 
    //     SET dateSleep = '${staticDate}' 
    // `;

    // await database.execAsync(query);
}