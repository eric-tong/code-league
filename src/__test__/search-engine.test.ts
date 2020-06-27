import search from "../search-engine";

describe("search engine", () => {
  test("test 1", () => {
    const input = `1
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

  test("test 2", () => {
    const input = ` 
3 3
apple iphone se 2
iphone 11 max pro
iphone 11 pro max
apple iphone
max pro
iphone`.split("\n");

    const actual = search(input);
    const expected = `Case 1:
1
1
3`.split("\n");

    expect(actual).toEqual(expected);
  });
});
