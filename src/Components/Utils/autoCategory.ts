// A simple lookup of keywords for each category.
// When a user types a list name, we check it against these keywords
// to guess which category it probably belongs to.
const categoryKeywords: Record<string, string[]> = {
  Groceries: ['milk', 'bread', 'egg', 'fruit', 'vegetable', 'apple', 'banana', 'cheese', 'meat', 'rice', 'pasta', 'snack', 'drink', 'water', 'juice', 'coffee', 'tea', 'chicken', 'fish', 'cereal', 'grocery', 'groceries'],
  Electronics: ['phone', 'charger', 'cable', 'laptop', 'tv', 'headphone', 'battery', 'mouse', 'keyboard', 'speaker', 'camera', 'electronic'],
  Clothing: ['shirt', 'pants', 'dress', 'shoes', 'jacket', 'socks', 'jeans', 'sweater', 'hat', 'clothes', 'clothing'],
  Household: ['soap', 'detergent', 'tissue', 'cleaner', 'towel', 'bulb', 'broom', 'trash', 'sponge', 'household'],
};

export function guessCategory(listName: string): string {
  const lowerName = listName.toLowerCase();

  for (const categoryName in categoryKeywords) {
    const keywords = categoryKeywords[categoryName];
    for (let i = 0; i < keywords.length; i = i + 1) {
      if (lowerName.includes(keywords[i])) {
        return categoryName;
      }
    }
  }

  return '';
}