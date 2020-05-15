export class Modelregister{
    username: string;
    mail: string;
    password: string;
    edad: number;
    sexo: string;
    ubicacion: string;
    punto: {            //Punto de la ubicación
        type: string,           
        coordinates: number[] //[longitud,latitud]
    };

    constructor(username = '', mail='', password = '', edad = 0, sexo= '', ubicacion= '', punto = {type:"",coordinates:[0,0]}) {
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.edad = edad;
        this.sexo = sexo;
        this.ubicacion = ubicacion;
        this.punto = punto;
    }
    
}
