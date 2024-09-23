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

    // await database.execAsync (`
    //     DELETE FROM tamagotchi;    
    // `);

    // const staticDate = '2024-09-23 00:35:03';

    // const query = (`
    //     UPDATE tamagotchi SET 
    //         dateHunger = '${staticDate}',
    //         dateSleep = '${staticDate}',
    //         dateFun = '${staticDate}';
    // `);
    
    // await database.execAsync(query);
    
}