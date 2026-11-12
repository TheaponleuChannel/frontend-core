import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { componentNeighbours } from '../../../data/component-registry';

@Component({
  selector: 'docs-pager',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './docs-pager.component.html',
  styleUrl: './docs-pager.component.scss',
})
export class DocsPagerComponent {
  readonly slug = input.required<string>();

  readonly neighbours = computed(() => componentNeighbours(this.slug()));
}
