import { Component, input, output} from "@angular/core";
import { Game } from "./game.model";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FlixButton } from "../../layouts/flix-button/flix-button";

// indique que la balise <game-card> va appeler le template html
@Component ({
    imports: [NgOptimizedImage, FlixButton, RouterLink],
    selector: 'game-card',
    templateUrl: './game-card.template.html'
})

export class GameCard {
    // Input détermine une propriété configurable de notre composant
    game = input.required<Game>();

    favorite = output<number>();
    isFavorite = input<boolean>(false);

    // avec le mot clé get → appel sans les parenthèses
    get wishlistLabel(): string {
        const verb = this.isFavorite() ? "Retirer de" : "Ajouter à";
        return `${verb} la whishlist`;
    }
}