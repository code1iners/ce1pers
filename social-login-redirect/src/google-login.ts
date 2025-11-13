const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth`;

/**
 * @link https://developers.google.com/identity/protocols/oauth2/web-server?hl=ko#httprest
 */
type Props = {
  /**
   * 필수
   *
   * 애플리케이션의 클라이언트 ID입니다.
   *
   * 이 값은 Cloud Console Clients page에서 확인할 수 있습니다.
   */
  client_id: string;

  /**
   * 필수
   *
   * 사용자가 승인 흐름을 완료한 후 API 서버가 사용자를 리디렉션하는 위치를 결정합니다. 이 값은 클라이언트의 Cloud Console Clients page에 구성된 OAuth 2.0 클라이언트의 승인된 리디렉션 URI 중 하나와 정확히 일치해야 합니다. 이 값이 제공된 client_id의 승인된 리디렉션 URI와 일치하지 않으면 redirect_uri_mismatch 오류가 발생합니다.
   *
   * http 또는 https 스키마, 케이스, 후행 슬래시('/')가 모두 일치해야 합니다.
   */
  redirect_uri: string;

  /**
   * 필수
   *
   * Google OAuth 2.0 엔드포인트가 승인 코드를 반환하는지 여부를 결정합니다.
   *
   * 웹 서버 애플리케이션의 경우 매개변수 값을 code로 설정합니다.
   */
  response_type?: string;

  /**
   * 필수
   *
   * 애플리케이션이 사용자를 대신하여 액세스할 수 있는 리소스를 식별하는 공백으로 구분된 범위 목록입니다. 이러한 값은 Google이 사용자에게 표시하는 동의 화면에 정보를 제공합니다.
   *
   * 범위를 사용 설정하면 애플리케이션은 필요한 리소스에 대한 액세스만 요청하고 사용자는 애플리케이션에 부여하는 액세스 양을 제어할 수 있습니다. 따라서 요청된 범위의 수와 사용자 동의를 얻을 가능성 사이에는 역관계가 있습니다.
   *
   * 가능한 경우 애플리케이션이 컨텍스트에서 승인 범위에 대한 액세스를 요청하는 것이 좋습니다. 단계별 승인을 사용하여 관련 맥락 안에서 사용자 데이터에 대한 액세스를 요청하면 사용자가 애플리케이션에 요청된 액세스가 필요한 이유를 이해할 수 있습니다.
   */
  scope: string;

  /**
   * 권장
   *
   * 사용자가 브라우저에 없을 때 애플리케이션이 액세스 토큰을 새로고침할 수 있는지 여부를 나타냅니다. 유효한 매개변수 값은 online(기본값) 및 offline입니다.
   *
   * 사용자가 브라우저에 없을 때 애플리케이션이 액세스 토큰을 새로고침해야 하는 경우 값을 offline로 설정합니다. 이는 이 문서의 뒷부분에 설명된 액세스 토큰을 갱신하는 방법입니다. 이 값은 애플리케이션이 처음으로 승인 코드를 토큰으로 교환할 때 Google 승인 서버가 갱신 토큰과 액세스 토큰을 반환하도록 지시합니다.
   */
  access_type?: 'online' | 'offline';

  /**
   * 권장
   *
   * 애플리케이션이 승인 요청과 승인 서버의 응답 간에 상태를 유지하는 데 사용하는 문자열 값을 지정합니다. 사용자가 애플리케이션의 액세스 요청에 동의하거나 거부하면 서버는 redirect_uri의 URL 쿼리 구성요소 (?)에서 name=value 쌍으로 전송한 정확한 값을 반환합니다.
   *
   * 이 매개변수는 사용자를 애플리케이션의 올바른 리소스로 안내하고, nonce를 전송하고, 크로스 사이트 요청 위조를 완화하는 등 여러 용도로 사용할 수 있습니다. redirect_uri는 추측할 수 있으므로 state 값을 사용하면 수신 연결이 인증 요청의 결과임을 더 확실하게 알 수 있습니다. 무작위 문자열을 생성하거나 쿠키 또는 클라이언트의 상태를 캡처하는 다른 값의 해시를 인코딩하는 경우 응답을 검증하여 요청과 응답이 동일한 브라우저에서 시작되었는지 추가로 확인할 수 있으므로 크로스 사이트 요청 위조와 같은 공격으로부터 보호할 수 있습니다. state 토큰을 만들고 확인하는 방법의 예는 OpenID Connect 문서를 참고하세요.
   */
  state?: string;

  /**
   * 선택사항
   *
   * 애플리케이션이 단계적 승인을 사용하여 컨텍스트에서 추가 범위에 대한 액세스를 요청할 수 있도록 지원합니다. 이 매개변수의 값을 true로 설정하고 승인 요청이 승인되면 새 액세스 토큰은 사용자가 이전에 애플리케이션 액세스를 승인한 범위도 포함합니다. 예시는 증분 승인 섹션을 참고하세요.
   */
  include_granted_scopes?: string;

  /**
   * 선택사항
   *
   * 기본값은 true입니다. false로 설정하면 2019년 이전에 생성된 OAuth 클라이언트 ID에 대해 더 세부적인 Google 계정 권한이 사용 중지됩니다. 더 세분화된 권한이 항상 사용 설정되어 있으므로 최신 OAuth 클라이언트 ID에는 영향을 미치지 않습니다.
   *
   * Google에서 애플리케이션의 세부 권한을 사용 설정하면 이 매개변수는 더 이상 영향을 미치지 않습니다.
   */
  enable_granular_consent?: string;

  /**
   * 선택사항
   *
   * 애플리케이션이 인증을 시도하는 사용자를 알고 있는 경우 이 매개변수를 사용하여 Google 인증 서버에 힌트를 제공할 수 있습니다. 서버는 힌트를 사용하여 로그인 양식의 이메일 필드를 미리 입력하거나 적절한 다중 로그인 세션을 선택하여 로그인 흐름을 간소화합니다.
   *
   * 매개변수 값을 이메일 주소 또는 sub 식별자로 설정합니다. 이는 사용자의 Google ID와 동일합니다.
   */
  login_hint?: string;

  /**
   * 선택사항
   *
   * 사용자에게 표시할 프롬프트의 공백으로 구분된 대소문자 구분 목록입니다. 이 매개변수를 지정하지 않으면 프로젝트에서 액세스를 요청할 때만 사용자에게 메시지가 표시됩니다. 자세한 내용은 재동의 요청을 참고하세요.
   *
   * 가능한 값은 다음과 같습니다.
   *
   * `none` : 인증 또는 동의 화면을 표시하지 않습니다. 다른 값과 함께 지정하면 안 됩니다.
   *
   * `consent` : 사용자에게 동의를 요청합니다.
   *
   * `select_account` : 사용자에게 계정을 선택하라는 메시지를 표시합니다.
   */
  prompt?: 'none' | 'consent' | 'select_account';
};

export const makeGoogleLoginUrl = ({
  response_type = 'code',
  ...rest
}: Props) => {
  /** 승인 매개변수 설정 (Approval request parameters). */
  const params = new URLSearchParams({
    response_type,
    ...rest,
  });

  // params.set('service', service);
  // params.set('o2v', o2v);
  // params.set('flowName', flowName);

  return `${GOOGLE_LOGIN_URL}?${params.toString()}`;

  // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?${params.toString()}`;
};

/**
 * 구글 로그인 URL 생성. (Create Google login URL.)
 *
 * 구글 OAuth 2.0 인증을 위한 URL을 생성합니다.
 * (Generates a URL for Google OAuth 2.0 authentication.)
 *
 * @param props - 구글 로그인에 필요한 파라미터
 * @returns 구글 로그인 페이지 URL ('https://accounts.google.com/o/oauth2/v2/auth?...')
 *
 * @example
 * ```typescript
 * const url = makeGoogleLoginUrl({
 *   clientId: 'YOUR_CLIENT_ID',
 *   redirectUri: 'https://example.com/callback',
 *   scope: 'email profile',
 *   state: 'random-state-token'
 * });
 * ```
 */
export const googleLogin = (props: Props) => {
  // Generate Google login URL.
  const url = makeGoogleLoginUrl(props);

  // Redirect to Google login page.
  window.location.href = url;
};
