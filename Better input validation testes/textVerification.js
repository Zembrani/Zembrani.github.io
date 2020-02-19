function inputArea(input) {
  this.input = input;
  this.isEmpty = function () {
    return this.input == "" ? true : false;        
  }
}

function name(input) {
  this.input
}
    
function test () {
  var id = document.getElementById("fullname");
  var constraint = new RegExp("^[a-zA-Z]+([- ]?[a-zA-Z])*$", "");
  
  console.log(constraint);
  console.log(id.value);
  if(constraint.test(id.value)) {  
    id.setCustomValidity("");
  }else{
    id.setCustomValidity("Invalid value");
  }
}

function test2 () {
  var id = document.getElementById("fullname");
  id.setCustomValidity("algo errado 2");
}

function checkForm() {
	var formList = [
    document.getElementById("fullname"), 
		document.getElementById("streetaddr"),
		document.getElementById("housenmbr"),
		document.getElementById("postcodenmbr"),
		document.getElementById("emailaddress")
		];
	var listIds = [
		"nameerrormsg", 
		"addrerrormsg",
		"nmbrerrormsg",
		"postcodeerrormsg",
		"emailaddresserrormsg"
		];
		//this object is to redefine the error message.
	var listErrorText = {
		'nmbrerrormsg':'Please enter your house number',
		'postcodeerrormsg':'Please enter your postcode number'
		};
		//this list is to define which text area are numbers.
	var listNumbersForms = [
		false,
		false,
		true,
		true,
		false
		];
	var listNumbersLength = [
		false,
		false,
		false,
		true,
		false
		];														
	var someWrong = false;
	var listSomeWrong = [];
	var result;
			
	for(var i = 0; i < formList.length; i++) {
		someWrong = false;
		var text = document.getElementById(listIds[i]);
    var input = new inputArea(formList[i].value);
   
    someWrong = input.isEmpty();
      
		if(someWrong == true) {
			text.style.display = "block";
		} else {
			text.style.display = "none";
		}
		listSomeWrong.push(someWrong);
	}
	result = listSomeWrong.find(ifTrue);
	return !result;
}
			
function ifTrue(value) {
		return value == true;
	}
			
function checkEmail(input, text) {
	var index = input.indexOf('@');
	var index2 = input.lastIndexOf('.');
	var diff = parseInt((index2 - index), 10);

	if(index == -1 || index2 == -1 || index == 0 || index2 == 0 || index == (input.length)-1 || index2 == (input.length)-1 || index2 == (input.length)-2 || index2 < index || diff < 2) {
		text.innerHTML = 'Please enter a valid email';
		return true;
	}		
}

window.onload = function () { 
  document.getElementById("userfeedbackform").onsubmit = checkForm; 
  document.getElementById("userfeedbackform").onchange = test; 
  document.getElementById("userfeedbackform").oninput = test;
document.getElementById("userfeedbackform").onkeyup = test;
}