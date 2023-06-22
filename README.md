# Ecommerce mobile application

You can find the full tutorial for this application [here](https://www.youtube.com/watch?v=WuAMLwrYu68) and also the original [source](https://github.com/Savinvadim1312/AmazonClone) code repository.

Thanks to [Savinvadim1312](https://github.com/Savinvadim1312) for this amazing tutorial.

## Usage
 
```sh 
npm i -g @react-native-community/cli
```
use a clean typescript [template](https://github.com/react-native-community/react-native-template-typescript).
```sh
react-native init AmazonClone --template react-native-template-typescript
```

## Starting the app
- Running a device emulator. (
*Skip this step if you directly use android studio*)

***For linux users***

First, make sure you have set correctly the ANDROID_HOME environment variable.
For example your sdk home is located at `~/Android/Sdk`
You should type something like
```sh
export ANDROID_HOME=/home/$USER/Android/Sdk/
export PATH="${PATH}:${ANDROID_HOME}tools/:${ANDROID_HOME}platform-tools/:${ANDROID_HOME}emulator"
```

OR you can create a new file named `local.properties` inside the android folder and add this line:
```sh
sdk.dir=~/Android/Sdk/ # if it does not work try an absolute path instead of this relative one
```

Now you can run the emulator command to start an emulator
```sh
cd {$ANDROID_HOME}/emulator/
```
```sh
./emulator -avd {device-name}
# OR
./emulator @device-name
```
*[See](https://developer.android.com/studio/run/managing-avds) for more informations when using an emulator.*
*You can also simply use a hardware device to test your app. More informations [here](https://developer.android.com/studio/run/device)*


- Running the app
```sh
npm run start
```

## Dependencies
- [React native vector icons](https://github.com/oblador/react-native-vector-icons)
- [React native picker](https://github.com/react-native-picker/picker)
- [React navigation](https://reactnavigation.org/docs/getting-started/) and all its others dependencies