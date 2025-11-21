type Props = {
  /**
   * 필수
   *
   * Line OAuth 버전.
   * (Line OAuth version.)
   */
  version?: string;

  /**
   * 필수
   * (Required)
   */
  response_type: 'code';

  /**
   * 필수
   *
   * LINE 로그인 채널 ID입니다. `LINE Developers Console`에서 확인할 수 있습니다.
   * (LINE Login Channel ID. You can find this in the `LINE Developers Console`.)
   *
   * @link `LINE Developers Console` https://developers.line.biz/console/
   */
  client_id: string;

  /**
   * 필수
   *
   * `LINE Developers Console`에 등록된 콜백 URL을 URL 인코딩한 문자열입니다. 임의의 쿼리 파라미터를 추가할 수 있습니다.
   * (A URL-encoded string of the callback URL registered on the `LINE Developers Console`. You can add any query parameter.)
   *
   * @link `LINE Developers Console` : https://developers.line.biz/console/
   */
  redirect_uri: string;

  /**
   * 필수
   *
   * CSRF를 방지하기 위해 사용되는 고유한 영숫자 문자열입니다. 웹 앱은 로그인 세션마다 무작위 값을 생성해야 합니다. URL 인코딩된 문자열이 될 수 없습니다.
   * (A unique alphanumeric string used to prevent cross-site request forgery. Your web app should generate a random value for each login session. This cannot be a URL-encoded string.)
   *
   * @link `CSRF` : https://en.wikipedia.org/wiki/Cross-site_request_forgery
   */
  state: string;

  /**
   * 필수
   *
   * 사용자에게 요청하는 권한 목록입니다. 자세한 내용은 Scopes 문서를 참고하세요.
   * (Permissions requested from the user. For more information, see Scopes.)
   *
   * @link `Scopes` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#scopes
   */
  scope: string;

  /**
   * 선택
   *
   * 재생 공격(`replay attacks`)을 방지하기 위해 사용되는 문자열입니다. 이 값은 `ID token`에 포함되어 반환됩니다.
   * (A string used to prevent `replay attacks`. This value is returned in an `ID token`.)
   *
   * @link `replay attacks` : https://en.wikipedia.org/wiki/Replay_attack
   * @link `ID token` : https://developers.line.biz/en/docs/line-login/verify-id-token/#id-tokens
   */
  nonce?: string;

  /**
   * 선택
   *
   * 인증 또는 권한 부여 화면을 표시할지 여부를 결정하는 설정입니다. 다음 값 중 하나를 지정할 수 있습니다:
   * (A setting that determines whether or not to display the authentication or authorization screen. You can set one of the following values:)
   *
   * `consent` : 사용자가 이미 모든 요청된 권한을 부여했더라도 동의 화면을 강제로 표시합니다.
   * (`consent` : Used to force the consent screen to be displayed even if the user has already granted all requested permissions.)
   *
   * `none` : `auto login`이 활성화되어 있고 사용자가 이미 로그인 및 권한 동의를 완료한 경우 `Single Sign On (SSO)` 인증 화면을 건너뜁니다.
   * (`none` : Used to skip the `Single Sign On (SSO)` authentication screen if `auto login` is enabled and the user is already logged in and has consented to grant permissions to the target channel.)
   *
   * `login` : 사용자가 이미 로그인했거나 SSO 세션이 남아 있더라도 인증 화면을 표시합니다. `login`을 설정하면 auto login이 비활성화됩니다. 응답으로 반환된 `ID token`의 amr 값을 통해 사용된 인증 방법을 확인할 수 있습니다.
   * (`login` :  Used to display an authentication screen even if the user is already logged in or has a Single Sign On login session remaining. Note that if you set login, auto login is disabled. You can also check the authentication method used in the amr of an `ID token` returned in the response.)
   *
   * @link `Single Sign On (SSO)` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#line-sso-login
   * @link `auto login` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#authentication-process
   * @link `ID token` : https://developers.line.biz/en/docs/line-login/verify-id-token/#id-tokens
   */
  prompt?: string;

  /**
   * 선택
   *
   * 사용자가 마지막으로 인증된 이후 허용되는 경과 시간(초 단위)입니다. `OpenID Connect Core 1.0`의 "Authentication Request" 섹션에서 정의된 max_age 파라미터에 해당합니다.
   * (The allowable elapsed time in seconds since the last time the user was authenticated. Corresponds to the max_age parameter defined in the "Authentication Request" section of `OpenID Connect Core 1.0`.)
   *
   * @link `OpenID Connect Core 1.0` : https://openid.net/specs/openid-connect-core-1_0.html
   */
  max_age?: number;

  /**
   * 선택
   *
   * LINE 로그인 화면에 표시할 언어입니다. RFC 5646(BCP 47) 언어 태그를 하나 이상 공백으로 구분하여 선호 순서대로 지정합니다. OpenID Connect Core 1.0의 "Authentication Request" 섹션에 정의된 ui_locales 파라미터에 해당합니다.
   * (Display language for LINE Login screens. Specify as one or more RFC 5646 (BCP 47) language tags, separated by spaces, in order of preference. Corresponds to the ui_locales parameter defined in the "Authentication Request" section of OpenID Connect Core 1.0.)
   *
   * @link `RFC 5646 (BCP 47)` : https://datatracker.ietf.org/doc/html/rfc5646
   * @link `OpenID Connect Core 1.0` : https://openid.net/specs/openid-connect-core-1_0.html
   */
  ui_locales?: string;

  /**
   * 선택
   *
   * 로그인 과정에서 LINE 공식 계정을 친구로 추가하는 옵션을 표시합니다. normal 또는 aggressive로 설정할 수 있습니다. 자세한 내용은 'Add a LINE Official Account as a friend when logged in (add friend option)' 문서를 참고하세요.
   * (Displays an option to add a LINE Official Account as a friend during login. Set to either normal or aggressive. For more information, see Add a LINE Official Account as a friend when logged in (add friend option).)
   *
   * @link `Add a LINE Official Account as a friend when logged in (add friend option` : https://developers.line.biz/en/docs/line-login/link-a-bot/
   */
  bot_prompt?: string;

  /**
   * 선택
   *
   * `lineqr`가 지정되면 이메일 주소로 로그인 대신 QR 코드로 로그인이 기본으로 표시됩니다.
   * (If `lineqr` is specified, Log in with QR code will be displayed by default instead of Log in with email address.)
   *
   * @link `Log in with QR code` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#mail-or-qrcode-login
   * @link `Log in with email address` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#mail-or-qrcode-login
   */
  initial_amr_display?: string;

  /**
   * 선택
   *
   * `false`로 설정하면 "이메일로 로그인" 또는 "QR 코드 로그인"과 같은 로그인 방법 변경 버튼을 숨깁니다. 기본값은 `true`입니다.
   * (If set to `false`, hide the buttons for changing the login method, such as "Log in with email" or "QR code login". The default value is `true`.)
   */
  switch_amr?: boolean;

  /**
   * 선택
   *
   * `true`로 설정하면 자동 로그인이 비활성화됩니다. 기본값은 `false`입니다.
   * 이 값이 `true`일 때 SSO가 가능하면 `Single Sign On (SSO)` 로그인 화면이 표시되고, 불가능하면 `이메일 주소로 로그인` 화면이 표시됩니다.
   * (If set to `true`, auto login will be disabled. The default value is `false`.)
   * (When this value is true, `Single Sign On (SSO)` login will be displayed if SSO is available, and `log in with email address` will be displayed if it is not available.)
   *
   * @link `auto login` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#line-auto-login
   * @link `Single Sign On (SSO)` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#line-sso-login
   * @link `log in with email address` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#mail-or-qrcode-login
   */
  disable_auto_login?: boolean;

  /**
   * 선택
   *
   * `true`로 설정하면 iOS에서 `auto login`이 비활성화됩니다. 기본값은 `false`입니다. 이후에 추가된 `disable_auto_login` 파라미터 사용을 권장합니다.
   * (If set to `true`, `auto login` will be disabled in iOS. The default value is `false`. We recommend using the `disable_auto_login` parameter, which was added later.)
   *
   * @link `auto login` : https://developers.line.biz/en/docs/line-login/integrate-line-login/#line-auto-login
   */
  disable_ios_auto_login?: boolean;

  /**
   * 선택
   *
   * LINE 로그인에서 PKCE를 지원하기 위해 필요한 파라미터입니다. 고유한 `code_verifier`를 SHA256으로 해시한 뒤 Base64URL 형식으로 인코딩한 값입니다. 기본값은 `null`이며, 값이 없으면 요청은 PKCE를 지원하지 않습니다.
   * (Parameters required to support PKCE for LINE Login. This is the value obtained by hashing the unique `code_verifier` with SHA256 and then encoding it into Base64URL format. The default value is `null`. If no value is specified, the request doesn't support PKCE.)
   *
   * PKCE 구현 방법에 대한 자세한 내용은 LINE 로그인 문서의 `Implement PKCE for LINE Login`을 참조하세요.
   * (For more information on how to implement PKCE, see `Implement PKCE for LINE Login` in the LINE Login documentation.)
   *
   * @link `Implement PKCE for LINE Login` : https://developers.line.biz/en/docs/line-login/integrate-pkce/#how-to-integrate-pkce
   */
  code_challenge?: string;

  /**
   * 선택
   *
   * `S256` (`SHA256` 해시 함수를 의미)
   * ( `S256`(Represents the hash function `SHA256`.) )
   *
   * `code_verifier` 변환 방식을 지정합니다. 보안상의 이유로 LINE 로그인은 S256만 지원합니다.
   * (Specifies the `code_verifier` transformation method. For security reasons, LINE Login only supports S256.)
   *
   * PKCE 구현 방법에 대한 자세한 내용은 LINE 로그인 문서의 Implement PKCE for LINE Login을 참조하세요.
   * (For more information on how to implement PKCE, see Implement PKCE for LINE Login in the LINE Login documentation.)
   *
   * @link `Implement PKCE for LINE Login` : https://developers.line.biz/en/docs/line-login/integrate-pkce/#how-to-integrate-pkce
   */
  code_challenge_method?: string;

  /**
   * 선택
   *
   * 인증 응답 파라미터가 웹 앱으로 어떻게 반환되는지를 결정하는 설정입니다. 다음 값 중 하나를 지정할 수 있으며 기본값은 `query`입니다.
   * (A setting that determines how authorization response parameters are returned to your web app. You can set one of the following values. The default value is `query`.)
   *
   * @default 'query'
   *
   * `query`: 인증 응답 파라미터는 콜백 URL의 쿼리 파라미터로 반환됩니다. *1
   * (`query`: The authorization response parameters are returned as query parameters to the callback URL. *1)
   *
   * `form_post`: 인증 응답 파라미터는 HTTP POST 요청의 본문에 포함되어 반환됩니다. *2
   * (`form_post`: The authorization response parameters are returned in the request body of an HTTP POST request. *2)
   *
   * `query.jwt`: 인증 응답 파라미터가 JWT에 담겨 콜백 URL의 쿼리 파라미터로 반환됩니다. jwt를 설정한 경우와 동일합니다. *3
   * (`query.jwt`: The authorization response parameters are placed in a JWT and returned as a query parameter to the callback URL. Same as when jwt is set. *3)
   *
   * `form_post.jwt`: 인증 응답 파라미터가 JWT에 담겨 HTTP POST 요청 본문으로 반환됩니다. *3
   * (`form_post.jwt`: The authorization response parameters are placed in a JWT and returned in the request body of an HTTP POST request. *3)
   *
   * `jwt`: 인증 응답 파라미터가 JWT에 담겨 콜백 URL의 쿼리 파라미터로 반환됩니다. query.jwt를 설정한 경우와 동일합니다. *3
   * (`jwt`: The authorization response parameters are placed in a JWT and returned as a query parameter of the callback URL. Same as when query.jwt is set. *3)
   */
  response_mode?:
    | 'query'
    | 'form_post'
    | 'query.jwt:'
    | 'form_post.jwt'
    | 'jwt';
};

/**
 * 버전에 따른 Line OAuth URL 생성.
 * (Create Line OAuth URL by version.)
 *
 * @param version - Line OAuth 버전 문자열
 * (@param version - Line OAuth version string)
 * @returns Line OAuth 페이지 URL ('https://access.line.me/oauth2/v2.1')
 * (@returns Line OAuth page URL ('https://access.line.me/oauth2/v2.1'))
 *
 * @example
 * ```typescript
 * const url = makeLineOAuthUrlByVersion('v2.1');
 * ```
 */
export const makeLineOAuthUrlByVersion = (version: string) =>
  `https://access.line.me/oauth2/${version}`;

/**
 * Line 로그인 URL 생성.
 * (Create Line login URL.)
 *
 * Line OAuth 2.0 인증을 위한 URL을 생성합니다.
 * (Create a URL for Line OAuth 2.0 authentication.)
 *
 * @param props - Line 로그인에 필요한 파라미터
 * (@param props - Parameters required for Line login)
 * @returns Line 로그인 페이지 URL ('https://access.line.me/oauth2/v2.1/authorize?client_id=...')
 * (@returns Line login page URL ('https://access.line.me/oauth2/v2.1/authorize?client_id=...'))
 */
export const makeLineLoginUrl = (props: Props) => {
  // Destructure props
  // props 구조 분해
  // (Destructure props)
  const { version = 'v2.1' } = props;

  // 제공된 파라미터로 URLSearchParams 객체 생성
  // (Create URLSearchParams object with provided parameters)
  const params = new URLSearchParams();

  // 버전에 따른 기본 Line OAuth URL 생성
  // (Generate the base Line OAuth URL by version)
  const url = makeLineOAuthUrlByVersion(version);

  return `${url}/authorize?${params.toString()}`;
};

/**
 * Line 로그인 리다이렉트.
 * (Line login redirect.)
 *
 * 브라우저를 Line 로그인 페이지로 리다이렉트합니다.
 * (Redirects the browser to the Line login page.)
 *
 * @param props - Line 로그인에 필요한 파라미터
 * (@param props - Parameters required for Line login)
 *
 * @example
 * ```typescript
 * lineLogin({
 *   client_id: 'YOUR_CLIENT_ID',
 *   redirect_uri: 'YOUR_REDIRECT_URI',
 *   state: 'RANDOM_STATE_VALUE',
 *   scope: 'profile openid email'
 * });
 * ```
 */
export const lineLogin = (props: Props) => {
  // Line 로그인 URL 생성
  // (Generate Line login URL)
  const url = makeLineLoginUrl(props);

  // Line 로그인 URL로 리다이렉트
  // (Redirect to Line login URL)
  window.location.href = url;
};
