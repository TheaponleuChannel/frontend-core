import { Component, computed, signal } from '@angular/core';
import { LabelComponent } from '@core-ui';
import { findComponent } from '../../../data/component-registry';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { DemoCardComponent } from '../../../shared/components/demo-card/demo-card.component';
import { DocsPagerComponent } from '../../../shared/components/docs-pager/docs-pager.component';
import { DocsTocComponent, TocSection } from '../../../shared/components/docs-toc/docs-toc.component';
import { PropRow, PropTableComponent } from '../../../shared/components/prop-table/prop-table.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-label-docs',
  standalone: true,
  imports: [
    LabelComponent,
    CodeBlockComponent,
    DemoCardComponent,
    DocsTocComponent,
    DocsPagerComponent,
    PropTableComponent,
    RevealDirective,
  ],
  templateUrl: './label-docs.component.html',
  styleUrl: './label-docs.component.scss',
})
export class LabelDocsComponent {
  readonly entry = findComponent('label');
  readonly slug = 'label';

  readonly sections: TocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'playground', label: 'Playground' },
    { id: 'examples', label: 'Examples' },
    { id: 'api', label: 'API reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  readonly importSnippet = `import { LabelComponent } from 'core-ui';`;

  readonly basicHtml = `<pl-label for="email">Email address</pl-label>
<input id="email" name="email" type="email" />`;

  readonly requiredHtml = `<pl-label for="password">Password *</pl-label>
<input id="password" name="password" type="password" required />`;

  readonly composedTs = `import { Component } from '@angular/core';
import { LabelComponent } from 'core-ui';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [LabelComponent],
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent {}`;

  readonly propRows: PropRow[] = [
    {
      name: 'for',
      type: 'string',
      default: "''",
      description: 'Id of the form control this label describes. Always set it.',
    },
  ];

  // Playground state
  readonly playgroundText = signal('Email address');
  readonly playgroundFor = signal('email');
  readonly playgroundValue = signal('');
  readonly playgroundRequired = signal(false);

  readonly playgroundSnippet = computed(() => {
    const labelText = this.playgroundRequired()
      ? `${this.playgroundText() || 'Label'} *`
      : this.playgroundText() || 'Label';

    return `<pl-label for="${this.playgroundFor() || 'email'}">${labelText}</pl-label>\n<input\n  id="${this.playgroundFor() || 'email'}"\n  type="text"\n  [required]="${this.playgroundRequired()}"\n/>`;
  });

  setPlaygroundText(event: Event): void {
    this.playgroundText.set((event.target as HTMLInputElement).value);
  }

  setPlaygroundFor(event: Event): void {
    this.playgroundFor.set((event.target as HTMLInputElement).value);
  }

  setPlaygroundValue(event: Event): void {
    this.playgroundValue.set((event.target as HTMLInputElement).value);
  }

  setPlaygroundRequired(event: Event): void {
    this.playgroundRequired.set((event.target as HTMLInputElement).checked);
  }
}
