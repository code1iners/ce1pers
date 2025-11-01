type Props = {
  clientId: string;
  redirectUri: string;
  responseType: string;
  state: string;
  version: string;
};

export const facebookLogin = ({
  clientId,
  redirectUri,
  responseType,
  state,

  version,
}: Props) => {
  const params = new URLSearchParams();

  params.set('client_id', clientId);
  params.set('redirect_uri', redirectUri);
  params.set('response_type', responseType);
  params.set('state', state);

  window.location.href = `https://www.facebook.com/${version}/dialog/oauth?${params.toString()}`;
};
