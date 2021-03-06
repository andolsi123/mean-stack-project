import { Component, OnInit, ElementRef } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    logo: any;
    id_company: any;
    company: any;
    notificationNumber = 0;
    notifications;
    constructor(private socket: Socket, location: Location, private element: ElementRef, private router: Router, private route: ActivatedRoute, public appService: AppService) {
      this.location = location;
      this.sidebarVisible = false;
    }
    notificationsRemove() {
      this.appService.notificationRemove(this.id_company).subscribe(dt => dt);
    }

    ngOnInit() {
      this.socket.on('newNotificationAdded', () => {
        this.appService.getOneCompany(this.id_company).subscribe((comp: any) => {
          this.company = comp;
          });
      });
      this.id_company = this.appService.connectedUser.data.company;
      this.appService.getOneCompany(this.id_company).subscribe((comp: any) => {
      this.company = comp;
      this.logo = this.company.logo;
      });
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
        var $layer: any = document.getElementsByClassName('close-layer')[0];
        if ($layer) {
          $layer.remove();
          this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(() => {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    }
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }
    sidebarToggle() {
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];
        if (this.mobile_menu_visible === 1) {
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(() => {
                $toggle.classList.remove('toggled');
            }, 400);
            this.mobile_menu_visible = 0;
        } else {
            setTimeout(() => {
                $toggle.classList.add('toggled');
            }, 430);
            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');
            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }
            setTimeout(() => {
                $layer.classList.add('visible');
            }, 100);
            $layer.onclick = function() {
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(() => {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);
            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;
        }
    }

    LogOut() {
        this.router.navigate(['landing-page/log-in']);
        localStorage.removeItem('token');
    }

    showEdit() {
        this.router.navigate(['/company/edite-profil']);
      }

    showProfil() {
        this.router.navigate(['/company/profil']);
    }

}
