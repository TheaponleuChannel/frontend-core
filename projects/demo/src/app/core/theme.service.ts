import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'core-ui-theme';

/**
 * Owns the docs-site color mode. The selected mode is mirrored on
 * `<html data-theme>` so the tokens shipped in `core-ui/theme.css` apply.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly initialMode = this.resolveInitialMode();

  readonly mode = signal<ThemeMode>(this.initialMode);
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    if (this.isBrowser) {
      this.document.documentElement.setAttribute('data-theme', this.initialMode);
    }

    effect(() => {
      const mode = this.mode();

      if (!this.isBrowser) {
        return;
      }

      this.document.documentElement.setAttribute('data-theme', mode);

      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // Storage can be unavailable (private mode, embedded views...).
      }
    });
  }

  toggle(): void {
    this.mode.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }

  set(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private resolveInitialMode(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }

    const stored = this.readStoredMode();
    if (stored) {
      return stored;
    }

    const attribute = this.document.documentElement.getAttribute('data-theme');
    if (attribute === 'light' || attribute === 'dark') {
      return attribute;
    }

    const defaultView = this.document.defaultView;
    const prefersDark =
      typeof defaultView?.matchMedia === 'function' &&
      defaultView.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }

  private readStoredMode(): ThemeMode | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }
}
