# Et Cetera

## Main idea

Lecture 9 gathers several useful Python ideas that make programs more expressive, maintainable, and efficient.

## Sets

A set stores unique values. It is useful when duplicates should be removed or membership should be checked quickly.

## Global variables and constants

- A global variable is available outside a single function.
- A constant is a value that should not change by convention, often written in uppercase.

Use both carefully. Overusing globals can make programs harder to reason about.

## Type hints and docstrings

Type hints describe expected input and output types.

Code example:

```python
def greet(name: str) -> str:
    """Return a greeting for one person."""
    return f"hello, {name}"
```

Why this helps:

- the hint improves clarity
- the docstring explains purpose

## argparse

`argparse` helps programs accept structured command-line arguments, making terminal tools easier to use.

## Unpacking, args, and kwargs

- unpacking spreads values out of a collection
- `*args` collects extra positional arguments
- `**kwargs` collects extra keyword arguments

## Functional-style helpers

Lecture 9 also introduces tools such as:

- `map`
- `filter`
- list comprehensions
- dictionary comprehensions
- `enumerate`

These can express transformations and filtering compactly.

## Generators and iterators

Generators produce values one at a time instead of building everything at once. This can save memory and make pipelines more efficient.

## Reading note for screen readers

For advanced syntax:

- hear the example first
- then hear the plain-language purpose
- then connect symbols like `*` and `**` to how arguments are collected or unpacked

## Summary

Lecture 9 expands your Python toolbox with patterns that improve organization, readability, command-line usability, and efficiency.
