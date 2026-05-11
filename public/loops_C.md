# Loops

## Main idea

Loops repeat actions. Instead of writing the same instruction many times, you can tell Python to keep running it until a condition changes or until a collection is finished.

## while loops

A `while` loop keeps going as long as its condition stays true.

Code example:

```python
i = 0
while i < 3:
    print("meow")
    i += 1
```

What this does:

- `i` starts at `0`
- the loop runs while `i` is less than `3`
- `i += 1` updates the counter each time

## for loops

A `for` loop is often clearer when you know how many times something should happen.

Code example:

```python
for _ in range(3):
    print("meow")
```

What this does:

- `range(3)` represents three positions
- `_` is used because the loop variable itself is not needed

## Validating user input

Lecture 2 uses loops to keep asking for input until the user gives an acceptable answer.

This pattern is common when:

- a number must be positive
- a menu choice must be valid
- required input cannot be blank

## Lists

Lists store multiple values in order.

Code example:

```python
students = ["Hermione", "Harry", "Ron"]
for student in students:
    print(student)
```

## len and dictionaries

- `len()` tells you how many items are in a collection.
- A dictionary stores key-value pairs.

Code example:

```python
student = {"name": "Hermione", "house": "Gryffindor"}
print(student["name"])
```

## Mario-style pattern building

Lecture 2 also uses loops to print repeated symbols and build shapes line by line.

## Reading note for screen readers

When you hear a loop:

- identify the line that starts the loop
- notice the indented block that repeats
- listen for any counter update like `i += 1`, because it often controls when the loop stops

## Summary

Loops are how Python repeats work. `while` is good for condition-based repetition. `for` is good for stepping through a known range or collection.
