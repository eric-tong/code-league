// Sample code to perform I/O:

process.stdin.resume();
process.stdin.setEncoding("utf-8");
const stdinInput: string[] = [];

process.stdin.on("data", function (input) {
  stdinInput.push(input.toString());
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

export default function main(
  input: string[],
  caseNumber: number = 1
): string[] {
  console.log(input);

  const T = parseInt(input[0]);
  const [N, Q] = input[1].split(" ").map(str => parseInt(str));
  const database = input.slice(2, 2 + N);
  const queries = input.slice(2 + N, 2 + N + Q);

  const root: Tree = {};

  for (const item of database) {
    const words = item.split(" ");
    do {
      toTree(words, root);
    } while (words.shift());
  }
  console.log(root);

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

  out([`Case ${caseNumber}:`, ...result]);
  return [`Case ${caseNumber}:`, ...result];
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
