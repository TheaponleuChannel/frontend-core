import { Component, Input } from '@angular/core';

@Component({
  selector: 'pl-label',
  standalone: true,
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css'
})
export class LabelComponent {
  @Input() for: string = '';
}
