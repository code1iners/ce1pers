# SOCIAL LOGIN REDIRECT

소셜 로그인 OAuth 리다이렉트 URL을 간편하게 생성할 수 있는 TypeScript 라이브러리입니다.

## 특징

- 🚀 6개 주요 소셜 로그인 프로바이더 지원
- 📦 TypeScript로 작성되어 타입 안정성 보장
- 🎯 간단한 API로 쉬운 통합
- 🔒 OAuth 2.0 표준 준수

## 지원 프로바이더

- 카카오 (Kakao)
- 네이버 (Naver)
- 구글 (Google)
- 애플 (Apple)
- 페이스북 (Facebook)
- 라인 (LINE)

## 설치

```bash
# npm
npm install @ce1pers/social-login-redirect

# pnpm
pnpm add @ce1pers/social-login-redirect

# yarn
yarn add @ce1pers/social-login-redirect
```

## 사용 방법

### 기본 사용법

```typescript
import { kakaoLogin, naverLogin, googleLogin } from '@ce1pers/social-login-redirect';

// 카카오 로그인
const kakaoAuthUrl = kakaoLogin({
  clientId: 'YOUR_KAKAO_CLIENT_ID',
  redirectUri: 'http://localhost:3000/auth/kakao/callback',
  state: 'random-state-string'
});

// 네이버 로그인
const naverAuthUrl = naverLogin({
  clientId: 'YOUR_NAVER_CLIENT_ID',
  redirectUri: 'http://localhost:3000/auth/naver/callback',
  state: 'random-state-string'
});

// 구글 로그인
const googleAuthUrl = googleLogin({
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  redirectUri: 'http://localhost:3000/auth/google/callback',
  scope: 'email profile'
});
```

### 프로바이더별 필수 파라미터

#### 네이버 (Naver)
- `clientId`: 애플리케이션 클라이언트 아이디
- `redirectUri`: 콜백 URL
- `state`: CSRF 방지를 위한 상태 토큰

#### 카카오 (Kakao)
- `clientId`: REST API 키
- `redirectUri`: 인가 코드를 받을 URI
- `responseType` 응답 타입

#### 구글 (Google)
- `clientId`: OAuth 2.0 클라이언트 ID
- `redirectUri`: 승인된 리디렉션 URI
- `responseType` 응답 타입
- `scope`: 요청할 권한 범위

#### 애플 (Apple)
- `clientId`: 서비스 ID (Services ID)
- `redirectUri`: 리턴 URL
- `responseType` 응답 타입
- `state`: CSRF 방지 토큰

#### 페이스북 (Facebook)
- `clientId`: 앱 ID
- `redirectUri`: 리디렉트 URI
- `responseType` 응답 타입
- `scope`: 요청할 권한 (기본값: 'email,public_profile')

#### 라인 (LINE)
- `clientId`: 채널 ID
- `redirectUri`: 콜백 URL
- `responseType` 응답 타입
- `state`: CSRF 방지 토큰

## 예제

### React에서 사용하기


```tsx
import { makeNaverLoginUrl } from '@ce1pers/social-login-redirect';

function LoginButton() {
  const handleKakaoLogin = () => {
    const naverLoginUrl = makeNaverLoginUrl({
      clientId: process.env.REACT_APP_KAKAO_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth/kakao/callback`
    });

    // Redirect to Naver login page.
    window.location.href = naverLoginUrl;
  };

  return <button onClick={handleKakaoLogin}>Naver Login</button>;
}
```

```tsx
import { kakaoLogin } from '@ce1pers/social-login-redirect';

function LoginButton() {
  const handleKakaoLogin = () => {
    kakaoLogin({
      clientId: process.env.REACT_APP_KAKAO_CLIENT_ID,
      redirectUri: `${window.location.origin}/auth/kakao/callback`
    });
  };

  return <button onClick={handleKakaoLogin}>Kakao Login</button>;
}
```

### Next.js에서 사용하기

```tsx
import { googleLogin } from '@ce1pers/social-login-redirect';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    googleLogin({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/google/callback`,
      scope: 'email profile'
    });
  };

  return <button onClick={handleGoogleLogin}>Google Login</button>;
}
```

## 폴더 구조
```
├─ @ce1pers/social-login-redirect
│  ├─ README.md         # Guide document.
│  ├─ eslint.config.ts  # eslint configurations file.
│  ├─ index.ts          # Entry point
│  ├─ package.json      # Package information.
│  ├─ pnpm-lock.yaml    # Pnpm dependencies information.
│  ├─ src
│  │  ├─ apple-login.ts     # Apple login features.
│  │  ├─ facebook-login.ts  # Facebook login features.
│  │  ├─ google-login.ts    # Google login features.
│  │  ├─ kakao-login.ts     # Kakao login features.
│  │  ├─ line-login.ts      # Line login features.
│  │  └─ naver-login.ts     # Naver login features
│  └─ tsconfig.json     # TypeScript configurations file.
```

## 주의사항

- 각 소셜 로그인 프로바이더의 개발자 콘솔에서 클라이언트 ID와 리디렉트 URI를 미리 등록해야 합니다.
- `state` 파라미터는 CSRF 공격 방지를 위해 예측 불가능한 랜덤 문자열을 사용하세요.
- 클라이언트 ID와 같은 민감한 정보는 환경 변수로 관리하세요.
- 프로덕션 환경에서는 HTTPS를 사용하세요.

## 라이센스

MIT

## 기여하기

이슈와 PR은 언제나 환영합니다!