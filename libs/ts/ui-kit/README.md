# Garnet UI Kit

The **ui-kit** package contains shared UI design system tokens, color palettes, theme providers, and reusable frontend component exports.

---

## Directory Structure

```plaintext
ui-kit/
├── README.md                       # Design system documentation
└── src/
    └── index.ts                    # UI Kit component exports
```

---

## Code Examples

### 1. UI Kit Exports (`src/index.ts`)

```typescript
export const GarnetTheme = {
  colors: {
    primary: '#6366f1',
    secondary: '#06b6d4',
    background: '#0f172a',
  },
  borderRadius: '8px',
};

export type ThemeConfig = typeof GarnetTheme;
```
