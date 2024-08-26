import { useSQLiteContext } from "expo-sqlite";

export type ProductDatabase = {
    id: number;
    name: string;
    quantity: number;
}

export function useProductDatabase () {
    
    const database = useSQLiteContext();

    async function create(data: Omit<ProductDatabase, 'id'>) {
        const statement = await database.prepareAsync(`
            INSERT INTO products (name, quantity) VALUES ($name, $quantity)   
        `);
        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $quantity: data.quantity
            });

            const insertRowId = result.lastInsertRowId.toLocaleString();

            return {insertRowId};

        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function update(data: ProductDatabase) {
        const statement = await database.prepareAsync(`
            UPDATE products SET name = $name, quantity = $quantity where id = $id
        `);
        try {
            const result = await statement.executeAsync({
                $id : data.id,
                $name: data.name,
                $quantity: data.quantity
            });

        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function searchByName(name: String) {
        try {
            const querry = `SELECT * FROM products WHERE name LIKE ?`;

            const response = await database.getAllAsync<ProductDatabase>(querry, `%${name}%`);

            return response
        } catch (error) {
            throw error;
        }
    }

    async function remove(id: number) {
        try {
            await database.execAsync(`DELETE FROM products WHERE id = ${id}`)
        } catch (error) {
            throw error;
        }
    }

    return{create, update, searchByName, remove};
}
