type Props = {
  clientId: string;
  redirectUri: string;
  responseType: string;
  state: string;
  scope: string;
  service: string;
  o2v: string;
  flowName: string;
};

export const googleLogin = ({
  clientId,
  redirectUri,
  responseType,
  scope,
  service,
  o2v,
  flowName,
}: Props) => {
  const params = new URLSearchParams();

  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', responseType);
  params.set('scope', scope);
  params.set('service', service);
  params.set('o2v', o2v);
  params.set('flowName', flowName);

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?${params.toString()}`;
};
