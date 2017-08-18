# CoffeeDrive

This instruction is not a standalone building instruction, but an explanation of how to run ![Coffee Me](https://github.com/leonardean/CoffeeMe) and Coffee Driver on two different iOS simulator at the same time. To successfully go through the steps in this instruction, please make sure to complete the ![prerequisite](https://github.com/leonardean/CoffeeMe/blob/master/README.md).

# Steps

## Run Coffee Drive App
```
git clone https://github.com/leonardean/CoffeeDrive.git
cd CoffeeDrive
npm install
react-native start
```
A packager should now be running at port 8081
```
Scanning 571 folders for symlinks in /Users/leonardean/Desktop/CoffeeDrive/node_modules (3ms)
 ┌────────────────────────────────────────────────────────────────────────────┐
 │  Running packager on port 8081.                                            │
 │                                                                            │
 │  Keep this packager running while developing on any JS projects. Feel      │
 │  free to close this tab and run your own packager instance if you          │
 │  prefer.                                                                   │
 │                                                                            │
 │  https://github.com/facebook/react-native                                  │
 │                                                                            │
 └────────────────────────────────────────────────────────────────────────────┘
Looking for JS files in
   /Users/leonardean/Desktop/CoffeeDrive


React packager ready.

Loading dependency graph, done.
```
Open another terminal window and go to the directory of `CoffeeDrive`
```
react-native run-ios
```
Now Coffee Drive App should be running on your default iOS simulator.

## Open another iOS simulator
```
cd /Applications/Xcode.app/Contents/Developer/Applications
open -n Simulator.app
```
When you execute `open -n Simulator.app`, a warning will appear with message "Unable to boot device in current state: Booted". This is because XCode is trying to boot another default simulator, which has already to booted. We just need to change to another model. Click `OK` to close the warning window and select `Hardware -> Device -> iOSX.X -> whatever model that is not currently open`. 
[![Screen_Shot_2017-08-18_at_5.11.01_PM.png](https://s30.postimg.org/9ylqrcbf5/Screen_Shot_2017-08-18_at_5.11.01_PM.png)](https://postimg.org/image/d5gaayvv1/)
Now you should have two iOS simulators running at the same time.

## Run Coffee Me app

Go to the directory of CoffeeMe
```
react-native start --port 8082
```
Another packager should now be running at port 8082
Open another terminal window and go to the directory of CoffeeMe
```
react-native run-ios --simulator "iPhone 6s"
```
Now CoffeeMe app should be running on the other iOS simulator.

## Summary
[![Screen_Shot_2017-08-18_at_5.45.24_PM.png](https://s30.postimg.org/py4eaw7gx/Screen_Shot_2017-08-18_at_5.45.24_PM.png)](https://postimg.org/image/qnn6n980d/)
[![Screen_Shot_2017-08-18_at_5.46.55_PM.png](https://s30.postimg.org/geuphfjyp/Screen_Shot_2017-08-18_at_5.46.55_PM.png)](https://postimg.org/image/o7ld9epxp/)

## Tip
To speed up iOS simulator, press `Cmd` + 'D' to toggle develop menu, turn off remote debug, hot reload, live reload.
