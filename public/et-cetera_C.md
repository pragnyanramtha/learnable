# Et Cetera

## Main idea

Et Cetera is the mixed toolkit unit. It now collects File I/O, regular expressions, and several practical Python features that help programs store data, clean text, accept command-line input, and express transformations clearly.

These ideas are not one single feature. They are the support skills that turn small Python scripts into useful tools.

## File I/O

File I/O means file input and output:

- input: reading data from a file
- output: writing data to a file

Values stored only in variables disappear when the program ends. Values written to a file can be used again later.

## Writing to a text file

Code example:

```python
name = input("Name: ").strip()

with open("names.txt", "a", encoding="utf-8") as file:
    file.write(f"{name}\n")
```

What this does:

- `open(...)` opens a file
- `"a"` means append, so new text is added to the end
- `encoding="utf-8"` makes text handling more predictable
- `\n` starts a new line after the name
- `with` closes the file automatically when the block is done

Common file modes:

- `"r"` means read
- `"w"` means write and replace the old contents
- `"a"` means append to the end

Use `"w"` carefully because it can overwrite a file.

## Reading from a text file

Code example:

```python
with open("names.txt", "r", encoding="utf-8") as file:
    for line in file:
        name = line.rstrip()
        print(f"hello, {name}")
```

`rstrip()` removes the newline at the end of each line. Without it, printed output may contain extra blank lines.

## CSV files

CSV means comma-separated values. CSV files are common when data is arranged in rows and columns, like a spreadsheet.

Instead of splitting each line by commas by hand, Python's `csv` module handles common CSV details more safely.

Code example:

```python
import csv

with open("students.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], row["house"])
```

If the CSV has headings like `name,house`, `DictReader` lets each row behave like a dictionary.

## Regular expressions

Regular expressions, often called regex, describe patterns in text. They are useful for:

- checking whether input has the right shape
- finding text inside a larger string
- extracting a useful part of a string

Python uses the `re` module for regex.

Code example:

```python
import re

email = input("Email: ").strip()

if re.search(r"^[^@]+@[^@]+\.[^@]+$", email):
    print("Valid")
else:
    print("Invalid")
```

Important pieces:

- `r"..."` creates a raw string, which makes regex backslashes easier to write
- `^` matches the start of the string
- `$` matches the end of the string
- `.` normally means any character, so `\.` means a literal dot
- `+` means one or more of the previous pattern

This pattern is still simple. Real email validation can become much more complicated, so use the right level of strictness for the task.

## Cleaning input before matching

Regex works best when the input is cleaned first.

Useful cleanup steps:

- `strip()` removes surrounding spaces
- `lower()` makes case-insensitive comparisons easier
- consistent formatting reduces surprise

Code example:

```python
username = input("Username: ").strip().lower()

if re.search(r"^[a-z0-9_]{3,16}$", username):
    print("Valid username")
else:
    print("Use 3 to 16 letters, numbers, or underscores")
```

Here, `{3,16}` means from 3 through 16 characters.

## Capturing values with regex

Regex can also pull out a useful part of a string.

Code example:

```python
import re

profile = "github.com/octocat"
match = re.search(r"github\.com/([A-Za-z0-9_-]+)", profile)

if match:
    username = match.group(1)
    print(username)
```

Parentheses create a capture group. `group(1)` returns the first captured value.

## Sets

A set stores unique values. It is useful when duplicates should be removed or membership should be checked quickly.

Code example:

```python
names = ["Ada", "Grace", "Ada", "Linus"]
unique_names = set(names)

print(unique_names)
```

Sets do not preserve every duplicate. If the number of repeated values matters, use a list or dictionary instead.

## Global variables and constants

- A global variable is available outside a single function.
- A constant is a value that should not change by convention, often written in uppercase.

Use both carefully. Overusing globals can make programs harder to reason about.

Code example:

```python
MAX_ATTEMPTS = 3

def can_try_again(attempts: int) -> bool:
    return attempts < MAX_ATTEMPTS
```

Python does not force constants to stay unchanged. Uppercase names are a convention that tells other programmers, "do not change this value."

## Type hints and docstrings

Type hints describe expected input and output types.

Code example:

```python
def greet(name: str) -> str:
    """Return a greeting for one person."""
    return f"hello, {name}"
```

Why this helps:

- the type hint shows that `name` should be a string
- the return hint shows that the function should return a string
- the docstring explains the purpose in human language

Type hints usually do not change how Python runs the program. They mainly help people, editors, and checking tools understand the code.

## argparse

`argparse` helps programs accept structured command-line arguments. This is useful when a script should run from the terminal without asking interactive questions every time.

Code example:

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("name")
parser.add_argument("--shout", action="store_true")
args = parser.parse_args()

message = f"hello, {args.name}"

if args.shout:
    message = message.upper()

print(message)
```

Example terminal use:

```bash
python greet.py Ada --shout
```

## Unpacking, args, and kwargs

- unpacking spreads values out of a collection
- `*args` collects extra positional arguments
- `**kwargs` collects extra keyword arguments

Code example:

```python
def total(*numbers: int) -> int:
    return sum(numbers)

print(total(2, 4, 6))
```

`*numbers` collects all the extra positional arguments into a tuple.

Code example:

```python
def describe_person(**details: str) -> None:
    for key, value in details.items():
        print(key, value)

describe_person(name="Ada", role="programmer")
```

`**details` collects keyword arguments into a dictionary.

## Functional-style helpers

Lecture 9 also introduces tools such as:

- `map`
- `filter`
- list comprehensions
- dictionary comprehensions
- `enumerate`

These can express transformations and filtering compactly.

Code example:

```python
scores = [40, 82, 91, 55]
passing = [score for score in scores if score >= 60]
```

This list comprehension creates a new list containing only passing scores.

Code example:

```python
names = ["Ada", "Grace", "Linus"]

for index, name in enumerate(names, start=1):
    print(index, name)
```

`enumerate` gives both a position and a value while looping.

## Generators and iterators

Generators produce values one at a time instead of building everything at once. This can save memory and make pipelines more efficient.

Code example:

```python
def count_up_to(limit: int):
    number = 1
    while number <= limit:
        yield number
        number += 1

for value in count_up_to(3):
    print(value)
```

`yield` pauses the function and gives back one value. The next loop step continues from where the generator paused.

## Reading note for screen readers

For file paths, regex, and advanced syntax:

- listen for the goal of the example first
- then break the symbols into short pieces
- connect mode letters like `"r"`, `"w"`, and `"a"` to file behavior
- connect regex symbols like `^`, `$`, `+`, and `{3,16}` to their meanings
- connect `*` and `**` to how arguments are collected or unpacked

## Summary

Et Cetera expands your Python toolbox. File I/O lets programs remember data. Regex helps programs recognize text patterns. Sets, constants, type hints, command-line arguments, comprehensions, and generators make programs clearer, more flexible, and more efficient.
