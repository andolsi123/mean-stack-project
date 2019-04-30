import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: any;
  message= "";
  id = '5cc82007edcb654bb8336b16';
  idCompany;
  
  constructor(private socket: Socket, private appService: AppService) {
    this.idCompany = this.appService.connectedUser;
  }

  ngOnInit() {
    this.getChat();
    this.socket.on('newMessageAdded', () => {
      this.getChat();
    });
  }

  addChat() {
    this.appService.postAddChat({chat: this.message}, this.id).subscribe();
  }
 
  getChat() {
    this.appService.getChatByCompany(this.id).subscribe(data => {
      this.messages = data;
      console.log(data);
    });
  }

}
