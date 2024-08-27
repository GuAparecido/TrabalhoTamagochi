import { useSQLiteContext } from "expo-sqlite";

export type Tamagotchi = {
    id: number;
    nickName: string;
    imageId: number;
}

export function useTamagotchiDatabase () {

    const database = useSQLiteContext();

    async function create(data:Omit<Tamagotchi, 'id'>) {
        const statement = await database.prepareAsync(`
            INSERT INTO tamagotchi (nickName, imageId) VALUES ($nickName, $imageId);    
        `);

        try {
            const result = await statement.executeAsync({
                $nickName: data.nickName,
                $imageId: data.imageId
            });

            const insertRowId = result.lastInsertRowId.toLocaleString();

            return{insertRowId};

        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function findAll() {
        try {
            const query = `SELECT * FROM tamagotchi;`;

            const response = await database.getAllAsync<Tamagotchi>(query);

            return response;

        } catch (error) {
            throw error;
        }
    }

    async function findBySearch(search: string) {
        try {
            const query = `SELECT * FROM tamagotchi where nickName LIKE ?;`;

            const response = await database.getAllAsync<Tamagotchi>(query, `%${search}%`);

            return response;

        } catch (error) {
            throw error;
        }
    }

    return {create, findAll, findBySearch};
}