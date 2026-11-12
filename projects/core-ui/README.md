# CoreUi

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Code scaffolding

Run `ng generate component component-name --project core-ui` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project core-ui`.
> Note: Don't forget to add `--project core-ui` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build core-ui` to build the project. The build artifacts will be stored in the `dist/` directory.

## Theming

The library provides a shared theme stylesheet with light and dark palettes for page backgrounds, surfaces, and semantic colors, including contrasting foreground colors. It follows the consumer's operating-system color preference by default; consumers can force a theme by setting `data-theme="light"` or `data-theme="dark"` on `<html>`.

Load `core-ui/lib/theme.css` once in the consuming app's global styles. For example, add it to the app's Angular `styles` array before its own global stylesheet.

Consumers can optionally override the three semantic colors in their global stylesheet:

```css
:root {
  --pl-color-primary: #6750a4;
  --pl-color-secondary: #e8def8;
  --pl-color-danger: #ba1a1a;
}
```

`<pl-button color="primary">` uses `--pl-color-primary` and `--pl-color-on-primary`; `secondary` and `danger` use their corresponding tokens. If consumers override a background color, they can also set its `--pl-color-on-*` foreground token for the desired contrast.

Buttons support `filled` (the default), `outlined`, and `text` variants:

```html
<pl-button color="primary" variant="outlined">Outlined</pl-button>
<pl-button color="danger" variant="text">Text</pl-button>
```

## Publishing

After building your library with `ng build core-ui`, go to the dist folder `cd dist/core-ui` and run `npm publish`.

## Running unit tests

Run `ng test core-ui` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
