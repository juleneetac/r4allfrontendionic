import { Modeltorneo } from '../modelTorneo/modeltorneo';

export class Modelusuario {
    _id: string;
    username: string;
    mail: string
    password: string;
    sexo: string;
    rutaimagen: string;
    ubicacion: string;
    edad: number;
    exp: number;
    valoracion: number;
    partidas: [string]; // cambiar a Modelpartida
    torneos: [Modeltorneo]; 
    chats: [string];    // cambiar a Modelchat
    amigos: [Modelusuario]; 
    jwt: string;  //para el json web token

    constructor( jwt = '', username = '', mail = '', passw = '', sexo = '', ubicacion = '', edad = 0, exp = 0, valoracion = 0, rutaimagen = '', partidas = null, torneos = null, chats = null, amigos = null) {
        this.jwt=jwt;
        this.username= username;
        this.mail = mail;
        this.password = passw;
        this.sexo = sexo;
        this.edad = edad;
        this.ubicacion = ubicacion ;
        this.exp = exp;
        this.valoracion = valoracion;
        this.rutaimagen = rutaimagen ;
        this.partidas = partidas ;
        this.torneos = torneos ;
        this.chats = chats;
        this.amigos = amigos;
    }
}
