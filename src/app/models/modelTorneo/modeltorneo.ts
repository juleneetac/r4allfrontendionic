import { Modelusuario } from '../modelUsusario/modelusuario';

export class Modeltorneo {
    _id: string;
    nombre: string;         //Nombre del Torneo
    modo: string;           //Individuales o Dobles
    genero: string;         //m o f
    pistacubierta: boolean; //Cubierta o no
    tipopista: string;      //Hierba, TierraBatida, etc.
    tipobola: string;       //Introducido por el Organizador
    ubicacion: string;      //Nombre de la ubicación (Por ejemplo, Real Club de Tenis)
    punto: {                //Punto de la ubicación
        type: { type: string },           //"Point"
        coordinates: { type: [number] }   //[latitud,longitud]
    };
    inscripcion: number;    //Precio de inscripcion
    premio: string;  
    ganador: Modelusuario;  //Si es null, el Torneo está activo aún
    organizador: string;    //Por ejemplo, Club de Tenis, Federacion, Usuario...
    participantes: [Modelusuario];
}
