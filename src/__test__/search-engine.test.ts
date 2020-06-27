import search from "../search-engine";

describe("search engine", () => {
  test("test 1", () => {
    const input = `2
3 6
apple lettuce limes avocado
onion cranberries apple limes
escarole corn28corn apple lettuce limes avocado
limes avocado
apple lettuce
limes
apple
app
apple limes`.split("\n");

    const actual = search(input);
    const expected = `Case 1:
2
2
3
3
0
1`.split("\n");

    expect(actual).toEqual(expected);
  });
});
