// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var saveBtn = $('.saveBtn');
  
  saveBtn.on('click', function (event) {
    var key = $(this).parent().attr('id');
    var notes = $(this).siblings('.description').val();
    
    if(!notes) {
      alert('Please put the something in the time slot before saving.')
    }
    else {
      window.localStorage.setItem(key, notes);
    }
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // 
  var today = dayjs();
  var timeBlocks = $('.time-block');
  
  for (let i = 0; i < timeBlocks.length; i++) {
    var block = $(timeBlocks[i]);
    var hr = Number(block.attr('id').replace('hour-', ''));
    var hrCurrent = Number(today.format('HH'));
    console.log(hr === hrCurrent);
    
    if(hr === hrCurrent) {
      console.log('Present');
      var lastClass = block.attr('class').split(' ').pop();
      block.removeClass(lastClass);
      block.addClass('present');
    }
    else if (hr < hrCurrent) {
      console.log('Past');
      var lastClass = block.attr('class').split(' ').pop();
      block.removeClass(lastClass);
      block.addClass('past');
    }
    else {
      console.log('Future');
      var lastClass = block.attr('class').split(' ').pop();
      block.removeClass(lastClass);
      block.addClass('future');
    }
    
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  for (let i = 0; i < timeBlocks.length; i++) {
    var block = $(timeBlocks[i]);
    var key = block.attr('id');
    var notesLS = window.localStorage.getItem(key);
    console.log(notesLS);
    console.log(block.children('.description'));
    if (notesLS) {
      block.children('.description').val(notesLS);
    }
  }
  // TODO: Add code to display the current date in the header of the page.
  // 
  var date = $('#currentDay');
  date.text(today.format('dddd, MMMM D YYYY, h:mm:ss a'))
});
