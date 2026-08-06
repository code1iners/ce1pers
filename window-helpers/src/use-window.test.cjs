const assert = require("node:assert/strict");
const { test } = require("node:test");

const { useWindow } = require("../dist/index.js");

test("opens a popup, sends a message, and removes listeners", () => {
  /** Registered event listeners grouped by event type. */
  const listeners = new Map();
  /** Messages sent to the opened popup. */
  const sentMessages = [];
  /** Opened popup reference returned by the fake browser. */
  const popup = {
    postMessage(message, targetOrigin) {
      sentMessages.push({ message, targetOrigin });
    },
  };
  /** Minimal browser window surface used by the public helper. */
  const fakeWindow = {
    screen: { availWidth: 1200, availHeight: 800 },
    addEventListener(type, callback) {
      const callbacks = listeners.get(type) ?? [];
      callbacks.push(callback);
      listeners.set(type, callbacks);
    },
    removeEventListener(type, callback) {
      const callbacks = listeners.get(type) ?? [];
      listeners.set(
        type,
        callbacks.filter((registeredCallback) => registeredCallback !== callback),
      );
    },
    open(targetOrigin, windowTarget, windowFeatures) {
      assert.equal(targetOrigin, "https://child.example.com");
      assert.equal(windowTarget, "_blank");
      assert.match(windowFeatures, /width=400,height=300/);
      return popup;
    },
  };

  global.window = fakeWindow;

  try {
    /** Message callback registered with the helper. */
    const onMessageCallback = () => {};
    /** Window helper controller under test. */
    const controller = useWindow({
      isAutoSubscribe: true,
      onMessageCallback,
    });

    assert.equal(listeners.get("message").length, 1);
    assert.equal(listeners.get("unload").length, 1);

    /** Callback invocation state for the popup open operation. */
    let callbackCalled = false;
    assert.equal(
      controller.open({
        targetOrigin: "https://child.example.com",
        windowTarget: "_blank",
        isPopup: true,
        width: 400,
        height: 300,
        callback: () => {
          callbackCalled = true;
        },
      }),
      popup,
    );
    assert.equal(callbackCalled, true);
    assert.equal(controller.getWindow(), popup);

    assert.equal(
      controller.sendMessage({
        to: "targetOrigin",
        type: "connection",
        data: { source: "parent" },
      }),
      true,
    );
    assert.deepEqual(sentMessages, [
      {
        message: JSON.stringify({ type: "connection", data: { source: "parent" } }),
        targetOrigin: "https://child.example.com",
      },
    ]);

    controller.unsubscribe();
    assert.equal(listeners.get("message").length, 0);
    assert.equal(listeners.get("unload").length, 0);
  } finally {
    delete global.window;
  }
});
