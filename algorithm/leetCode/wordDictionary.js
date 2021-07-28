// 一个字典，支持addWord() searchWord()
// 搜索时可能是字符串，也可能是正则表达式
class WordDictionary {
  constructor() {
    this.dictMap = {};
  }

  addWord(word) {
    const len = word.length;
    if (this.dictMap[len]) {
      this.dictMap[len].push(word);
    } else {
      this.dictMap[len] = [word];
    }
  }

  searchWord(word) {
    const len = word.length;
    if (!this.dictMap[len]) {
      return false;
    }
    if (word.includes(".")) {
      let reg = new RegExp(word);
      return this.dictMap[len].findIndex((item) => reg.test(item)) > -1;
    } else {
      return this.dictMap[len].findIndex((item) => word === item) > -1;
    }
  }
}

let dict = new WordDictionary();

dict.addWord("abccc");
dict.addWord("abc");
dict.addWord("ab");
dict.searchWord("ab.");
dict.searchWord("abccc");
