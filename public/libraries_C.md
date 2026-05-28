# Lecture 4: Libraries

## Libraries

Libraries are reusable pieces of code. Some are written by Python's developers, some are written by other programmers, and some can be written by you.

A Python file can use a library by importing it. Importing lets your program use functions, classes, and values that are defined somewhere else.

This matters because programmers should not have to solve every problem from scratch. If a reliable tool already exists, you can import it and focus on the part of the problem that is unique to your program.

Python organizes reusable code in modules and packages:

- A module is usually one Python file.
- A package is a collection of modules.
- A library is a general word for reusable code that can be imported and used.

## Random

The `random` module is part of Python's standard library. It helps programs make random choices or generate random values.

To use it, import the module:

```python
import random

coin = random.choice(["heads", "tails"])
print(coin)
```

`random.choice` chooses one item from a sequence. In this example, the sequence is a list containing `"heads"` and `"tails"`.

The dot in `random.choice` means:

- `random` is the module
- `choice` is a function inside that module

The program can also import just the function it needs:

```python
from random import choice

coin = choice(["heads", "tails"])
print(coin)
```

With `from random import choice`, the program can call `choice(...)` directly instead of `random.choice(...)`.

Both styles are valid. Importing the whole module can make it clearer where a function came from. Importing one function can make code shorter when only that function is needed.

### randint

`random.randint(a, b)` returns a random integer from `a` through `b`, including both endpoints.

```python
import random

number = random.randint(1, 10)
print(number)
```

This prints a random integer between `1` and `10`.

### shuffle

`random.shuffle` changes a list into a random order.

```python
import random

cards = ["jack", "queen", "king"]
random.shuffle(cards)

for card in cards:
    print(card)
```

`shuffle` works in place. That means it changes the existing `cards` list instead of returning a new list.

This is why the code does not write:

```python
cards = random.shuffle(cards)
```

That would be a mistake, because `shuffle` does not return the shuffled list. It modifies the list directly.

## Statistics

Python's standard library also includes `statistics`, a module for common statistical calculations.

For example, `statistics.mean` calculates an average:

```python
import statistics

average = statistics.mean([100, 90])
print(average)
```

The list `[100, 90]` contains two numbers. Their mean is `95`, so the program prints:

```python
95
```

Libraries can hide complicated logic behind simple function names. You do not need to manually add the numbers and divide by the count every time. You can call a tested function instead.

## Command-Line Arguments

Command-line arguments are extra words typed after a program name in the terminal.

For example:

```bash
python name.py David
```

Here, `David` is a command-line argument.

Python stores command-line arguments in `sys.argv`, which comes from the `sys` module.

```python
import sys

print("hello, my name is", sys.argv[1])
```

If this file is named `name.py`, then running:

```bash
python name.py David
```

prints:

```python
hello, my name is David
```

`sys.argv` is a list:

- `sys.argv[0]` is the name of the program file
- `sys.argv[1]` is the first argument after the file name
- `sys.argv[2]` is the second argument after the file name

Because `sys.argv` is a list, indexing can fail if the user does not provide enough arguments.

## Checking Arguments

This code can fail:

```python
import sys

print("hello, my name is", sys.argv[1])
```

If the user runs only:

```bash
python name.py
```

there is no `sys.argv[1]`, so Python raises an `IndexError`.

A safer program checks the length of `sys.argv` first:

```python
import sys

if len(sys.argv) < 2:
    print("Too few arguments")
elif len(sys.argv) > 2:
    print("Too many arguments")
else:
    print("hello, my name is", sys.argv[1])
```

`len(sys.argv)` tells the program how many command-line items were supplied.

This version gives a clear message for too few or too many arguments, and it only uses `sys.argv[1]` when exactly one name was provided.

## sys.exit

Programs can use `sys.exit` to stop early when something is wrong.

```python
import sys

if len(sys.argv) < 2:
    sys.exit("Too few arguments")
elif len(sys.argv) > 2:
    sys.exit("Too many arguments")

print("hello, my name is", sys.argv[1])
```

`sys.exit` prints the message and exits the program. If the program reaches the final `print`, it means the argument count was acceptable.

This can make the main success path easier to read because error cases are handled and stopped early.

## slice

A slice gets part of a sequence, such as a list or string.

Suppose the user enters several names:

```bash
python name.py Hermione Harry Ron
```

`sys.argv` would contain:

```python
["name.py", "Hermione", "Harry", "Ron"]
```

If you want all names except the program name, use a slice:

```python
import sys

for arg in sys.argv[1:]:
    print("hello, my name is", arg)
```

`sys.argv[1:]` means "start at index `1` and continue through the end."

Other slice patterns include:

```python
values = ["a", "b", "c", "d"]

print(values[1:3])
print(values[:2])
print(values[2:])
```

These produce:

```python
["b", "c"]
["a", "b"]
["c", "d"]
```

Slices use a start index and an end index. The start is included, but the end is not.

## Packages

Some libraries are not included with Python by default. Third-party packages can be installed from the Python Package Index, often called PyPI.

Python's package installer is called `pip`.

For example, the `cowsay` package can be installed with:

```bash
pip install cowsay
```

After installing it, a program can import and use it:

```python
import cowsay
import sys

if len(sys.argv) == 2:
    cowsay.cow("hello, " + sys.argv[1])
```

Running:

```bash
python say.py David
```

prints a cow-shaped speech bubble in the terminal.

Third-party packages can be powerful, but they are also dependencies. A program that imports a package needs that package installed in the environment where the program runs.

## APIs

An API, or application programming interface, is a way for one program to interact with another program or service.

On the web, APIs often return data. A program can make an HTTP request, receive structured data, and then use that data.

The `requests` package is commonly used to make web requests:

```python
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=1&term=" + sys.argv[1]
)
print(response.json())
```

This program:

- imports `requests` for web access
- imports `sys` for command-line arguments
- exits unless the user provides one search term
- asks the iTunes API for one song result
- converts the response from JSON into Python data with `response.json()`

The returned data can be large and hard to read when printed all at once.

## JSON

JSON is a text-based data format used for exchanging data between programs. It looks a lot like Python dictionaries and lists, though it is not exactly the same thing.

Python includes a `json` module that can format JSON-like data more readably:

```python
import json
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=1&term=" + sys.argv[1]
)
print(json.dumps(response.json(), indent=2))
```

`json.dumps(..., indent=2)` turns Python data into a formatted JSON string with indentation.

Once the data is converted into Python dictionaries and lists, you can access the parts you need.

```python
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=50&term=" + sys.argv[1]
)

data = response.json()

for result in data["results"]:
    print(result["trackName"])
```

Here, `data["results"]` accesses the list of result dictionaries, and each `result["trackName"]` accesses one song title.

## Making Your Own Libraries

You can create your own module by writing functions in one Python file and importing them into another.

For example, create a file named `sayings.py`:

```python
def hello(name):
    print(f"hello, {name}")


def goodbye(name):
    print(f"goodbye, {name}")
```

This file defines reusable functions. By itself, it does not need to prompt the user or run a full program.

Another file can import from it:

```python
import sys
from sayings import goodbye

if len(sys.argv) == 2:
    goodbye(sys.argv[1])
```

If this file is named `say.py`, running:

```bash
python say.py David
```

prints:

```python
goodbye, David
```

This keeps related functions in one place and lets other programs reuse them.

## Import Style

There are two common import styles:

```python
import random
```

and:

```python
from random import choice
```

With the first style, you call:

```python
random.choice(["heads", "tails"])
```

With the second style, you call:

```python
choice(["heads", "tails"])
```

The first style makes the module name visible, which can improve clarity. The second style can be convenient when importing a small number of specific names.

## Reading Note for Screen Readers

When reading code that uses libraries:

- read `random.choice` as "the `choice` function inside the `random` module"
- listen for `import` lines near the top of the file
- remember that `sys.argv` is a list of command-line words
- treat slices like `sys.argv[1:]` as "from index 1 through the end"
- recognize that JSON data often contains nested dictionaries and lists

## Summary

Libraries let Python programs grow by reusing code.

In this lecture, you learned that:

- modules and packages organize reusable code
- `import` loads a module
- `from ... import ...` loads a specific name from a module
- `random.choice` picks an item from a sequence
- `random.randint` chooses an integer in a range
- `random.shuffle` rearranges a list in place
- `statistics.mean` calculates an average
- `sys.argv` stores command-line arguments
- `len(sys.argv)` can be used to validate argument counts
- `sys.exit` stops a program early
- slices extract part of a sequence
- `pip` installs third-party packages
- APIs let programs request data from services
- JSON is a common format for exchanging structured data
- your own Python files can become libraries that other files import

The central idea is reuse. Libraries, packages, APIs, and your own modules all let programs build on code that already exists.
