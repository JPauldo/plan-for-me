$(function () {
  // Elements captures
  var saveBtn = $('.saveBtn');
  var timeBlocks = $('.time-block');
  var date = $('#currentDay');

  // Global variables
  var today = dayjs();

  // Displays the current date
  date.text(today.format('dddd, MMMM D YYYY, h:mm A'));

  // Updates the current date by the minute 
  function setDate() {
    setInterval(() => {
      date.text(today.format('dddd, MMMM D YYYY, h:mm A'));
    }, 60000);
  }

  // Saves the notes to local storage
  function saveNotes() {
    var key = $(this).parent().attr('id');
    var notes = $(this).siblings('.description').val();
    
    // Checks if there are any notes to populate
    if(!notes) {
      alert('Please put the something in the time slot before saving.')
    }
    else {
      window.localStorage.setItem(key, notes);
    }
  }
  
  // 
  function setBlocksTime() {
    for (let i = 0; i < timeBlocks.length; i++) {
      var block = $(timeBlocks[i]);
      var hr = Number(block.attr('id').replace('hour-', ''));
      var hrCurrent = Number(today.format('HH'));
      var lastClass  = block.attr('class').split(' ').pop();
      
      block.removeClass(lastClass);
      
      // Checks to see if the hour has passed for the given block
      if(hr === hrCurrent) {
        block.addClass('present');
      }
      else if (hr < hrCurrent) {
        block.addClass('past');
      }
      else {
        block.addClass('future');
      }
    }
  }
  
  // Retrieves notes from local storage
  function getPlannerNotes() {
    // Checks if a block has notes for the day
    for (let i = 0; i < timeBlocks.length; i++) {
      var block = $(timeBlocks[i]);
      var key = block.attr('id');
      var notesLS = window.localStorage.getItem(key);
      
      // Checks if there are any notes in local storage
      if (notesLS) {
        block.children('.description').val(notesLS);
      }
    }
  }
  
  // Event Listeners
  saveBtn.on('click', saveNotes);

  // Functions called on page load
  setDate();
  setBlocksTime();
  getPlannerNotes();
});
