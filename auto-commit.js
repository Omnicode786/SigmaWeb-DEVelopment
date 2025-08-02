const chokidar = require("chokidar");
const { spawn } = require("child_process");

let timeoutId = null;
const DEBOUNCE_DELAY = 3000; // 5000ms = 5 seconds

const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])\..|node_modules|\.git/,
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`📁 Change detected: ${path}`);

  clearTimeout(timeoutId); // Clear previous timeout
  timeoutId = setTimeout(() => {
    console.log("💾 Committing after changes settled...");

    const gitAdd = spawn("git", ["add", "."]);

    gitAdd.on("close", () => {
      const gitCommit = spawn("git", ["commit", "-m", "Auto commit", "--no-verify"]);

      gitCommit.stdout.on("data", (data) => console.log(`✅ ${data}`));
      gitCommit.stderr.on("data", (data) => console.error(`❌ ${data}`));

      gitCommit.on("close", (code) => {
        if (code === 0) {
          console.log("✅ Auto committed!");
        } else {
          console.log("⚠️ Nothing to commit or commit failed.");
        }
      });
    });
  }, DEBOUNCE_DELAY); // Wait 5 seconds after last change
});
