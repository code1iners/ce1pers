import { strict as assert } from "node:assert";
import { test } from "node:test";

import * as publicApi from "../dist/index.js";
import {
  appleLogin,
  facebookLogin,
  makeGoogleLoginUrl,
  makeKakaoLoginUrl,
  makeLineLoginUrl,
  makeNaverLoginUrl,
} from "../dist/index.js";

const MATRIX_STATE = "state-value&attempt=1";

const captureLoginUrl = (login, input) => {
  const previousWindow = globalThis.window;
  const location = { href: "" };
  globalThis.window = { location };

  try {
    login(input);
    return location.href;
  } finally {
    if (previousWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = previousWindow;
    }
  }
};

/** Redirect-only login 함수를 URL builder 테스트 seam으로 변환합니다. */
const makeRedirectUrlBuilder = (login) => (input) =>
  captureLoginUrl(login, input);

/** Apple redirect login URL test builder. */
const makeAppleRedirectUrl = makeRedirectUrlBuilder(appleLogin);
/** Facebook redirect login URL test builder. */
const makeFacebookRedirectUrl = makeRedirectUrlBuilder(facebookLogin);

const makeMatrixRedirectUri = (provider) =>
  `https://example.com/auth/${provider}/callback?source=matrix&return=%2Fdashboard`;

const providerMatrix = [
  {
    name: "Google",
    makeUrl: makeGoogleLoginUrl,
    input: {
      client_id: "client-id",
      redirect_uri: makeMatrixRedirectUri("google"),
      scope: "openid email profile",
      state: MATRIX_STATE,
      access_type: "offline",
      include_granted_scopes: "true",
      enable_granular_consent: "false",
      login_hint: "user@example.com",
      prompt: "select_account",
      response_type: undefined,
    },
    expected: {
      origin: "https://accounts.google.com",
      pathname: "/o/oauth2/v2/auth",
      query: {
        response_type: "code",
        client_id: "client-id",
        redirect_uri: makeMatrixRedirectUri("google"),
        scope: "openid email profile",
        state: MATRIX_STATE,
        access_type: "offline",
        include_granted_scopes: "true",
        enable_granular_consent: "false",
        login_hint: "user@example.com",
        prompt: "select_account",
      },
      omitted: [],
    },
  },
  {
    name: "Kakao",
    makeUrl: makeKakaoLoginUrl,
    input: {
      client_id: "client-id",
      redirect_uri: makeMatrixRedirectUri("kakao"),
      scope: "account_email&profile_nickname",
      state: MATRIX_STATE,
      prompt: "select_account",
      login_hint: "user@example.com",
      service_terms: "terms-a,terms-b",
      nonce: "nonce-value",
      response_type: undefined,
    },
    expected: {
      origin: "https://kauth.kakao.com",
      pathname: "/oauth/authorize",
      query: {
        response_type: "code",
        client_id: "client-id",
        redirect_uri: makeMatrixRedirectUri("kakao"),
        scope: "account_email&profile_nickname",
        state: MATRIX_STATE,
        prompt: "select_account",
        login_hint: "user@example.com",
        service_terms: "terms-a,terms-b",
        nonce: "nonce-value",
      },
      omitted: [],
    },
  },
  {
    name: "LINE",
    makeUrl: makeLineLoginUrl,
    input: {
      client_id: "client-id",
      redirect_uri: makeMatrixRedirectUri("line"),
      scope: "profile openid email",
      state: MATRIX_STATE,
      nonce: "",
      prompt: undefined,
      max_age: 0,
      ui_locales: "ko-KR en-US",
      bot_prompt: "normal",
      initial_amr_display: "lineqr",
      switch_amr: false,
      disable_auto_login: true,
      disable_ios_auto_login: false,
      code_challenge: "challenge-value",
      code_challenge_method: "S256",
      response_mode: "query.jwt",
      response_type: undefined,
    },
    expected: {
      origin: "https://access.line.me",
      pathname: "/oauth2/v2.1/authorize",
      query: {
        response_type: "code",
        client_id: "client-id",
        redirect_uri: makeMatrixRedirectUri("line"),
        scope: "profile openid email",
        state: MATRIX_STATE,
        nonce: "",
        max_age: "0",
        ui_locales: "ko-KR en-US",
        bot_prompt: "normal",
        initial_amr_display: "lineqr",
        switch_amr: "false",
        disable_auto_login: "true",
        disable_ios_auto_login: "false",
        code_challenge: "challenge-value",
        code_challenge_method: "S256",
        response_mode: "query.jwt",
      },
      omitted: ["prompt", "version"],
    },
  },
  {
    name: "Naver",
    makeUrl: makeNaverLoginUrl,
    input: {
      clientId: "client-id",
      redirectUri: makeMatrixRedirectUri("naver"),
      state: MATRIX_STATE,
      response_type: undefined,
    },
    expected: {
      origin: "https://nid.naver.com",
      pathname: "/oauth2.0/authorize",
      query: {
        response_type: "code",
        client_id: "client-id",
        redirect_uri: makeMatrixRedirectUri("naver"),
        state: MATRIX_STATE,
      },
      omitted: ["clientId", "redirectUri"],
    },
  },
  {
    name: "Apple",
    makeUrl: makeAppleRedirectUrl,
    input: {
      client_id: "client-id",
      redirect_uri: makeMatrixRedirectUri("apple"),
      nonce: "nonce-value",
      response_mode: "form_post",
      scope: undefined,
      state: MATRIX_STATE,
      response_type: undefined,
    },
    expected: {
      origin: "https://appleid.apple.com",
      pathname: "/auth/authorize",
      query: {
        response_type: "code",
        scope: "name email",
        client_id: "client-id",
        redirect_uri: makeMatrixRedirectUri("apple"),
        nonce: "nonce-value",
        response_mode: "form_post",
        state: MATRIX_STATE,
      },
      omitted: [],
    },
  },
  {
    name: "Facebook",
    makeUrl: makeFacebookRedirectUrl,
    input: {
      client_id: "client-id",
      redirect_uri: makeMatrixRedirectUri("facebook"),
      state: MATRIX_STATE,
      scope: "email public_profile",
      version: undefined,
      response_type: undefined,
    },
    expected: {
      origin: "https://www.facebook.com",
      pathname: "/v24.0/dialog/oauth",
      query: {
        response_type: "code",
        client_id: "client-id",
        redirect_uri: makeMatrixRedirectUri("facebook"),
        state: MATRIX_STATE,
        scope: "email public_profile",
      },
      omitted: ["version"],
    },
  },
];

for (const provider of providerMatrix) {
  test(`provider matrix preserves the ${provider.name} URL contract`, () => {
    const url = new URL(provider.makeUrl(provider.input));

    assert.equal(url.origin, provider.expected.origin);
    assert.equal(url.pathname, provider.expected.pathname);
    assert.deepEqual(
      [...url.searchParams.keys()].sort(),
      Object.keys(provider.expected.query).sort(),
    );

    for (const [name, value] of Object.entries(provider.expected.query)) {
      assert.equal(url.searchParams.get(name), value);
    }

    for (const name of provider.expected.omitted) {
      assert.equal(url.searchParams.has(name), false);
    }

    assert.equal(url.searchParams.has("undefined"), false);
    assert.equal(url.searchParams.get("source"), null);
    assert.equal(url.searchParams.get("return"), null);
  });
}

test("keeps the documented package export surface", () => {
  assert.deepEqual(Object.keys(publicApi).sort(), [
    "appleLogin",
    "facebookLogin",
    "googleLogin",
    "kakaoLogin",
    "lineLogin",
    "makeGoogleLoginUrl",
    "makeKakaoLoginUrl",
    "makeLineLoginUrl",
    "makeNaverLoginUrl",
    "naverLogin",
  ]);
});

test("keeps a requested Facebook OAuth version in the endpoint path", () => {
  const url = new URL(
    makeFacebookRedirectUrl({
      version: "v21.0",
      client_id: "client-id",
      redirect_uri: "https://example.com/auth/facebook/callback",
      state: "state-value",
      response_type: "token",
    }),
  );

  assert.equal(url.origin, "https://www.facebook.com");
  assert.equal(url.pathname, "/v21.0/dialog/oauth");
  assert.equal(url.searchParams.get("response_type"), "token");
  assert.equal(url.searchParams.get("version"), null);
});

test("omits undefined Facebook optional inputs", () => {
  const url = new URL(
    makeFacebookRedirectUrl({
      client_id: "client-id",
      redirect_uri: "https://example.com/auth/facebook/callback",
      state: "state-value",
      scope: undefined,
      response_type: undefined,
    }),
  );

  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.has("scope"), false);
});

test("omits undefined Apple inputs and preserves empty strings", () => {
  const url = new URL(
    makeAppleRedirectUrl({
      client_id: "client-id",
      redirect_uri: "https://example.com/auth/apple/callback",
      nonce: "",
      response_mode: undefined,
      state: undefined,
      scope: undefined,
      response_type: undefined,
    }),
  );

  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("scope"), "name email");
  assert.equal(url.searchParams.get("nonce"), "");
  assert.equal(url.searchParams.has("response_mode"), false);
  assert.equal(url.searchParams.has("state"), false);
});

test("omits undefined Google optional inputs", () => {
  const url = new URL(
    makeGoogleLoginUrl({
      client_id: "client-id",
      redirect_uri: "https://example.com/auth/google/callback",
      scope: "openid email",
      state: undefined,
      access_type: undefined,
    }),
  );

  assert.equal(url.searchParams.has("state"), false);
  assert.equal(url.searchParams.has("access_type"), false);
});

test("omits undefined Kakao optional inputs and preserves empty strings", () => {
  const url = new URL(
    makeKakaoLoginUrl({
      client_id: "client-id",
      redirect_uri: "https://example.com/auth/kakao/callback",
      scope: undefined,
      prompt: undefined,
      login_hint: undefined,
      service_terms: undefined,
      state: undefined,
      nonce: "",
    }),
  );

  assert.equal(url.searchParams.get("nonce"), "");
  assert.equal(url.searchParams.has("scope"), false);
  assert.equal(url.searchParams.has("prompt"), false);
  assert.equal(url.searchParams.has("login_hint"), false);
  assert.equal(url.searchParams.has("service_terms"), false);
  assert.equal(url.searchParams.has("state"), false);
});

test("keeps a requested LINE OAuth version in the endpoint path", () => {
  const url = new URL(
    makeLineLoginUrl({
      version: "v2.0",
      client_id: "client-id",
      redirect_uri: "https://example.com/auth/line/callback",
      state: "state-value",
      scope: "profile",
    }),
  );

  assert.equal(url.origin, "https://access.line.me");
  assert.equal(url.pathname, "/oauth2/v2.0/authorize");
  assert.equal(url.searchParams.get("version"), null);
  assert.equal(url.searchParams.get("response_type"), "code");
});

test("keeps Naver public-to-wire query names", () => {
  const redirectUri = makeMatrixRedirectUri("naver");
  const url = new URL(
    makeNaverLoginUrl({
      clientId: "client-id",
      redirectUri,
      state: MATRIX_STATE,
    }),
  );

  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("state"), MATRIX_STATE);
  assert.equal(url.searchParams.get("clientId"), null);
  assert.equal(url.searchParams.get("redirectUri"), null);
});
