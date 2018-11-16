

function drawLetters(){
  const letters = {A:9, B:2, C:2, D:4, E:12, F:2, G:3, H:2, I:9, J:1, K:1, L:4, M:2, N:6, O:8, P:2, Q:1, R:6, S:4, T:6, U:4, V:2, W:2, X:1, Y:2, Z:1};
  let letters_pool = [];

  // This creates the letters_pool
  Object.entries(letters).forEach(entry => {
    let key = entry[0];
    let times = entry[1];

    for(let i = 0; i < times; i += 1){
      letters_pool.push(key);
    }
  });

  let hand = [];
  // Select a 10 random letters
  for(let i = 0; i < 10; i += 1){
    let index = Math.floor(Math.random() * 99);
    hand.push(letters_pool[index]);
  }

  return hand;
}

// const Adagrams = {
//   drawLetters() {
//     // Implement this method for wave 1
//   },
// };

// Do not remove this line or your tests will break!
// export default Adagrams;

console.log(drawLetters());
