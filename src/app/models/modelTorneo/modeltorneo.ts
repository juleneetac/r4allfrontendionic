import { Usuario } from '../modelUsusario/modelusuario';

export class Torneo {
    _id: String;
    //deporte: string;
    modo: String;           //Individuales o Dobles
    pistacubierta: Boolean; //Cubierta o no
    tipopista: String;      //Césped, TierraBatida, etc.
    ubicacion: String;
    ganador: Usuario;
    puntos: Number;   //ni idea, creo que mejor borrarla
    organizador: Usuario;
    participantes: [Usuario];
}
