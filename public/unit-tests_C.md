# Unit Tests

## Main idea

Unit tests check whether small pieces of your program behave correctly. Instead of manually printing results every time, you write tests that can be run again and again.

## assert

An `assert` statement checks whether something is true.

Code example:

```python
def square(n):
    return n * n

assert square(2) == 4
assert square(3) == 9
```

If an assertion fails, Python reports a problem.

## pytest

Lecture 5 introduces `pytest`, a testing tool that discovers test functions automatically.

Code example:

```python
from calculator import square

def test_positive():
    assert square(2) == 4

def test_zero():
    assert square(0) == 0

def test_negative():
    assert square(-2) == 4
```

## Testing strings and edge cases

Good tests do more than check the easy path.

They should also ask:

- what if the input is empty?
- what if the input has spaces?
- what if the value is invalid?

## Organizing tests

Tests are often placed in separate files whose names begin with `test_`. This keeps production code and checking code organized.

## Why unit tests matter

Unit tests help you:

- catch regressions after changes
- confirm expected behavior
- improve confidence while refactoring

## Reading note for screen readers

When hearing a test:

- identify the function being tested
- identify the input
- identify the expected output after `==`

That structure often tells the whole purpose of the test.

## Summary

Unit tests make Python projects safer to change. They turn assumptions into clear checks and reduce the need for repeated manual verification.
