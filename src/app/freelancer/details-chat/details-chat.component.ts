import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-chat',
  templateUrl: './details-chat.component.html',
  styleUrls: ['./details-chat.component.css']
})

export class DetailsChatComponent implements OnInit {

  messages: any;
  message = '';
  idFreelancer;
  param;
  sender;

  constructor(private socket: Socket, private appService: AppService, private route: ActivatedRoute) {
    this.param = this.route.snapshot.params.id;
    this.idFreelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getOneFreelancer(this.idFreelancer).subscribe((dt: any) => {
      this.sender = dt.first_name;
    });
  }

  ngOnInit() {
    this.getChat();
    this.socket.on('newMessageAdded', () => {
      this.getChat();
    });
  }

  addChat() {
    this.appService.postAddChat({message: this.message, sender: this.sender}, this.param).subscribe();
  }

  getChat() {
    this.appService.getChatById(this.param).subscribe(data => {
      this.messages = data;
    });
  }

}
