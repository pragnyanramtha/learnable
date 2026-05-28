# Lecture 2: Loops

Source: [CS50's Introduction to Programming with Python, Lecture 2 notes](https://cs50.harvard.edu/python/notes/2/)

These notes follow the structure of CS50 Python Lecture 2. The main idea is that loops let a program repeat work without copying and pasting the same line again and again.

## Loops

A loop is a way to do something more than once. Before using a loop, you could write the same instruction repeatedly:

```python
print("meow")
print("meow")
print("meow")
```

This works, but it does not scale. If a program needed to meow 500 times, copying the same line 500 times would be tedious and fragile. A loop gives Python a repeated block of code and a rule for how long the repetition should continue.

In Python, the repeated part of a loop is the indented block underneath the loop line. Indentation is part of the syntax, so the lines that are indented belong to the loop.

## While Loops

A `while` loop repeats as long as a Boolean condition remains true.

Here is an early attempt:

```python
i = 3
while i != 0:
    print("meow")
```

This creates an infinite loop. The condition asks whether `i` is not equal to `0`. Since `i` starts as `3` and never changes, the answer is always true. Python keeps printing forever until the program is stopped, for example with `Ctrl+C` in the terminal.

To make the loop stop, update the value that the condition depends on:

```python
i = 3
while i != 0:
    print("meow")
    i = i - 1
```

Now `i` begins at `3`. After each iteration, `i` decreases by `1`. The loop prints when `i` is `3`, then `2`, then `1`. Once `i` becomes `0`, the condition `i != 0` is false, so the loop ends.

An iteration is one trip through the loop body. Programmers often count from `0`, so you will hear phrases like "the 0th iteration" even though humans often start counting at `1`.

You can also count upward:

```python
i = 1
while i <= 3:
    print("meow")
    i = i + 1
```

This also prints three times, but it starts at `1`. A more conventional Python version starts at `0` and loops while the counter is less than `3`:

```python
i = 0
while i < 3:
    print("meow")
    i += 1
```

The statement `i += 1` means the same thing as `i = i + 1`. The value on the right is calculated first, then assigned back into `i`.

This loop counts `0`, `1`, and `2`. It stops before `3`, which is a common pattern in Python.

## For Loops

A `for` loop is useful when you want to iterate over a sequence of values.

One way to meow three times is to loop over a list:

```python
for i in [0, 1, 2]:
    print("meow")
```

The variable `i` takes on each value from the list. First it is `0`, then `1`, then `2`. The loop body runs once for each value.

Writing a list by hand is fine for three items, but not for a large number of repetitions. Python's `range` function creates the sequence of numbers for you:

```python
for i in range(3):
    print("meow")
```

`range(3)` represents the values `0`, `1`, and `2`. Like the `while i < 3` version, it gives three iterations and stops before `3`.

In this example, the loop variable is not actually used inside the loop. Python still needs a variable name, but programmers often use `_` when the value is intentionally ignored:

```python
for _ in range(3):
    print("meow")
```

This behaves the same way. The underscore is a signal to human readers: the loop count matters, but the current number does not.

Python can also repeat strings:

```python
print("meow" * 3)
```

That prints `meowmeowmeow` without line breaks. To put each meow on its own line, include `\n`, which means newline:

```python
print("meow\n" * 3, end="")
```

The `end=""` argument prevents `print` from adding an extra newline after the final repeated string.

## Improving with User Input

Loops are especially useful for input validation. A program can keep asking the user for input until the answer is acceptable.

A common pattern is `while True`, which creates a loop that will run forever unless the program explicitly leaves it:

```python
while True:
    n = int(input("What's n? "))
    if n < 0:
        continue
    else:
        break
```

This asks for an integer. If `n` is negative, `continue` tells Python to skip the rest of the current iteration and go back to the top of the loop. If `n` is not negative, `break` exits the loop.

The `else` and `continue` are not necessary here. You can write the same idea more directly:

```python
while True:
    n = int(input("What's n? "))
    if n > 0:
        break

for _ in range(n):
    print("meow")
```

This loop keeps asking until `n` is greater than `0`. After `break` exits the validation loop, the `for` loop uses `range(n)` to print that many meows.

Functions let you separate the job of asking for a number from the job of meowing:

```python
def main():
    meow(get_number())


def get_number():
    while True:
        n = int(input("What's n? "))
        if n > 0:
            return n


def meow(n):
    for _ in range(n):
        print("meow")


main()
```

In `get_number`, `return n` sends the valid number back to the caller. Returning also exits the function, so the `while True` loop does not need a separate `break`.

## More About Lists

A list stores multiple values in order. CS50 introduces this with students from Hogwarts:

```python
students = ["Hermione", "Harry", "Ron"]

print(students[0])
print(students[1])
print(students[2])
```

List positions are called indexes, and Python indexes start at `0`. In this list, `students[0]` is `"Hermione"`, `students[1]` is `"Harry"`, and `students[2]` is `"Ron"`.

Instead of printing each index manually, loop over the list:

```python
students = ["Hermione", "Harry", "Ron"]

for student in students:
    print(student)
```

This reads naturally: for each `student` in the list `students`, print that student. Here the loop variable is named `student` because the code uses the value inside the loop.

## Length

The `len` function returns the length of a collection. For a list, it tells you how many items are in the list.

If you want both a student's position and the student's name, combine `len`, `range`, and indexing:

```python
students = ["Hermione", "Harry", "Ron"]

for i in range(len(students)):
    print(i + 1, students[i])
```

`len(students)` is `3`, so `range(len(students))` gives `0`, `1`, and `2`. The expression `students[i]` looks up the name at the current index. The expression `i + 1` displays the positions as `1`, `2`, and `3` for humans, even though Python's actual indexes are `0`, `1`, and `2`.

Using `len` keeps the loop flexible. If more students are added later, the loop automatically adjusts.

## Dictionaries

A dictionary, or `dict`, stores key-value pairs. A list is good for ordered values. A dictionary is better when you want to associate one value with another.

Suppose you want to store each student's house. You could try to keep two lists aligned:

```python
students = ["Hermione", "Harry", "Ron", "Draco"]
houses = ["Gryffindor", "Gryffindor", "Gryffindor", "Slytherin"]
```

This only works if the two lists always stay in the same order. `students[0]` matches `houses[0]`, `students[1]` matches `houses[1]`, and so on. As data grows, that becomes easy to break.

A dictionary makes the relationship explicit:

```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin",
}

print(students["Hermione"])
print(students["Harry"])
print(students["Ron"])
print(students["Draco"])
```

The names are keys. The houses are values. Instead of using a numeric index like `0`, you can look up a value with a meaningful key like `"Hermione"`.

When you loop over a dictionary directly, Python gives you the keys:

```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin",
}

for student in students:
    print(student)
```

To print both the key and its value, use the key to look up the value:

```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin",
}

for student in students:
    print(student, students[student])
```

The expression `students[student]` means "look inside the `students` dictionary and get the value for this key."

You can make the output cleaner by changing how `print` separates its arguments:

```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin",
}

for student in students:
    print(student, students[student], sep=", ")
```

The `sep=", "` argument tells `print` to put a comma and a space between the name and the house.

## Lists of Dictionaries

A dictionary can store several fields about one thing. A list can store several things. Put them together and you can represent a small table of records.

```python
students = [
    {"name": "Hermione", "house": "Gryffindor", "patronus": "Otter"},
    {"name": "Harry", "house": "Gryffindor", "patronus": "Stag"},
    {"name": "Ron", "house": "Gryffindor", "patronus": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronus": None},
]
```

Here `students` is a list. Each item in the list is a dictionary. Each dictionary has the same keys: `"name"`, `"house"`, and `"patronus"`.

The value `None` is Python's way to represent the absence of a value. Draco has no patronus value in this example, so the value is `None`.

To print each record, loop through the list and use dictionary keys inside the loop:

```python
students = [
    {"name": "Hermione", "house": "Gryffindor", "patronus": "Otter"},
    {"name": "Harry", "house": "Gryffindor", "patronus": "Stag"},
    {"name": "Ron", "house": "Gryffindor", "patronus": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronus": None},
]

for student in students:
    print(student["name"], student["house"], student["patronus"], sep=", ")
```

On each iteration, `student` is one dictionary from the list. Expressions like `student["name"]` and `student["house"]` retrieve values from that dictionary.

## Mario

CS50 often uses Mario-style blocks to practice loops. A text version of vertical blocks could start with repeated print calls:

```python
print("#")
print("#")
print("#")
```

A loop avoids the repetition:

```python
for _ in range(3):
    print("#")
```

You can then abstract the idea into a function that prints a column of a chosen height:

```python
def main():
    print_column(3)


def print_column(height):
    for _ in range(height):
        print("#")


main()
```

The function `print_column` can print a column of any height passed to it.

A horizontal row can be printed by repeating a character:

```python
def main():
    print_row(4)


def print_row(width):
    print("?" * width)


main()
```

This prints a row whose width is controlled by the argument to `print_row`.

To print a square, use nested loops. The outer loop handles each row. The inner loop handles each brick in that row:

```python
def main():
    print_square(3)


def print_square(size):
    for i in range(size):
        for j in range(size):
            print("#", end="")
        print()


main()
```

The inner `print("#", end="")` keeps the bricks on the same line. After the inner loop finishes a row, the plain `print()` moves to the next line.

The same square can be written with helper functions:

```python
def main():
    print_square(3)


def print_square(size):
    for i in range(size):
        print_row(size)


def print_row(width):
    print("#" * width)


main()
```

This version separates the idea of printing a square from the idea of printing one row. That makes the program easier to read and easier to change later.

## Summing Up

Lecture 2 adds repetition and collection-based thinking to Python programs.

- Loops repeat work without copying and pasting code.
- `while` loops repeat while a condition is true.
- Infinite loops happen when the loop condition never becomes false.
- `break` exits a loop early, and `continue` skips to the next iteration.
- `for` loops iterate over sequences such as lists or ranges.
- `range(n)` creates values from `0` up to, but not including, `n`.
- Lists store multiple values in order and are indexed starting at `0`.
- `len` reports how many items a collection contains.
- Dictionaries store key-value pairs.
- Lists of dictionaries can represent multiple records with multiple fields.
- Nested loops are useful for grids, such as Mario-style rows and columns.
