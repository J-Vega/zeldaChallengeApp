$(function(){
  
  let DATABASE = {
    index:0,
    
    //NOTE - The arrays below contain blank objects at position 0 where appropriate to align question numbers and position.
    // Example - Question 1 will be at position 1 and NOT 0
    
    questions:['',
    'Which of the following does Navi NOT say out loud?',
    'When Link returns to Hyrule Castle after obtaining the last Spiritual Stone, what happens to Zelda?',
    'How does Link obtain the Hookshot?',
    'What happens when Link shoots the Sun with an arrow in the center of Lake Hyrule?',
    'What is the strongest sword in the game?',
    'When Adult Link visits King Zora, he finds him trapped in red ice! How does Link set him free?','Which of the following weapons does Link NOT use?',
    'How many Gold Skulltulas are there in Hyrule?',
    'Which of the following is not achieved by playing the Song of Storms?',
    'In the Forest Temple boss battle, how many portraits does Phantom Ganondorf travel between?'],
    
    answers: ['',
    ['Hey','Listen','Wait','Watch Out'],
    ['She gets kidnapped by Ganondorf','She escapes from Hyrule Castle','She teaches Link Zelda’s Lullaby','She is nowhere to be found'],
    ['After defeating the mini-boss in the Temple of Water','After winning a race','By finding it in a chest at the highest point of Kakarico village','By revisiting the Lost Woods as Young Link'],
    ['The entrance to the water temple opens at the bottom of the lake','A treasure chest appears','The arrow turns into a fire arrow','Time fast forwards into night-time'],
    ['Biggoron’s Sword','Enchanted Master Sword','Giant’s Knife','Gilded Sword'],
    ['Shooting Fire Arrows from all four sides of King Zora','Using Blue Fire','Using Din’s Fire','Defeating the Water Temple boss'],
    ['Fairy  Slingshot', 'Bombchu','Bomb Arrows','Mirror Shield'],
    ['50','100','150','200'],
    ['Grow Magic Beanstalks', 'Restore Lake Hylia','Entertain a group of frogs.', 'Spawn a Big Fairy in front of Gossip Stones'],['5','6','8','10']],
    
    correctAnswers: ['','Wait','She escapes from Hyrule Castle','After winning a race','The arrow turns into a fire arrow','Biggoron’s Sword','Using Blue Fire','Bomb Arrows','100','Restore Lake Hylia','6'],
    feedbackImages:['','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVO8N43Ux-EPIEh_xOfeax8OZfJAVrUE5ELO_JRtNMAm9sx_-Uw',
    'http://wiki.zeldalegends.net/images/a/ae/Zelda_and_impa.jpg',
    'https://www.zeldadungeon.net/Zelda05/Walkthrough/07/7_Hookshot3_Large.jpg',
    'https://cdn.wikimg.net/strategywiki/images/thumb/d/d7/LOZ_OOT_The_Fire_Arrow.PNG/300px-LOZ_OOT_The_Fire_Arrow.PNG',
    'https://vignette.wikia.nocookie.net/zelda/images/a/af/Receiving_Biggoron%27s_Sword.png/revision/latest?cb=20110306150217',
    'https://www.zeldadungeon.net/Zelda05/Walkthrough/09/9_Tunic2_Large.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVTZyzYVdwU25X4AHeyn6zlti_VPIiqUq1TGX53EtQu8g-NvoWnQ',
    'https://cdn.mos.cms.futurecdn.net/39e2ec02c0b7d8707aac7898ccb8221d.jpg',
    'https://vignette.wikia.nocookie.net/zelda/images/c/c7/Song_of_Storms_%28Ocarina_of_Time%29.png/revision/latest?cb=20110102204657','https://i.ytimg.com/vi/QYJz6g-9mMk/hqdefault.jpg'],
    
    //---Accessibility---
    //Picture Alt Descriptions
    imageAlt: [
      "A picture of Link's small, blue Fairy companion, Navi." ,
      "A picture of Zelda escaping on horseback, along with her handmaid, Impa.",
      "A picture of the gravekeeper ghost giving Link the Hookshot weapon as a reward for beating him in a race.",
      "A picture of Link holding his newly acquired Fire Arrows.",
      "A picture of Link being given the Biggoron Sword.",
      "A picture of Link releasing Blue Fire in order to free King Zora.", 
      "A picture of Link from Breathe of the Wild firing a bomb arrow.",
      "A picture of a golden Skulltula crawling on a ladder.",
      "A picture of Link learning the song of Storms.",
      "A picture of Link facing Phantom Ganondorf, who is mounted on a horse."],
    
    correct: 0,
    incorrect: 0,
    isGivingFeedback: false,
    isFinished: false,
    poorResultsPic: "https://cdn.mos.cms.futurecdn.net/XBm8M25HWuttwz6cQ5XvnK.jpg",
    poorPicAlt: "A picture of Link screaming in terror.",
    goodResultsPic: "http://www.thetanooki.com/wp-content/gallery/ocarina-of-time-3ds/link-master-sword-oot-3d.jpg",
    goodPicAlt: "A picture of Link lifting the Master Sword from its pedestal.",
    greatResultsPic: "https://www.zeldadungeon.net/Zelda05/Walkthrough/14/14_Ganon25_Large.jpg",
    greatPicAlt: "A picture of Link stabbing and finally defeating the antagonist, Ganon."
  };
  
  //Reset button displayed on final results screen
  $("#parentQuestion").on("click","#resetButton",function(event){
    //hide
    $('form').hide();
    location.reload();
  });
  
  //First button when page loads - hide greeting and show first question
  $("#startButton").on("click",function(event){
    if(!DATABASE.isFinished){
      event.preventDefault();
      //reset?
      $('#intro').hide();
      $('#startButton').hide();
      $('footer').html(updateBanner());
      nextScreen();
    }
  });
  
  //Button displayed during question and feedback forms
  $('form').on("submit",function(event){
    if(!DATABASE.isFinished)
      {
        event.preventDefault();
        $('footer').html(updateBanner());
        nextScreen();
      }   
  });
  
  function nextScreen(){
    //Index 0 means the user is in the initial title screen
    if(!DATABASE.isFinished){
      if(DATABASE.index === 0){
        DATABASE.index += 1;
        showNextQuestion();
      }
    //Reload the page if player is finished
    else if(DATABASE.isFinished) {location.reload(); }
      
    else{
      //If showing feedback...
      if(DATABASE.isGivingFeedback)
      {
        DATABASE.index += 1;
        //If the player is on the last question show results
        if(DATABASE.index >= DATABASE.questions.length ){
          $('#parentQuestion').html(showResults());
        }
        //If there are still questions left, show next question
        else { showNextQuestion(); } 
      }
      //Show feedback otherwise
        else {
          const playerAnswer = $('input:checked').val();
          $('#parentQuestion').html(showFeedback(playerAnswer));
        }
      }
    } 
  } 
  
  function showNextQuestion(){
    $('footer').html(updateBanner());
    if(DATABASE.index >= (DATABASE.questions.length))
    {
       $('#parentQuestion').html(showResults());
    }
    else{
      $('#parentQuestion').html(showQuestion());
      DATABASE.isGivingFeedback = false;
    }
  }
  
  function updateBanner(){
    return`<h2 class = "col-2 progress floatLeft">Question <p class = "currentQuestion">${DATABASE.index}</p> of <p class = "totalQuestions">${DATABASE.questions.length -1}</p></h2>
      
      <h2 class = "col-2 progress floatRight">Correct: <p class = "correct">${DATABASE.correct}</p> Incorrect: <p class = "incorrect">${DATABASE.incorrect}</p></h2>`;
  }
  
  function showQuestion(){
    //Insert a label for each answer choice into the question form 
    return `
    <div class = "col-1" ><h3>${DATABASE.questions[DATABASE.index]}</h3></div> 
    
    <fieldset>
    
    <label class = "answerChoice" id = "answerChoice1"><input type = "radio" value= "${DATABASE.answers[DATABASE.index][0]}" name = "answer" required><span class = "answerText" id = "answerText1"> ${DATABASE.answers[DATABASE.index][0]}</span></label>
    
    <label class = "answerChoice" id = "answerChoice2"><input type = "radio" value= "${DATABASE.answers[DATABASE.index][1]}" name = "answer" required><span class = "answerText" id = "answerText2"> ${DATABASE.answers[DATABASE.index][1]}</span></label>
    
    <label class = "answerChoice" id = "answerChoice3"><input type = "radio" value= "${DATABASE.answers[DATABASE.index][2]}" name = "answer" required><span class = "answerText" id = "answerText3"> ${DATABASE.answers[DATABASE.index][2]}</span></label>
    
    <label class = "answerChoice" id = "answerChoice4"><input type = "radio" value= "${DATABASE.answers[DATABASE.index][3]}" name = "answer" required><span class = "answerText" id = "answerText4"> ${DATABASE.answers[DATABASE.index][3]}</span></label>
    </fieldset><div class = "submitBlock" ><input type = "submit" value = "Submit" id = "quizButton"></button></div>
    `;
  }
  
  function showFeedback(playerAnswer){
    DATABASE.isGivingFeedback = true;
    if(playerAnswer == DATABASE.correctAnswers[DATABASE.index]){
      //Show correct feedback
      DATABASE.correct++;
      $('footer').html(updateBanner());
      
      return `<div><img class = "feedbackImage" src = "${DATABASE.feedbackImages[DATABASE.index]}" alt ="${DATABASE.imageAlt[DATABASE.index]}"><h3>Correct!</h3></div><div class = "submitBlock" ><button id = "quizButton">Lets Go!</button></div>`;
    }
    else {
      //Show incorrect feedback
      DATABASE.incorrect++;
      $('footer').html(updateBanner());
      
      return `<div><img class = "feedbackImage" src = "${DATABASE.feedbackImages[DATABASE.index]}" alt ="${DATABASE.imageAlt[DATABASE.index]}"><h3>Incorrect... the correct answer was <span class = "correctAnswer">${DATABASE.correctAnswers[DATABASE.index]}.</span></h3></div><div class = "submitBlock" ><button id = "quizButton">Next Question!</button></div>`;la
    }
  }
  
  function showResults(){
    //Show great, good, or bad feedback depending on score
    isFinished = true;
    DATABASE.index = 0;
    if(DATABASE.correct >= 9){
      $('#parentQuestion').html(displayGreatScore());
    }
    else if(DATABASE.correct >= 7){
      $('#parentQuestion').html(displayGoodScore());
    }
    if(DATABASE.correct <= 6){
      $('#parentQuestion').html(displayBadScore());
    }
  }
  
  function displayGreatScore(){
    return `
      <div>
        <img class = "feedbackImage" src = "${DATABASE.greatResultsPic}" alt = ${DATABASE.greatPicAlt}>
          <h3>Great job! You scored ${DATABASE.correct} out of ${DATABASE.questions.length - 1} points!</h3>
      </div>
      <div class = "submitBlock" >
        <button id = "resetButton">Try again?</button>
      </div>`;
  }
  
  function displayGoodScore(){
    return `
      <div>
        <img class = "feedbackImage" src = "${DATABASE.goodResultsPic}" alt = ${DATABASE.goodPicAlt}>
          <h3>Good job! You scored ${DATABASE.correct} points out of ${DATABASE.questions.length - 1} questions.</h3>
      </div>
      <div class = "submitBlock" >
        <button id = "resetButton">Try again?</button>
      </div>`;
  }
  
  function displayBadScore(){
   return `
      <div>
        <img class = "feedbackImage" src = "${DATABASE.poorResultsPic}" alt = ${DATABASE.poorPicAlt}>
          <h3>You scored ${DATABASE.correct} points out of ${DATABASE.questions.length - 1}...How about another go ?</h3>
      </div>
      <div class = "submitBlock" >
        <button id = "resetButton">Try again?</button>
      </div>`; 
  }
});

