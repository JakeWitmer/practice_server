
// change file extension to ".js" when you save.  Then execute by navigating in the terminal to where you have it saved and running "node callbackPracticeForJake.js" (without the quotes) if you save the file as something else (different filename) then you would execute it as "node <whateverYouNamedIt>".  again, without the quotes.

// This should illustrate how a somewhat general purpose function is passed different callbacks depending on how it's being used.
// The callback is like a way of the calling function to say, "after you perform your purpose then do this next set of instructions..."

// remember, think of 'callback' as "what the caller wants to happen next", typically using what genericRecordGetter produces
// This function will return all of the records that match the name supplied, or if the name supplied is "all" it will return all records
function genericRecordGetter (nameToSearchFor, callback) {
	// check to make sure the name supplied is a valid name :
	if (typeof nameToSearchFor != 'string') {
		// Return an error message.  The convention for callback arguments is that the first argument passed to a callback is for errors
		// If this gets executed the return causes this next line to be the last line to be executed in genericRecordGetter
		return callback("Error: the first arg provided should be a string");
	}

	// an object that we're going to use as a datastore and imagine it's a database:
	var fakeDatabase = [
		{
			bob	: {
				phone : "555-555-2862",
				fullName : "Bob Roberts"
			}
		},
		{
			cindy : {
				phone : "312-222-0110",
				fullName : "Cindy Thompson"
			}
		},
		{
			jim : {
				phone : "312-222-0110",
				fullName : "Jim Thompson"
			}
		},
		{
			jim : {
				phone : "123-456-7890",
				fullName : "Jim Bob"
			}
		}
	];

	// Begin the "business logic" of our genericRecordGetter function:
	if (nameToSearchFor === "all") {
		// return the array of all of the customer records.  NOTICE THAT null is passed for the first argument because there is no error.  This is a very common callback convention
		return callback(null, fakeDatabase); // if this line is executed then no more of genericRecordGetter gets run
	}

	var arrayOfResults = [];
	var i;
	for (i = 0; i < fakeDatabase.length; i++) {
		// check to see if this item in the fakeDatabase array has a property name that matches the nameToSearchFor
		// we use bracket notation instead of dot notation because fakeDatabase[i].nameToSearchFor would look for an object property named "nameToSearchFor":
		if (fakeDatabase[i][nameToSearchFor]) {
			arrayOfResults.push(fakeDatabase[i]); // add this record to the arrayOfResults 
		}
	}
	return callback(null, arrayOfResults); // return whatever results we have in the arrayOfResults
}

// a record consuming process that will look for a particular record and if it doesn't exist will return all records:
function logMatchOrAll (nameToCheckFor) {

	genericRecordGetter(nameToCheckFor, handleInitialResults);

	// This next function will be the callback to our first call to genericRecordGetter. Notice how it's passed to 
	// genericRecordGetter on the previous line.  Go look in genericRecordGetter to see where it's called and how it's used.
	// Because it's declared within the scope of returnMatchOrAll it's only available within returnMatchOrAll unless it's passed to another function
	// as we do in the call to genericRecordGetter above:
	function handleInitialResults (err, resultsArray) {
		if (err) {
			return console.log("Yikes, we encountered an error: ", err);
		} else if (resultsArray.length > 0) {
			logResultRecords(resultsArray);
		} else {
			genericRecordGetter("all", function(err, results) {
				if (err) {
					return console.log("Error: genericRecordGetter returned error when passed 'all' - something must be broken");
				} else {
					logResultRecords(resultsArray);
				}
			});
		}
	}

}

// Just a helper function that I used to separate out some logic from logMatchOrAll both to keep logMatchOrAll "thin" and also to make it available
// to other functions that might use it.  
function logResultRecords (resultsToLog) {
	var logMessage = "These records were retrieved : \n";
	if (resultsToLog.length) {
		for (var i = 0; i < resultsToLog.length; i++) {
			logMessage += JSON.stringify(resultsToLog[i]);
		} 
	} else {
		logMessage += "none";
	}
	console.log(logMessage);
}

// another record consuming process that logs the number of records that exist:
function logNumberOfRecords () {
	// this time instead of declaring our callback function separately and passing it in to genericRecordGetter by name, we
	// are just declaring the callback function right as we pass it to the call of genericRecordGetter.  This is very common:
	genericRecordGetter("all", function(err, results) {
		if (err) {
			return (console.log("Error encountered in logNumberOfRecords from call to genericRecordGetter: ", err));
		} else {
			console.log("The number of records that exist are : ", results.length);
		}
	});
}

function returnOnlyMatches (searchName) {
	genericRecordGetter(searchName, function (err, results) {
		if (err) {
			return console.log("Error returned from genericRecordGetter when called in returnOnlyMatches: ", err);
		} else {
			logResultRecords(results);
		};
	});
}

// Here are the calls that kick off the processes.  Imagine that these calls are generated by user action
// like entering a name and clicking a submit button or like a server route being hit and passed some data.  
// I recommend commenting all but one at a time to study how this works:

logMatchOrAll("bob"); // this name exists in our database

// logMatchOrAll("judith"); // this name does not exist

// logMatchOrAll("all");

// logNumberOfRecords();

// returnOnlyMatches("jim"); // 2 exist

// returnOnlyMatches("peter"); // does not exist

// returnOnlyMatches("all");
