import { useSQLiteContext } from "expo-sqlite";

export type Tamagotchi = {
    id: number;
    nickName: string;
    imageId: number;
    counterFun : number;
    counterSleep : number;
    counterHunger : number;
}

export function useTamagotchiDatabase () {

    const database = useSQLiteContext();

    async function create(data:Omit<Tamagotchi, 'id' | 'counterFun' | 'counterSleep' | 'counterHunger'>) {
        const statement = await database.prepareAsync(`
            INSERT INTO tamagotchi (nickName, imageId, counterHunger, counterSleep, counterFun) 
            VALUES ($nickName, $imageId, 10, 60, 100);    
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
            const query = `SELECT * FROM tamagotchi WHERE nickName LIKE ?;`;

            const response = await database.getAllAsync<Tamagotchi>(query, `%${search}%`);

            return response;

        } catch (error) {
            throw error;
        }
    }

    async function findById(id:number) {
        try {
            const query = `SELECT * FROM tamagotchi WHERE id = ?;`;

            const response = await database.getFirstAsync<Tamagotchi>(query, id);

            return response;
        } catch (error) {
            throw error;
        }
    }

    return {create, findAll, findBySearch, findById};
}