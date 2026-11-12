import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@core-ui';
import { COMPONENT_REGISTRY, COMPONENT_ROADMAP } from '../../data/component-registry';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent, CodeBlockComponent, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly components = COMPONENT_REGISTRY;
  readonly roadmap = COMPONENT_ROADMAP;

  readonly installSnippet = `# From a workspace app
ng build core-ui

# Once published to a registry
npm install core-ui`;

  readonly themeSnippet = `/* app/styles.scss */
@import 'core-ui/theme.css';

:root {
  --pl-color-primary: #6d28d9;
}`;

  readonly colors: ReadonlyArray<'primary' | 'secondary' | 'danger'> = [
    'primary',
    'secondary',
    'danger',
  ];
  readonly variants: ReadonlyArray<'filled' | 'outlined' | 'text'> = [
    'filled',
    'outlined',
    'text',
  ];

  readonly previewColor = signal<'primary' | 'secondary' | 'danger'>('primary');
  readonly previewVariant = signal<'filled' | 'outlined' | 'text'>('filled');
  readonly clicks = signal(0);

  setColor(color: 'primary' | 'secondary' | 'danger'): void {
    this.previewColor.set(color);
  }

  setVariant(variant: 'filled' | 'outlined' | 'text'): void {
    this.previewVariant.set(variant);
  }

  onPreviewClick(): void {
    this.clicks.update((count) => count + 1);
  }
}
