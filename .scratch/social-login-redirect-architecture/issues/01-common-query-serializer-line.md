# 01: 공통 query serializer와 LINE URL builder 이식

**What to build:** 패키지 사용자가 기존 LINE 입력으로 authorization URL을 만들 때, 기존 endpoint와 version path를 유지하면서 공통 query serialization 규칙을 적용받도록 합니다. 기존 LINE login redirect와 public interface는 그대로 동작해야 합니다.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [x] LINE authorization URL의 endpoint, version path, 기본 response type이 기존 public contract와 동일하다.
- [x] provider-specific endpoint/version 결정은 LINE adapter가 담당하고, query serialization은 공통 module이 담당한다.
- [x] query serialization은 undefined만 제외하고 false, 0, 빈 문자열을 보존한다.
- [x] redirect URI 내부 query, 0, false, undefined, 빈 문자열 동작을 public URL builder 반환값으로 검증한다.
- [x] 공통 serializer가 package public export로 노출되지 않는다.
- [x] 기존 package lint, build, Node test workflow가 통과한다.
