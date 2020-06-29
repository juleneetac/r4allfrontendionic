export class Participante {
    _id: string;
    _idUsuario: string;
    //_id: string;        //id del Usuario al que hace referencia
    _idTorneo: string;
    nombre: string;     //El username del Usuario
    pareja: Participante;
    puntos: number;
    ranking: number;
    victorias: number;
    derrotas: number;
}
