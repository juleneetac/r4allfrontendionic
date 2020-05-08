export class Modelmessage {
    author: string;
    destination: string;
    mensaje: string;
    date: Date;

    constructor(author: string, destination: string, mensaje: string, date: Date) {
        this.author = author;
        this.destination = destination;
        this.mensaje = mensaje;
        this.date = date;

    }

}
