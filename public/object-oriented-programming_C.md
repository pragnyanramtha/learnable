# Object-Oriented Programming

## Main idea

Object-oriented programming, often shortened to OOP, is a way to organize code around objects.

An object bundles two things together:

- data, also called attributes
- behavior, written as methods

This is useful when a program starts tracking real things: students, bank accounts, shopping carts, orders, appointments, books, tickets, trips, users, payments, and many more.

Without OOP, related values can become scattered across dictionaries, lists, and functions. With OOP, the data and the rules for using that data can live in one place.

## From separate values to objects

A beginner version of a student program might use separate variables:

```python
name = input("Name: ").strip()
house = input("House: ").strip()

print(f"{name} from {house}")
```

That is fine for one student. It becomes awkward when you need many students, validation, reusable behavior, or a clean way to pass student data around.

A tuple can group values:

```python
student = ("Ada", "Blue")
print(student[0], student[1])
```

But `student[0]` and `student[1]` are not very descriptive.

A dictionary is clearer:

```python
student = {"name": "Ada", "house": "Blue"}
print(student["name"], student["house"])
```

A class goes one step further. It gives the data a named type and lets that type define its own behavior.

## Classes and objects

A class is a blueprint. An object is one actual thing created from that blueprint.

Code example:

```python
class Student:
    def __init__(self, name: str, house: str):
        self.name = name
        self.house = house


student = Student("Ada", "Blue")
print(student.name)
print(student.house)
```

What this does:

- `class Student` defines a new type named `Student`
- `__init__` runs when a new `Student` is created
- `self` means "this object"
- `self.name` and `self.house` store values on the object
- `student = Student(...)` creates one object, also called an instance

Class names usually use `PascalCase`, such as `Student`, `BankAccount`, or `ShoppingCart`.

## Instance methods

A method is a function that belongs to a class.

Code example:

```python
class Student:
    def __init__(self, name: str, house: str):
        self.name = name
        self.house = house

    def introduce(self) -> str:
        return f"Hi, I am {self.name} from {self.house}."


student = Student("Ada", "Blue")
print(student.introduce())
```

`introduce` is an instance method. It uses `self` because it depends on the specific student's data.

## `__str__`

Python calls `__str__` when an object needs to be turned into readable text, such as during `print(object)`.

Code example:

```python
class Student:
    def __init__(self, name: str, house: str):
        self.name = name
        self.house = house

    def __str__(self) -> str:
        return f"{self.name} from {self.house}"


student = Student("Ada", "Blue")
print(student)
```

Without `__str__`, printing an object usually shows a technical representation. With `__str__`, the class decides what a human-friendly version should look like.

## Validation with `raise`

Classes can protect their own data. If bad data would create an invalid object, the class can reject it immediately.

Code example:

```python
class Student:
    allowed_houses = ["Blue", "Green", "Red", "Yellow"]

    def __init__(self, name: str, house: str):
        if not name:
            raise ValueError("Missing name")
        if house not in self.allowed_houses:
            raise ValueError("Invalid house")

        self.name = name
        self.house = house
```

This prevents a `Student` object from being created with an empty name or unsupported house.

Validation is one of the biggest reasons to use classes. The rules stay close to the data they protect.

## Properties and decorators

Sometimes you want code to access an attribute normally, but still run validation when the value changes.

Python properties are built with decorators such as `@property` and `@house.setter`.

Code example:

```python
class Student:
    allowed_houses = ["Blue", "Green", "Red", "Yellow"]

    def __init__(self, name: str, house: str):
        self.name = name
        self.house = house

    @property
    def house(self) -> str:
        return self._house

    @house.setter
    def house(self, value: str) -> None:
        if value not in self.allowed_houses:
            raise ValueError("Invalid house")
        self._house = value


student = Student("Ada", "Blue")
student.house = "Green"
print(student.house)
```

Why `_house`?

- `house` is the public property
- `_house` is the internal stored value
- the leading underscore signals that other code should not change it directly

The property lets the class validate both the original value and future assignments.

## Class attributes

A class attribute belongs to the class itself and is shared by all instances.

Code example:

```python
class BankAccount:
    minimum_balance = 0

    def __init__(self, owner: str, balance: int = 0):
        if balance < self.minimum_balance:
            raise ValueError("Balance cannot be negative")
        self.owner = owner
        self.balance = balance
```

`minimum_balance` is not different for every account, so it can live on the class.

## Class methods

A class method belongs to the class, not to one existing object. It receives `cls` instead of `self`.

Class methods are often useful as named constructors: alternate ways to create an object.

Code example:

```python
class Student:
    def __init__(self, name: str, house: str):
        self.name = name
        self.house = house

    @classmethod
    def from_csv_row(cls, row: str):
        name, house = row.split(",")
        return cls(name.strip(), house.strip())


student = Student.from_csv_row("Ada, Blue")
print(student.name)
```

`cls(...)` creates an instance of the class. This is better than hard-coding `Student(...)` inside the method because it also works better with subclasses.

## Static methods

A static method belongs inside the class namespace, but it does not need `self` or `cls`.

Use a static method when the helper is related to the class, but does not need object data or class data.

Code example:

```python
class Password:
    @staticmethod
    def is_strong(value: str) -> bool:
        return len(value) >= 8 and any(char.isdigit() for char in value)


print(Password.is_strong("learn123"))
```

This function is about passwords, so it makes sense to keep it near the `Password` class. But it does not need a password object.

## Inheritance

Inheritance lets one class reuse behavior from another class.

The parent class contains shared behavior. Child classes add or specialize behavior.

Code example:

```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def profile(self) -> str:
        return f"{self.name} <{self.email}>"


class Admin(User):
    def __init__(self, name: str, email: str, permissions: list[str]):
        super().__init__(name, email)
        self.permissions = permissions

    def can_delete_users(self) -> bool:
        return "delete_users" in self.permissions


admin = Admin("Nia", "nia@example.com", ["delete_users"])
print(admin.profile())
print(admin.can_delete_users())
```

`Admin` inherits `profile` from `User`. `super().__init__(...)` calls the parent constructor so the shared `name` and `email` setup does not need to be repeated.

## Composition

Inheritance is not the only way to connect classes. Composition means one object contains other objects.

This is often the better choice when the relationship is "has a" instead of "is a".

Code example:

```python
class LineItem:
    def __init__(self, name: str, price: int, quantity: int):
        self.name = name
        self.price = price
        self.quantity = quantity

    def total(self) -> int:
        return self.price * self.quantity


class ShoppingCart:
    def __init__(self):
        self.items: list[LineItem] = []

    def add(self, item: LineItem) -> None:
        self.items.append(item)

    def total(self) -> int:
        return sum(item.total() for item in self.items)


cart = ShoppingCart()
cart.add(LineItem("Notebook", 80, 2))
cart.add(LineItem("Pen", 20, 3))
print(cart.total())
```

A cart is not a line item. A cart has line items. That makes composition a good fit.

## Operator overloading

Operator overloading lets a class define what an operator means for its own objects.

For example, money values can define `+` with `__add__`.

Code example:

```python
class Money:
    def __init__(self, rupees: int, paise: int = 0):
        self.total_paise = rupees * 100 + paise

    def __str__(self) -> str:
        rupees = self.total_paise // 100
        paise = self.total_paise % 100
        return f"Rs. {rupees}.{paise:02d}"

    def __add__(self, other):
        return Money(0, self.total_paise + other.total_paise)


subtotal = Money(249, 50)
delivery = Money(40)
print(subtotal + delivery)
```

Here, `subtotal + delivery` calls `subtotal.__add__(delivery)`.

Operator overloading should be used only when the meaning is natural. Adding money makes sense. Adding two unrelated objects may confuse readers.

## Real-world example: bank account

A bank account has an owner, a balance, and rules for deposits and withdrawals.

```python
class BankAccount:
    def __init__(self, owner: str, balance: int = 0):
        if balance < 0:
            raise ValueError("Opening balance cannot be negative")
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount

    def withdraw(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount


account = BankAccount("Maya", 1000)
account.deposit(500)
account.withdraw(200)
print(account.balance)
```

The object owns the rules. Other code does not need to remember how withdrawals should work.

## Real-world example: library book

A library book can be available or checked out.

```python
class LibraryBook:
    def __init__(self, title: str, author: str):
        self.title = title
        self.author = author
        self.borrower = None

    def check_out(self, member_name: str) -> None:
        if self.borrower is not None:
            raise ValueError("Book is already checked out")
        self.borrower = member_name

    def return_book(self) -> None:
        self.borrower = None

    def is_available(self) -> bool:
        return self.borrower is None


book = LibraryBook("Clean Code", "Robert C. Martin")
book.check_out("Ira")
print(book.is_available())
```

This keeps the book's status and actions together.

## Real-world example: restaurant order

An order has items and a status.

```python
class RestaurantOrder:
    allowed_statuses = ["new", "preparing", "ready", "delivered"]

    def __init__(self, table_number: int):
        self.table_number = table_number
        self.items: list[str] = []
        self.status = "new"

    def add_item(self, item: str) -> None:
        if self.status != "new":
            raise ValueError("Cannot add items after cooking starts")
        self.items.append(item)

    def update_status(self, status: str) -> None:
        if status not in self.allowed_statuses:
            raise ValueError("Invalid status")
        self.status = status


order = RestaurantOrder(4)
order.add_item("Dosa")
order.add_item("Tea")
order.update_status("preparing")
```

The class prevents impossible states, such as an order with an unknown status.

## Real-world example: ride-share trip

A trip can calculate its own fare.

```python
class RideShareTrip:
    base_fare = 40
    price_per_km = 18

    def __init__(self, rider: str, distance_km: float):
        if distance_km <= 0:
            raise ValueError("Distance must be positive")
        self.rider = rider
        self.distance_km = distance_km

    def fare(self) -> float:
        return self.base_fare + self.distance_km * self.price_per_km


trip = RideShareTrip("Anaya", 6.5)
print(trip.fare())
```

If the fare formula changes, the update belongs in one method.

## Real-world example: support ticket

A support ticket can track priority and escalation.

```python
class SupportTicket:
    def __init__(self, customer: str, issue: str):
        self.customer = customer
        self.issue = issue
        self.priority = "normal"
        self.closed = False

    def escalate(self) -> None:
        if self.closed:
            raise ValueError("Cannot escalate a closed ticket")
        self.priority = "high"

    def close(self) -> None:
        self.closed = True


ticket = SupportTicket("Ravi", "Cannot log in")
ticket.escalate()
print(ticket.priority)
```

This is easier to understand than passing loose dictionaries through many functions.

## Real-world example: inventory item

Inventory code often needs a reorder rule.

```python
class InventoryItem:
    def __init__(self, name: str, quantity: int, reorder_at: int):
        self.name = name
        self.quantity = quantity
        self.reorder_at = reorder_at

    def sell(self, count: int) -> None:
        if count > self.quantity:
            raise ValueError("Not enough stock")
        self.quantity -= count

    def needs_reorder(self) -> bool:
        return self.quantity <= self.reorder_at


item = InventoryItem("USB cable", 12, 5)
item.sell(8)
print(item.needs_reorder())
```

The object knows both the quantity and the rule for when more stock is needed.

## Real-world example: notifications

Inheritance can work well when several classes share a common interface.

```python
class Notification:
    def __init__(self, recipient: str, message: str):
        self.recipient = recipient
        self.message = message

    def send(self) -> str:
        raise NotImplementedError("Subclasses must implement send")


class EmailNotification(Notification):
    def send(self) -> str:
        return f"Email to {self.recipient}: {self.message}"


class SmsNotification(Notification):
    def send(self) -> str:
        return f"SMS to {self.recipient}: {self.message}"


notifications = [
    EmailNotification("user@example.com", "Your report is ready"),
    SmsNotification("+919000000000", "Your OTP is 123456"),
]

for notification in notifications:
    print(notification.send())
```

Both subclasses can be used through the same method name: `send`.

## When OOP is useful

OOP is a good fit when:

- data and behavior naturally belong together
- there are rules that protect valid state
- the program has several related concepts
- you need many objects with the same structure
- you want to model real-world entities

OOP may be unnecessary when:

- the script is very small
- the data does not have meaningful behavior
- a simple function is clearer

Good Python uses classes when they clarify the design, not just because classes exist.

## Reading note for screen readers

When hearing OOP code:

- first identify the class name
- then identify the attributes stored on `self`
- then identify the methods
- then listen for validation rules
- then listen for relationships between classes

This order makes class-based code easier to follow.

## Summary

OOP packages state and behavior together. Classes define the blueprint, objects are the actual instances, and methods describe what those objects can do. Validation, properties, class methods, static methods, inheritance, composition, and operator overloading help Python programs model real workflows cleanly.
