# @ce1pers/social-login-redirect

브라우저에서 social login provider의 OAuth authorization URL을 만들거나 해당 URL로 이동시키는 TypeScript helper입니다. token 교환, callback 검증, 사용자 session 처리는 제공하지 않습니다.

## 설치

```bash
npm install @ce1pers/social-login-redirect
```

## 공개 API

`make*LoginUrl`은 URL 문자열을 반환하고, `*Login`은 `window.location.href`를 변경해 브라우저를 이동시킨 뒤 별도 값을 반환하지 않습니다.

| API | 입력 필드 |
| --- | --- |
| `makeGoogleLoginUrl`, `googleLogin` | 필수 `client_id`, `redirect_uri`, `scope`; 선택 `response_type`, `access_type`, `state`, `include_granted_scopes`, `enable_granular_consent`, `login_hint`, `prompt` |
| `makeKakaoLoginUrl`, `kakaoLogin` | 필수 `client_id`, `redirect_uri`; 선택 `response_type`, `scope`, `prompt`, `login_hint`, `service_terms`, `state`, `nonce` |
| `makeNaverLoginUrl`, `naverLogin` | 라이브러리 입력 필수 `clientId`, `redirectUri`, `state`; 선택 `response_type` |
| `appleLogin` | `client_id`, `redirect_uri`, `nonce`, `response_mode`, `scope`, `state`; 선택 `response_type` |
| `facebookLogin` | `client_id`, `redirect_uri`, `state`; 선택 `version`, `response_type`, `scope` |
| `lineLogin` | `response_type`, `client_id`, `redirect_uri`, `state`, `scope`; `version`, `nonce`, `prompt`, `max_age`, `ui_locales`, `bot_prompt`, `initial_amr_display`, `switch_amr`, `disable_auto_login`, `disable_ios_auto_login`, `code_challenge`, `code_challenge_method`, `response_mode` 선택 |

Provider마다 필드명이 다릅니다. Kakao·Google은 라이브러리 입력과 URL에서 `client_id`/`redirect_uri`를 사용하고, Naver는 라이브러리 입력으로 `clientId`/`redirectUri`를 받은 뒤 URL에서는 `client_id`/`redirect_uri`로 변환합니다.

## 사용 예제

```ts
import {
  googleLogin,
  makeKakaoLoginUrl,
  makeNaverLoginUrl,
} from "@ce1pers/social-login-redirect";

const kakaoUrl = makeKakaoLoginUrl({
  client_id: "YOUR_KAKAO_REST_API_KEY",
  redirect_uri: "https://example.com/auth/kakao/callback",
  state: "random-state-value",
});

const naverUrl = makeNaverLoginUrl({
  clientId: "YOUR_NAVER_CLIENT_ID",
  redirectUri: "https://example.com/auth/naver/callback",
  state: "random-state-value",
});

// URL을 직접 이동시키는 함수는 반환값이 없습니다.
googleLogin({
  client_id: "YOUR_GOOGLE_CLIENT_ID",
  redirect_uri: "https://example.com/auth/google/callback",
  scope: "openid email profile",
  state: "random-state-value",
});
```

`redirect_uri`는 각 provider console에 등록한 값과 정확히 일치해야 합니다. `state`는 로그인 시도마다 예측할 수 없는 값으로 만들고 callback에서 원래 값과 비교해야 합니다. 이 라이브러리는 그 검증을 대신하지 않습니다.

## 현재 미구현 제한

현재 `makeLineLoginUrl`은 입력받은 provider 파라미터를 query string에 연결하지 않습니다. LINE 로그인을 사용하기 전 [현재 미구현 과제](../docs/unimplemented/current-unimplemented.md)를 확인하세요.

## 검증

```bash
npm run lint
npm run build
npm test
```

## 관련 문서

- [저장소 문서 지도](../docs/README.md)
- [Google OAuth 공식 문서](https://developers.google.com/identity/protocols/oauth2/web-server)
- [LINE Login 공식 문서](https://developers.line.biz/en/docs/line-login/integrate-line-login/)
