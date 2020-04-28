import { Modelusuario } from '../modelUsusario/modelusuario';

export class Modeltorneo {
    _id: string;
    //deporte: string;
    modo: string;           //Individuales o Dobles
    pistacubierta: boolean; //Cubierta o no
    tipopista: string;      //Césped, TierraBatida, etc.
    ubicacion: string;
    ganador: Modelusuario;
    //puntos: Number;   //ni idea, creo que mejor borrarla
    organizador: Modelusuario;
    participantes: [Modelusuario];
}
