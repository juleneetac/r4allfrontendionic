export class Modelmessage {
    author: string;
    destination: string;
    mensaje: string;
    date: string;

    constructor(author: string, destination: string, mensaje: string, date: string) {
        this.author = author;
        this.destination = destination;
        this.mensaje = mensaje;
        this.date = date;

    }

}
