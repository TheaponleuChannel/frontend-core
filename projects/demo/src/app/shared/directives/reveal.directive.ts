import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';

/**
 * Fades and lifts an element into view the first time it enters the viewport.
 * Server rendering and reduced-motion users get the final state immediately.
 */
@Directive({
  selector: '[docsReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() docsRevealDelay = 0;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.injector.get(PLATFORM_ID))) {
      return;
    }

    const node = this.element.nativeElement;
    const view = node.ownerDocument.defaultView;
    const reduceMotion = view?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (!view || reduceMotion || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-revealed');
      return;
    }

    node.classList.add('reveal');
    node.style.setProperty('--reveal-delay', `${this.docsRevealDelay}ms`);

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    this.observer = observer;
    observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
