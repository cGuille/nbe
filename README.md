Node Browser Engine
===================

This is a toy software created with the awesome tutorial "[Let's build a browser engine!](http://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html)" from [Matt Brubeck](http://limpet.net/mbrubeck/).

# Installation

Just get the sources, open a terminal, `cd` to the project's directory and run `npm install` to install the dependencies (currently, only lodash is required).

# The code

The main part of the code lives under the `lib` folder. It contains two subfolders:
- dom → the prototypes representing the Document Object Model;
- parser → the prototypes used to parse source code.

Currently, the dom lib is pretty basic and the parser lib only contains an HTML parser that can create and print a DOM hierarchy from a file containing a subset of the HTML language.

The `bin/showtree` script takes an HTML file path as parameter, uses the HTML parser to create a DOM document and then prints it to the standard output.

# Fixtures

The fixtures folder contains some sample HTML files that you can try to parse. For example, you could try to run:

```bash
bin/showtree fixtures/tutorial-sample.html
bin/showtree fixtures/tutorial-sample-with-eol.html
```
