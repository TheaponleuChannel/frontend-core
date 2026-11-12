import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pl-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() variant: 'filled' | 'outlined' | 'text' = 'filled';
  @Output() clicked = new EventEmitter<MouseEvent>();
}
