const platform = require("os").platform;
const fs = require("fs");
const path = require("path");

// is CI?
console.log(process.env.SKIP_REBUILD);
if (process.env.SKIP_REBUILD) return

const targetDir = path.join(
  __dirname,
  `../../../node_modules/sharp`
)
// as a npm package to install 
if (fs.existsSync(targetDir)) {

  const targetPath = path.join(
    __dirname,
    `../../../node_modules/sharp/build/Release/sharp.node`
  );
  // Most modern macOS, Windows and Linux systems
  // sharp(0.28.3) will auto fetch sharp.node file
  if (!fs.existsSync(targetPath)) {
    const sourcePath = path.join(
      __dirname,
      `../external/sharp/${platform}/sharp.node`
    );
    fs.rename(sourcePath, targetPath, err => {
      if (err) throw new Error("copy sharp error");
    });
  } else {
    console.log('sharp已自动拉取sharp.node，跳过')
  }
} else {
  // 跳过
  console.log('本地安装，跳过')
}
