process.stdin.resume();
process.stdin.setEncoding("utf-8");
const stdinInput: string[] = [];

process.stdin.on("data", function (input) {
  stdinInput.push(input.toString().toLowerCase());
});

process.stdin.on("end", function () {
  main(stdinInput);
});

function out(outStrings: string[]) {
  outStrings.forEach(str => process.stdout.write(str + "\n"));
}

type Tree = {
  [label: string]: { tree: Tree; count: number };
};

export default function main(input: string[]): string[] {
  const T = parseInt(input.shift() as string);
  const results: string[] = [];

  for (let t = 1; t <= T; t++) {
    const [N, Q] = (input.shift() as string)
      .split(" ")
      .map(str => parseInt(str));
    const result = search(input.slice(0, N), input.slice(N, N + Q));
    out([`Case ${t}:`, ...result]);
    results.push(`Case ${t}:`, ...result);

    input.splice(0, N + Q);
  }
  return results;
}

function search(database: string[], queries: string[]) {
  const root: Tree = {};

  for (const item of database) {
    const words = item.split(" ");
    do {
      toTree(words, root);
    } while (words.shift());
  }

  const result: string[] = [];
  for (const query of queries) {
    let count = 0;
    let node = root;
    const words = query.split(" ");

    while (words.length) {
      const word = words.shift() as string;
      if (node[word]) {
        if (words.length === 0) {
          count = node[word].count;
          continue;
        } else {
          node = node[word].tree;
        }
      } else {
        continue;
      }
    }
    result.push(count.toString());
  }

  return result;
}

function toTree(words: string[], root: Tree) {
  let node = root;
  for (const word of words) {
    if (!node[word]) {
      node[word] = { tree: {}, count: 1 };
    } else {
      node[word].count++;
    }
    node = node[word].tree;
  }
}
