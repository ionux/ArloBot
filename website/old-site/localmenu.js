window.onload = function() {

    // For LCARish buttons:
    var LCARishButton = function(buttonID, knockoutItem, offAction, onAction) {
        var buttonElement = document.getElementById(buttonID),
            onSide = buttonElement.getElementsByClassName("switch-on")[0],
            offSide = buttonElement.getElementsByClassName("switch-off")[0],
            switchItself = buttonElement.getElementsByClassName("toggle")[0],
            oldValue = knockoutItem();
        if (knockoutItem()) {
            onSide.classList.add("toggler--is-active");
            offSide.classList.remove("toggler--is-inactive");
            switchItself.classList.add("toggle-on");
            switchItself.classList.remove("toggle-off");
        } else {
            offSide.classList.add("toggler--is-inactive");
            onSide.classList.remove("toggler--is-active");
            switchItself.classList.remove("toggle-on");
            switchItself.classList.add("toggle-off");
        }
        knockoutItem.subscribe(function(newValue) {
            if (newValue !== oldValue) {
                oldValue = newValue;
                if (newValue) {
                    onAction();
                } else {
                    offAction();
                }
            }
            if (newValue) {
                onSide.classList.add("toggler--is-active");
                offSide.classList.remove("toggler--is-inactive");
                switchItself.classList.add("toggle-on");
                switchItself.classList.remove("toggle-off");
            } else {
                offSide.classList.add("toggler--is-inactive");
                onSide.classList.remove("toggler--is-active");
                switchItself.classList.remove("toggle-on");
                switchItself.classList.add("toggle-off");
            }
        });
        onSide.addEventListener("click", function() {
            oldValue = true;
            onAction();
        });
        offSide.addEventListener("click", function() {
            oldValue = false;
            offAction();
        });
    };

    var reverseLCARishButton = function(buttonID, knockoutItem, offAction, onAction) {
        // For switches whose primary/normal position corresponds to a
        // 'true' value in the webModel.
        // NOTE: Remember to use the 'reverseSwitch' class instead of
        // the 'switch' class for the button text in the html document.
        var buttonElement = document.getElementById(buttonID),
            onSide = buttonElement.getElementsByClassName("switch-off")[0],
            offSide = buttonElement.getElementsByClassName("switch-on")[0],
            switchItself = buttonElement.getElementsByClassName("toggle")[0],
            oldValue = knockoutItem();
        if (knockoutItem()) {
            onSide.classList.add("toggler--is-inactive");
            offSide.classList.remove("toggler--is-active");
            switchItself.classList.add("toggle-off");
            switchItself.classList.remove("toggle-on");
        } else {
            offSide.classList.add("toggler--is-active");
            onSide.classList.remove("toggler--is-inactive");
            switchItself.classList.remove("toggle-off");
            switchItself.classList.add("toggle-on");
        }
        knockoutItem.subscribe(function(newValue) {
            if (newValue !== oldValue) {
                oldValue = newValue;
                if (newValue) {
                    onAction();
                } else {
                    offAction();
                }
            }
            if (newValue) {
                onSide.classList.add("toggler--is-inactive");
                offSide.classList.remove("toggler--is-active");
                switchItself.classList.add("toggle-off");
                switchItself.classList.remove("toggle-on");
            } else {
                offSide.classList.add("toggler--is-active");
                onSide.classList.remove("toggler--is-inactive");
                switchItself.classList.remove("toggle-off");
                switchItself.classList.add("toggle-on");
            }
        });
        onSide.addEventListener("click", function() {
            oldValue = true;
            onAction();
        });
        offSide.addEventListener("click", function() {
            oldValue = false;
            offAction();
        });
    };

    var robotModel = {
        /*
        robotStatus: ko.observable('Robot web server is not running.'),
        pluggedIn: ko.observable('AC Status unknown.'),
        ROSisRunning: ko.observable(false),
        inRoom: ko.observable(false),
        showStartROSbutton: ko.observable(true),
        showStopROSbutton: ko.observable(true),
        mapList: ko.observableArray(['Explore!']),
        */
        selectedMap: ko.observable(),
        selectedWayPoint: ko.observable(),
        showSaveMap: function() {
            mapNameDialogVisible(true);
        },
        startROS: function() {
            socket.emit('startROS');
        },
        stopROS: function() {
            socket.emit('stopROS');
        },
        halt: function() {
            socket.emit('haltRobot');
        },
        unHalt: function() {
            socket.emit('unHaltRobot');
        },
        quiet: function() {
            socket.emit('beQuiet');
        },
        talk: function() {
            socket.emit('talk');
        },
        pauseAutoExplore: function() {
            socket.emit('pauseAutoExplore');
        },
        unPauseAutoExplore: function() {
            socket.emit('unPauseAutoExplore');
        },

        monitorAC: function() {
            socket.emit('monitorAC');
        },
        ignoreAC: function() {
            socket.emit('ignoreAC');
        },

        monitorIR: function() {
            socket.emit('monitorIR');
        },
        ignoreIR: function() {
            socket.emit('ignoreIR');
        },

        monitorCliff: function() {
            socket.emit('monitorCliff');
        },
        ignoreCliff: function() {
            socket.emit('ignoreCliff');
        },

        monitorFloor: function() {
            socket.emit('monitorFloor');
        },
        ignoreFloor: function() {
            socket.emit('ignoreFloor');
        },

        monitorProximity: function() {
            socket.emit('monitorProximity');
        },
        ignoreProximity: function() {
            socket.emit('ignoreProximity');
        },

        newMapName: ko.observable(),
        saveMap: function() {
            socket.emit('saveMap', webModel.newMapName());
        },
        markDoorsClosed: function() {
            socket.emit('markDoorsClosed');
        },
        startLogStreamer: function() {
            socket.emit('startLogStreamer');
        },
        stopLogStreamer: function() {
            socket.emit('stopLogStreamer');
        },
        startColorFollower: function() {
            socket.emit('startColorFollower');
        },
        stopColorFollower: function() {
            socket.emit('stopColorFollower');
        },
        buttonOneText: ko.observable('Curiosity'),
        buttonOne: function() {
            this.buttonOneText('Cat is Dead');
        },
        buttonThreeText: ko.observable('Button'),
        buttonThree: function() {
            this.buttonThreeText("Now you've done it!");
        },
        buttonFourText: ko.observable('Button'),
        buttonFour: function() {
            this.buttonFourText('<sigh>');
        },
        reloadPage: function() {
            document.location.reload(true);
        },
        exitWebServer: function() {
            socket.emit('exit');
        },
        remoteControlPage: function() {
            window.open("remote-control.html");
        },
        openLogStreamer: function() {
            var logStreamerURL = 'http://' + location.hostname + ':28778/';
            window.open(logStreamerURL, '_blank');
        },
        setWayPointText: ko.observable('set WayPoint'),
        setWayPoint: function() {
            var wayPoint = prompt("Please enter a name for your waypoint", "Gallefrey");
            if (wayPoint != null) {
                socket.emit('setWayPoint', wayPoint);
            } else {
                console.log('Canceled.');
            }
        }
    };

    var webModel = ko.mapping.fromJS(robotModel);
    var firstStart = true;

    robotModel.selectedMap.subscribe(function(newValue) {
        socket.emit('setMap', newValue);
    });

    robotModel.selectedWayPoint.subscribe(function(newValue) {
        socket.emit('gotoWayPoint', newValue);
    });

    //var sensor = document.getElementById('sensor');
    //var socket = io.connect('http: //arlobot:8080');
    var socket = io();

    socket.on('startup', function(data) {
        ko.mapping.fromJS(data, webModel);
        if (firstStart) {
            firstStart = false;

            // Run the function once for each button:
            //LCARishButton('button-id', koWatchItem, koOffAction, koOnAction)
            LCARishButton('talk-bequiet-button', webModel.beQuiet, webModel.talk, webModel.quiet);
            LCARishButton('explore-pause-button', webModel.pauseExplore, webModel.unPauseAutoExplore, webModel.pauseAutoExplore);
            reverseLCARishButton('ignore-pluggedIn-button', webModel.rosParameters.monitorACconnection, webModel.ignoreAC, webModel.monitorAC);
            LCARishButton('ignore-IR-button', webModel.rosParameters.ignoreIRSensors, webModel.monitorIR, webModel.ignoreIR);
            LCARishButton('ignore-cliff-button', webModel.rosParameters.ignoreCliffSensors, webModel.monitorCliff, webModel.ignoreCliff);
            LCARishButton('ignore-floor-button', webModel.rosParameters.ignoreFloorSensors, webModel.monitorFloor, webModel.ignoreFloor);
            LCARishButton('ignore-proximity-button', webModel.rosParameters.ignoreProximity, webModel.monitorProximity, webModel.ignoreProximity);

            ko.applyBindings(webModel);
        }
        if (webModel.autoExplore()) webModel.selectedMap('Explore!');
        else webModel.selectedMap(webModel.mapName());
    });

    socket.on('webModel', function(data) {
        console.log('.');
        //console.log(webModel); // A lot of data
        ko.mapping.fromJS(data, webModel);
        if (webModel.autoExplore()) {
            webModel.selectedMap('Explore!');
        } else if (webModel.mapName() != '') {
            if (webModel.selectedMap !== webModel.mapName()) {
                webModel.selectedMap(webModel.mapName());
            }
        }
    });


    socket.on('disconnect', function() {
        webModel.selectedMap('');
        webModel.selectedWayPoint('');
        webModel.status('Robot web server disconnected.');
    });
};
