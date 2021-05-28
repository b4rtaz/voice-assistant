# Voice Assistant for VSCode

[![Build Status](https://travis-ci.com/b4rtaz/voice-assistant.svg?branch=main)](https://travis-ci.com/b4rtaz/voice-assistant) [![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](/LICENSE) [![Twitter: b4rtaz](https://img.shields.io/twitter/follow/b4rtaz.svg?style=social)](https://twitter.com/b4rtaz)

The voice assistant for Visual Studio Code. This extension allows you to put code snippets into the code by voice. Also, you can execute any Visual Studio command by voice. The extension works with any language, because the file with voice commands is placed in the project folder (voice-assistant.json). So, you can prepare own voice commands for each project.

<p align="center"><img src="./.github/preview.gif" alt="Voice Assistant for VSCode" /><br />(<a href="https://twitter.com/b4rtaz/status/1396126210279759872">check an example with voice 🔉</a>)</p>

🔥 Features:

* multiple windows support,
* diffrent voice commands for each project,
* easy voice commands reloading,
* it works with every language,
* VSCode command executing.

☕ `voice-assistant.json` examples:

* [TypeScript](definitions/typescript.json)
* [HTML](definitions/html.json)
* ...

💻 Available speech recognition servers:

* [.NET Server](https://github.com/b4rtaz/voice-assistant-net-server) (only for Windows)

## 🚀 How to Start?

1. **Install this extension** from [the marketplace](https://marketplace.visualstudio.com/items?itemName=b4rtaz.voice-assistant).
2. **Install & run a server**. The server is necessary, because it does all speech recognition job. Currently we support only Windows.  
   * 💾 [Download .NET Server](https://github.com/b4rtaz/voice-assistant-net-server/releases/download/v0.1.0/VoiceAssistant.Server.0.1.0.zip) (only for Windows, it requires [.NET5](https://dotnet.microsoft.com/download/dotnet/5.0))
3. **Add `voice-assistant.json` file** to root directory of your project and click "Reload definition". You may use [an example file](definitions/) or click "Add example voice-assistant.json" button.
4. You can start speaking. 🎤

## 📌 FAQ

* **.NET Server doesn't recognize the speech** - you may boost the microphone power in Windows settings, try to speak correctly and sharply ([more](https://github.com/b4rtaz/voice-assistant/issues/3)).

## 💡 License

This project is released under the MIT license.
