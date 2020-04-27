import { Modeltorneo } from '../modelTorneo/modeltorneo';

export class Modelusuario {
    _id: string;
    username: string;
    mail: string
    password: string;
    sexo: string;
    rutaimagen: string;
    ubicacion: string;
    edad: Number;
    exp: Number;
    valoracion: Number;
    partidas: [string]; // cambiar a Modelpartida
    torneos: [Modeltorneo]; 
    chats: [string];    // cambiar a Modelchat
    amigos: [Modelusuario]; 
}
