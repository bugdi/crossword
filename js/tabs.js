function openTab(index) {
  $(".tab").removeClass('activeTab');
  $("#tab" + index).addClass('activeTab');
  $("li > a").removeClass("active");
  $("li > a").eq(index).addClass('active');
}
function addWord()
{
  // var item = document.createElement('li');
  // item.classList.add('list-group-item');
  // item.innerText = "Ax";
  // item.style.display = "none";
  if($('#new-word').val() === '' || $('#new-word').is(':invalid'))
    return;
  var $item = $("<li></li>")
            .hide()
            .addClass('list-group-item')
            .text($("#new-word").val())
            .append('<span class="glyphicon glyphicon-remove remove-button" onclick="removeEvent(event)"></span>')
            .appendTo("#words")
            .fadeIn('slow');

  $("#new-word").val('');
}
function removeEvent(event)
{
  event.currentTarget.parentElement.remove();
}
function doIt()
{
  if($('#answer').val() === '' || $('#answer').is(':invalid'))
    return;
  var wordsChildren = $("#words").children();
  var wordList = [];
  for (var i = 0; i < wordsChildren.length; i++) {
    wordList.push(wordsChildren.eq(i).text());
  }
  createCrossword(wordList, $("#answer").val());
}
