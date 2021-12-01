import { usuario } from "../models/usuario";


export interface cargarUsuarios {
    total: Number;
    results: usuario[]
}