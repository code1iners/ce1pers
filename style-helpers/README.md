# @ce1pers/style-helpers

Tailwind CSS 클래스를 효율적으로 병합하고 관리하기 위한 간단한 스타일 유틸리티 라이브러리입니다.

## 특징

- 🎨 Tailwind CSS 클래스 지능적 병합
- 🔄 조건부 클래스 처리
- 🚀 TypeScript 지원
- 📦 경량화된 번들 크기
- ✨ `clsx`와 `tailwind-merge`의 강력한 조합

## 설치

```bash
# npm
npm install @ce1pers/style-helpers

# pnpm
pnpm add @ce1pers/style-helpers

# yarn
yarn add @ce1pers/style-helpers
```

## 사용 방법

### 기본 사용

```typescript
import { cn } from '@ce1pers/style-helpers';

// 기본 클래스 병합
const className = cn('px-4 py-2', 'bg-blue-500 text-white');
// => 'px-4 py-2 bg-blue-500 text-white'

// 중복 클래스 자동 해결 (Tailwind CSS)
const merged = cn('px-2 py-1', 'px-4');
// => 'py-1 px-4' (마지막 px-4가 우선)
```

### 조건부 클래스

```typescript
import { cn } from '@ce1pers/style-helpers';

const isActive = true;
const isDisabled = false;

const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
);
// => 'px-4 py-2 rounded bg-blue-500 text-white'
```

### React 컴포넌트에서 사용

```typescript
import { cn } from '@ce1pers/style-helpers';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Button({ variant = 'primary', size = 'md', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded font-semibold transition-colors',
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
    >
      Click me
    </button>
  );
}
```

## API

### `cn(...inputs: ClassValue[]): string`

여러 클래스 값을 받아 병합하고 최적화된 클래스 문자열을 반환합니다.

**Parameters:**
- `inputs`: 클래스 문자열, 객체, 배열 등 다양한 형태의 클래스 값

**Returns:**
- 병합되고 최적화된 클래스 문자열

## 의존성

이 라이브러리는 다음 패키지를 사용합니다:
- [`clsx`](https://github.com/lukeed/clsx) - 조건부 클래스 처리
- [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) - Tailwind CSS 클래스 충돌 해결

## 라이선스

MIT © [__coma__](https://github.com/code1iners)

## 기여

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/code1iners/celpers/issues)에서 환영합니다.

## 링크

- [GitHub Repository](https://github.com/code1iners/celpers)
- [npm Package](https://www.npmjs.com/package/@ce1pers/style-helpers)
