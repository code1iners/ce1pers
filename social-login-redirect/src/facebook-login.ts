type Props = {
  /**
   * 필수
   *
   * 앱 대시보드에서 발견되는 앱의 ID입니다.
   */
  client_id: string;

  /**
   * 필수
   *
   * 사용자가 다시 로그인하도록 리디렉션할 URL입니다. 이 URL은 로그인 대화 상자의 응답을 캡처합니다. 데스크톱 앱의 웹 보기에서 로그인 대화 상자를 사용할 경우  https://www.facebook.com/connect/login_success.html로 설정해야 합니다. 앱 대시보드에서 앱에 이 URL이 설정되어 있는지 확인할 수 있습니다. 앱 대시보드의 왼쪽 탐색 메뉴에 있는 제품에서 Facebook 로그인을 클릭한 다음, 설정을 클릭합니다. 클라이언트 OAuth 설정 섹션에서 유효한 OAuth 리디렉션 URI를 인증합니다.
   */
  redirect_uri: string;

  /**
   * 필수
   *
   * 요청과 콜백 사이의 상태를 유지하기 위해 앱에서 생성한 문자열 값입니다. 이 매개변수는 사이트 간 요청 위조를 방지하는 데 사용해야 하며 리디렉션 URI에서 변경 없이 그대로 다시 전달됩니다.
   */
  state: string;

  /**
   * 필수
   *
   * 사용할 OAuth 버전입니다. 예: 'v24.0'
   *
   * @default 'v24.0'
   */
  version?: string;

  /**
   * 선택
   *
   * 앱으로 다시 리디렉션할 때 포함된 응답 데이터가 URL 매개변수인지 프래그먼트인지 결정합니다. 앱에서 사용할 유형을 선택하려면 ID 확인 섹션을 참조하세요. 다음 중 하나일 수 있습니다.
   *
   * `code` - 응답 데이터는 URL 매개변수로 포함되어 있으며, `code` 매개변수(각 로그인 요청에 고유한 암호화된 문자열)를 포함합니다. 이 매개변수가 지정되지 않은 경우의 기본 동작입니다. 이는 서버가 토큰을 처리할 때 가장 유용합니다.
   *
   * `token` - 응답 데이터는 URL 프래그먼트로 포함되어 있으며, 액세스 토큰을 포함합니다. 데스크톱 앱은 `response_type`에 이 설정을 사용해야 합니다. 이는 클라이언트가 토큰을 처리할 때 가장 유용합니다.
   *
   * `code token` - 응답 데이터는 URL 프래그먼트로 포함되어 있으며, 액세스 토큰과 `code` 매개변수를 모두 포함합니다.
   *
   * `granted_scopes` - 사용자가 로그인 시점에 앱에 부여한 모든 권한의 쉼표로 구분한 리스트를 반환합니다. 다른 `response_type` 값과 결합할 수 있습니다. `token`과 결합하면 응답 데이터가 URL 프래그먼트로 포함됩니다. 그 외의 경우에는 URL 매개변수로 포함됩니다.
   *
   * @default 'code'
   */
  response_type?: 'code' | 'token' | 'code token' | 'granted_scopes';

  /**
   * 선택
   *
   * 앱 사용자에게 요청할 권한의 쉼표 또는 공백으로 구분한 리스트입니다.
   */
  scope?: string;
};

/**
 * 버전에 따른 Facebook 로그인 URL 생성. (Create Facebook login URL by version.)
 *
 * @param version
 * @returns Facebook 로그인 페이지 URL ('https://www.facebook.com/v24.0/dialog/oauth')
 *
 * @example
 * ```typescript
 * const url = makeFacebookOAuthUrlByVersion('v24.0');
 * ```
 */
export const makeFacebookOAuthUrlByVersion = (version: string) =>
  `https://www.facebook.com/${version}/dialog/oauth`;

/**
 * Facebook 로그인 URL 생성. (Create Facebook login URL.)
 *
 * Facebook OAuth 2.0 인증을 위한 URL을 생성합니다.
 * (Generates a URL for Facebook OAuth 2.0 authentication.)
 *
 * @param props - Facebook 로그인에 필요한 파라미터
 * @returns Facebook 로그인 페이지 URL ('https://www.facebook.com/v24.0/dialog/oauth?client_id=...')
 *
 * @example
 * ```typescript
 * const url = makeFacebookLoginUrl({
 *   client_id: 'your-client-id',
 *   redirect_uri: 'https://example.com/callback',
 *   state: 'random-state-value'
 * });
 * ```
 */
export const makeFacebookLoginUrl = (props: Props) => {
  // Destructure version from props with a default value
  const { version = 'v24.0', response_type = 'code', ...rest } = props;

  // Create URLSearchParams from the remaining properties
  const params = new URLSearchParams({
    response_type,
    ...rest,
  });

  // Generate the base Facebook login URL by version
  const url = makeFacebookOAuthUrlByVersion(version);

  // Return the complete URL with query parameters
  return `${url}?${params.toString()}`;
};

/**
 * Facebook 로그인 리다이렉트. (Facebook login redirect.)
 *
 * 브라우저를 Facebook 로그인 페이지로 리다이렉트합니다.
 * (Redirects the browser to the Facebook login page.)
 *
 * @param props
 *
 * @example
 * ```typescript
 * facebookLogin({
 *   client_id: 'your-client-id',
 *   redirect_uri: 'https://example.com/callback',
 *   state: 'random-state-value'
 * });
 * ```
 */
export const facebookLogin = (props: Props) => {
  // Generate the Facebook login URL
  const url = makeFacebookLoginUrl(props);

  // Redirect the browser to the Facebook login page
  window.location.href = url;
};
