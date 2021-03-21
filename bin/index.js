const chalk = require("chalk");
const boxen = require("boxen");
const commands = require("./commands");
  
displayWelcomeMessage();

const helpString = `Available commands \n
KEYS: Returns all the keys in the dictionary. \n
MEMBERS 'Key': Returns the collection of strings for the given key. \n
ADD 'Key' 'Value': Add a member to a collection for a given key. \n
REMOVE 'Key' 'Value': Removes a value from a key. \n
REMOVEALL 'Key': Removes all value for a key and removes the key from the dictionary. \n
CLEAR: Removes all keys and all values from the dictionary. \n
KEYEXISTS 'Key': Returns whether a key exists or not. \n
VALUEEXISTS 'Key' 'Value': Returns whether a value exists within a key. \n
ALLMEMBERS: Returns all the values in the dictionary. \n
ITEMS: Returns all keys in the dictionary and all of their values. \n
EXIT: Exits the application.`;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var defaultUserPrompt = function () {
    readline.question("", cmd => {
        var userInput = breakDownUserInput(cmd);
        switch (userInput.cmd.toLowerCase()) {
            case "exit" :
                return readline.close();
            case "keys" :
                commands.keys();
                defaultUserPrompt();
                break;
            case "members" :
                commands.members(userInput.parameter1);
                defaultUserPrompt();
                break;
            case "add" :
                commands.add(userInput.parameter1, userInput.parameter2);
                defaultUserPrompt();
                break;
            case "remove" :
                commands.remove(userInput.parameter1, userInput.parameter2);
                defaultUserPrompt();
                break;
            case "removeall" :
                commands.removeAll(userInput.parameter1);
                defaultUserPrompt();
                break;
            case "clear" :
                commands.clear();
                defaultUserPrompt();
                break;
            case "keyexists" :
                commands.keyexists(userInput.parameter1);
                defaultUserPrompt();
                break;
            case "valueexists" :
                commands.valueExists(userInput.parameter1, userInput.parameter2);
                defaultUserPrompt();
                break;
            case "allmembers" :
                commands.allMembers();
                defaultUserPrompt();
                break;
            case "items" : 
                commands.items();
                defaultUserPrompt();
                break;
            case "help" :
                console.log(helpString);
                defaultUserPrompt();
                break;
            default :
                console.log("Invalid input");
                defaultUserPrompt();
        }
    });
}

console.log("Please enter a command, or 'help'");
defaultUserPrompt();

function displayWelcomeMessage() {
    const greeting = chalk.white.bold("James Nelson's Spreetail Work Sample");

    const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "#067e7e",
    backgroundColor: "#555555"
    };

    const msgBox = boxen( greeting, boxenOptions );

    console.log(msgBox);
}

var breakDownUserInput = function(cmd) {
    var twoWordCommands = ["removeall", "keyexists", "valueexists", "allmembers"];
    var cmdArray = cmd.split(" ");
    if(twoWordCommands.includes(cmdArray[0] + cmdArray[1])) {
        console.log("Command name should not include spaces. ex: RemoveAll");
    }
    if(cmdArray[0] == "remove" && cmdArray[2] == null) {
        console.log("Remove command requires both a key and a value. Use RemoveAll to remove a key.")
    }
    return {
        cmd : cmdArray[0],
        parameter1 : cmdArray[1] ? cmdArray[1] : null,
        parameter2 : cmdArray[2] ? cmdArray[2] : null
    }
}



