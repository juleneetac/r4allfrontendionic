import { Component, OnInit } from '@angular/core';
//import { Socket } from 'ng-socket-io';
import * as io from 'socket.io-client' ;
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { StorageComponent } from 'src/app/storage/storage.component';
import { Router } from '@angular/router';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { ChatService } from 'src/app/services/serviceChat/chat.service';
import { Ambiente } from 'src/app/services/ambiente';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  //providers: [UsuarioService],
})
export class ChatPage {
  // socket: SocketIOClient.Socket;
  // destusername: string;
  // outputList: string[] = [];
  //message: string;
  // dest: String;
  // sala: String[] = [];
  // myusername: string;
  // rate: number;
  // usuario: Modelusuario;
  // usernamedestid: String;

  //message: string;
  //messages: string[] = [];

  ambiente: Ambiente;
  private socket;
  user = JSON.parse(this.storage.getUser());
  username = this.user.username;

  constructor(
    private usuarioSevice: UsuarioService,
    private storage: StorageComponent,
    private router: Router,
    private chatService: ChatService,
    //private socket,
    
  ) { 
    this.ambiente = new Ambiente();
    console.log(this.ambiente.path) 
    this.socket = io(this.ambiente.path);
    //this.usuario= new Modelusuario();
  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-username', this.username);
    this.goRoom();
  }

  goRoom() {
    this.router.navigateByUrl("chatroom")
  }



}

//   ngOnInit() {
//     this.myusername=this.chatService.myusername;
//     console.log("My username is:" + this.myusername);
//     this.destusername= this.chatService.userdestino;
//     this.getUserbyusername();
//     console.log(this.destusername);
//     this.socket = this.chatService.socket;
//     console.log('this is happening');
//     console.log(this.socket);
//     this.socket.emit('connected');
//     this.socket.on('chat', function(username, mensaje, dest){
      
        
//           if (dest == this.socket.id){
//             console.log('Recibido');
//             this.sala.push(username +": "+mensaje);        
            
//             }
         
      
//       }.bind(this));  

//       this.socket.on('usersconnected', function(socket){
//         var socketlength = socket.length;
//         console.log("Recibiendo usuarios conectados, hay " + socketlength);
//         this.outputList = [];
//         for (var i = 0; i <= socketlength-1; i++) {
            
//           this.outputList.push(socket[i]);
//           let username = socket[i].split(" ")[0];
//           if ( username == this.destusername)
//           {
//               this.dest= socket[i].split(" ")[1];
//           }  
                   
//         }  
//         console.log(this.outputList);

//     }.bind(this));  
// }
// sendMessage(){
//   this.socket.emit("chat", this.myusername, this.message, this.dest);
//   this.sala.push(this.myusername+": "+this.message);

// }

// getUserbyusername(){
//   console.log("destusername: "+this.destusername)
//   this.usuarioSevice.getUsuariobyusername(this.destusername)
//         .subscribe(res =>{
//           this.usuario = res;
//           /* console.log("user: "+this.user.name)
//           console.log("user: "+this.user._id)
//           this.usernamedestid= this.user._id; */
//           console.log("DEST: "+this.destusername)
//             });
// }









  // joinChat() {
  //   this.socket.connect();
  //   this.socket.emit('set-username', this.username);
  //   this.goRoom();
  // }

  // goRoom() {
  //   this.router.navigateByUrl("chatroom")
  // }




  // ngOnInit() {
  //   this.chatService.getMessages()
  //     .subscribe((message: string) => {
  //       this.messages.push(message);
  //     });
  // }

  // sendMessage() {
  //   this.chatService.sendMessage(this.message);
  //   this.message = '';
  // }
