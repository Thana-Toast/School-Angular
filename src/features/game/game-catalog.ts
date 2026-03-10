import { computed, Injectable, signal } from '@angular/core';
import { Game } from './game.model';

// pour indiquer qu'on veut utiliser notre classe à d'autres endroits de notre code
@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
  protected readonly _onlyAvailable = signal<boolean>(false);

  // protection au runtime de l'objet signal associé pour être certain que le signal ne peut pas être modifié à l'extérieur
  readonly onlyAvailable = this._onlyAvailable.asReadonly();

    // Signal principal: source de verite locale de la liste de jeux.
    protected readonly games = signal<Game[]>([
        { id: 1, title: 'Cyber Nexus 2077', genre: 'RPG', category: 'Nouveautes', year: 2023, platform: 'PC, PS5, Xbox', rating: 4.5, synopsis: 'Un RPG futuriste dans un monde cyberpunk.', available: true, image: 'https://via.assets.so/game.png?id=1&q=95&w=300&h=450&fit=cover' },
        { id: 2, title: 'Stellar Odyssey', genre: 'Aventure', category: 'Nouveautes', year: 2023, platform: 'PC, PS5', rating: 4.8, synopsis: 'Une aventure spatiale epique.', available: true, image: 'https://via.assets.so/game.png?id=2&q=95&w=300&h=450&fit=cover' },
        { id: 3, title: 'Shadow Legends', genre: 'Action', category: 'Populaires', year: 2022, platform: 'PC, Xbox', rating: 4.2, synopsis: 'Combattez les forces des tenebres.', available: false, image: 'https://via.assets.so/game.png?id=3&q=95&w=300&h=450&fit=cover' },
        { id: 4, title: 'Racing Thunder', genre: 'Course', category: 'Populaires', year: 2022, platform: 'PS5, Xbox', rating: 4.0, synopsis: 'Des courses a couper le souffle.', available: true, image: 'https://via.assets.so/game.png?id=4&q=95&w=300&h=450&fit=cover' },
        { id: 5, title: 'Fantasy Kingdom', genre: 'RPG', category: 'Classiques', year: 2020, platform: 'PC', rating: 4.7, synopsis: 'Un monde fantastique vous attend.', available: true, image: 'https://via.assets.so/game.png?id=5&q=95&w=300&h=450&fit=cover' },
        { id: 6, title: 'Zombie Survival', genre: 'Horreur', category: 'Classiques', year: 2021, platform: 'PC, PS5, Xbox', rating: 3.9, synopsis: 'Survivez a l apocalypse zombie.', available: false, image: 'https://via.assets.so/game.png?id=6&q=95&w=300&h=450&fit=cover' },
    ]);

    readonly visibleGames = computed(() => {
        if (!this._onlyAvailable()) return this.games()
        return this.games().filter((game) => game.available)
    })

    protected _favoriteGameIds = signal<number[]>([])

    readonly favoriteGameIds = this._favoriteGameIds.asReadonly()

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
}
