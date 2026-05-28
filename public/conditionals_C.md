# Lecture 1: Conditionals

Source: [CS50's Introduction to Programming with Python, Lecture 1 Notes](https://cs50.harvard.edu/python/notes/1/)

## Conditionals

Conditionals let a program ask questions and choose what to do next. Instead of always running the same instructions in the same order, a program can take one path when a condition is true and another path when it is false.

Python includes comparison operators for asking mathematical or logical questions:

| Operator | Meaning |
| --- | --- |
| `>` | greater than |
| `<` | less than |
| `>=` | greater than or equal to |
| `<=` | less than or equal to |
| `==` | equal to |
| `!=` | not equal to |

A conditional expression compares a value on the left with a value on the right. The result is a Boolean value: either `True` or `False`.

The double equal sign matters. In Python, `=` assigns a value to a variable, while `==` compares two values.

## if Statements

An `if` statement runs an indented block of code only when its condition is true. In the lecture, CS50 starts with a file named `compare.py`:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
```

Here is the flow of the program:

- `input` asks the user for `x` and `y`.
- `int` converts each input from text into an integer.
- `x < y` asks whether `x` is less than `y`.
- If that comparison is `True`, Python runs the indented `print`.
- If that comparison is `False`, Python skips the indented `print`.

The colon after `if x < y` introduces a block. The indentation under it tells Python which code belongs to that `if`.

## Control Flow, elif, and else

Control flow is the order in which a program's instructions are evaluated. With conditionals, control flow depends on which questions evaluate to true.

One way to compare `x` and `y` is to ask three independent questions:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
if x > y:
    print("x is greater than y")
if x == y:
    print("x is equal to y")
```

This works, but Python still checks every `if` statement. After it checks whether `x < y`, it continues and checks whether `x > y`, then continues again and checks whether `x == y`.

Those three conditions cannot all be true at once, so the program can be improved with `elif`, short for "else if":

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
elif x == y:
    print("x is equal to y")
```

In this version, Python stops once it finds a true branch:

- First, Python evaluates `x < y`.
- If `x < y` is true, Python prints the first message and skips the `elif` branches.
- If `x < y` is false, Python evaluates `x > y`.
- If `x > y` is true, Python prints the second message and skips the final `elif`.
- If both earlier conditions are false, Python evaluates `x == y`.

This is already better because the program asks fewer questions. But the final condition can be simplified even more. If `x` is not less than `y`, and `x` is not greater than `y`, then `x` must be equal to `y`. That means the last branch can be a catch-all `else`:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
```

`else` does not need a condition. It runs only when none of the earlier conditions in the same chain were true.

The `if` / `elif` / `else` pattern is useful when you want exactly one branch to run.

## or

The keyword `or` combines conditions. A condition using `or` is true when at least one side is true.

CS50 next changes the comparison program so it asks whether `x` is less than `y` or greater than `y`:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y or x > y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

This program now has two outcomes:

- If `x < y` is true, then `x` is not equal to `y`.
- If `x > y` is true, then `x` is not equal to `y`.
- If neither is true, `x` must be equal to `y`.

The same idea can be expressed more directly with `!=`, which means "not equal to":

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x != y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

This asks one clear question: is `x` different from `y`?

For illustration, the same program can also be written by asking whether the two values are equal:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x == y:
    print("x is equal to y")
else:
    print("x is not equal to y")
```

This version is just as valid. It emphasizes the equality comparison instead of the inequality comparison.

## and

The keyword `and` also combines conditions, but it is stricter than `or`. A condition using `and` is true only when both sides are true.

CS50 introduces `and` with a grading example in `grade.py`:

```python
score = int(input("Score: "))

if score >= 90 and score <= 100:
    print("Grade: A")
elif score >= 80 and score < 90:
    print("Grade: B")
elif score >= 70 and score < 80:
    print("Grade: C")
elif score >= 60 and score < 70:
    print("Grade: D")
else:
    print("Grade: F")
```

This code checks whether the score falls inside a range:

- An A requires `score >= 90` and `score <= 100`.
- A B requires `score >= 80` and `score < 90`.
- A C requires `score >= 70` and `score < 80`.
- A D requires `score >= 60` and `score < 70`.
- Anything else becomes an F.

Python allows chained comparisons, which can make ranges easier to read:

```python
score = int(input("Score: "))

if 90 <= score <= 100:
    print("Grade: A")
elif 80 <= score < 90:
    print("Grade: B")
elif 70 <= score < 80:
    print("Grade: C")
elif 60 <= score < 70:
    print("Grade: D")
else:
    print("Grade: F")
```

The condition `90 <= score <= 100` means the score must be at least `90` and at most `100`.

The program can be simplified again by relying on the order of the `elif` chain:

```python
score = int(input("Score: "))

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

This works because Python stops at the first true condition. If `score` is `95`, the first branch handles it. If `score` is `85`, the first branch is false, but the second branch is true. By the time Python reaches `elif score >= 80`, it already knows the score is less than `90`.

The final version is shorter, easier to maintain, and asks fewer questions.

## Modulo

Parity means whether a number is even or odd.

The modulo operator, `%`, gives the remainder after division. It is especially useful when checking whether one number divides evenly into another:

- `4 % 2` is `0`, because `4` divides evenly by `2`.
- `3 % 2` is `1`, because dividing `3` by `2` leaves a remainder.

CS50 uses this idea in `parity.py`:

```python
x = int(input("What's x? "))

if x % 2 == 0:
    print("Even")
else:
    print("Odd")
```

If `x % 2 == 0`, then `x` is even. Otherwise, `x` is odd.

## Creating Our Own Parity Function

As programs grow, it is useful to move repeated or meaningful logic into functions. CS50 rewrites the parity example with a helper function named `is_even`:

```python
def main():
    x = int(input("What's x? "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")


def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False


main()
```

The important line is:

```python
if is_even(x):
    print("Even")
```

There is no comparison operator in that `if` statement because `is_even(x)` already returns a Boolean value. If `is_even(x)` returns `True`, the program prints `Even`. If it returns `False`, the program moves to `else` and prints `Odd`.

In the helper function:

```python
def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False
```

`return` sends a value back to the place where the function was called. Here, `is_even` returns `True` when the number is even and `False` otherwise.

## Pythonic

"Pythonic" code uses patterns and idioms that fit Python's style. CS50 shows that `is_even` can be shortened while preserving the same behavior.

First, the function can use a conditional expression:

```python
def main():
    x = int(input("What's x? "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")


def is_even(n):
    return True if n % 2 == 0 else False


main()
```

The line:

```python
return True if n % 2 == 0 else False
```

reads like a compact sentence: return `True` if the number is divisible by `2`, otherwise return `False`.

But the expression `n % 2 == 0` already evaluates to either `True` or `False`. That means the function can be simplified further:

```python
def main():
    x = int(input("What's x? "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")


def is_even(n):
    return n % 2 == 0


main()
```

This is the most direct version. Instead of manually returning `True` or `False`, it returns the result of the Boolean expression itself.

## match

`match` is another way to conditionally run code. It is useful when one value needs to be compared against several possible cases.

CS50 introduces the idea with a Hogwarts house example. First, it can be written with `if`, `elif`, and `else`:

```python
name = input("What's your name? ")

if name == "Harry":
    print("Gryffindor")
elif name == "Hermione":
    print("Gryffindor")
elif name == "Ron":
    print("Gryffindor")
elif name == "Draco":
    print("Slytherin")
else:
    print("Who?")
```

The first three branches all print the same house. That duplication can be reduced with `or`:

```python
name = input("What's your name? ")

if name == "Harry" or name == "Hermione" or name == "Ron":
    print("Gryffindor")
elif name == "Draco":
    print("Slytherin")
else:
    print("Who?")
```

The same mapping can be written with `match`:

```python
name = input("What's your name? ")

match name:
    case "Harry":
        print("Gryffindor")
    case "Hermione":
        print("Gryffindor")
    case "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
```

In a `match` statement:

- `match name` chooses the value being inspected.
- Each `case` lists a possible value.
- Python runs the code under the first matching case.
- `case _` is a wildcard. It behaves like a default branch, similar to `else`.

Because Harry, Hermione, and Ron all have the same result, the matching cases can be combined with `|`:

```python
name = input("What's your name? ")

match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
```

The vertical bar `|` in a `case` pattern means "or" for matching values.

## Summing Up

In this lecture, conditionals gave Python programs the ability to ask questions and respond differently depending on the answers.

You learned about:

- conditionals and Boolean expressions
- comparison operators such as `<`, `>`, `==`, and `!=`
- `if` statements
- control flow with `elif` and `else`
- combining conditions with `or`
- combining conditions with `and`
- using `%` modulo to check remainders
- using modulo to determine parity
- creating an `is_even` function
- simplifying code in a Pythonic style
- using `match`, `case`, `_`, and `|` for multi-way branching

The central idea is that a program can choose among different paths. Once you can combine comparisons, Boolean logic, functions, and clean control flow, you can write programs that react to many different inputs.
