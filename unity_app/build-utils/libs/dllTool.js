const resolveApp = require('./resolveApp');
const fs = require('fs');
const path = require('path');
const publicPath = resolveApp('public');
const webpack = require('webpack');
let mList = [];
let orderMap = { vue: 1, vendor: 2, antdv: 3, base: 4 };
fs.readdirSync(publicPath).forEach(filename => {
  let pathname = path.join(publicPath, filename);
  if (fs.statSync(pathname).isDirectory()) {
    let map = { name: filename, order: orderMap[filename] || 10 };
    fs.readdirSync(pathname).forEach(subFilename => {
      let subPathname = path.join(pathname, subFilename);
      if (subFilename === 'manifest.json') {
        map.manifest = subPathname;
        return;
      }
      let stat = fs.statSync(subPathname);
      if (stat.isFile()) map.src = `${filename}/${subFilename}`;
    });
    mList.push(map);
  }
});
// console.log(3333, list);
mList.sort((o1, o2) => o1.order > o2.order);

exports.getDllList = () => mList;

exports.getDllPlugin = mStr => {
  return new webpack.DllPlugin({
    name: `__dll_${mStr}`,
    path: resolveApp(`public/${mStr}/manifest.json`)
  });
};

exports.getDllRefPluginByKey = key => {
  if (!key) throw new Error('请给出要搜索的模块的key');
  let item = mList.find(sub => sub.name === key);
  if (item && item.manifest) {
    return new webpack.DllReferencePlugin({ manifest: item.manifest });
  }
  return null;
};

exports.getDllRefPlugins = mStr => {
  let list = [];
  mList.forEach(({ manifest, name }) => {
    if (!manifest) return;
    if (name === mStr) return;
    list.push(new webpack.DllReferencePlugin({ manifest }));
  });
  // console.log(list);
  return list;
};
