# SSTAM-SSTAM

## Trouble Shooting

1. pod install 에러 시

```
$ cd ./react-native-client/ios
$ pod install
```

2. pod install 도중 C 컴파일러 찾지 못할 때

```
$ sudo xcode-select --switch /Applications/Xcode.app
$ cd ./react-native-client/ios
$ pod install
```
