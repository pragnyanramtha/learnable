# Libraries

## Main idea

Libraries are collections of code that you can reuse. Python comes with many standard modules, and you can also install packages created by others.

## Importing modules

To use a library, you usually import it first.

Code example:

```python
import random

print(random.randint(1, 10))
```

What this does:

- `import random` loads the module
- `randint(1, 10)` returns a random integer in that range

## Useful standard modules

Lecture 4 introduces modules such as:

- `random` for random choices and numbers
- `statistics` for values like averages
- `sys` for command-line arguments

## Command-line arguments

Programs can read extra information placed after the file name in the terminal.

Code example:

```python
import sys

if len(sys.argv) < 2:
    print("Too few arguments")
else:
    print("hello,", sys.argv[1])
```

## Slices

Slicing lets you take part of a sequence, such as part of a list or string.

## Packages

Packages are installable collections of Python code. They often solve bigger tasks than the standard library alone.

## APIs

An API lets one program talk to another service. Lecture 4 introduces the idea that Python can request data from outside sources and then use that data in your own code.

## Making your own libraries

You can write functions in one file and import them into another file. This helps you organize code and avoid repetition.

## Reading note for screen readers

When a code sample uses dots, such as `random.randint`, read it as:

- module name first
- then function name inside that module

## Summary

Libraries make Python more powerful. They save time, encourage reuse, and let you build on tested code instead of reinventing everything yourself.
