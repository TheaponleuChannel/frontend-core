import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  readonly suggestions = [
    { label: 'Getting started', path: '/getting-started' },
    { label: 'Button', path: '/components/button' },
    { label: 'Label', path: '/components/label' },
  ];
}
