var hfc = require('hfc');
var util = require('util');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());

var DOCKER_HOST_IP ='139.59.41.150';
if (DOCKER_HOST_IP == null || DOCKER_HOST_IP == "") {
	console.log("ERROR: No Docker Host IP specified! Exiting.");
	process.exit(1);
} else {
	console.log("Docker Host IP: " + DOCKER_HOST_IP + "\n");
}
var SDK_KEYSTORE = "/tmp/keyValStore";
var SDK_MEMBERSRVC_ADDRESS = "grpc://" + DOCKER_HOST_IP + ":7054";
var SDK_PEER_ADDRESSES = [
	"grpc://" + DOCKER_HOST_IP + ":7051",
	"grpc://" + DOCKER_HOST_IP + ":8051",
	"grpc://" + DOCKER_HOST_IP + ":9051",
	"grpc://" + DOCKER_HOST_IP + ":10051"
];
var SDK_EVENTHUB_ADDRESS = "grpc://" + DOCKER_HOST_IP + ":7053";

//
//  Create a chain object
//
var chain = hfc.newChain("testChain");

//
// Configure the chain settings
//
var deployed=1;

// Set the location of the KeyValueStore
console.log("Setting keyValStore location to: " + SDK_KEYSTORE);
chain.setKeyValStore(hfc.newFileKeyValStore(SDK_KEYSTORE));

// Set the membership services address
console.log("Setting membersrvc address to: " + SDK_MEMBERSRVC_ADDRESS);
chain.setMemberServicesUrl(SDK_MEMBERSRVC_ADDRESS);
var x='single-peer';
// Set the peer address(es) depending on the network type
if (x == "single-peer") {
	console.log("Setting peer address to: " + SDK_PEER_ADDRESSES[0]);
	chain.addPeer(SDK_PEER_ADDRESSES[0]);
} else if (x== "four-peer") {
	SDK_PEER_ADDRESSES.forEach(function(peer_address) {
		console.log("Adding peer address: " + peer_address);
		chain.addPeer(peer_address);
	});
} else {
	console.log("ERROR: Please select either a `single-peer` " +
	" or a `four-peer` network!");
	process.exit(1);
}

// Set the eventHub address
console.log("Setting eventHubAddr address to: " + SDK_EVENTHUB_ADDRESS + "\n");
chain.eventHubConnect(SDK_EVENTHUB_ADDRESS);
process.on('exit', function () {
	console.log("Exiting and disconnecting eventHub channel.");
	chain.eventHubDisconnect();
});

// Set the chaincode deployment mode to "network", i.e. chaincode runs inside
// a Docker container
chain.setDevMode(false);

//
// Declare variables that will be used across multiple operations
//

// User object returned after registration and enrollment
var app_user;
var x;
// chaincodeID will store the chaincode ID value after deployment which is
// later used to execute invocations and queries
var chaincodeID;
function chains()
{
	x=chaincodeID;
}

	function enrolluser(username)
	{

		chain.getMember("admin", function (err, admin) {
	if (err) {
		console.log("ERROR: Failed to get WebAppAdmin member -- " + err);
		process.exit(1);
	} else {
		console.log("Successfully got WebAppAdmin member.");
	//	console.log(admin)
		// Enroll the WebAppAdmin member with the certificate authority using
		// the one time password hard coded inside the membersrvc.yaml.
		pw = "Xurw3yU9zI0l";
		admin.enroll(pw, function (err, enrollment) {
			if (err) {
				console.log("ERROR: Failed to enroll WebAppAdmin member -- " +
				err);
				process.exit(1);
			} else {
				// Set the WebAppAdmin as the designated chain registrar
				console.log("Successfully enrolled WebAppAdmin member.");
				console.log("Setting WebAppAdmin as chain registrar.");
				chain.setRegistrar(admin);

				// Register a new user with WebAppAdmin as the chain registrarre
				registerUser(username);
			}
		});
		//chain.setRegistrar("admin");
		//		registerUser("WebApp_user1");
	}
//return chaincodeID;
});



	}

	function registerUser(user_name) {
	// Register and enroll the user
	chain.getMember(user_name, function (err, user) {
		if (err) {
			console.log("ERROR: Failed to get " + user.getName() + " -- ", err);
			process.exit(1);
		} else {
			app_user = user;

			// User may not be enrolled yet. Perform both registration
			// and enrollment.
			var registrationRequest = {
				enrollmentID: app_user.getName(),
				affiliation: "bank_a"
			};
			app_user.registerAndEnroll(registrationRequest, function (err, member) {
				if (err) {
					console.log("ERROR: Failed to enroll " +
					app_user.getName() + " -- " + err);
					process.exit(1);
				} else{
					console.log("Successfully registered and enrolled " +
					app_user.getName() + ".\n");

					// Deploy a chaincode with the new user
					console.log()
					if(deployed==1)
					{
											console.log("Deploying chaincode now...");

						console.log("here");
							deploychaincode();
						deployed=2;

					}
				}
			});
		}
	});

}
function deploychaincode()
{
var deployRequest = {
		// Path (under $GOPATH/src) required for deploy in network mode
		chaincodePath: "crowd_fund_chaincode" ,
		// Function to trigger
		
		fcn: "init",
		// Arguments to the initializing function
		args: ["account","0"]
	};

	// Trigger the deploy transaction
	var deployTx = app_user.deploy(deployRequest);

	// Print the successfull deploy results
	deployTx.on('complete', function (results) {
		// Set the chaincodeID for subsequent tests
		chaincodeID = results.chaincodeID;
		console.log(util.format("Successfully deployed chaincode: request=%j, " +
		"response=%j" + "\n", deployRequest, results));
		//return chaincodeID;
		// The chaincode is successfully deployed, start the listener port
		 //startListener();
	});
	deployTx.on('error', function (err) {
		// Deploy request failed
		console.log(util.format("ERROR: Failed to deploy chaincode: request=%j, " +
		"error=%j", deployRequest, err));
		process.exit(1);
	});

}


var chaincode={
	enrolluser:enrolluser,
	chaincodeID:chaincodeID,
	chain:chain,
	chains:chains
};


<<<<<<< HEAD
module.exports=chaincode;
=======
module.exports=chaincode;
>>>>>>> 4e0158615d09b59e5ecaa021769ec16d6bf53099
