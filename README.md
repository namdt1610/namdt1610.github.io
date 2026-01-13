# Nam Dang - Brutalist Portfolio

A "No Bullshit. Just Engineering." portfolio built with [Zola](https://www.getzola.org/) (Rust SSG).

## Quick Start

```bash
# Install Zola
cargo install --locked zola
# or download from https://github.com/getzola/zola/releases

# Development
zola serve

# Build for production
zola build
# Output in public/
```

## Deploy to GitHub Pages

1. Push to `main` branch
2. In GitHub Settings → Pages, set source to `GitHub Actions`
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Zola
        run: |
          wget https://github.com/getzola/zola/releases/download/v0.19.2/zola-v0.19.2-x86_64-unknown-linux-gnu.tar.gz
          tar -xzf zola-*.tar.gz
          sudo mv zola /usr/local/bin/
      - name: Build
        run: zola build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Structure

```
├── config.toml      # Zola config
├── content/         # Markdown content
├── sass/            # SCSS styles
├── static/fonts/    # JetBrains Mono
└── templates/       # Tera templates
```

## Performance

- Build: 15ms
- HTML: 2.7KB (minified)
- CSS: 2.6KB
- No JavaScript
