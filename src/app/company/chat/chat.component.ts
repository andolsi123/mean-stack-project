import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats;

  constructor(private appService: AppService, private route: Router) {
    this.appService.getChatByCompany(this.appService.connectedUser.data.company).subscribe(dt => {
      this.chats = dt;
    });
  }

  chatDetails(id) {
    this.route.navigate(['/company/chatting', id]);
  }

  ngOnInit() { }

}
