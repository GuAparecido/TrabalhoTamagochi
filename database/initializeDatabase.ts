import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tamagotchi (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickName TEXT NOT NULL,
            imageId INTEGER NOT NULL
        );    
    `);
}