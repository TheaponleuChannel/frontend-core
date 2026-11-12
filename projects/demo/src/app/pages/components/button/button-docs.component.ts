import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '@core-ui';
import { findComponent } from '../../../data/component-registry';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { DemoCardComponent } from '../../../shared/components/demo-card/demo-card.component';
import { DocsPagerComponent } from '../../../shared/components/docs-pager/docs-pager.component';
import { DocsTocComponent, TocSection } from '../../../shared/components/docs-toc/docs-toc.component';
import { PropRow, PropTableComponent } from '../../../shared/components/prop-table/prop-table.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

type ButtonColor = 'primary' | 'secondary' | 'danger';
type ButtonVariant = 'filled' | 'outlined' | 'text';

@Component({
  selector: 'app-button-docs',
  standalone: true,
  imports: [
    ButtonComponent,
    CodeBlockComponent,
    DemoCardComponent,
    DocsTocComponent,
    DocsPagerComponent,
    PropTableComponent,
    RevealDirective,
  ],
  templateUrl: './button-docs.component.html',
  styleUrl: './button-docs.component.scss',
})
export class ButtonDocsComponent {
  readonly entry = findComponent('button');
  readonly slug = 'button';

  readonly sections: TocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'playground', label: 'Playground' },
    { id: 'examples', label: 'Examples' },
    { id: 'api', label: 'API reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  readonly colors: ReadonlyArray<ButtonColor> = ['primary', 'secondary', 'danger'];
  readonly variants: ReadonlyArray<ButtonVariant> = ['filled', 'outlined', 'text'];

  readonly importSnippet = `import { ButtonComponent } from 'core-ui';`;

  readonly basicHtml = `<pl-button color="primary" variant="filled">
  Save changes
</pl-button>`;

  readonly variantsHtml = `<pl-button color="primary" variant="filled">Filled</pl-button>
<pl-button color="primary" variant="outlined">Outlined</pl-button>
<pl-button color="primary" variant="text">Text</pl-button>`;

  readonly colorsHtml = `<pl-button color="primary">Primary</pl-button>
<pl-button color="secondary">Secondary</pl-button>
<pl-button color="danger">Danger</pl-button>`;

  readonly disabledHtml = `<pl-button color="danger" [disabled]="true">
  Delete account
</pl-button>`;

  readonly clickHtml = `<pl-button color="primary" (clicked)="onSave($event)">
  Save changes
</pl-button>`;

  readonly clickTs = `import { Component } from '@angular/core';
import { ButtonComponent } from 'core-ui';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './save-button.component.html',
})
export class SaveButtonComponent {
  onSave(event: MouseEvent): void {
    console.log('clicked', event);
  }
}`;

  readonly propRows: PropRow[] = [
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'danger'",
      default: "'primary'",
      description: 'Semantic color role. Maps to the matching --pl-color-* tokens.',
    },
    {
      name: 'variant',
      type: "'filled' | 'outlined' | 'text'",
      default: "'filled'",
      description: 'Visual emphasis of the button.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables interaction and applies the native disabled attribute.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'Native button type, forwarded to the inner <button>.',
    },
    {
      name: 'clicked',
      type: 'EventEmitter<MouseEvent>',
      default: '—',
      description: 'Emitted on click with the native MouseEvent.',
    },
  ];

  // Playground state
  readonly playgroundColor = signal<ButtonColor>('primary');
  readonly playgroundVariant = signal<ButtonVariant>('filled');
  readonly playgroundDisabled = signal(false);
  readonly playgroundLabel = signal('Save changes');
  readonly playgroundClicks = signal(0);

  readonly playgroundSnippet = computed(() => {
    const attributes = [
      `color="${this.playgroundColor()}"`,
      `variant="${this.playgroundVariant()}"`,
    ];

    if (this.playgroundDisabled()) {
      attributes.push('[disabled]="true"');
    }

    return `<pl-button ${attributes.join(' ')}>\n  ${this.playgroundLabel()}\n</pl-button>`;
  });

  // Click example state
  readonly exampleClicks = signal(0);

  setPlaygroundColor(color: ButtonColor): void {
    this.playgroundColor.set(color);
  }

  setPlaygroundVariant(variant: ButtonVariant): void {
    this.playgroundVariant.set(variant);
  }

  setPlaygroundDisabled(event: Event): void {
    this.playgroundDisabled.set((event.target as HTMLInputElement).checked);
  }

  setPlaygroundLabel(event: Event): void {
    this.playgroundLabel.set((event.target as HTMLInputElement).value);
  }

  onPlaygroundClick(): void {
    this.playgroundClicks.update((count) => count + 1);
  }

  onExampleClick(): void {
    this.exampleClicks.update((count) => count + 1);
  }
}
