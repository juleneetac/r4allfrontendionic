import { Modelusuario } from '../modelUsusario/modelusuario';
import { Participante } from '../modelParticipante/participante';

export class Modeltorneo {
    _id: string;
    nombre: string;         //Nombre del Torneo
    descripcion: string;        
    sitioweb: string;       //Sitio web del Organizador o del torneo
    modo: string;           //Individuales o Dobles
    genero: string;         //m o f
    pistacubierta: boolean; //Cubierta o no
    tipopista: string;      //Hierba, TierraBatida, etc.
    tipobola: string;       //Introducido por el Organizador
    ubicacion: string;      //Nombre de la ubicación (Por ejemplo, Real Club de Tenis)
    punto: {                //Punto de la ubicación
        type: { type: string },           //"Point"
        coordinates: { type: number[] }   //[latitud,longitud]
    };
    inscripcion: number;    //Precio de inscripcion
    premio: string;  
    ganador: Participante;  //Si es null, el Torneo está activo aún
    ganador2: Participante; //Pareja del ganador (en caso del Torneo dobles)
    organizador: string;    //Por ejemplo, Club de Tenis, Federacion, Usuario...
    participantes: Participante[];
    capacidad: number;      //Numero maximo de participantes
}
