/* eslint-disable no-undef */
import Ship from '../ship';

test('testing ship factory', () => {
  // Given a carrier as a new Ship along with mock indexes
  const carrier = Ship('carrier', 5);
  const indexes = [10, 11, 12, 13, 14];

  // Before the ship is placed, the positions must be empty
  expect(carrier.position).toEqual(['', '', '', '', '']);
  expect(carrier.getType()).toBe('carrier');
  expect(carrier.getLength()).toBe(5);

  // When position(indexes) of carrier is set
  carrier.setPosition(indexes);

  // Then
  expect(carrier.position).toEqual([10, 11, 12, 13, 14]);

  // When the carrier is hit at index 13
  carrier.hit(13);

  // Then the carrier should recognize the hit yet not be sunk
  expect(carrier.position).toEqual([10, 11, 12, 'hit', 14]);
  expect(carrier.isSunk()).toBe(false);

  // When all indexes are hit
  for (let i = 0; i < carrier.getLength(); i += 1) {
    if (typeof carrier.position[i] === 'number') {
      carrier.hit(carrier.position[i]);
    }
  }

  // Then the ship is sunk
  expect(carrier.isSunk()).toBe(true);
});
