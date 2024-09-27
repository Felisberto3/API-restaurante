import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        {name: "Quatro queijos", price: 45 },
        {name: "Isca de Frango", price: 60 },
        {name: "Tilápias com alcaparras", price: 45 },
        {name: "Porcao de batata frita", price: 75 },
        {name: "Tomate estufado", price: 90 },
        {name: "caldo de  queijos", price: 7.5 },
        {name: "Suco de Laranja", price: 100 },
        {name: "Refrigerante    350ml", price: 66 },
        {name: "Suco de Laranja", price: 89 }
    ]);
};
