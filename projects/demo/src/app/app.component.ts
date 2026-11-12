import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DocsSidebarComponent } from './layout/docs-sidebar/docs-sidebar.component';
import { ThemeToggleComponent } from './layout/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DocsSidebarComponent, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly sidebarOpen = signal(false);
  readonly scrolled = signal(false);
  readonly progress = signal(0);
  readonly year = new Date().getFullYear();

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const root = document.documentElement;
    const maxScroll = root.scrollHeight - root.clientHeight;

    this.progress.set(maxScroll > 0 ? Math.min(1, root.scrollTop / maxScroll) : 0);
    this.scrolled.set(root.scrollTop > 8);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeSidebar();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
