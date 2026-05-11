# Exceptions

## Main idea

An exception is an error that happens while a program is running. Good Python programs do not ignore these problems. Instead, they handle them in a controlled way.

## Runtime errors

Some mistakes are caught only when the program runs.

Examples:

- trying to turn non-numeric text into an integer
- dividing by zero
- asking for something that does not exist

## try and except

Python lets you attempt risky code inside a `try` block.

Code example:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
```

What this does:

- Python tries to convert the input to an integer
- if conversion fails, a `ValueError` is caught
- the program prints a helpful message instead of crashing badly

## else

An `else` block can run only when the `try` block succeeds.

Code example:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

## Looping until success

Lecture 3 shows how to keep asking for valid input until the user gives one.

This creates better user experience than quitting after a single mistake.

## Writing helper functions

You can move input validation into your own function, such as `get_int()`, so the same safe logic can be reused.

## pass

`pass` is a placeholder that tells Python to do nothing on that line. It is sometimes used while planning or when a block is required syntactically.

## Reading note for screen readers

When you hear `try`, think:

1. this is the risky code
2. the `except` block is the recovery plan
3. the `else` block is the success path

## Summary

Exceptions help programs stay robust. Instead of assuming users or data are always correct, Python code can detect errors, respond clearly, and keep going when appropriate.
