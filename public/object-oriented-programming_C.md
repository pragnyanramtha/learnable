# Object-Oriented Programming

## Main idea

Object-oriented programming, often shortened to **OOP**, groups related data and behavior together inside classes and objects.

## Classes and objects

A class is a blueprint. An object is an actual instance created from that blueprint.

Code example:

```python
class Student:
    def __init__(self, name, house):
        self.name = name
        self.house = house

student = Student("Hermione", "Gryffindor")
print(student.name)
```

What this does:

- defines a class named `Student`
- uses `__init__` to set initial values
- stores data on `self`

## Methods

Methods are functions that belong to a class.

Lecture 8 covers:

- instance methods
- class methods
- static methods

These exist for different responsibilities.

## Encapsulation and validation

Classes can protect their own data and validate values before accepting them.

Lecture 8 introduces decorators like `@property` to make controlled access cleaner.

## Inheritance

Inheritance lets one class build on another.

This helps when two kinds of objects share behavior but also have differences.

## Raising exceptions

Classes can raise exceptions when data is invalid. This keeps bad state out of your objects.

## Operator overloading

Python classes can define how operators behave for custom objects, such as what `+` means for your own type.

## Reading note for screen readers

When hearing OOP code:

- first identify the class name
- then identify attributes stored on `self`
- then identify each method and what it changes or returns

That order makes class-based code easier to follow.

## Summary

OOP helps organize larger programs by packaging state and behavior together. It becomes especially useful as programs grow in size and complexity.
