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
    extends: ["next/core-web-vitals", "next/typescript", "eslint-config-prettier"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
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
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"],
          "leadingUnderscore": "allow",
          "trailingUnderscore": "forbid"
        },
        {
          "selector": "function",
          "format": ["camelCase", "PascalCase"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": "parameter",
          "format": ["camelCase"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": "typeProperty",
          "format": ["camelCase", "PascalCase", "UPPER_CASE"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": "property",
          "format": ["camelCase", "PascalCase", "UPPER_CASE"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "enumMember",
          "format": ["UPPER_CASE", "PascalCase"]
        }
      ],
      // Additional camelCase enforcement with DTO exception
      "camelcase": [
        "error",
        {
          "properties": "always",
          "ignoreDestructuring": true,
          "ignoreImports": true,
          "ignoreGlobals": true,
          "allow": []
        }
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
                "../../*/services/*"
              ],
              message: "❌ Cross-feature imports are forbidden! Import from the feature's public API (index.ts) instead.\n\nExample:\n✅ import { useGetComment } from '@/features/comments'\n❌ import { useGetComment } from '../../comments/hooks/useGetComment'"
            },
            // Restrict absolute alias cross-feature imports  
            {
              group: [
                "@/features/*/hooks/*",
                "@/features/*/components/*",
                "@/features/*/utils/*",
                "@/features/*/types*",
                "@/features/*/api/*",
                "@/features/*/services/*"
              ],
              message: "❌ Direct imports from feature internals are forbidden! Import from the feature's public API instead.\n\nExample:\n✅ import { useGetComment } from '@/features/comments'\n❌ import { useGetComment } from '@/features/comments/hooks/useGetComment'"
            }
          ]
        }
      ]
    },
  }),
  // Special rules for DTO files - allow snake_case properties
  {
    files: ["**/*dto*.ts", "**/*DTO*.ts", "**/dto*.ts", "**/DTO*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "typeProperty",
          "format": ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
          "leadingUnderscore": "allow"
        }
      ],
      "camelcase": [
        "error", 
        {
          "properties": "never",
          "ignoreDestructuring": true,
          "ignoreImports": true,
          "ignoreGlobals": true
        }
      ]
    }
  },
];

export default eslintConfig;
