import { Component } from '@angular/core';
import { SuperInterface } from './super-interface';
import {Heros  } from "./hero";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperWar4';
  constructor() {}
  players: SuperInterface[];
  ngOnInit(): void {
    this.players = Heros;
    console.log(this.players);
    this.viewPlayers(this.initPlayers(this.players));
  }
  initPlayers = (players) => {
    let detailedPlayers = '';
    detailedPlayers = players.map((text, index) => ({
      name: players[index].name,
      strength: this.getRandomStrength(),
      image: '../../assets/super-' + (index + 1) + '.png',
      type: 'hero|villian',
    }));

    return detailedPlayers;
  };


  // getting random strength
  getRandomStrength = () => {
    return Math.ceil(Math.random() * 100);
  };

  // Build player template
  buildPlayers = (players, type) => {
    let fragment = '';
    if (type == 'hero') {
      players.filter((item, index) => {
        if (index % 2) {
          fragment += `<div class="player">
            <img src="${players[index].image}" alt="">
            <div class="name">${players[index].name}</div>
            <div class="strength">${Math.ceil(Math.random() * 100)}</div>
        </div>`;
        }
      });
    } else {
      players.filter((item, index) => {
        if (!(index % 2)) {
          fragment += `<div class="player">
            <img src="${players[index].image}" alt="">
            <div class="name">${players[index].name}</div>
            <div class="strength">${players[index].strength}</div>
        </div>`;
        }
      });
    }

    // Instead of using for loop
    // Use chaining of Array methods - filter, map and join
    // Type your code here
    return fragment;
  };

  // Display players in HTML
  viewPlayers = (players) => {
    document.getElementById('heroes').innerHTML = this.buildPlayers(
      players,
      'hero'
    );
    document.getElementById('villains').innerHTML = this.buildPlayers(
      players,
      'villain'
    );
  };

}
