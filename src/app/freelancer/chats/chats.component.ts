import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {

  chats;

  constructor(private appService: AppService, private route: Router) {
    this.appService.getChatByFreelancer(this.appService.connectedUser.data.freelancer).subscribe(dt => {
      this.chats = dt;
    });
  }

  chatDetails(id) {
    this.route.navigate(['/freelancer/chats', id]);
  }

}
