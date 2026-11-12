import { Component, computed, input, signal } from '@angular/core';
import { HighlightLanguage } from '../../utils/highlight';
import { CodeBlockComponent } from '../code-block/code-block.component';

interface DemoTab {
  id: string;
  label: string;
  code: string;
  language: HighlightLanguage;
}

@Component({
  selector: 'docs-demo-card',
  standalone: true,
  imports: [CodeBlockComponent],
  templateUrl: './demo-card.component.html',
  styleUrl: './demo-card.component.scss',
})
export class DemoCardComponent {
  readonly title = input('');
  readonly description = input('');
  readonly html = input('');
  readonly ts = input('');
  readonly css = input('');
  readonly stageLabel = input('Preview');
  readonly padded = input(true);
  readonly startOpen = input(false);

  readonly codeOpen = signal(false);
  readonly activeTabId = signal('html');

  readonly tabs = computed<DemoTab[]>(() => {
    const tabs: DemoTab[] = [];

    if (this.html()) {
      tabs.push({ id: 'html', label: 'HTML', code: this.html(), language: 'html' });
    }
    if (this.ts()) {
      tabs.push({ id: 'ts', label: 'TypeScript', code: this.ts(), language: 'ts' });
    }
    if (this.css()) {
      tabs.push({ id: 'css', label: 'CSS', code: this.css(), language: 'css' });
    }

    return tabs;
  });

  readonly hasCode = computed(() => this.tabs().length > 0);

  readonly activeTab = computed(
    () => this.tabs().find((tab) => tab.id === this.activeTabId()) ?? this.tabs()[0]
  );

  constructor() {
    this.codeOpen.set(this.startOpen());
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
    this.codeOpen.set(true);
  }

  toggleCode(): void {
    this.codeOpen.update((open) => !open);
  }
}
