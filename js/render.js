class Word {
  constructor(word, loc) {
    this.word = word;
    this.answer = loc;
  }
}

function setAnswerColumn(columnIndex)
{
  var answerColumnStyle = document.createElement("style");
  answerColumnStyle.id = "answer-column-style";
  answerColumnStyle.innerHTML = ".crossword td:nth-child(" + columnIndex + ") {border-width:2px}";
  $("body").append(answerColumnStyle);
}
function removeAnswerColumn()
{
  $("#answer-column-style").remove();
}
function renderTable(columns, rows)
{
  var tbody = $(".crossword tbody");
  var row;
  for (var i = 0; i < rows; i++) {
    row = document.createElement("tr");
    for (var j = 0; j < columns; j++) {

      row.innerHTML += "<td>&nbsp;</td>";
    }
    tbody.append(row);
  }
}
function renderCrossword(words, answer)
{
  var matchLocation;
  var wordArray = [];
  var sizeLeft = 0;
  var sizeRight = 0;
  for (var i = 0; i < answer.length; i++) {
    matchLocation = localizedIndexOf(words[i], answer[i]); //words[i].indexOf(answer[i])

    wordArray.push(new Word(words[i], matchLocation));
    if(sizeLeft < matchLocation)
    {
      sizeLeft = matchLocation;
    }
    if(sizeRight < words[i].length - matchLocation)
    {
      sizeRight = words[i].length - matchLocation;
    }
  }
  setAnswerColumn(sizeLeft + 1);
  renderTable(sizeLeft + sizeRight, answer.length);
  fillWords(wordArray, sizeLeft + sizeRight, sizeLeft);
}
function fillWords(words, numColumns, answerColumn)
{
  for (var i = 0; i < words.length; i++) {
    var row = $(".crossword tr:nth-child(" + (i + 1) + ")");
    var numChar = 0; //easiest way
    for (var j = 0; j < numColumns; j++) {
      if(j >= answerColumn - words[i].answer && j < answerColumn - words[i].answer + words[i].word.length)
      {
        row.children().eq(j).text(words[i].word[numChar]);
        numChar++;
      } else {
        row.children().eq(j).addClass("cw-hidden");
      }
    }
  }
}
