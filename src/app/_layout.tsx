import { initializeDatabase } from "@/database/initializeDatabase";
import { Slot } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";


const _layout = () => {
    return (
        <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
            <Slot>

            </Slot>
        </SQLiteProvider>
    );
}

export default _layout;