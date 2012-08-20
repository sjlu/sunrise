# Sunrise

Sunrise is a small bundle that allows to write a dedicated single page, frontend application. It was inspired by the short timings in hackathons and same-day release deadlines. It includes several libraries to help you move, like [Twitter Bootstrap](http://twitter.github.com/bootstrap/), [LESS CSS](http://lesscss.org/), a small web server, and a simple JS framework. Sunrise's intention is to get you off the ground so there's little to learn.

## Usage

### Install

You can do two things, you can either clone the repository. Or you can you can [download](https://github.com/sjlu/sunrise/zipball/master) a copy.

    git clone git@github.com:sjlu/sunrise.git
    cd sunrise
    git submodule init
    git submodule update

When you're finished with that, you'll need to have [node.js](http://nodejs.org/) installed. Run the following command to install the dependencies.

    npm install
    
That's it, it's on to learn how to use Sunrise now.

### Coding

There are only a couple files and folders you'll need to recognize. It's not as bad as it looks.

* `assets/less`: This folder contains your LESS CSS styles. When you add a new LESS file, you'll need to include it in [base.less](https://github.com/sjlu/sunrise/blob/master/assets/less/base.less).
* `assets/js`: This folder will contain your Javascript files. Your [base.js](https://github.com/sjlu/sunrise/blob/master/assets/js/base.js) will contain your `$(document).ready()` function. You'll need to declare your models in here, such as the [frontpage.js](https://github.com/sjlu/sunrise/blob/master/assets/js/frontpage.js) file.
* `index.html`: Anything requiring your HTML document goes here. You can create new HTML files in this root directory, but it is not recommended since the purpose is a "single-page" application. You'll also notice two commented lines here, these are the minified files. It is recommended that you comment/uncomment the appropriate lines when you're developing and running in a live environment.

### Running

Not done yet! You need to compile all your JS and LESS files together. You'll also need to run a simple server. By default, the server will run and listen to `http://localhost:8000`.

To start it up, all you need to do is run:

    grunt
    
Note that it'll fork a process in. Anytime you change a file, it'll automatically compile your JS and LESS files and snapshot it into the `public/` directory. You do not need to touch this directory ever.

## Notes

### Issues

If you need help using this, feel free to [submit an issue](https://github.com/sjlu/sunrise/issues/new). If you encounter something that's intuitive, please help revise this document.

### Credit

Much thanks to [@buzzedword](https://github.com/buzzedword) for inspiration on deployment and [Grunt](https://github.com/cowboy/grunt) and [@russfrank](https://github.com/russfrank) for the Javascript framework implementation.

### License

MIT.