# touchpoints-wc

A TypeScript web component built with Lit for collecting yes/no feedback using Touchpoints forms. Features accessible design following USWDS standards with built-in icons and customizable styling.

## Installation

```bash
npm install touchpoints-wc
```

## Usage

Import and use the component in your HTML:

```html
<touchpoints-yesno form-id="your-form-id"></touchpoints-yesno>
```

Or import in JavaScript/TypeScript:

```javascript
import 'touchpoints-wc';

// Component is now available as <touchpoints-yesno>
```

## Features

- **Accessible**: WCAG compliant with proper focus management and ARIA attributes
- **Customizable**: Override icons and labels via attributes or slots
- **Responsive**: Works on all screen sizes
- **TypeScript**: Full TypeScript support with type definitions
- **Lightweight**: ~6KB gzipped, no external dependencies except Lit
- **Shadow DOM**: Encapsulated styling prevents CSS conflicts

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `form-id` | `string` | **required** | The ID of the Touchpoints form to submit feedback to |
| `yes-label` | `string` | `"Yes"` | Custom label for the positive feedback button |
| `no-label` | `string` | `"No"` | Custom label for the negative feedback button |

## Slots

You can customize the icons by providing your own content in these slots:

```html
<touchpoints-yesno form-id="abc123">
  <svg slot="yes-icon" width="20" height="20"><!-- custom yes icon --></svg>
  <svg slot="no-icon" width="20" height="20"><!-- custom no icon --></svg>
</touchpoints-yesno>
```

## Examples

### Basic Usage
```html
<touchpoints-yesno form-id="feedback-form-123"></touchpoints-yesno>
```

### Custom Labels
```html
<touchpoints-yesno 
  form-id="abc123" 
  yes-label="Helpful" 
  no-label="Not helpful">
</touchpoints-yesno>
```

### Custom Icons
```html
<touchpoints-yesno form-id="abc123">
  <span slot="yes-icon">👍</span>
  <span slot="no-icon">👎</span>
</touchpoints-yesno>
```


## Development

```bash
# Install dependencies
pnpm install

# Development mode with hot reload
pnpm dev

# Build for production
pnpm build

# Lint package for npm publishing
pnpm publint
```

## Release Management

This project uses [Changesets](https://changesets.dev/) for version management and publishing. Changesets help maintain semantic versioning and generate changelogs automatically.

### Creating a Changeset

When you make changes that should trigger a release, create a changeset:

```bash
# Create a new changeset
pnpm changeset
```

This will prompt you to:
1. Select which packages have changed (for monorepos)
2. Choose the type of change:
   - **patch**: Bug fixes, small improvements
   - **minor**: New features, backwards compatible changes  
   - **major**: Breaking changes
3. Write a summary of the changes

### Release Process

The release process is automated via GitHub Actions:

1. **During Development**: Create changesets for your changes
2. **Release PR**: When changesets are merged to `main`, a "Release PR" is automatically created
3. **Publishing**: Merging the Release PR will:
   - Update versions in `package.json`
   - Generate/update `CHANGELOG.md`
   - Create a GitHub release
   - Publish to npm

### Manual Release Commands

For manual releases or testing:

```bash
# Update package versions based on changesets
pnpm changeset:version

# Build and publish to npm
pnpm changeset:publish
```

## Technical Details

- Built with [Lit](https://lit.dev/) for reactive web components
- Styled with [UnoCSS](https://unocss.dev/) using USWDS design system
- Compiled with [tsdown](https://tsdown.dev/) for optimal bundle size
- Type definitions included for TypeScript projects