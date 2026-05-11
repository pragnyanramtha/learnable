# Conditionals

## Main idea

Conditionals let a program make decisions. A program can check whether something is true and then choose what to do next.

## if Statements

The most basic decision tool is `if`. It evaluates a condition and, if the condition is `True`, runs the indented block below it.

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
```

- The condition `x < y` produces a **Boolean** value: either `True` or `False`.
- If `True`, the indented `print` runs.
- If `False`, Python skips the indented block.

## elif and else

A program often needs to handle multiple outcomes. You can chain `if`, `elif`, and `else`:

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

How this works:

- `if` checks the first condition.
- `elif` (short for "else if") checks another condition only if all previous conditions were false.
- `else` runs when no earlier condition matched — it is a catch-all default.
- Only one branch ever runs, even if multiple conditions are true, because `elif` and `else` are only evaluated when earlier conditions were false.

Without `elif`, every `if` runs independently, which is less efficient:

```python
# Inefficient — all three ifs always run
if x < y:
    print("x is less than y")
if x > y:
    print("x is greater than y")
if x == y:
    print("x is equal to y")
```

Using `elif` and `else` reduces the number of comparisons your program makes.

## Comparison operators

Conditionals compare values using operators:

| Operator | Meaning |
|----------|---------|
| `<` | less than |
| `>` | greater than |
| `==` | equal to |
| `!=` | not equal to |
| `<=` | less than or equal to |
| `>=` | greater than or equal to |

Note: `==` compares values, while `=` assigns values. Using a single `=` inside a condition causes an error.

## Using `or`

`or` lets you check if at least one of multiple conditions is true:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y or x > y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

This can be simplified further using `!=`:

```python
if x != y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

## Using `and`

`and` requires all conditions to be true. A common use case is grading:

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

### Chaining comparisons

Python allows you to chain comparison operators, which is cleaner than using `and`:

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

### Simplifying with fewer conditions

Since the `elif` chain stops at the first match, you can rely on order and write fewer conditions:

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

If `score` is 95, the first condition `score >= 90` matches, so none of the `elif` branches run. This is the most readable and maintainable version.

## Modulo

The modulo operator `%` gives the remainder after division.

- `4 % 2` equals `0` because 4 divides evenly by 2.
- `5 % 2` equals `1` because 5 divided by 2 leaves remainder 1.

This is useful for checking parity (even or odd):

```python
x = int(input("What's x? "))

if x % 2 == 0:
    print("Even")
else:
    print("Odd")
```

## Creating Your Own Parity Function

You can move decision logic into a reusable function:

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

`is_even(x)` returns `True` or `False`, and the `if` statement in `main()` uses that Boolean directly.

### Pythonic patterns

Python offers shorter ways to write the same logic.

**Ternary expression:**

```python
def is_even(n):
    return True if n % 2 == 0 else False
```

**Direct Boolean evaluation (most Pythonic):**

```python
def is_even(n):
    return n % 2 == 0
```

Since `n % 2 == 0` is already a Boolean expression, you can return it directly. This is the cleanest and most idiomatic version.

## match

`match` is an alternative to long `if`/`elif` chains when you are comparing one value against multiple known cases.

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

- The value after `match` is compared to each `case`.
- The `case _` (underscore) is a wildcard that matches anything, like `else`.
- When a match is found, Python executes the indented code below that `case` and stops.

### Combining cases with `|`

You can combine multiple values in one `case` using the vertical bar `|`:

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

This makes the code shorter and still very readable.

## Reading note for screen readers

When reading a conditional:

- listen for the condition after `if`
- notice the colon at the end of the line
- treat the indented block below it as the action taken when the condition is true
- `elif` means "else if" — another condition to check
- `else` is the default when nothing else matched

## Summary

Conditionals help Python programs respond to input and make decisions. They are the foundation for interactive behavior, validation, and control flow.

- `if`, `elif`, and `else` build decision chains
- `or` and `and` combine conditions
- comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) compare values
- modulo (`%`) checks remainders
- functions can encapsulate decision logic
- `match` handles multi-way branching cleanly
- Pythonic patterns make code shorter and more readable
