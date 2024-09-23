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
    dateFun : Date;
}

export function useTamagotchiDatabase () {

    const database = useSQLiteContext();

    async function create(data:Omit<Tamagotchi, 'id' | 'counterFun' | 'counterSleep' | 'counterHunger' | 'counterStatus' | 'dateSleep' | 'dateHunger' | 'dateFun' | 'counterFun'>) {
        const now = new Date();

        const dateFormated =  now.toISOString().slice(0, 19).replace('T', ' ');

        const statement = await database.prepareAsync(`
            INSERT INTO tamagotchi (nickName, imageId, counterHunger, counterSleep, counterFun, counterStatus, dateSleep, dateHunger, dateFun) 
            VALUES ($nickName, $imageId, 100, 100, 100, 300, $dateSleep, $dateHunger, $dateFun);    
        `);

        try {
            const result = await statement.executeAsync({
                $nickName: data.nickName,
                $imageId: data.imageId,
                $dateSleep: dateFormated,
                $dateHunger: dateFormated,
                $dateFun: dateFormated
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

    async function updateCounterFun(id: number) {

        const response = await findById(id);

        if(response) {
            if(response.counterHunger<100){

                const now = new Date();

                const dateFormated =  now.toISOString().slice(0, 19).replace('T', ' ');

                const statement = await database.prepareAsync(`
                    UPDATE tamagotchi SET counterFun = $counterFun, dateFun = $dateFun WHERE id = $id
                `);
        
                try {
                    const result = await statement.executeAsync({
                        $counterFun: response.counterFun+10,
                        $dateFun: dateFormated,
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

        for(const response of tamagotchis){
            if (response) {
                const now = new Date();
                const dateFormated = now.toISOString().slice(0, 19).replace('T', ' ');
                const nowFormated = new Date(dateFormated);
               
                const newCounterHunger = calculateDifferenceInCounter(nowFormated, response.dateHunger);

                const newCounterSleep = calculateDifferenceInCounter(nowFormated, response.dateSleep);

                const newCounterFun = calculateDifferenceInCounter(nowFormated, response.dateFun);

                const statement = await database.prepareAsync(`
                    UPDATE tamagotchi SET 
                    counterHunger = $counterHunger, dateHunger = $dateHunger,
                    counterSleep = $counterSleep, dateSleep = $dateSleep,
                    counterFun = $counterFun, dateFun = $dateFun
                    WHERE id = $id
                `);
        
                try {
                    const result = await statement.executeAsync({
                        $counterHunger: (response.counterHunger - newCounterHunger) <= 0 ? 0 : response.counterHunger - newCounterHunger ,
                        $counterSleep: (response.counterSleep - newCounterSleep) <= 0 ? 0 : response.counterSleep - newCounterSleep ,
                        $counterFun: (response.counterFun - newCounterFun) <= 0 ? 0 : response.counterFun - newCounterFun,
                        $id: response.id,
                        $dateHunger: dateFormated,
                        $dateSleep: dateFormated,
                        $dateFun: dateFormated
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

    function calculateDifferenceInCounter(dateNow: Date, previousDate: Date) {
        const differenceInMilliseconds = dateNow.getTime() - new Date(previousDate).getTime();
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        return Math.floor(differenceInHours * 10);
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
    return {create, findAll, findBySearch, findById, updateCounterStatus, updateCounterHunger, calculateAtributes, updateCounterSleep, updateCounterFun};
}