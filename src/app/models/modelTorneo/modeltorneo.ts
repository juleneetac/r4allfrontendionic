import { Modelusuario } from '../modelUsusario/modelusuario';

export class Modeltorneo {
    _id: String;
    deporte: string;
    modo: String;           //Individuales o Dobles
    pistacubierta: Boolean; //Cubierta o no
    tipopista: String;      //Césped, TierraBatida, etc.
    ubicacion: String;
    ganador: Modelusuario;
    puntos: Number;   //ni idea, creo que mejor borrarla
    organizador: Modelusuario;
    participantes: [Modelusuario];
}
