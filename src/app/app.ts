import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GameSection } from '../layouts/game-section/game-section';
import { FlixButton } from '../layouts/flix-button/flix-button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './app.template.html',
})
export class App {
  protected readonly nomApplication = 'WishFlix';
}