const Adagrams = {

  drawLetters() {
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

    // Select 10 random letters
    let hand = [];
    let used_rand_indexes = [];
    for(let i = 0; i < 10; i += 1){
      let index = Math.floor(Math.random() * 99);

      do{
        index = Math.floor(Math.random() * 99);
      } while (used_rand_indexes.includes(index));

      hand.push(letters_pool[index]);
      used_rand_indexes.push(index);
    }
    return hand;
  },

  usesAvailableLetters(input, lettersInHand){
    // Create hash for lettersInHand
    const hand_hash = {};
    lettersInHand.forEach(function(letter){
      if(letter in hand_hash){
        hand_hash[letter] = parseInt(hand_hash[letter]) + 1;
      }
      else{
        hand_hash[letter] = 1;
      }
    });

    // Compare input letters to hand_hash
    let input_letters_not_in_hand = [];
    let input_array = input.toUpperCase().split("");
    input_array.forEach(function(letter){
      if(letter in hand_hash){
          hand_hash[letter] = parseInt(hand_hash[letter]) - 1;
      }
      else{
        input_letters_not_in_hand.push(letter);
      }
    });

    if(input_letters_not_in_hand.length > 0){
      return false;
    }

    let input_letters_used_more_than_whats_in_hand = [];
    Object.entries(hand_hash).forEach(entry => {
      let letter = entry[0];
      let times = entry[1];
      if(times < 0){
        input_letters_used_more_than_whats_in_hand.push(letter);
      }
    });

    if(input_letters_used_more_than_whats_in_hand.length > 0){
      return false;
    }
    else{
      return true;
    }
  },

  scoreWord(word){
    let word_array = word.toUpperCase().split("");

    if(word_array.length == 0){
      return 0;
    }

    const points = {A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10};
    let score = 0;
    word_array.forEach(function(letter){
      score += points[letter];
    });

    if(word_array.length >= 7){
      score += 8;
    }

    return score;
  },

  highestScoreFrom(words){
    // Initial winning word logic
    let arrayScoreHashes = [];

    // scoreHash where word:score
    words.forEach(function(element){
      let scoreHash = {};
      scoreHash[element] = Adagrams.scoreWord(element);
      arrayScoreHashes.push(scoreHash);
    });

    // Find highest Score
    let pointsArray = words.map(x => Adagrams.scoreWord(x));
    let highestScore = Math.max(...pointsArray);

    // Extract words with the highest score
    let winningWords = [];
    arrayScoreHashes.forEach(function(element){
      Object.entries(element).forEach(entry => {
        let word = entry[0];
        let score = entry[1];

        if(score == highestScore){
          winningWords.push(word);
        }
      });
    });

    // If there is a single word with the highestScore
    if(winningWords.length == 1){
      return {word: winningWords[0], score: highestScore}
    }
    // Else there are multiple words with the highestScore
    else{
      let wordToReturn = {};
      let lengthWinningWords = winningWords.map(x => x.length);
      let minLengthWinningWord = Math.min(...lengthWinningWords);
      let winningWordsOfShortestLength = [];

      winningWords.forEach(function(word){
        if(word.length == minLengthWinningWord){
          winningWordsOfShortestLength.push(word);
        }
      })

      // If there a word in winningWords that is 10 letters long
      if(lengthWinningWords.includes(10)){
        winningWords.forEach(function(word){
          if(word.length == 10){
            wordToReturn["word"] = word;
            wordToReturn["score"] = highestScore;
          }
        });
      }
      // Else if there is a single winning word of shortest length
      else if(winningWordsOfShortestLength.length == 1){
        wordToReturn["word"] = winningWordsOfShortestLength[0];
        wordToReturn["score"] = highestScore;
      }
      // Else multiple winning words of shortest length
      else{
        wordToReturn["word"] = winningWordsOfShortestLength[0];
        wordToReturn["score"] = highestScore;
      }

      return wordToReturn;
    }

  }
}
// Do not remove this line or your tests will break!
export default Adagrams;
// const test = ['aaa','ddd', 'bbb', 'aaaaaaaaaa', 'zxz'];
// console.log(Adagrams.highestScoreFrom(test));
