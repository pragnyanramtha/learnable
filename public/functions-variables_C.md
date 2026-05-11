# Functions and Variables

## Main idea

Python programs are made of instructions. Some instructions call **functions**, which are actions Python already knows how to perform. Other instructions create **variables**, which store values so your program can reuse them later.

## Functions

A function is something you ask Python to do.

- `print()` sends text to the screen.
- `input()` asks the user for information.
- Functions can receive **arguments**, which are values placed inside the parentheses.

Code example:

```python
print("hello, world")
```

What this does:

- `print` is the function.
- `"hello, world"` is the argument.
- The result is text shown on the screen.

## Bugs

Bugs are mistakes in your code. They are a natural part of programming. When Python encounters a bug, it shows an error message in the terminal. For example, forgetting the closing parenthesis in `print("hello, world"` will cause a syntax error. The error message tells you what went wrong and approximately where.

## Variables

A variable stores a value so that your program can use it again later.

Code example:

```python
name = input("What's your name? ")
print("hello,")
print(name)
```

What to notice:

- `input()` returns what the user types.
- The `=` sign means **assignment**, not mathematical equality.
- `name` becomes a label for the user's answer.
- Using two `print()` calls puts the output on separate lines because `print` automatically adds a newline.

You can combine output on one line by passing multiple arguments or concatenating strings:

```python
# Using a comma to pass multiple arguments
name = input("What's your name? ")
print("hello,", name)
```

```python
# Using + to concatenate strings
name = input("What's your name? ")
print("hello, " + name)
```

## Strings

A string is text. In Python, text is usually written inside quotation marks.

- `"hello"` is a string.
- Names, messages, and prompts are often strings.

### A small problem with quotation marks

Adding quotation marks inside a string causes a problem:

```python
print("hello,"friend"")   # This will cause an error
```

Fix it by using single quotes around the string or by escaping the inner quotes with backslashes:

```python
print('hello,"friend"')
print("hello,\"friend\"")
```

## Formatting Strings (f-strings)

The most elegant way to combine strings with variables is an f-string:

```python
name = input("What's your name? ")
print(f"hello, {name}")
```

The `f` before the opening quote tells Python to treat the string as a formatted string. Any text inside `{}` is evaluated as a Python expression and inserted into the string. You will use f-strings frequently throughout this course.

## More on Strings

You should never expect your user to cooperate perfectly. Python provides built-in methods to clean up and format user input.

### Removing whitespace with `strip()`

```python
name = input("What's your name? ")
name = name.strip()
print(f"hello, {name}")
```

`strip()` removes any spaces, tabs, or newlines from the beginning and end of the string.

### Capitalizing with `title()`

```python
name = input("What's your name? ")
name = name.strip()
name = name.title()
print(f"hello, {name}")
```

`title()` capitalizes the first letter of every word.

### Chaining methods

Since `strip()` returns a string and `title()` operates on a string, you can chain them:

```python
name = input("What's your name? ").strip().title()
print(f"hello, {name}")
```

This is concise and readable. The `input()` result is first stripped of whitespace, then title-cased, then stored in `name`.

## Printing with `end` parameter

The `print` function automatically adds a newline at the end (`end='\n'`). You can override this:

```python
name = input("What's your name? ")
print("hello,", end="")
print(name)
```

By setting `end=""`, the first `print` does not create a new line, so the output appears as `hello, David` on a single line.

## Integers or int

An integer (`int`) is a whole number. You can perform arithmetic with integers.

```python
x = 1
y = 2
z = x + y
print(z)
```

### Converting input to int

`input()` always returns a string. To do math, convert the result to an integer:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))
print(x + y)
```

This is called **casting** — temporarily changing a value from one type to another.

## Float Basics

A float is a number with a decimal point.

```python
x = float(input("What's x? "))
y = float(input("What's y? "))
print(x + y)
```

### Rounding with `round()`

```python
x = float(input("What's x? "))
y = float(input("What's y? "))
z = round(x + y)
print(z)
```

`round(number, ndigits)` rounds to the nearest integer by default, or to a specified number of decimal places:

```python
z = round(x / y, 2)
```

### Formatting numbers with f-strings

Use f-string formatting to add commas or control decimal places:

```python
# Add commas to large numbers
x = float(input("What's x? "))
y = float(input("What's y? "))
z = round(x + y)
print(f"{z:,}")
```

```python
# Round to 2 decimal places
x = float(input("What's x? "))
y = float(input("What's y? "))
z = x / y
print(f"{z:.2f}")
```

The `:,` adds comma separators. The `:.2f` rounds the float to exactly two decimal places.

## Creating Your Own Functions with `def`

You can define your own functions using `def`.

```python
def hello(to):
    print("hello,", to)

name = input("What's your name? ")
hello(name)
```

- `def` tells Python you are defining a function.
- `hello` is the function name.
- `to` is a **parameter** — a variable that receives the argument passed to the function.
- Everything indented below `def` is the function body.

### Default parameter values

You can provide a default value for a parameter:

```python
def hello(to="world"):
    print("hello,", to)

hello()          # Prints "hello, world"
hello("David")   # Prints "hello, David"
```

### Using a `main()` function

It is common practice to define a `main()` function that holds the main logic of your program:

```python
def main():
    name = input("What's your name? ")
    hello(name)
    hello()

def hello(to="world"):
    print("hello,", to)

main()
```

If you do not call `main()` at the bottom, nothing will run. The `main()` function is a convention that keeps your code organized.

## Returning Values

Functions can send a value back to the caller using `return`:

```python
def main():
    x = int(input("What's x? "))
    print("x squared is", square(x))

def square(n):
    return n * n

main()
```

Here, `square(n)` calculates `n * n` and returns the result. The `main()` function receives that returned value and prints it.

## Helpful habits

- Use comments to describe what a section of code is doing.
- Write pseudocode before writing full code when a task feels confusing.
- Keep code readable. Clear variable names are better than short confusing ones.
- Use f-strings instead of concatenation for cleaner output.

Code example with comments:

```python
# Ask the user for a name
name = input("What's your name? ")

# Greet the user
print(f"hello, {name}")
```

## Reading note for screen readers

When you hear a code block:

- listen for assignment statements like `name = ...`
- listen for function names followed by parentheses
- listen for the `f` before a string — that means it is a formatted string
- pause after each line and connect it to the explanation below the block

## Summary

Lecture 0 builds the foundation of Python:

- functions perform actions
- variables store values
- strings represent text
- comments explain intent
- f-strings combine text and variables cleanly
- string methods like `strip()` and `title()` clean up input
- `int` and `float` are number types
- `def` creates your own functions
- `return` sends values back from a function
- readable code makes everything easier to understand and maintain
