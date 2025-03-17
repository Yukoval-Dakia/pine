const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/images');
const targetDir = sourceDir;

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 处理图片
async function processImage(filename) {
  const sourcePath = path.join(sourceDir, filename);
  const thumbPath = path.join(targetDir, filename.replace('.jpg', '-thumb.jpg'));

  try {
    // 生成缩略图
    await sharp(sourcePath)
      .resize(300, 300, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 60 })
      .toFile(thumbPath);

    // 优化原图
    await sharp(sourcePath)
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(targetDir, `optimized-${filename}`));

    console.log(`✓ 处理完成: ${filename}`);
  } catch (error) {
    console.error(`✗ 处理失败: ${filename}`, error);
  }
}

// 处理所有图片
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('读取目录失败:', err);
    return;
  }

  const imageFiles = files.filter(file => 
    file.endsWith('.jpg') && 
    !file.includes('-thumb') && 
    !file.includes('optimized-')
  );

  Promise.all(imageFiles.map(processImage))
    .then(() => console.log('所有图片处理完成！'))
    .catch(err => console.error('处理过程中出错:', err));
}); 