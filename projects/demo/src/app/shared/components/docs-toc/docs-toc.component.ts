import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

export interface TocSection {
  id: string;
  label: string;
}

@Component({
  selector: 'docs-toc',
  standalone: true,
  templateUrl: './docs-toc.component.html',
  styleUrl: './docs-toc.component.scss',
})
export class DocsTocComponent {
  readonly sections = input.required<TocSection[]>();

  readonly activeId = signal('');

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;

      if (!view || typeof IntersectionObserver === 'undefined') {
        return;
      }

      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

          if (visible) {
            this.activeId.set(visible.target.id);
          }
        },
        { rootMargin: '-88px 0px -68% 0px', threshold: 0 }
      );

      for (const section of this.sections()) {
        const element = this.document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      }

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
