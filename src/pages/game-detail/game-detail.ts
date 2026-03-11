import { Component, computed, inject } from '@angular/core';
import { GameCatalog } from '../../features/game/game-catalog';
import { Game } from '../../features/game/game.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FlixButton } from "../../layouts/flix-button/flix-button";

@Component({
  selector: 'game-detail',
  imports: [FlixButton, RouterLink],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetail {
  protected readonly route = inject(ActivatedRoute);
  protected catalog = inject(GameCatalog);

  private readonly gameId = parseInt(this.route.snapshot.paramMap.get("id") ?? "");

  protected game = computed<Game | undefined>(() => this.catalog.getGameSheet(this.gameId));
}