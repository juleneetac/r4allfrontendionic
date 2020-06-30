import { Modeltorneo } from '../modelTorneo/modeltorneo';
import * as io from 'socket.io-client' ;
import { Modelpartida } from '../modelPartida/modelpartida';

export class Modelusuario {
    _id: string;
    username: string;
    mail: string
    password: string;
    sexo: string;
    rutaimagen: string;
    ubicacion: string;  //Nombre de la ubicación (Por ejemplo, Real Club de Tenis)
    punto: {            //Punto de la ubicación
        type: string,           
        coordinates: number[] //[longitud,latitud]
    };
    edad: number;
    exp: number;
    valoracion: number;
    partidas: Modelpartida[];
    torneos: Modeltorneo[]; 
    chats: [];    // cambiar a Modelchat
    amigos: Modelusuario[]; 
    jwt: string;  //para el json web token
    socket: SocketIOClient.Socket; 

    constructor( jwt = '', username = '', mail = '', passw = '', sexo = '', ubicacion = '', punto = {type:"",coordinates:[0,0]}, edad = 0, exp = 0, valoracion = 0, rutaimagen = '', partidas = null, torneos = null, chats = null, amigos = null) {
        this.jwt=jwt;
        this.username= username;
        this.mail = mail;
        this.password = passw;
        this.sexo = sexo;
        this.edad = edad;
        this.ubicacion = ubicacion ;
        this.punto = punto;
        this.exp = exp;
        this.valoracion = valoracion;
        this.rutaimagen = rutaimagen ;
        this.partidas = partidas ;
        this.torneos = torneos ;
        this.chats = chats;
        this.amigos = amigos;
    }
}
