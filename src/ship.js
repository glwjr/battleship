const Ship = (type, length) => {
  const position = new Array(length).fill('');

  const getType = () => type;
  const getLength = () => length;

  const setPosition = (indexArray) => {
    for (let i = 0; i < position.length; i += 1) {
      if (position[i] === '') {
        position[i] = indexArray[i];
      }
    }
  };

  const hit = (hitIndex) => {
    const index = position.indexOf(hitIndex);
    if (index > -1) {
      position[index] = 'hit';
    }
  };

  const isSunk = () => position.every((value) => value === 'hit');

  return {
    position, getType, getLength, setPosition, hit, isSunk,
  };
};

export default Ship;
