[![nahidx logo](https://i.postimg.cc/s2pCFr2B/Untitled-1.png)](https://postimg.cc/Z9KM3XpZ)

# nahidx - Express-Cli

nahidx is a cli tool that helps develop rest api based express.js applications by creating new project by following standard express.js project architecture and helps generate different modules (Ex: Routes, Models, Middlewares).

# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g @nahidrezvee/express-cli
```

And nahidx will be installed globally to your system path.

# Usage

```bash
nahidx
```

Just one command, then you will be asked to choose what you want to create.

```bash
? What do you want to create? (Use arrow keys)
> Model
  Middleware
  Route
  New Project
```
### New Project
- Creates a new Project
- Installs the dependencies (Ex: Express.js, Mongoose, Joi)

### Model
- Creates a new Model
- Created Model File will be found on the `<project-root>/models` directory.

### Middleware
- Creates a new Middleware
- Created Middleware File will be found on the `<project-root>/middlewares` directory.

### Route
- Creates new Route
- Created Route File will be found on the `<project-root>/routes` directory.
- Import the new route to `index.js` and uses the route as http end-point

#### Note

>  $ Please run `nahidx` on `<project-root>`, otherwise it won't work properly.
>  $ `nahidx` uses `// comments` to identify file structure. Please don't remove the `// comments`


### Ask ME

Thank you to all. Ask me [linkedin](https://www.linkedin.com/in/abdunnahid/)! 🙏
