// auto-commit.js
const chokidar = require("chokidar");
const { exec } = require("child_process");

// Watch current directory, ignore .git, node_modules, and dotfiles
const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])\..|node_modules|\.git/,
  persistent: true
});

watcher.on("change", (path) => {
  console.log(`📁 File changed: ${path}`);
  exec('git add . && git commit -m "Auto commit" --no-verify', (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Git error:", stderr);
    } else {
      console.log("✅ Auto committed!");
    }
  });
});
