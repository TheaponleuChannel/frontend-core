import { Component, computed, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { COMPONENT_ROADMAP, groupComponents } from '../../data/component-registry';

interface GuideLink {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './docs-sidebar.component.html',
  styleUrl: './docs-sidebar.component.scss',
})
export class DocsSidebarComponent {
  readonly navigated = output<void>();

  readonly guides: GuideLink[] = [
    { label: 'Overview', path: '/', exact: true },
    { label: 'Getting started', path: '/getting-started', exact: false },
  ];

  readonly roadmap = COMPONENT_ROADMAP;
  readonly groups = groupComponents();
  readonly query = signal('');

  readonly filteredGroups = computed(() => {
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return this.groups;
    }

    return this.groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          [item.name, item.selector, item.summary, ...item.tags]
            .join(' ')
            .toLowerCase()
            .includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  });

  readonly resultCount = computed(() =>
    this.filteredGroups().reduce((total, group) => total + group.items.length, 0)
  );

  onFilterInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  clearFilter(): void {
    this.query.set('');
  }

  onNavigate(): void {
    this.navigated.emit();
  }
}
