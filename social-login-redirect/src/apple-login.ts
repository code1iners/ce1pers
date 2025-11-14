type Props = {
  /**
   * 필수
   *
   * 앱에 대한 식별자(App ID 또는 Services ID)입니다. 이 식별자에는 최종 사용자에게 민감한 데이터가 노출될 가능성을 줄이기 위해 Team ID가 포함되어서는 안 됩니다.
   * (The identifier (App ID or Services ID) for your app. The identifier must not include your Team ID, to help prevent the possibility of exposing sensitive data to the end user.)
   */
  client_id: string;

  /**
   * 필수
   *
   * 인증이 리다이렉트되는, 앱과 연결된 대상 URI입니다. 이 URI는 HTTPS 프로토콜을 사용해야 하며 도메인 이름을 포함해야 하고, IP 주소나 localhost일 수 없으며, 프래그먼트 식별자(#)를 포함해서는 안 됩니다. 자세한 내용은 `Configuring your environment for Sign in with Apple`을 참조하세요.
   * (The destination URI associated to your app, to which the authorization redirects. The URI must use the HTTPS protocool, include a domain name, can’t be an IP address or localhost, and must not contain a fragment identifer (#). For more information, see `Configuring your environment for Sign in with Apple`.)
   *
   * @link `Configuring your environment for Sign in with Apple` : https://developer.apple.com/documentation/signinwithapple/configuring-your-environment-for-sign-in-with-apple
   */
  redirect_uri: string;

  /**
   * 필수
   *
   * 요청하는 응답 유형입니다. 유효한 값은 code와 id_token입니다. code만 또는 code와 id_token 둘 다 요청할 수 있습니다. id_token만 요청하는 것은 지원되지 않습니다. id_token을 요청하는 경우 response_mode는 fragment 또는 form_post여야 합니다.
   * (The type of response requested. Valid values are code and id_token. You can request only code, or both code and id_token. Requesting only id_token is unsupported. When requesting id_token, response_mode must be either fragment or form_post.)
   */
  response_type?: 'code' | 'both';

  /**
   * 선택
   *
   * 클라이언트 세션을 사용자의 ID 토큰과 연결하기 위해 앱이 제공하는 고유한 1회용 문자열입니다. 이 값은 재생 공격을 방지하는 데에도 사용되며, 초기 인증 요청과 인증 응답에 포함된 ID 토큰을 상호 연관시키는 데 도움이 됩니다.
   * (A unique, single-use string that your app provides to associate a client session with the user’s identity token. This value is also used to prevent replay attacks, and allows you to correlate the initial authentication request with the identity token provided in the authorization response.)
   */
  nonce: string;

  /**
   * 선택
   *
   * 기대하는 응답 모드 유형입니다. 유효한 값은 query, fragment, form_post입니다. scope를 하나라도 요청한 경우 값은 반드시 form_post여야 합니다.
   * (The type of response mode expected. Valid values are query, fragment, and form_post. If you requested any scopes, the value must be form_post.)
   */
  response_mode: 'query' | 'fragment' | 'form_post';

  /**
   * 선택
   *
   * Apple에 요청할 사용자 정보의 범위입니다. 유효한 값은 name과 email입니다. 하나만, 둘 다, 또는 아무것도 요청하지 않을 수 있습니다. 여러 scope를 지정하려면 공백으로 구분하고 퍼센트 인코딩을 사용하세요. 예: "scope=name%20email".
   * (The amount of user information requested from Apple. Valid values are name and email. You can request one, both, or none. Use space separation and percent-encoding for multiple scopes; for example, "scope=name%20email".)
   */
  scope: string;

  /**
   * 선택
   *
   * 현재 인증 요청의 상태를 나타내기 위해 앱이 제공하는 임의의 문자열입니다. 이 값은 인증 응답에 포함된 state 값과 비교함으로써 CSRF 공격을 완화하는 데에도 사용됩니다.
   * (An arbitrary string that your app provides, representing the current state of the authorization request. This value is also used to mitigate cross-site request forgery attacks, by comparing against the state value contained in the authorization response.)
   */
  state: string;
};

/**
 * Apple 로그인 요청 URL.
 * (Apple login request URL.)
 */
const APPLE_LOGIN_URL = `https://appleid.apple.com/auth/authorize`;

/**
 * Apple 로그인 URL 생성.
 * (Create Apple login URL.)
 *
 * Apple OAuth 2.0 인증을 위한 URL을 생성합니다.
 * (Generates a URL for Apple OAuth 2.0 authentication.)
 *
 * @param props - Apple 로그인에 필요한 파라미터
 * (@param props - Parameters required for Apple login)
 * @returns Apple 로그인 페이지 URL ('https://appleid.apple.com/auth/authorize?client_id=...')
 * (@returns Apple login page URL ('https://appleid.apple.com/auth/authorize?client_id=...'))
 *
 * @example
 * ```typescript
 * const url = makeAppleLoginUrl({
 *   client_id: 'com.example.app',
 *   redirect_uri: 'https://example.com/callback',
 *   nonce: 'random-nonce-value'
 *   state: 'random-state-value'
 * });
 * ```
 */
export const makeAppleLoginUrl = ({
  response_type = 'code',
  scope = 'name email',
  ...rest
}: Props) => {
  // 제공된 파라미터로 URLSearchParams 객체를 생성합니다.
  // (Create URLSearchParams object with provided parameters)
  const params = new URLSearchParams({
    response_type,
    scope,
    ...rest,
  });

  // 완전한 Apple 로그인 URL을 반환합니다.
  // (Return the complete Apple login URL)
  return `${APPLE_LOGIN_URL}?${params.toString()}`;
};

/**
 * Apple 로그인 리다이렉트.
 * (Apple login redirect.)
 *
 * 브라우저를 Apple 로그인 페이지로 리다이렉트합니다.
 * (Redirects the browser to the Apple login page.)
 *
 * @param props - Apple 로그인에 필요한 파라미터
 * (@param props - Parameters required for Apple login)
 *
 * @example
 * ```typescript
 * appleLogin({
 *   client_id: 'com.example.app',
 *   redirect_uri: 'https://example.com/callback',
 *   nonce: 'random-nonce-value'
 * });
 * ```
 */
export const appleLogin = (props: Props) => {
  // 제공된 파라미터로 Apple 로그인 URL을 생성합니다.
  // (Create Apple login URL with provided parameters)
  const url = makeAppleLoginUrl(props);

  // Apple 로그인 URL로 리다이렉트합니다.
  // (Redirect to Apple login URL.)
  window.location.href = url;
};
