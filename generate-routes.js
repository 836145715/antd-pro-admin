import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// TSX文件模板
const getComponentTemplate = (name, path) => `

const ${name} = () => {
  return (
    <div>
      <h2>${name}</h2>
      <p>路径: ${path}</p>
    </div>
  );
};

export default ${name};
`;


// 主函数
async function main() {
  console.log('开始处理菜单数据...\n');
  const overwrite = true;

  const res = await axios.get('http://localhost:8000/menu/manage/pages');
  const menuData = res.data.data;

  for (const item of menuData) {
    const paths = item.path.split('/').filter(path => path !== '');
    let filePath = paths.join('/');
    let dir = `src/pages/${filePath}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ 创建目录: ${dir}`);
    }

    let indexPath = `${dir}/Index.tsx`;
    if (!fs.existsSync(indexPath) || overwrite) {
      let componentName = paths.map(path => path.charAt(0).toUpperCase() + path.slice(1)).join('');

      fs.writeFileSync(indexPath, getComponentTemplate(componentName, item.path), 'utf8');
      console.log(`✓ 创建文件: ${indexPath}`);
    }
  }

}


main()
