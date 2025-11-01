type Props = {
  clientId: string;
  redirectUri: string;
  responseType: string;
  state: string;
  nonce: string;
};

export const appleLogin = ({
  clientId,
  redirectUri,
  responseType,
  state,
  nonce,
}: Props) => {
  const params = new URLSearchParams();

  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', responseType);
  params.set('state', state);
  params.set('nonce', nonce);

  window.location.href = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
};
