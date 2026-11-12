import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { DocsTocComponent, TocSection } from '../../shared/components/docs-toc/docs-toc.component';
import { PropRow, PropTableComponent } from '../../shared/components/prop-table/prop-table.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, DocsTocComponent, PropTableComponent, RevealDirective],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
  readonly sections: TocSection[] = [
    { id: 'installation', label: 'Installation' },
    { id: 'global-theme', label: 'Global theme' },
    { id: 'usage', label: 'Use a component' },
    { id: 'tokens', label: 'Design tokens' },
    { id: 'dark-mode', label: 'Dark mode' },
    { id: 'adding-components', label: 'Adding components' },
  ];

  readonly installSnippet = `# Build the library from the workspace
ng build core-ui

# Link the build output into the app
npm install ./dist/core-ui`;

  readonly angularJsonSnippet = `"styles": [
  "projects/core-ui/src/lib/theme.css",
  "src/styles.scss"
]`;

  readonly usageSnippet = `import { Component } from '@angular/core';
import { ButtonComponent } from 'core-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './example.component.html',
})
export class ExampleComponent {}`;

  readonly usageHtmlSnippet = `<pl-button color="primary" variant="filled">
  Save changes
</pl-button>`;

  readonly overrideSnippet = `/* Your global stylesheet, loaded after theme.css */
:root {
  --pl-color-primary: #6d28d9;
  --pl-color-on-primary: #ffffff;
  --pl-color-danger: #be123c;
}`;

  readonly darkModeSnippet = `// Force a theme: 'light' | 'dark'
document.documentElement.setAttribute('data-theme', 'dark');

// Remove the attribute to follow the operating system again
document.documentElement.removeAttribute('data-theme');`;

  readonly registrySnippet = `// 1. Describe the component once.
export const COMPONENT_REGISTRY = [
  ...,
  {
    slug: 'card',
    name: 'Card',
    selector: 'pl-card',
    summary: 'Groups related content.',
    group: 'Layout',
    status: 'stable',
    since: '0.1.0',
    tags: ['container', 'surface'],
  },
];

// 2. Add its lazy docs page next to the existing ones.
const componentPages = {
  ...,
  card: () =>
    import('./pages/components/card/card-docs.component').then(
      (m) => m.CardDocsComponent
    ),
};`;

  readonly tokenRows: PropRow[] = [
    { name: '--pl-color-background', type: 'color', default: '#ffffff', description: 'Page background.' },
    { name: '--pl-color-on-background', type: 'color', default: '#111827', description: 'Text and icons on the page background.' },
    { name: '--pl-color-primary', type: 'color', default: '#2563eb', description: 'Primary actions and highlights.' },
    { name: '--pl-color-on-primary', type: 'color', default: '#ffffff', description: 'Content rendered on primary surfaces.' },
    { name: '--pl-color-secondary', type: 'color', default: '#e5e7eb', description: 'Lower-emphasis actions and surfaces.' },
    { name: '--pl-color-on-secondary', type: 'color', default: '#111827', description: 'Content rendered on secondary surfaces.' },
    { name: '--pl-color-danger', type: 'color', default: '#dc2626', description: 'Destructive or error actions.' },
    { name: '--pl-color-on-danger', type: 'color', default: '#ffffff', description: 'Content rendered on danger surfaces.' },
    { name: '--pl-color-surface', type: 'color', default: '#f9fafb', description: 'Raised cards, panels and inputs.' },
    { name: '--pl-color-on-surface', type: 'color', default: '#111827', description: 'Content rendered on surfaces.' },
  ];
}
