type Props = {
  clientId: string;
  redirectUri: string;
  responseType: string;
  state: string;
};

export const naverLogin = ({
  clientId,
  redirectUri,
  responseType,
  state,
}: Props) => {
  const params = new URLSearchParams();

  params.append('client_id', clientId);
  params.append('redirect_url', redirectUri);
  params.append('response_type', responseType);
  params.append('state', state);

  window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
};
