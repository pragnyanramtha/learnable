# Regular Expressions

## Main idea

Regular expressions, often called **regex**, help Python recognize patterns in text. They are especially useful for validation, searching, and extraction.

## Why regex is useful

Without regex, text checking can become long and fragile. With regex, a pattern can describe what is allowed.

Example goals:

- validate an email address
- find a username
- extract part of a sentence

## The `re` module

Python uses the `re` module for regular expressions.

Code example:

```python
import re

email = input("What's your email? ").strip()

if re.search(r"^\w+@\w+\.\w+$", email):
    print("Valid")
else:
    print("Invalid")
```

What this pattern means at a high level:

- `^` start of string
- `\w+` one or more word characters
- `@` a literal at sign
- `\.` a literal dot
- `$` end of string

## Cleaning up input

Lecture 7 also shows that regular expressions often work best after the program first removes extra spaces or normalizes input.

## Extracting values

Regex can do more than answer yes or no. It can also capture pieces of text and return them for later use.

## Case sensitivity

Some matches care about uppercase and lowercase differences. Others can be written to ignore case when needed.

## Be careful

Regex is powerful, but overly complex patterns are hard to maintain. Readability still matters.

## Reading note for screen readers

Regex can sound dense when read aloud. The best strategy is:

1. hear the goal first
2. hear the pattern in small pieces
3. connect each piece to its meaning

## Summary

Regular expressions let Python describe text patterns compactly. They are excellent for validation and extraction when used carefully.
