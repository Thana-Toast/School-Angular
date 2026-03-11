import { computed, inject, Injectable, signal } from '@angular/core';
import { Game } from './game.model';
import { GameDataSource } from './game-data-source';

// pour indiquer qu'on veut utiliser notre classe à d'autres endroits de notre code
@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
    private readonly _dataSource = inject(GameDataSource);

    protected readonly _onlyAvailable = signal<boolean>(false);

    // protection au runtime de l'objet signal associé pour être certain que le signal ne peut pas être modifié à l'extérieur
    readonly onlyAvailable = this._onlyAvailable.asReadonly();

    // Signal principal: source de verite locale de la liste de jeux.
    protected readonly games = signal<Game[]>([]);

    readonly visibleGames = computed(() => {
        if (!this._onlyAvailable()) return this.games()
        return this.games().filter((game) => game.available)
    })

    protected _favoriteGameIds = signal<number[]>([])

    readonly favoriteGameIds = this._favoriteGameIds.asReadonly()

    loadGames(): void {
        this._dataSource.fetchAll().subscribe({
            next: (games) => {
                this.games.set(games);
            }
        })
    }

    // :void pour typer le return
    filterByAvailability(): void {
        // Update immutable sur notre signal games
        this._onlyAvailable.update((available) => !available);
    }

    toggleFavorite(gameId: number): void {
        this._favoriteGameIds.update(gameIds => {
            // let newGameIds: Array<number> = gameIds;

            if (!gameIds.includes(gameId)) {
                // newGameIds.push(gameId);
                // return newGameIds;
                return [...gameIds, gameId]
            }

            return gameIds.filter((oldGameId) => oldGameId !== gameId)
        })
    }

    isFavorite(gameId: number): boolean {
        return this._favoriteGameIds().includes(gameId);
    }

    getGameSheet(gameId: number): Game | undefined {
        return this.games().find((game) => game.id === gameId);
    }
}
