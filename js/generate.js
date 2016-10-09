function createCrossword(wordList, answer)
{
  findWordResult = findWord(wordList, answer, [], 0);
  if(findWordResult === false)
  {
    $('#error-words').fadeIn();
    return;
  }
  renderCrossword(findWordResult, answer);
}
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};
function convertLocalized(string)
{
  for (var i = 0; i < string.length; i++) {
    switch (string[i]) {
      case 'ó':
        string = string.replaceAt(i, 'o');
        break;
      case 'ő':
        string = string.replaceAt(i, 'ö');
        break;
      case 'ú':
        string = string.replaceAt(i, 'u');
        break;
      case 'ű':
        string = string.replaceAt(i, 'ü');
        break;
      case 'í':
        string = string.replaceAt(i, 'i');
        break;
    }
  }
  return string;
}
function localizedIndexOf(string, char)
{
  switch (char) {
    case 'ó':
      char = 'o';
      break;
    case 'ő':
      char = 'ö';
      break;
    case 'ú':
      char = 'u';
      break;
    case 'ű':
      char = 'ü';
      break;
    case 'í':
      char = 'i';
      break;
  }
  return convertLocalized(string).indexOf(char);
}

function getIndexesOf(wordList, char)
{
  var returnValue = [];
  for (var i = 0; i < wordList.length; i++) {
    if(localizedIndexOf(wordList[i], char) != -1) //wordList[i].indexOf(char)
    {
      returnValue.push(i);
    }
  }
  return returnValue;
}
function clone(obj) {
    if (null === obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
function findWord(wordList, answer, result, location = 0)
{
  var localWordList = clone(wordList);
  var matches = getIndexesOf(localWordList, answer[location]);
  if(matches.length === 0)
  {
    return false;
  } else if(matches.length == 1) {
    result.push(localWordList.splice(matches[0], 1)[0]);
    if(location == answer.length -  1)
    {
      return result;
    } else {
      return findWord(localWordList, answer, result, location + 1);
    }
  } else {
    // more than one option
    for (var i = 0; i < matches.length; i++) {
      var multiLocal = clone(localWordList);
      var multiResult = clone(result);
      multiResult.push(multiLocal.splice(matches[i], 1)[0]);
      var find = findWord(multiLocal, answer, multiResult, location + 1);
      if(find !== false || location === answer.length -  1)
      {
        return find;
      }
    }
    return false; // if this for loop fails
  }
}
