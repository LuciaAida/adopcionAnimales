import { EnumType } from "typescript"

export class usuarioModel{
    id!:number
    nombre_usuario!:string
    correo!: string
    contrasena!: string
    telefono?: string
    direccion?: string
    rol:Array<string>=["admin","adoptante","voluntario"];
}