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
}
