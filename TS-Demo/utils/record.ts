// Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

// example
type Page = "home" | "about" | "detail";

interface PageInfo {
  title: string;
}

const pages: _Record<Page, PageInfo> = {
  home: { title: "home" },
  about: { title: "about" },
  detail: { title: "detail" },
};
