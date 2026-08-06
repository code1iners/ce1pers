# @ce1pers/storage-helpers

브라우저 IndexedDB의 database·object store·row 작업을 callback과 `{ ok, data, error }` 결과로 감싸는 helper입니다.

## 설치

```bash
npm install @ce1pers/storage-helpers
```

## 초기화

`useIndexedDatabase`를 호출하면 database open이 즉시 시작됩니다. `databaseName`은 필수이고 `databaseVersion` 기본값은 `1`입니다.

```ts
import { useIndexedDatabase } from "@ce1pers/storage-helpers";

const database = useIndexedDatabase({
  databaseName: "custom-database",
  databaseVersion: 1,
  onUpgradeneededCallback: () => {
    database.createObjectStore({
      storeName: "test-store",
      options: { autoIncrement: true, keyPath: "id" },
    });
  },
  onSuccessCallback: async () => {
    const result = await database.retrieveRow({ storeName: "test-store" });
    console.log(result.ok, result.data, result.error);
  },
});
```

## 반환 API

| API | 입력·반환 |
| --- | --- |
| `openDatabase` | `{ name, version, onOpenDatabase? }` → `{ ok, data?, error? }` |
| `closeDatabase` | 열린 database 닫기 |
| `createObjectStore` | upgrade callback 안에서 store와 index 생성 |
| `deleteObjectStoreByName` | upgrade callback 안에서 store 삭제 |
| `retrieveObjectStore` | store name과 transaction mode로 object store 반환 |
| `getTransaction` | store name과 `readonly`·`readwrite`·`versionchange` transaction 반환 |
| `createRow` | `{ storeName, data, callbacks? }` → Promise 결과 |
| `retrieveRow` | `{ storeName, id?, mode?, callbacks? }` → Promise 결과 |
| `updateRowById` | `{ storeName, id, data, callbacks? }` → Promise 결과 |
| `deleteRowById` | `{ storeName, id, callbacks? }` → Promise 결과 |
| `clearObjectStoreByName` | `{ storeName, callbacks? }` → Promise 결과 |
| `getRequest`, `setRequest` | 현재 `IDBOpenDBRequest` 조회·설정 |
| `getDatabase`, `setDatabase` | 현재 `IDBDatabase` 조회·설정 |
| `getDatabases` | 브라우저의 database 목록 Promise |
| `getDatabaseVersion` | 초기화에 사용한 버전 반환 |

모든 row 작업은 IndexedDB transaction이 필요하며, 지원하지 않는 브라우저에서는 `{ ok: false, error }`를 반환합니다. `onBlockedCallback`, `onErrorCallback`, `onUpgradeneededCallback`으로 브라우저 이벤트를 처리할 수 있습니다.

## 실행 조건

브라우저의 `window.indexedDB`가 필요합니다. 서버 렌더링이나 IndexedDB가 없는 테스트 환경에서는 직접 호출하지 마세요.

## 검증

```bash
npm run build
```
