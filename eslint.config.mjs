import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    plugins: ["prettier", "jsx-a11y"],
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
    },
    rules: {
      // Prettier integration - akan warning jika code belum diformat
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
          plugins: ["prettier-plugin-tailwindcss"],
        },
      ], // Warning jika format tidak sesuai Prettier (termasuk Tailwind class sorting)
      // Custom rule untuk detect kebab-case attributes (will be implemented via regex)
      "no-restricted-syntax": [
        "warn",
        {
          // allow data-*
          selector: "JSXAttribute[name.name=/^(?!data-).*-.+$/]",
          message:
            "⚠️ JSX attributes should use camelCase instead of kebab-case. Example: stroke-width → strokeWidth, stroke-linecap → strokeLinecap",
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      // Enforce consistent type exports
      "@typescript-eslint/consistent-type-exports": [
        "error",
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
        },
      ],
      eqeqeq: "error",
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      // Naming conventions - enforce camelCase for variables
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "forbid",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeProperty",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "property", 
          format: null, // Disable format checking untuk property, karena kita handle dengan filter
          leadingUnderscore: "allow",
          // Allow semua format kecuali yang tidak valid
          filter: {
            regex: "^[a-zA-Z_][a-zA-Z0-9_-]*(:?[a-zA-Z0-9_-]*)*(\\.[0-9]+)?$",
            match: true
          }
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE", "PascalCase"],
        },
      ],
      // Additional camelCase enforcement dengan exception untuk CSS classes dan DTO
      camelcase: [
        "error",
        {
          properties: "never", // Allow snake_case, kebab-case, dan dot notation dalam object properties  
          ignoreDestructuring: true,
          ignoreImports: true,
          ignoreGlobals: true,
          allow: ["^[a-zA-Z][a-zA-Z0-9]*(_[a-zA-Z0-9]+)*$", "^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$", "^[a-zA-Z][a-zA-Z0-9]*(\\.[0-9]+)?$"],
        },
      ],
      // Feature boundary enforcement - prevent direct imports from feature internals
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // Restrict relative cross-feature imports
            {
              group: [
                "../../*/hooks/*",
                "../../*/components/*",
                "../../*/utils/*",
                "../../*/types*",
                "../../*/api/*",
                "../../*/services/*",
              ],
              message:
                "❌ Cross-feature imports are forbidden! Import from the feature's public API (index.ts) instead.\n\nExample:\n✅ import { useGetComment } from '@/features/comments'\n❌ import { useGetComment } from '../../comments/hooks/useGetComment'",
            },
            // Restrict absolute alias cross-feature imports
            {
              group: [
                "@/features/*/hooks/*",
                "@/features/*/components/*",
                "@/features/*/utils/*",
                "@/features/*/types*",
                "@/features/*/api/*",
                "@/features/*/services/*",
              ],
              message:
                "❌ Direct imports from feature internals are forbidden! Import from the feature's public API instead.\n\nExample:\n✅ import { useGetComment } from '@/features/comments'\n❌ import { useGetComment } from '@/features/comments/hooks/useGetComment'",
            },
          ],
        },
      ],
    },
  }),
  // Special rules for DTO files - allow snake_case properties
  {
    files: ["**/*dto*.ts", "**/*DTO*.ts", "**/dto*.ts", "**/DTO*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeProperty",
          format: ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
          leadingUnderscore: "allow",
        },
      ],
      camelcase: [
        "error",
        {
          properties: "never",
          ignoreDestructuring: true,
          ignoreImports: true,
          ignoreGlobals: true,
        },
      ],
    },
  },
];

export default eslintConfig;
