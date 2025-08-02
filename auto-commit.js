const chokidar = require("chokidar");
const { spawn } = require("child_process");

// Watch current directory, ignore .git, node_modules, and dotfiles
const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])\..|node_modules|\.git/,
  persistent: true
});

watcher.on("change", (path) => {
  console.log(`📁 File changed: ${path}`);

  const gitAdd = spawn("git", ["add", "."]);

  gitAdd.on("close", () => {
    const gitCommit = spawn("git", ["commit", "-m", "Auto commit", "--no-verify"]);

    gitCommit.stdout.on("data", (data) => {
      console.log(`✅ ${data}`);
    });

    gitCommit.stderr.on("data", (data) => {
      console.error(`❌ ${data}`);
    });

    gitCommit.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Auto committed!");
      } else {
        console.log("⚠️ Nothing to commit or commit failed.");
      }
    });
  });
});
ds