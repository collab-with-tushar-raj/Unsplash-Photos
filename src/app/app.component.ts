import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'PhotoStore';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const signOutBtn = document.querySelector('#root > button');
    signOutBtn.addEventListener(
      'authenticate',
      (e) => {
        console.log('authenticateEvent ' + e);
        this.router.navigate(['/photos']);
      },
      false
    );
    signOutBtn.addEventListener(
      'deauthenticate',
      (e) => {
        console.log('deauthenticateEvent ' + e);
        this.router.navigate(['/']);
      },
      false
    );
  }
}
