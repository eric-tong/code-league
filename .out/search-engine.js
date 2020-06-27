"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdinInput = [];
process.stdin.on("data", function (input) {
    stdinInput.push(input.toString().toLowerCase());
});
process.stdin.on("end", function () {
    main(stdinInput);
});
function out(outStrings) {
    outStrings.forEach(function (str) { return process.stdout.write(str + "\n"); });
}
function main(input) {
    var T = parseInt(input.shift());
    var results = [];
    for (var t = 1; t <= T; t++) {
        var _a = input.shift()
            .split(" ")
            .map(function (str) { return parseInt(str); }), N = _a[0], Q = _a[1];
        var result = search(input.slice(0, N), input.slice(N, N + Q));
        out(__spreadArrays(["Case " + t + ":"], result));
        results.push.apply(results, __spreadArrays(["Case " + t + ":"], result));
        input.splice(0, N + Q);
    }
    return results;
}
exports.default = main;
function search(database, queries) {
    var root = {};
    for (var _i = 0, database_1 = database; _i < database_1.length; _i++) {
        var item = database_1[_i];
        var words = item.split(" ");
        do {
            toTree(words, root);
        } while (words.shift());
    }
    var result = [];
    for (var _a = 0, queries_1 = queries; _a < queries_1.length; _a++) {
        var query = queries_1[_a];
        var count = 0;
        var node = root;
        var words = query.split(" ");
        while (words.length) {
            var word = words.shift();
            if (node[word]) {
                if (words.length === 0) {
                    count = node[word].count;
                    continue;
                }
                else {
                    node = node[word].tree;
                }
            }
            else {
                continue;
            }
        }
        result.push(count.toString());
    }
    return result;
}
function toTree(words, root) {
    var node = root;
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        if (!node[word]) {
            node[word] = { tree: {}, count: 1 };
        }
        else {
            node[word].count++;
        }
        node = node[word].tree;
    }
}
//# sourceMappingURL=search-engine.js.map