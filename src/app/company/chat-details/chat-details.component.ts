import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit {

  messages: any;
  message = '';
  idCompany;
  param;
  sender;

  constructor(private socket: Socket, private appService: AppService, private route: ActivatedRoute) {
    this.param = this.route.snapshot.params.id;
    this.idCompany = this.appService.connectedUser.data.company;
    this.appService.getOneCompany(this.idCompany).subscribe((dt: any) => {
      this.sender = dt.nameCompany;
    });
  }

  ngOnInit() {
    this.getChat();
    this.socket.on('newMessageAdded', () => {
      this.getChat();
    });
  }

  addChat() {
    this.appService.postAddChat({chat: this.message, sender: this.sender}, this.param).subscribe();
  }

  getChat() {
    this.appService.getChatById(this.param).subscribe(data => {
      this.messages = data;
    });
  }

}
