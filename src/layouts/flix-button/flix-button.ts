import { Component, input } from '@angular/core';

type ButtonType = "primary" | "secondary" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

@Component({
  selector: 'flix-button',
  imports: [],
  templateUrl: './flix-button.html',
  styleUrl: './flix-button.css',
})
export class FlixButton {
  type = input<ButtonType>();
  size = input<ButtonSize>();

  get classes(): Array<string> {
    const classes = [];

    if (this.type()) classes.push(`btn-${this.type()}`);
    if (this.size()) classes.push(`btn-${this.size()}`);

    return classes;
  }
}
