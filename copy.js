const fs = require('fs')
const path = require('path')

function copyFolderRecursiveSync(source, target) {
  // Check if the source is a directory
  if (fs.lstatSync(source).isDirectory()) {
    // Create the target directory if it doesn't exist
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target)
    }
    // Get all files and subfolders in the source directory
    const files = fs.readdirSync(source)
    // Loop through them and copy each one
    files.forEach((file) => {
      const sourcePath = path.join(source, file)
      const targetPath = path.join(target, file)
      // Recursively copy subdirectories
      if (fs.lstatSync(sourcePath).isDirectory()) {
        copyFolderRecursiveSync(sourcePath, targetPath)
      } else {
        // Copy files
        fs.copyFileSync(sourcePath, targetPath)
      }
    })
  } else {
    // Copy the file
    fs.copyFileSync(source, target)
  }
}

copyFolderRecursiveSync(path.join(process.cwd(), 'public'), path.join(process.cwd(), '.next', 'standalone', 'public'))
copyFolderRecursiveSync(path.join(process.cwd(), '.next', 'static'), path.join(process.cwd(), '.next', 'standalone', '.next', 'static'))
