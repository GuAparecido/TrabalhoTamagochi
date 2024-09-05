import { useSQLiteContext } from "expo-sqlite";

export type Tamagotchi = {
    id: number;
    nickName: string;
    imageId: number;
    counterFun : number;
    counterSleep : number;
    counterHunger : number;
    counterStatus: number;
    dateHunger: Date;
    dateSleep: Date;

}

export function useTamagotchiDatabase () {

    const database = useSQLiteContext();

    async function create(data:Omit<Tamagotchi, 'id' | 'counterFun' | 'counterSleep' | 'counterHunger' | 'counterStatus' | 'dateSleep' | 'dateHunger'>) {
        const now = new Date();

        const dateFormated =  now.toISOString().slice(0, 19).replace('T', ' ');

        const statement = await database.prepareAsync(`
            INSERT INTO tamagotchi (nickName, imageId, counterHunger, counterSleep, counterFun, counterStatus, dateSleep, dateHunger) 
            VALUES ($nickName, $imageId, 10, 60, 100, 200, $dateSleep, $dateHunger);    
        `);

        try {
            const result = await statement.executeAsync({
                $nickName: data.nickName,
                $imageId: data.imageId,
                $dateSleep: dateFormated,
                $dateHunger: dateFormated
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
            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
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

    async function updateCounterHunger(id: number) {

        const response = await findById(id);

        if(response) {
            if(response.counterHunger<100){

                const now = new Date();

                const dateFormated =  now.toISOString().slice(0, 19).replace('T', ' ');

                const statement = await database.prepareAsync(`
                    UPDATE tamagotchi SET counterHunger = $counterHunger, dateHunger = $dateHunger WHERE id = $id
                `);
        
                try {
                    const result = await statement.executeAsync({
                        $counterHunger: response.counterHunger+1,
                        $dateHunger: dateFormated,
                        $id: id
                    });
        
                } catch (error) {
                    throw error;
                } finally {
                    await statement.finalizeAsync();
                }
            }
        }
    }

    async function calculateAtributes() {
        const tamagotchis = await findAll();
        console.log('teste');
        for(const response of tamagotchis){
            if (response) {
                const now = new Date();
                console.log(now);
    
                const dateFormated =  now.toISOString().slice(0, 19).replace('T', ' ');
    
                const novo = new Date(dateFormated);
        
                const dateHunger = new Date(response.dateHunger);
        
                const differenceHunger = novo.getTime() - dateHunger.getTime();
        
                const differenceHungerInHours = differenceHunger / (1000 * 60 * 60);
        
                const newCounterHunger = Math.floor(differenceHungerInHours * 10);

                const dateSleep = new Date(response.dateSleep);
        
                const differenceSleep = novo.getTime() - dateSleep.getTime();
        
                const differenceHungerInSleep = differenceSleep / (1000 * 60 * 60);
        
                const newCounterSleep = Math.floor(differenceHungerInSleep * 10);

                const statement = await database.prepareAsync(`
                    UPDATE tamagotchi SET 
                    counterHunger = $counterHunger, dateHunger = $dateHunger,
                    counterSleep = $counterSleep, dateSleep = $dateSleep 
                    WHERE id = $id
                `);
        
                try {
                    const result = await statement.executeAsync({
                        $counterHunger: (response.counterHunger - newCounterHunger) <= 0 ? 0 : response.counterHunger - newCounterHunger ,
                        $counterSleep: (response.counterSleep - newCounterSleep) <= 0 ? 0 : response.counterSleep - newCounterSleep ,
                        $id: response.id,
                        $dateHunger: dateFormated,
                        $dateSleep: dateFormated
                    });
        
                    console.log("Atualização bem-sucedida:", result);
                } catch (error) {
                    console.error("Erro ao atualizar o banco de dados:", error);
                } finally {
                    await statement.finalizeAsync();
                }
            } else {
                console.error("Nenhum registro encontrado com o ID fornecido.");
            }        
        };
    
    }

    async function updateCounterSleep(id:number) {
        const response = await findById(id);

        if(response) {
            if(response.counterHunger<=100){

                const now = new Date();

                const dateFormated =  now.toISOString().slice(0, 19).replace('T', ' ');

                const statement = await database.prepareAsync(`
                    UPDATE tamagotchi SET counterSleep = $counterSleep, dateSleep = $dateSleep WHERE id = $id
                `);
        
                try {
                    const result = await statement.executeAsync({
                        $counterSleep: response.counterSleep+1,
                        $dateSleep: dateFormated,
                        $id: id
                    });
        
                } catch (error) {
                    throw error;
                } finally {
                    await statement.finalizeAsync();
                }
            }
        }
    }
    return {create, findAll, findBySearch, findById, updateCounterStatus, updateCounterHunger, calculateAtributes, updateCounterSleep};
}