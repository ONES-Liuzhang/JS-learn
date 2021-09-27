/**
 * 编译原理
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 *  1. 词法分析  tokenizer
 *        (add 2 (subtract 4 2))
 *                  👇
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 *
 *  2. 语法分析  parser
 *       生成AST (Abstract Syntax Tree)
 *                  👇
 *  {
 *    type: "Program",
 *    body: [{
 *      type: "CallExpression",
 *      name: "add",
 *      params: [{
 *          type: "NumberLiteral",
 *          value: "2"
 *        }, {
 *          type: "CallExpression",
 *          name: "subtract",
 *          params: [{
 *            type: "NumberLiteral",
 *            value: "4"
 *          }, {
 *            type: "NumberLiteral",
 *            value: "2"
 *         }]
 *      }]
 *    }]
 *  }
 *
 *  3. 生成新的AST树  transformer
 *        需要一个辅助函数对AST树进行遍历  traverse
 *        dfs 深度遍历AST树
 *
 *  4. 根据新的AST树 生成最终代码  codeGenerator
 */

/**
 * =======================================
 *            tokenizer 词法分析
 * =======================================
 *
 * 处理源代码，生成tokens
 */
function tokenizer(input) {
  let cur = 0;
  const tokens = [];
  while (cur < input.length) {
    let char = input[cur];

    if (char === "(") {
      tokens.push({ type: "paren", value: "(" });
      cur++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "paren", value: ")" });
      cur++;
      continue;
    }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      cur++;
      continue;
    }

    //   (add 123 456)
    //        ^^^ ^^^
    //        Only two separate tokens
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++cur];
      }
      tokens.push({
        type: "number",
        value,
      });
      continue;
    }

    //   (concat "foo" "bar")
    //            ^^^   ^^^ string tokens
    if (char === '"') {
      let value = "";
      char = input[++cur];

      while (char !== '"') {
        value += char;
        char = input[++cur];
      }

      char = input[++cur];
      tokens.push({
        type: "StringLiteral",
        value,
      });
      continue;
    }

    //   (add 123 456)
    //    ^^^
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++cur];
      }
      tokens.push({ type: "name", value });
      continue;
    }

    // 避免死循环
    throw new Error(`Syntax Error，position ${cur} : ${char}`);
  }

  return tokens;
}

/**
 * =======================================
 *          parser 语法分析，生成AST
 * =======================================
 */
function parser(tokens) {
  let cur = 0;
  let token = tokens[cur];

  function walk() {
    if (token.type === "number") {
      return { type: "NumberLiteral", value: token.value };
    }

    if (token.type === "string") {
      return { type: "StringLiteral", value: token.value };
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++cur];

      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++cur];

      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[++cur];
      }

      return node;
    }
  }

  const ast = {
    type: "Program",
    body: [],
  };

  ast.body.push(walk());

  return ast;
}

/**
 * =======================================
 *          traverse 遍历AST树
 * =======================================
 *
 * visitor 访问者模式
 *
 */
function traverse(ast, visitor) {
  function traverseArray(arr, parent) {
    for (let i = 0; i < arr.length; i++) {
      traverseNode(arr[i], parent);
    }
  }

  function traverseNode(node, parent) {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      case "NumberLiteral":
      case "StringLiteral":
        break;
      default:
        throw new Error("AST Node Type Error : ", node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}

/**
 * =======================================
 *          transformer 生成新的AST树
 * =======================================
 */
function transformer(ast) {
  let newAst = {
    type: "Program",
    body: [],
  };

  ast._context = newAst.body;

  traverse(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push(node);
      },
    },
    StringLiteral: {
      enter(node, parent) {
        parent._context.push(node);
      },
    },
    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
}

/**
 * =======================================
 *          codeGenerator 生成新代码
 * =======================================
 */
function codeGenerator(node) {
  let str = "";

  switch (node.type) {
    case "NumberLiteral":
      str = node.value;
      break;
    case "StringLiteral":
      str = `"${node.value}"`;
      break;
    case "Program":
      str = node.body.map((item) => codeGenerator(item)).join("\n");
      break;
    case "ExpressionStatement":
      str = codeGenerator(node.expression) + ";";
      break;
    case "CallExpression":
      str =
        str +
        node.callee.name +
        "(" +
        node.arguments.map((arg) => codeGenerator(arg)).join(",") +
        ")";
      break;
    default:
      throw new Error("Node Type Error : ", node.type);
  }

  return str;
}

/**
 * =======================================
 *          compiler 编译
 * =======================================
 *
 *    1. input  => tokenizer     => tokens
 *    2. tokens => parser        => ast
 *    3. ast    => transformer   => newAst
 *    4. newAst => codeGenerator => output
 */
function compiler(input) {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);

  return output;
}

module.exports = {
  tokenizer,
  parser,
  traverse,
  transformer,
  codeGenerator,
  compiler,
};

let tokens = tokenizer("(add 2 (subtract 4 2))");
let ast = parser(tokens);
let newAST = transformer(ast);
const output = codeGenerator(newAST);
console.log(output);
