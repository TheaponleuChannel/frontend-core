import { Component } from '@angular/core';
import { ButtonComponent } from '../../../core-ui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
  onButtonClick(event: MouseEvent) {
    console.log('Button clicked!', event);
  }
}
