# Warehouse Frontend - Code Standards & Architecture

> **Modern Next.js 15 + TypeScript + Ant Design project with strict code standards and feature-based architecture**

## 🚀 **Tech Stack**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: Ant Design v5
- **Styling**: TailwindCSS v4 + Ant Design
- **Linting**: ESLint 9 with custom rules
- **Package Manager**: npm/bun

## 📐 **Architecture Overview**

This project follows **Clean Architecture** principles with:

- ✅ **Feature-based folder structure** 
- ✅ **Strict import boundaries** between features
- ✅ **DTO pattern** for API data handling  
- ✅ **Enforced naming conventions** (camelCase/PascalCase)
- ✅ **Public API contracts** via index.ts files

## **Table of Contents**

1. [Feature Isolation Rules](#️-feature-isolation-rules)
2. [Naming Convention Rules](#-naming-convention-rules)
3. [API Data Handling - DTO Pattern](#-api-data-handling---dto-pattern)
4. [Feature Import Boundaries](#️-feature-import-boundaries)
5. [ESLint Configuration](#-eslint-configuration)
6. [Benefits](#-benefits)
7. [Best Practices](#-best-practices)
8. [File Naming Convention](#-file-naming-convention)
9. [ESLint Rules Summary](#-eslint-rules-summary)

## Feature Isolation Rules

Proyek ini menggunakan **feature-based architecture** dengan **strict boundaries** untuk menjaga feature tetap independent dan maintainable.

## 📝 Naming Convention Rules

### ✅ **REQUIRED - camelCase untuk Variables & Functions**

```typescript
// ✅ GOOD: camelCase variables
const userName = 'john';
const isUserActive = true;
const apiResponse = {};

// ✅ GOOD: PascalCase untuk React Components  
const UserCard = ({ name }: { name: string }) => {
  return <div>{name}</div>;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

// ✅ GOOD: UPPER_CASE constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// ✅ GOOD: camelCase functions  
function getUserData(userId: string) {
  return { id: userId };
}

// ✅ GOOD: PascalCase component functions
function HomePage() {
  return <div>Home</div>;
}

// ✅ GOOD: PascalCase untuk Types/Interfaces
interface UserProfile {
  firstName: string;
  lastName: string;
}
```

### 🔄 **API DATA HANDLING - DTO Pattern**

Untuk menangani data API yang menggunakan `snake_case`, gunakan **DTO (Data Transfer Object) pattern** dengan **file-based rules**:

#### ✅ **DTO Files (allow snake_case)**

File pattern: `**/*dto*.ts`, `**/*DTO*.ts`, `**/dto*.ts`, `**/DTO*.ts`

```typescript
// file: user.dto.ts
export interface UserDTO {
  user_id: string;        // ✅ OK: snake_case allowed in DTO
  first_name: string;     // ✅ OK: snake_case allowed in DTO
  last_name: string;      // ✅ OK: snake_case allowed in DTO
  email_address: string;  // ✅ OK: snake_case allowed in DTO
  created_at: string;     // ✅ OK: snake_case allowed in DTO
  is_active: boolean;     // ✅ OK: snake_case allowed in DTO
}

export interface PostDTO {
  post_id: string;        // ✅ OK: snake_case allowed in DTO
  user_id: string;        // ✅ OK: snake_case allowed in DTO
  comment_count: number;  // ✅ OK: snake_case allowed in DTO
}
```

#### ❌ **Regular Files (snake_case will error)**

All other files enforce camelCase for properties:

```typescript
// file: types.ts
export type PostA = {
  post_id: string;        // ❌ ERROR: must be postId
  user_id: string;        // ❌ ERROR: must be userId
  created_at: string;     // ❌ ERROR: must be createdAt
  comment_count: number;  // ❌ ERROR: must be commentCount
}

export type PostB = {
  postId: string;         // ✅ OK: camelCase
  userId: string;         // ✅ OK: camelCase
  createdAt: string;      // ✅ OK: camelCase
  commentCount: number;   // ✅ OK: camelCase
}
```

#### 🔄 **Best Practice Implementation**

1. **API Layer**: Use DTO files for raw API responses
2. **Domain Layer**: Use regular files with camelCase
3. **Conversion**: Create utility functions to convert between them

```typescript
// api.dto.ts - Raw API data
export interface UserDTO {
  user_id: string;
  first_name: string;
  is_active: boolean;
}

// types.ts - Domain objects
export interface User {
  userId: string;
  firstName: string;
  isActive: boolean;
}

// converters.ts - Transform data
export function userDTOToDomain(dto: UserDTO): User {
  return {
    userId: dto.user_id,
    firstName: dto.first_name,
    isActive: dto.is_active,
  };
}

// Usage in API Service
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const dto: UserDTO = await response.json();
  return userDTOToDomain(dto); // Convert to domain object
}
```

### ❌ **FORBIDDEN - snake_case untuk variables/functions**

```typescript
// ❌ BAD: snake_case variables (akan trigger ESLint error)
const user_name = 'john';
const is_user_active = true;

// ❌ BAD: snake_case functions
function get_user_data(user_id: string) {
  return { id: user_id };
}

// ❌ BAD: snake_case parameters
function processUser(user_data: any) {
  return user_data;
}
```

## 🛡️ **Feature Import Boundaries**

### ✅ **ALLOWED - Import dari Public API**

```typescript
// ✅ GOOD: Import dari public API menggunakan alias
import { useGetComment } from '@/features/comments';
import { PostCard } from '@/features/posts';

// ✅ GOOD: Import dari public API menggunakan relative path
import { useGetComment } from '../../comments';
```

### ❌ **FORBIDDEN - Direct Import dari Feature Internals**

```typescript
// ❌ BAD: Direct import dari internal files (akan trigger ESLint error)
import { useGetComment } from '@/features/comments/hooks/useGetComment';
import { CommentsList } from '@/features/comments/components/CommentsList';
import { Comment } from '@/features/comments/types';

// ❌ BAD: Relative direct import
import { useGetComment } from '../../comments/hooks/useGetComment';
```

### 📁 **Feature Structure**

Setiap feature harus memiliki struktur seperti ini:

```
src/features/
├── comments/
│   ├── index.ts          ← 🔥 PUBLIC API (export semua yang public dari sini)
│   ├── hooks/            ← Internal (jangan import langsung)
│   │   ├── useGetComment.ts
│   │   └── useCreateComment.ts
│   ├── components/       ← Internal (jangan import langsung)
│   │   └── CommentsList.tsx
│   └── types.ts          ← Internal (jangan import langsung)
└── posts/
    ├── index.ts          ← 🔥 PUBLIC API 
    ├── hooks/
    ├── components/
    └── types.ts
```

## 🔧 **ESLint Configuration**

ESLint akan secara otomatis mendeteksi dan memberikan error untuk:

### Feature Boundaries:
```javascript
// ESLint Error Message:
❌ Direct imports from feature internals are forbidden! 
Import from the feature's public API instead.

Example:
✅ import { useGetComment } from '@/features/comments'
❌ import { useGetComment } from '@/features/comments/hooks/useGetComment'
```

### Naming Convention:
```javascript
// ESLint Error Messages:
❌ Variable name `user_name` must match one of the following formats: camelCase, UPPER_CASE, PascalCase
❌ Function name `get_user_data` must match one of the following formats: camelCase, PascalCase
❌ Parameter name `user_id` must match one of the following formats: camelCase
❌ Type Property name `user_id` must match one of the following formats: camelCase, PascalCase, UPPER_CASE
```

### DTO Files:
```javascript
// DTO Files (*.dto.ts) - No error for snake_case properties
✅ user_id, first_name, created_at // No error in DTO files

// Regular Files - Error for snake_case properties  
❌ user_id, first_name, created_at // Error in regular files
```

## 🎯 **Benefits**

1. **Feature Independence**: Setiap feature tidak tergantung pada internal implementation feature lain
2. **Easy Refactoring**: Perubahan internal tidak mempengaruhi feature lain
3. **Clear API Contract**: Setiap feature memiliki interface yang jelas via `index.ts`
4. **Better Maintainability**: Code menjadi lebih terorganisir dan mudah di-maintain
5. **Consistent Naming**: Semua code mengikuti standar naming yang sama
6. **API Integration**: DTO pattern memudahkan integration dengan backend API

## 🚀 **Best Practices**

1. **Selalu export** dari `index.ts` untuk semua yang perlu diakses dari luar feature
2. **Gunakan alias `@/`** untuk import yang lebih bersih
3. **Keep features small** dan focused pada satu domain
4. **Gunakan `shared/`** folder untuk utility yang digunakan banyak feature
5. **DTO Files**: Gunakan suffix `.dto.ts` untuk types yang represent raw API data
6. **Domain Objects**: Gunakan camelCase untuk frontend domain objects
7. **Converters**: Selalu buat utility functions untuk convert DTO ke Domain objects

## 📋 **File Naming Convention**

| Type | Format | Examples |
|------|--------|----------|
| **DTO Files** | `*.dto.ts`, `*DTO.ts` | `user.dto.ts`, `apiDTO.ts` |
| **Domain Types** | `*.ts` | `types.ts`, `models.ts` |
| **Components** | `PascalCase` | `UserCard.tsx`, `ThemeProvider.tsx` |
| **Hooks** | `use*.ts` | `useGetUser.ts`, `useAuth.ts` |
| **Utils** | `camelCase` | `dateUtils.ts`, `apiHelpers.ts` |

## 🎯 **ESLint Rules Summary**

| Rule | Scope | Enforcement |
|------|-------|-------------|
| **Variables** | All files | `camelCase`, `UPPER_CASE`, `PascalCase` |
| **Functions** | All files | `camelCase`, `PascalCase` |
| **Type Properties** | DTO files | `camelCase`, `PascalCase`, `UPPER_CASE`, `snake_case` |
| **Type Properties** | Regular files | `camelCase`, `PascalCase`, `UPPER_CASE` |
| **Cross-feature imports** | Feature folders | Forbidden (use public API) |
| **Direct feature internals** | All files | Forbidden (use index.ts) |
