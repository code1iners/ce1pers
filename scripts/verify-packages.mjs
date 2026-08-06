import { spawnSync } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";

/** Repository root containing all independent package directories. */
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Package commands used as the repository-wide regression gate after package changes. */
const packageCommands = [
  ...[
    "animation-helpers",
    "array-helpers",
    "date-helpers",
    "logger-helpers",
    "naming-convention-helpers",
    "number-helpers",
    "pagination-helpers",
    "password-helpers",
    "random-helpers",
    "storage-helpers",
    "viewport-helpers",
    "window-helpers",
  ].map((directory) => ({
    directory,
    commands: [["npm", ["test"]]],
  })),
  {
    directory: "library-template",
    commands: [
      ["pnpm", ["lint"]],
      ["pnpm", ["build"]],
    ],
  },
  ...["social-login-redirect", "style-helpers"].map((directory) => ({
    directory,
    commands: [["pnpm", ["test"]]],
  })),
];

/** Execute one package command and return whether it completed successfully. */
const runCommand = (directory, [command, args]) => {
  const result = spawnSync(command, args, {
    cwd: path.join(repositoryRoot, directory),
    stdio: "inherit",
  });

  return result.status === 0;
};

for (const { directory, commands } of packageCommands) {
  for (const command of commands) {
    // Stop at the first failed package so a later green package cannot hide the failure.
    if (!runCommand(directory, command)) {
      console.error(`Package verification failed: ${directory}`);
      process.exitCode = 1;
      process.exit();
    }
  }
}

console.log("All package verifications passed.");
