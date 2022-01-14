export default function install(Vue) {
  const modules = import.meta.glob("/src/base/*/*.vue");

  for (const path in modules) {
    modules[path]().then((mod) => {
      if (!module) return;
      Vue.use(mod);
    });
  }
}
