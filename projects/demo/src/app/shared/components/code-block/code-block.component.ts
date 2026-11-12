import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { HighlightLanguage, highlight } from '../../utils/highlight';

@Component({
  selector: 'docs-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<HighlightLanguage>('html');
  readonly label = input('');

  readonly highlighted = computed(() => highlight(this.code(), this.language()));
  readonly copied = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private resetTimer?: ReturnType<typeof setTimeout>;

  async copy(): Promise<void> {
    const text = this.code();

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        this.copyFallback(text);
      }

      this.copied.set(true);
      clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => this.copied.set(false), 1800);
      this.destroyRef.onDestroy(() => clearTimeout(this.resetTimer));
    } catch {
      // Clipboard permissions can be denied; leave the button untouched.
    }
  }

  private copyFallback(text: string): void {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
  }
}
