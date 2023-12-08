import { randomUUID } from "crypto"

export class DatabaseMemory{
#cachorros = new Map()

list(search){
    return Array.from(this.#cachorros.entries()).map((cachorrosArray) =>{
    // acessando primeira posição
        const id = cachorrosArray[0]
        const data = cachorrosArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(cachorro => {
        if (search){
            return cachorro.raca.includes(search)
        }
        return true
    })
}
create(cachorro){
    const cachorroId = randomUUID()
    this.#cachorros.set(cachorroId, cachorro)
}
update(id, cachorro){
    this.#cachorros.set(id, cachorro)
}
delete(id, cachorro){
    this.#cachorros.delete(id, cachorro)
}
}