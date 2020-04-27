import { Torneo } from '../modelTorneo/modeltorneo';

export class Usuario {
    _id: string;
    username: string;
    mail: string
    password: string;
    sexo: string;
    rutaimagen: string;
    ubicacion: string;
    edad: Number;
    exp: string;
    valoracion: Number;
    partidas: [string]; // cambiar a Modelpartida
    torneos: [Torneo]; 
    chats: [string];    // cambiar a Modelchat
    amigos: [Usuario]; 
}
