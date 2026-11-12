import { Component, input } from '@angular/core';

export interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'docs-prop-table',
  standalone: true,
  templateUrl: './prop-table.component.html',
  styleUrl: './prop-table.component.scss',
})
export class PropTableComponent {
  readonly columns = input<[string, string, string, string]>([
    'Property',
    'Type',
    'Default',
    'Description',
  ]);
  readonly rows = input.required<PropRow[]>();
}
