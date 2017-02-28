## AngularJS Loyalty Corp Mail Chimp Test

### Installing dependencies

 - Run `npm install` and `bower install` to install all required dependencies
 
### Compiling
The application has all of the required dependencies installed. However, should some of the dependencies
be missing, you may need to install the following globally:

```bash
npm install -g npm
npm install -g node
npm install -g tsd@0.6.5
npm install -g typescript@1.8.10
npm install -g glob@7.1.1
npm install -g ng-html2js@3.0.0
```

Most of the time, the npm build should run straight out of the box, since it uses dependencies that _should_
be installed when you run `npm install` or `npm update`

To compile the front-end application, run the following:

```bash
npm run compile
```

This will perform 3 steps
 - Cleaning the build directory and setting up the directories and importing required files
 - Compiling the TypeScript .ts files
 - Compiling the templates and saving them to partials.js, saves bandwidth and resource fetching

### Running the Application during Development
You can skip the manual compile skip when you want to run the browser, simply by executing
```bash
npm start
```

This will perform the compilation steps and provide a ready-to-go environment. If there's any 
warnings, please check that you've installed the dependencies and verified that no extra
dependencies are required. Node will provide adequate output on errors to troubleshoot the problem.


- Run `npm start`.
- Navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application
  running.
  
This application is intended to run with the [https://github.com/jmitchell38488/loyaltycorptest](Loyalty Corp Laravel API REST) application. 
Without the application installed and running on port 8001 (can be changed in `listRefService.ts`),
the AngularJS won't be able to load any data. The application will fail gracefully and display a generic
error message.

### Features
This displays lists and the list details. If you use Postman, you can create lists using the same
field mappings as the MailChimp V3 apis. Please refer to the Laravel application for more details.