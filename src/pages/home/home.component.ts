import { Component, signal, computed, inject, OnInit } from "@angular/core";
import { FlixButton } from "../../layouts/flix-button/flix-button";
import { GameSection } from "../../layouts/game-section/game-section";
import { NgOptimizedImage } from "@angular/common";
import { GameCard } from "../../features/game/game-card.components";
import { Game } from "../../features/game/game.model";
import { GameCatalog } from "../../features/game/game-catalog";

@Component ({
    selector: "home",
    templateUrl: "./home.page.html",
    imports: [NgOptimizedImage, FlixButton, GameSection, GameCard]
})

export class Home implements OnInit {
    protected readonly catalog = inject(GameCatalog);

    ngOnInit() {
        this.catalog.loadGames();
    }
}