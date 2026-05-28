# Lecture 3: Exceptions

## Exceptions

Exceptions are problems that occur while a program is running. Some mistakes are found before a program can even start, while others appear only after Python reaches a particular line.

A syntax error is an error in the structure of the code itself. For example, this line is missing a closing quotation mark:

```python
print("hello, world)
```

Python cannot understand that program, so it stops and reports a `SyntaxError`. A syntax error is usually fixed by checking spelling, punctuation, parentheses, quotes, and indentation.

Runtime errors are different. The code may be written with valid syntax, but a particular input or situation can still make the program fail while it is running.

## Runtime Errors

Consider a program that asks for an integer:

```python
x = int(input("What's x? "))
print(f"x is {x}")
```

This works if the user types something like `50`. It fails if the user types something like `cat`.

The problem is this part:

```python
int(input("What's x? "))
```

`input` always returns text. `int` can convert text such as `"50"` into the integer `50`, but it cannot convert `"cat"` into an integer. In that case, Python raises a `ValueError`.

Good programs are defensive. They do not assume every user will type exactly what the program expects. Instead, they handle likely errors and give the user a path forward.

## try

Python uses `try` and `except` for error handling.

The code inside `try` is the code that might fail. The code inside `except` is the recovery plan for a specific kind of failure.

```python
try:
    x = int(input("What's x? "))
    print(f"x is {x}")
except ValueError:
    print("x is not an integer")
```

If the user enters `50`, the conversion succeeds and Python prints `x is 50`.

If the user enters `cat`, the conversion raises a `ValueError`. Python skips the rest of the `try` block and runs the `except ValueError` block instead.

This keeps the program from crashing with a traceback. It also lets the programmer decide what message the user should see.

## Try Only the Risky Code

A good rule is to put only the risky line, or the smallest practical amount of risky code, inside `try`.

This version tries to convert the input, then prints after the `try`/`except`:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")

print(f"x is {x}")
```

This looks cleaner at first, but it introduces another problem.

If the user types `cat`, the conversion fails before `x` receives a value. The `except` block prints `x is not an integer`, but after that Python still reaches:

```python
print(f"x is {x}")
```

Since `x` was never assigned, Python raises a `NameError`.

That teaches an important lesson: handling one exception should not accidentally create a different one.

## else

An `else` block can be attached to `try`/`except`. It runs only if the `try` block succeeds.

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

This is better because the success path is separated from the recovery path:

- `try` attempts the integer conversion.
- `except ValueError` handles invalid integer input.
- `else` runs only when no `ValueError` happened.

If the user enters `50`, Python prints `x is 50`.

If the user enters `cat`, Python prints `x is not an integer` and does not try to print `x`.

## Asking Again with a Loop

Ending the program after one invalid answer is not always friendly. A better program can keep asking until the user gives valid input.

```python
while True:
    try:
        x = int(input("What's x? "))
    except ValueError:
        print("x is not an integer")
    else:
        break

print(f"x is {x}")
```

`while True` creates a loop that keeps running until something inside it stops the loop.

If the user types invalid input, the `except` block prints a message and the loop starts over.

If the user types a valid integer, the `else` block runs and `break` exits the loop. After the loop ends, Python safely prints `x`.

This pattern is common in programs that validate user input.

## Creating a Function to Get an Integer

If a program needs validated integer input in more than one place, the logic can be moved into a helper function.

```python
def main():
    x = get_int()
    print(f"x is {x}")


def get_int():
    while True:
        try:
            x = int(input("What's x? "))
        except ValueError:
            print("x is not an integer")
        else:
            break
    return x


main()
```

Now `main` is easy to read:

```python
x = get_int()
```

The details of asking, converting, catching errors, looping, and returning are hidden inside `get_int`.

The function can be improved by returning directly from the `else` block:

```python
def main():
    x = get_int()
    print(f"x is {x}")


def get_int():
    while True:
        try:
            x = int(input("What's x? "))
        except ValueError:
            print("x is not an integer")
        else:
            return x


main()
```

`return` leaves the function immediately and sends a value back to the caller. Because `return x` exits the function, there is no need for `break`.

The function can be shortened even more:

```python
def main():
    x = get_int()
    print(f"x is {x}")


def get_int():
    while True:
        try:
            return int(input("What's x? "))
        except ValueError:
            print("x is not an integer")


main()
```

Here, the function tries to convert input and immediately return it. If conversion fails, the `except` block runs and the loop asks again.

## pass

Sometimes you want to catch an exception but do nothing visible in response. Python's `pass` statement means "do nothing here."

```python
def main():
    x = get_int()
    print(f"x is {x}")


def get_int():
    while True:
        try:
            return int(input("What's x? "))
        except ValueError:
            pass


main()
```

With `pass`, invalid input is silently rejected. The program simply asks again.

This can be useful when the prompt itself is enough feedback, but it can also be confusing. In many beginner-friendly programs, printing a clear message is better because the user knows what went wrong.

## Passing in the Prompt

A reusable function should not always be hard-coded to ask `"What's x? "`. The prompt can be passed into the function as an argument.

```python
def main():
    x = get_int("What's x? ")
    print(f"x is {x}")


def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            pass


main()
```

Now `get_int` can be reused with different prompts:

```python
age = get_int("Age: ")
height = get_int("Height: ")
```

The function still handles the same problem, but the caller decides what text the user sees.

## Reading Error Messages

Python error messages are meant to help. They usually include:

- the type of error, such as `SyntaxError`, `ValueError`, or `NameError`
- the file and line where Python noticed the problem
- a short description of what went wrong

The exact line Python points to is where it discovered the issue. Sometimes the real mistake is slightly earlier, especially with missing quotes, parentheses, or indentation.

When debugging, first identify the exception type. Then look at the line number and ask what value or operation could have caused that exception.

## Reading Note for Screen Readers

When reading exception-handling code, listen for the shape of the blocks:

- `try` introduces the risky operation.
- `except` names the kind of error being handled.
- `else` is the success path.
- `break` exits a loop after valid input.
- `return` exits a function and sends back a value.
- `pass` means the block intentionally does nothing.

Indentation is essential. The indented lines under each keyword belong to that block.

## Summary

Exceptions help programs respond to problems without crashing unnecessarily.

In this lecture, you learned that:

- syntax errors are structural mistakes Python cannot run
- runtime errors occur while a valid program is running
- `ValueError` can happen when a value has the wrong form, such as converting `"cat"` with `int`
- `NameError` can happen when code tries to use a variable that was never assigned
- `try` contains code that might fail
- `except` handles a specific failure
- `else` runs only when the `try` block succeeds
- loops can keep asking for valid input
- helper functions can hide repeated validation logic
- `return` exits a function with a value
- `pass` is a deliberate "do nothing" statement

The central idea is defensive programming: assume that mistakes and unexpected input can happen, then write code that handles those cases clearly.
