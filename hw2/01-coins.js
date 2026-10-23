function calculateChange(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0) {
    return 'Error: enter a valid nonnegative dollar amount';
  }

  if (amount > 100) {
    return 'Error: the number is too large';
  }

  let cents = Math.round(amount * 100);
  const coins = [
    { value: 100, singular: 'dollar', plural: 'dollars' },
    { value: 25, singular: 'quarter', plural: 'quarters' },
    { value: 10, singular: 'dime', plural: 'dimes' },
    { value: 5, singular: 'nickel', plural: 'nickels' },
    { value: 1, singular: 'penny', plural: 'pennies' },
  ];
  const change = [];

  coins.forEach((coin) => {
    const count = Math.floor(cents / coin.value);
    cents %= coin.value;

    if (count > 0) {
      if (count === 1) {
        change.push(`${count} ${coin.singular}`);
      } else {
        change.push(`${count} ${coin.plural}`);
      }
    }
  });

  if (change.length === 0) {
    return '0 coins';
  }

  return change.join(', ');
}

console.log(calculateChange(4.62));
console.log(calculateChange(0.16));
console.log(calculateChange(150.11));
console.log(calculateChange(0));
console.log(calculateChange(0.01));
console.log(calculateChange(0.05));
console.log(calculateChange(0.1));
console.log(calculateChange(0.25));
console.log(calculateChange(1));
console.log(calculateChange(0.99));
console.log(calculateChange(100));
console.log(calculateChange(100.01));
console.log(calculateChange(-1));
console.log(calculateChange(NaN));
console.log(calculateChange('4.62'));
