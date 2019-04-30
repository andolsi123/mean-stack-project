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
  message: any;
  id: any;

  constructor(private socket: Socket, private appService: AppService) {
    this.id = this.appService.connectedUser.data.company;
  }

  ngOnInit() {
    this.getChat();
    this.socket.on('newMessageAdded', () => {
      this.addChat();
    });
  }

  addChat() {
    this.appService.postAddChat({chat: this.message}, this.id).subscribe(data => {
      console.log(data);
    });
  }

  getChat() {
    this.appService.getChatByCompany(this.id).subscribe(data => {
      this.messages = data;
    });
  }

}
