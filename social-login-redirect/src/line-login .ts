type Props = {
  clientId: string;
  redirectUri: string;
  responseType: string;
  scope: string;
  state: string;
  nonce: string;
  prompt: string;
};

export const lineLogin = ({
  clientId,
  redirectUri,
  responseType,
  scope,
  prompt,
  state,
  nonce,
}: Props) => {
  const params = new URLSearchParams();

  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', responseType);
  params.set('scope', scope);
  params.set('prompt', prompt);
  params.set('state', state);
  params.set('nonce', nonce);

  window.location.href = `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`;
};
