type Props = {
  /**
   * 필수
   *
   * The identifier (App ID or Services ID) for your app. The identifier must not include your Team ID, to help prevent the possibility of exposing sensitive data to the end user.
   */
  client_id: string;

  /**
   * 필수
   *
   * The destination URI associated to your app, to which the authorization redirects. The URI must use the HTTPS protocool, include a domain name, can’t be an IP address or localhost, and must not contain a fragment identifer (#). For more information, see `Configuring your environment for Sign in with Apple`.
   *
   * @link `Configuring your environment for Sign in with Apple` : https://developer.apple.com/documentation/signinwithapple/configuring-your-environment-for-sign-in-with-apple
   */
  redirect_uri: string;

  /**
   * 필수
   *
   * The type of response requested. Valid values are code and id_token. You can request only code, or both code and id_token. Requesting only id_token is unsupported. When requesting id_token, response_mode must be either fragment or form_post.
   */
  response_type?: 'code' | 'both';

  /**
   * 선택
   *
   * A unique, single-use string that your app provides to associate a client session with the user’s identity token. This value is also used to prevent replay attacks, and allows you to correlate the initial authentication request with the identity token provided in the authorization response.
   */
  nonce: string;

  /**
   * 선택
   *
   * The type of response mode expected. Valid values are query, fragment, and form_post. If you requested any scopes, the value must be form_post.
   */
  response_mode: 'query' | 'fragment' | 'form_post';

  /**
   * 선택
   *
   * The amount of user information requested from Apple. Valid values are name and email. You can request one, both, or none. Use space separation and percent-encoding for multiple scopes; for example, "scope=name%20email".
   */
  scope: string;

  /**
   * 선택
   *
   * An arbitrary string that your app provides, representing the current state of the authorization request. This value is also used to mitigate cross-site request forgery attacks, by comparing against the state value contained in the authorization response.
   */
  state: string;
};

/**
 * Apple 로그인 요청 URL. (Apple login request URL.)
 */
const APPLE_LOGIN_URL = `https://appleid.apple.com/auth/authorize`;

/**
 * Apple 로그인 URL 생성. (Create Apple login URL.)
 *
 * Apple OAuth 2.0 인증을 위한 URL을 생성합니다.
 * (Generates a URL for Apple OAuth 2.0 authentication.)
 *
 * @param props - Apple 로그인에 필요한 파라미터
 * @returns Apple 로그인 페이지 URL ('https://appleid.apple.com/auth/authorize?client_id=...')
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
  // Create URLSearchParams object with provided parameters
  const params = new URLSearchParams({
    response_type,
    scope,
    ...rest,
  });

  // Return the complete Apple login URL
  return `${APPLE_LOGIN_URL}?${params.toString()}`;
};

/**
 * Apple 로그인 리다이렉트. (Apple login redirect.)
 *
 * 브라우저를 Apple 로그인 페이지로 리다이렉트합니다.
 * (Redirects the browser to the Apple login page.)
 *
 * @param props
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
  // Create Apple login URL with provided parameters
  const url = makeAppleLoginUrl(props);

  // Redirect to Apple login URL.
  window.location.href = url;
};
