import { Type } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { COMPONENT_REGISTRY } from './data/component-registry';

/** Each docs page is lazy-loaded; the URL comes from the component registry. */
const componentPages: Record<string, () => Promise<Type<unknown>>> = {
  button: () =>
    import('./pages/components/button/button-docs.component').then((m) => m.ButtonDocsComponent),
  label: () =>
    import('./pages/components/label/label-docs.component').then((m) => m.LabelDocsComponent),
};

const componentRoutes: Route[] = COMPONENT_REGISTRY.map((entry) => ({
  path: `components/${entry.slug}`,
  title: `${entry.name} · Core UI`,
  loadComponent: componentPages[entry.slug],
  data: { slug: entry.slug },
}));

export const routes: Routes = [
  {
    path: '',
    title: 'Core UI · Angular component library',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'getting-started',
    title: 'Getting started · Core UI',
    loadComponent: () =>
      import('./pages/getting-started/getting-started.component').then(
        (m) => m.GettingStartedComponent
      ),
  },
  ...componentRoutes,
  { path: 'components', pathMatch: 'full', redirectTo: 'components/button' },
  {
    path: '**',
    title: 'Page not found · Core UI',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
