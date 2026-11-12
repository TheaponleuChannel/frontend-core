export type HighlightLanguage = 'html' | 'ts' | 'css' | 'bash' | 'text';

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const token = (className: string, value: string): string =>
  value ? `<span class="${className}">${value}</span>` : '';

/**
 * Dependency-free highlighter for the small set of languages used by the docs.
 * Input is authored in this repo, and every segment is escaped before it is
 * wrapped in a span, so the result is safe to render with `innerHTML`.
 */
export function highlight(code: string, language: HighlightLanguage = 'html'): string {
  switch (language) {
    case 'html':
      return highlightMarkup(code);
    case 'ts':
      return highlightTypeScript(code);
    case 'css':
      return highlightCss(code);
    case 'bash':
      return highlightBash(code);
    default:
      return escapeHtml(code);
  }
}

function highlightMarkup(code: string): string {
  const tagPattern =
    /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z][\w:.-]*)((?:[^>"']|"[^"]*"|'[^']*')*)(\/?>)/g;

  let output = '';
  let lastIndex = 0;

  for (const match of code.matchAll(tagPattern)) {
    const index = match.index ?? 0;

    output += highlightMarkupText(code.slice(lastIndex, index));

    if (match[1]) {
      output += token('tok-comment', escapeHtml(match[1]));
    } else {
      output += token('tok-punct', escapeHtml(match[2]));
      output += token('tok-tag', escapeHtml(match[3]));
      output += highlightAttributes(match[4]);
      output += token('tok-punct', escapeHtml(match[5]));
    }

    lastIndex = index + match[0].length;
  }

  return output + highlightMarkupText(code.slice(lastIndex));
}

function highlightMarkupText(text: string): string {
  return escapeHtml(text).replace(/(\{\{[\s\S]*?\}\})/g, (interpolation) =>
    token('tok-interp', interpolation)
  );
}

function highlightAttributes(raw: string): string {
  let output = '';
  let lastIndex = 0;

  for (const match of raw.matchAll(/([#*@\w][\w.:@$()[\]]*)(\s*=\s*)?("[^"]*"|'[^']*')?/g)) {
    const index = match.index ?? 0;

    output += escapeHtml(raw.slice(lastIndex, index));
    output += token('tok-attr', escapeHtml(match[1]));

    if (match[2]) {
      output += escapeHtml(match[2]);
    }

    if (match[3]) {
      output += token('tok-string', escapeHtml(match[3]));
    }

    lastIndex = index + match[0].length;
  }

  return output + escapeHtml(raw.slice(lastIndex));
}

const TS_TOKEN_PATTERN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|\b(import|from|export|default|class|implements|extends|interface|type|const|let|var|function|return|new|this|public|private|protected|readonly|async|await|if|else|for|of|in|switch|case|break|throw|try|catch|void|boolean|string|number|unknown|never|any)\b|(@[A-Za-z_][\w.]*)|\b(\d+(?:\.\d+)?)\b|([A-Z][A-Za-z0-9_]*)/g;

function highlightTypeScript(code: string): string {
  let output = '';
  let lastIndex = 0;

  for (const match of code.matchAll(TS_TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    output += escapeHtml(code.slice(lastIndex, index));

    if (match[1]) {
      output += token('tok-comment', escapeHtml(match[1]));
    } else if (match[2]) {
      output += token('tok-string', escapeHtml(match[2]));
    } else if (match[3]) {
      output += token('tok-keyword', escapeHtml(match[3]));
    } else if (match[4]) {
      output += token('tok-decorator', escapeHtml(match[4]));
    } else if (match[5]) {
      output += token('tok-number', escapeHtml(match[5]));
    } else if (match[6]) {
      output += token('tok-type', escapeHtml(match[6]));
    }

    lastIndex = index + match[0].length;
  }

  return output + escapeHtml(code.slice(lastIndex));
}

const CSS_TOKEN_PATTERN =
  /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(@[\w-]+)|(--[\w-]+)|([\w-]+)(?=\s*:)|(\b\d+(?:\.\d+)?(?:px|rem|em|%|ms|s|vh|vw|fr|deg)?\b)/g;

function highlightCss(code: string): string {
  let output = '';
  let lastIndex = 0;

  for (const match of code.matchAll(CSS_TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    output += escapeHtml(code.slice(lastIndex, index));

    if (match[1]) {
      output += token('tok-comment', escapeHtml(match[1]));
    } else if (match[2]) {
      output += token('tok-string', escapeHtml(match[2]));
    } else if (match[3]) {
      output += token('tok-keyword', escapeHtml(match[3]));
    } else if (match[4]) {
      output += token('tok-attr', escapeHtml(match[4]));
    } else if (match[5]) {
      output += token('tok-tag', escapeHtml(match[5]));
    } else if (match[6]) {
      output += token('tok-number', escapeHtml(match[6]));
    }

    lastIndex = index + match[0].length;
  }

  return output + escapeHtml(code.slice(lastIndex));
}

function highlightBash(code: string): string {
  return code
    .split('\n')
    .map((line) => {
      if (line.trimStart().startsWith('#')) {
        return token('tok-comment', escapeHtml(line));
      }

      const match = /^(\$ )?(.*)$/.exec(line);
      if (!match) {
        return escapeHtml(line);
      }

      let body = escapeHtml(match[2] ?? '');
      body = body.replace(/^(\S+)/, (command) => token('tok-command', command));
      body = body.replace(/(\s)(--?[\w-]+)/g, (_full, space: string, flag: string) =>
        `${space}${token('tok-attr', flag)}`
      );

      return token('tok-punct', escapeHtml(match[1] ?? '')) + body;
    })
    .join('\n');
}
