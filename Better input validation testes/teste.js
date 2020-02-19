function inputArea(input) {
  this.input = input;
  this.isEmpty = function () {
    return this.input == "" ? true : false;        
  }
}
  
function checkForm() {
  var text = document.getElementById("fullname").value;
  var input = new inputArea(text);
  window.alert(input.isEmpty());
  return false;
}  
 		
function initMyEvents() {
	document.getElementById("userfeedbackform").onsubmit = checkForm;
	// Any other events you use can be added here in the same form.
}

window.onload = initMyEvents;