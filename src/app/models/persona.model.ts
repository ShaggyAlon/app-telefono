export class Persona {
    nombre: string;
    apellido: string;
    usuario: string;
    email: string;
    contrasena: string;

    constructor( nombre: string, apellido: string, usuario: string, email: string, contrasena: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.email = email;
        this.contrasena = contrasena;
    }
}