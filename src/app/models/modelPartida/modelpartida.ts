export class Modelpartida {
    modo: string;
    ubicacion: string;
    ganador: string;
    organizador: string;
    invitado: string[];
    punto: {            //Punto de la ubicación
        type: string,           
        coordinates: number[] //[longitud,latitud]
    };
    constructor(modo = '', ubicacion = '',organizador = '', invitado = [''], ganador = '', punto = {type:"",coordinates:[0,0]}) {
        this.modo = modo;
        this.ubicacion = ubicacion;
        this.organizador = organizador;
        this.invitado = invitado;
        this.ganador = ganador;
        this.punto = punto;
    }
}
