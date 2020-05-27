export class Modelpartida {
    _id:string;
    modo: string;
    ubicacion: string;
    ganador: string;
    organizador: string;
    invitados: string[];
    punto: {            //Punto de la ubicación
        type: string,           
        coordinates: number[] //[longitud,latitud]
    };
    constructor(modo = '', ubicacion = '',organizador = '', invitados = [''], punto = {type:"",coordinates:[0,0]}) {
        this.modo = modo;
        this.ubicacion = ubicacion;
        this.organizador = organizador;
        this.invitados = invitados;
        this.punto = punto;
    }
}
