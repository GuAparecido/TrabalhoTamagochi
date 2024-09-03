import { useSQLiteContext } from "expo-sqlite";

export type Tamagotchi = {
    id: number;
    nickName: string;
    imageId: number;
    counterFun : number;
    counterSleep : number;
    counterHunger : number;
    counterStatus: number;
}

export function useTamagotchiDatabase () {

    const database = useSQLiteContext();

    async function create(data:Omit<Tamagotchi, 'id' | 'counterFun' | 'counterSleep' | 'counterHunger' | 'counterStatus'>) {
        const statement = await database.prepareAsync(`
            INSERT INTO tamagotchi (nickName, imageId, counterHunger, counterSleep, counterFun, counterStatus) 
            VALUES ($nickName, $imageId, 10, 60, 100, 200);    
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

    async function updateCounterStatus(id: number) {

        const response = await findById(id);

        let newCounterStatus = 0;

        if(response) {
            newCounterStatus = response?.counterFun + response?.counterHunger + response?.counterSleep;
        }

        const statement = await database.prepareAsync(`
            UPDATE tamagotchi SET counterStatus = $counterStatus WHERE id = $id
        `);

        try {
            const result = await statement.executeAsync({
                $counterStatus: newCounterStatus,
                $id: id
            });

        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return {create, findAll, findBySearch, findById, updateCounterStatus};
}