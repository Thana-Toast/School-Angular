import { Component, input } from "@angular/core";
import { Game } from "./game.model";
import { NgOptimizedImage } from "@angular/common";

// indique que la balise <game-card> va appeler le template html
@Component ({
    imports: [NgOptimizedImage],
    selector: 'game-card',
    templateUrl: './game-card.template.html'
})

export class GameCard {
    // Input détermine une propriété configurable de notre composant
    game = input.required<Game>();
}