import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  makeGoogleLoginUrl,
  makeKakaoLoginUrl,
  makeLineLoginUrl,
  makeNaverLoginUrl,
} from "../dist/index.js";
import { makeAppleLoginUrl } from "../dist/src/apple-login.js";
import { makeFacebookLoginUrl } from "../dist/src/facebook-login.js";

test("builds a Facebook authorization URL with its default version", () => {
  const redirectUri =
    "https://example.com/auth/facebook/callback?source=web&return=%2Fdashboard";
  const url = new URL(
    makeFacebookLoginUrl({
      client_id: "client-id",
      redirect_uri: redirectUri,
      state: "state-value&attempt=1",
      scope: "email public_profile",
    }),
  );

  assert.equal(url.origin, "https://www.facebook.com");
  assert.equal(url.pathname, "/v24.0/dialog/oauth");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("state"), "state-value&attempt=1");
  assert.equal(url.searchParams.get("scope"), "email public_profile");
  assert.equal(url.searchParams.get("version"), null);
});

test("keeps a requested Facebook OAuth version in the endpoint path", () => {
  const url = new URL(
    makeFacebookLoginUrl({
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
    makeFacebookLoginUrl({
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

test("builds an Apple authorization URL with provider defaults", () => {
  const redirectUri =
    "https://example.com/auth/apple/callback?source=web&return=%2Fdashboard";
  const url = new URL(
    makeAppleLoginUrl({
      client_id: "client-id",
      redirect_uri: redirectUri,
      nonce: "nonce-value",
      response_mode: "form_post",
      state: "state-value&attempt=1",
    }),
  );

  assert.equal(url.origin, "https://appleid.apple.com");
  assert.equal(url.pathname, "/auth/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("scope"), "name email");
  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("nonce"), "nonce-value");
  assert.equal(url.searchParams.get("response_mode"), "form_post");
  assert.equal(url.searchParams.get("state"), "state-value&attempt=1");
});

test("omits undefined Apple inputs and preserves empty strings", () => {
  const url = new URL(
    makeAppleLoginUrl({
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

test("builds a Google authorization URL from public inputs", () => {
  const redirectUri =
    "https://example.com/auth/google/callback?source=web&return=%2Fdashboard";
  const url = new URL(
    makeGoogleLoginUrl({
      client_id: "client-id",
      redirect_uri: redirectUri,
      scope: "openid email profile",
      state: "state-value&attempt=1",
      access_type: "offline",
      include_granted_scopes: "true",
      enable_granular_consent: "false",
      login_hint: "user@example.com",
      prompt: "select_account",
      response_type: undefined,
    }),
  );

  assert.equal(url.origin, "https://accounts.google.com");
  assert.equal(url.pathname, "/o/oauth2/v2/auth");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("scope"), "openid email profile");
  assert.equal(url.searchParams.get("state"), "state-value&attempt=1");
  assert.equal(url.searchParams.get("access_type"), "offline");
  assert.equal(url.searchParams.get("include_granted_scopes"), "true");
  assert.equal(url.searchParams.get("enable_granular_consent"), "false");
  assert.equal(url.searchParams.get("login_hint"), "user@example.com");
  assert.equal(url.searchParams.get("prompt"), "select_account");
  assert.equal(url.searchParams.has("undefined"), false);
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

test("builds a Kakao authorization URL from public inputs", () => {
  /** Kakao callback URL containing its own query parameters. */
  const redirectUri =
    "https://example.com/auth/kakao/callback?source=web&return=%2Fdashboard";
  /** Kakao authorization URL generated by the public helper. */
  const url = new URL(
    makeKakaoLoginUrl({
      client_id: "client-id",
      redirect_uri: redirectUri,
      scope: "account_email&profile_nickname",
      prompt: "select_account",
      login_hint: "user@example.com",
      service_terms: "terms-a,terms-b",
      state: "state-value&attempt=1",
      nonce: "nonce-value",
    }),
  );

  assert.equal(url.origin, "https://kauth.kakao.com");
  assert.equal(url.pathname, "/oauth/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(
    url.searchParams.get("scope"),
    "account_email&profile_nickname",
  );
  assert.equal(url.searchParams.get("prompt"), "select_account");
  assert.equal(url.searchParams.get("login_hint"), "user@example.com");
  assert.equal(url.searchParams.get("service_terms"), "terms-a,terms-b");
  assert.equal(url.searchParams.get("state"), "state-value&attempt=1");
  assert.equal(url.searchParams.get("nonce"), "nonce-value");
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

test("builds a LINE authorization URL from required and optional inputs", () => {
  /** LINE callback URL containing a query parameter. */
  const redirectUri = "https://example.com/auth/line/callback?source=web";
  /** LINE authorization URL generated by the public helper. */
  const url = new URL(
    makeLineLoginUrl({
      client_id: "client-id",
      redirect_uri: redirectUri,
      state: "state-value",
      scope: "profile openid email",
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
    }),
  );

  assert.equal(url.origin, "https://access.line.me");
  assert.equal(url.pathname, "/oauth2/v2.1/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("state"), "state-value");
  assert.equal(url.searchParams.get("scope"), "profile openid email");
  assert.equal(url.searchParams.get("max_age"), "0");
  assert.equal(url.searchParams.get("switch_amr"), "false");
  assert.equal(url.searchParams.get("disable_ios_auto_login"), "false");
  assert.equal(url.searchParams.get("response_mode"), "query.jwt");
  assert.equal(url.searchParams.has("nonce"), true);
  assert.equal(url.searchParams.get("nonce"), "");
  assert.equal(url.searchParams.get("prompt"), null);
  assert.equal(url.searchParams.get("version"), null);
});

test("keeps a requested LINE OAuth version in the endpoint path", () => {
  /** LINE authorization URL generated for an explicitly requested version. */
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

test("maps Naver inputs to provider query parameter names", () => {
  /** Naver callback URL used for the authorization request. */
  const redirectUri =
    "https://example.com/auth/naver/callback?source=web&return=%2Fdashboard";
  /** Naver authorization URL generated by the public helper. */
  const url = new URL(
    makeNaverLoginUrl({
      clientId: "client-id",
      redirectUri,
      state: "state-value&attempt=1",
    }),
  );

  assert.equal(url.origin, "https://nid.naver.com");
  assert.equal(url.pathname, "/oauth2.0/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), "client-id");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("state"), "state-value&attempt=1");
  assert.equal(url.searchParams.get("clientId"), null);
  assert.equal(url.searchParams.get("redirectUri"), null);
});
