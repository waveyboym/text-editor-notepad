# text-editor-notepad
a simple text editor application done with **<a href="https://wails.io/" target="_blank" rel="noreferrer">wails</a>** and **<a href="https://reactjs.org/" target="_blank" rel="noreferrer">react</a>** + **<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">typescript</a>** + **<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">tailwindcss</a>**

**NB: Please note this app is still under heavy development and a lot still does not work and/or still needs to be fixed**

# Presentation
![presentation](preview-img/notes-app.png "presentation")

# I am a user/tester
Executables coming soon...

# I am a developer
1. Install wails onto your desktop. You can do so by following their guide over here: https://wails.io/docs/introduction/ (make sure to init a new project with react + typescript instead of vanilla javascript).
2. Once wails is installed and you have created a new project, test run it to make sure it works by running ```wails dev```.
3. Clone this repository onto your computer
4. When you open the root directory of the project, you should identify the 8 files that will be replaced, namely, ".gitignore", "app.go", "go.mod", "go.sum", "main.go", "package.json", "package-lock.json", "README.md". The files to replace them with can be found in the root of this repository under the <a href="https://github.com/waveyboym/text-editor-notepad/tree/main/backend">backend</a> directory.
5. Copy the entirety of the frontend folder from the root of this repository and replace the frontend in the root of your project with the one from this repository.
6. Once that is complete, open a terminal that is the root directory of your project and run ```npm install``` to install various node modules
8. Once that is done, you may run ```wails dev``` to start a development server for the app
9. To make a production build, run `wails build` and the build will be found for your current operating system in the root of the project under the build directory
