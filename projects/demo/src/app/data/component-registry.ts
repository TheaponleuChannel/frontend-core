export type ComponentStatus = 'stable' | 'beta' | 'new';

export interface ComponentDocEntry {
  /** URL segment used by `/components/:slug`. */
  slug: string;
  name: string;
  selector: string;
  summary: string;
  group: string;
  status: ComponentStatus;
  since: string;
  tags: string[];
}

/**
 * Single source of truth for the docs navigation, component index and pager.
 * Adding a component means adding an entry here plus its page + lazy route.
 */
export const COMPONENT_REGISTRY: readonly ComponentDocEntry[] = [
  {
    slug: 'button',
    name: 'Button',
    selector: 'pl-button',
    summary:
      'Triggers an action. Supports three color roles, three visual variants and a disabled state.',
    group: 'Actions',
    status: 'stable',
    since: '0.0.1',
    tags: ['action', 'click', 'submit', 'form', 'cta'],
  },
  {
    slug: 'label',
    name: 'Label',
    selector: 'pl-label',
    summary:
      'Names a form control. Pair it with the control id so screen readers announce the right field.',
    group: 'Content',
    status: 'stable',
    since: '0.0.1',
    tags: ['form', 'text', 'accessibility', 'caption'],
  },
];

/** Announced components, rendered as non-interactive "soon" entries. */
export const COMPONENT_ROADMAP: readonly string[] = ['Input', 'Checkbox', 'Select', 'Card', 'Badge', 'Tooltip'];

export interface ComponentGroup {
  name: string;
  items: ComponentDocEntry[];
}

export function groupComponents(
  entries: readonly ComponentDocEntry[] = COMPONENT_REGISTRY
): ComponentGroup[] {
  const groups = new Map<string, ComponentDocEntry[]>();

  for (const entry of entries) {
    const bucket = groups.get(entry.group) ?? [];
    bucket.push(entry);
    groups.set(entry.group, bucket);
  }

  return [...groups.entries()].map(([name, items]) => ({ name, items }));
}

export function findComponent(slug: string): ComponentDocEntry | undefined {
  return COMPONENT_REGISTRY.find((entry) => entry.slug === slug);
}

export function componentNeighbours(slug: string): {
  previous?: ComponentDocEntry;
  next?: ComponentDocEntry;
} {
  const index = COMPONENT_REGISTRY.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previous: COMPONENT_REGISTRY[index - 1],
    next: COMPONENT_REGISTRY[index + 1],
  };
}
