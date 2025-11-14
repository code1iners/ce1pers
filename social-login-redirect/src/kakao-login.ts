type Props = {
  /**
   * 필수
   *
   * 앱 REST API 키
   *
   * `앱 관리 페이지`의 [앱] > [일반] > [앱 키]에서 확인 가능
   */
  client_id: string;

  /**
   * 필수
   *
   * 인가 코드를 전달받을 서비스 서버의 URI
   *
   * `앱 관리 페이지`의 [카카오 로그인] > [리다이렉트 URI]에서 등록
   */
  redirect_uri: string;

  /**
   * 필수
   *
   * `code`로 고정
   */
  response_type?: 'code';

  /**
   * 선택
   *
   * `동의항목 추가 동의 요청` 시 사용.
   *
   * 사용자에게 동의 요청할 동의항목 ID 목록.
   *
   * 동의항목의 ID는 `사용자 정보` 또는 `앱 관리 페이지`의 [카카오 로그인] > [동의항목]에서 확인 가능.
   *
   * 쉼표(,)로 구분해 여러 개 전달 가능.
   *
   * @link 참고 : https://developers.kakao.com/docs/latest/ko/kakaologin/utilize#additional-consent-scope
   */
  scope?: string;

  /**
   * 선택
   *
   * 동의 화면 요청 시 추가 상호작용을 요청할 때 사용.
   *
   * 쉼표(,)로 구분된 문자열 값 목록으로 전달.
   *
   * 아래 값 사용 가능
   *
   * `login` : 기존 사용자 인증 여부와 상관없이 사용자에게 카카오계정 로그인 화면을 출력하여 다시 사용자 인증을 수행하고자 할 때 사용, 카카오톡 인앱 브라우저에서는 제공하지 않음
   *
   * `none` : 사용자에게 동의 화면과 같은 대화형 UI를 노출하지 않고 인가 코드 발급을 요청할 때 사용, 인가 코드 발급을 위해 사용자의 동작이 필요한 경우 에러 응답 전달
   *
   * `create` : 사용자가 카카오계정 신규 가입 후 로그인하도록 할 때 사용, `카카오계정 가입 페이지`로 이동 후, 카카오계정 가입 완료 후 동의 화면 출력
   *
   * `select_account` : 카카오계정 간편로그인을 요청할 때 사용, 브라우저에 `카카오계정 로그인` 세션이 있을 경우 자동 로그인 또는 계정 선택 화면 출력
   *
   * @link 카카오계정 가입 페이지 : https://accounts.kakao.com/weblogin/create_account#selectVerifyMethod
   * @link 카카오계정 간편로그인 : https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code-prompt-select-account
   */
  prompt?: 'login' | 'none' | 'create' | 'select_account';

  /**
   * 선택
   *
   * `로그인 힌트` 요청 시 사용.
   *
   * 카카오계정 로그인 페이지의 ID란에 자동 입력할 값.
   *
   * `중요`: 로그인하지 않은 사용자에게 카카오계정 로그인 페이지를 표시하는 상황에서만 동작
   *
   * `참고`: 카카오계정 로그인 시 이메일, 전화번호, 카카오메일 ID를 ID에 입력하여 로그인 가능
   *
   * @link 로그인 힌트 : https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code-login-hint
   */
  login_hint?: string;

  /**
   * 선택
   *
   * `서비스 약관 선택해 동의 요청` 시 사용
   *
   * 동의받을 서비스 약관 태그 목록
   *
   * 서비스 약관 태그는 `앱 관리 페이지`의 [카카오 로그인] > [간편가입]에서 확인 가능
   *
   * 쉼표(,)로 구분된 문자열 값 목록으로 전달
   *
   * @link 서비스 약관 선택해 동의 요청 : https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code-terms
   * @link 앱 관리 페이지 : https://developers.kakao.com/console/app
   */
  service_terms?: string;

  /**
   * 선택
   *
   * 카카오 로그인 과정 중 동일한 값을 유지하는 임의의 문자열(정해진 형식 없음)
   *
   * `Cross-Site Request Forgery(CSRF)` 공격으로부터 카카오 로그인 요청을 보호하기 위해 사용
   *
   * 각 사용자의 로그인 요청에 대한 state 값은 고유해야 함
   *
   * 인가 코드 요청, 인가 코드 응답, 토큰 발급 요청의 state 값 일치 여부로 요청 및 응답 유효성 확인 가능
   *
   * @link CSRF : https://en.wikipedia.org/wiki/Cross-site_request_forgery
   */
  state?: string;

  /**
   * 선택
   *
   * `OpenID Connect`로 ID 토큰을 함께 발급받을 경우, `ID 토큰 재생` 공격을 방지하기 위해 사용
   *
   * `ID 토큰 유효성 검증` 시 대조할 임의의 문자열(정해진 형식 없음)
   *
   * @link OpenID Connect : https://developers.kakao.com/docs/latest/ko/kakaologin/utilize#oidc
   * @link ID 토큰 재생 : https://en.wikipedia.org/wiki/Replay_attack
   * @link ID 토큰 유효성 검증 : https://developers.kakao.com/docs/latest/ko/kakaologin/utilize#oidc-id-token-verify
   */
  nonce?: string;
};

/**
 * 카카오 로그인 요청 URL. (Kakao login request URL.)
 */
const KAKAO_LOGIN_URL = 'https://kauth.kakao.com/oauth/authorize';

/**
 * 카카오 로그인 URL 생성. (Create Kakao login URL.)
 *
 * 카카오 OAuth 2.0 인증을 위한 URL을 생성합니다.
 * (Generates a URL for Kakao OAuth 2.0 authentication.)
 *
 * @param param0
 * @returns 카카오 로그인 페이지 URL ('https://kauth.kakao.com/oauth/authorize?client_id=...')
 *
 * @example
 * ```typescript
 * const url = makeKakaoLoginUrl({
 *   client_id: 'YOUR_CLIENT_ID',
 *   redirect_uri: 'https://example.com/callback',
 *   state: 'random-state-token'
 * });
 * ```
 */
export const makeKakaoLoginUrl = ({
  response_type = 'code',
  ...rest
}: Props) => {
  const params = new URLSearchParams({
    response_type,
    ...rest,
  });

  return `${KAKAO_LOGIN_URL}?${params.toString()}`;
};

/**
 * 카카오 로그인 리다이렉트. (Kakao login redirect.)
 *
 * 브라우저를 카카오 로그인 페이지로 리다이렉트합니다.
 * (Redirects the browser to the Kakao login page.)
 *
 * @param props
 *
 * @example
 * ```typescript
 * kakaoLogin({
 *   client_id: 'YOUR_CLIENT_ID',
 *   redirect_uri: 'https://example.com/callback',
 *   state: 'random-state-token'
 * });
 * ```
 */
export const kakaoLogin = (props: Props) => {
  // Generate Kakao login URL.
  const url = makeKakaoLoginUrl(props);

  // Redirect to Kakao login page.
  window.location.href = url;
};
