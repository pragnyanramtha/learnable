**1. Why is a class often better than loose dictionaries when a program tracks students, orders, or accounts?**
A. A class can keep related data and behavior in one named type | B. A class automatically stores data in a database | C. A class removes the need for validation | D. A class makes every value global
<Answer: A. A class can keep related data and behavior in one named type>
<Explanation: OOP bundles attributes and methods so the rules for using data stay close to the data itself.>

**2. In `student = Student("Ada", "Blue")`, what must happen before `student.name` can exist?**
A. `__init__` must assign a value to `self.name` | B. `print()` must be called once | C. The class must inherit from `dict` | D. The object must define `__add__`
<Answer: A. `__init__` must assign a value to `self.name`>
<Explanation: Instance attributes such as `name` are commonly created by assignments like `self.name = name` inside `__init__`.>

**3. A `Student` constructor raises `ValueError("Missing name")` before assigning attributes. What is the best description of the result?**
A. The invalid object is rejected before it can be used | B. Python creates the object with empty attributes | C. Python silently changes the name to `"Unknown"` | D. The error only appears when `print(student)` runs
<Answer: A. The invalid object is rejected before it can be used>
<Explanation: Raising an exception during initialization prevents the program from continuing with invalid state.>

**4. Why does an instance method such as `introduce(self)` need `self`?**
A. It needs access to the specific object's attributes | B. It needs to create a new class | C. It needs to stop all exceptions | D. It needs to import Python modules
<Answer: A. It needs access to the specific object's attributes>
<Explanation: `self` refers to the current instance, so the method can use values such as `self.name` and `self.house`.>

**5. If a class defines `__str__`, what changes when `print(object)` is called?**
A. Python can show the object's human-readable text | B. Python deletes the object's attributes | C. Python converts every attribute to an integer | D. Python stops calling instance methods
<Answer: A. Python can show the object's human-readable text>
<Explanation: `__str__` controls the readable string representation used by `print()` and similar operations.>

**6. In a class with a `house` property and a `@house.setter`, why can `self.house = house` inside `__init__` still validate the value?**
A. Assigning to `self.house` calls the setter method | B. Assigning to `self.house` skips all decorators | C. `__init__` cannot raise exceptions | D. Properties only work after the object is printed
<Answer: A. Assigning to `self.house` calls the setter method>
<Explanation: A property setter runs when code assigns to the public property, so validation can happen during creation and later changes.>

**7. Inside a property setter for `house`, why should the validated value be stored in `_house` instead of assigning again to `self.house`?**
A. Assigning again to `self.house` would call the setter repeatedly | B. `_house` automatically becomes a class method | C. `_house` prevents the value from being read | D. `self.house` can only store numbers
<Answer: A. Assigning again to `self.house` would call the setter repeatedly>
<Explanation: The public property calls the setter, while the internal `_house` attribute stores the actual value after validation.>

**8. `allowed_houses` is stored on the `Student` class, not separately on every student. What kind of attribute is it?**
A. A class attribute shared by instances | B. A local variable inside one method | C. A static method | D. An instance method
<Answer: A. A class attribute shared by instances>
<Explanation: A value that belongs to the class itself and is common to all instances is a class attribute.>

**9. A class has `items = []` written directly inside the class body. Two cart objects both append to `items`. What is the hidden risk?**
A. Both objects may share the same list | B. The list becomes a tuple automatically | C. The class cannot create objects | D. Python will ignore every append
<Answer: A. Both objects may share the same list>
<Explanation: Mutable class attributes are shared, so each instance can accidentally change the same list.>

**10. Why should a class method constructor return `cls(...)` instead of hard-coding `Student(...)`?**
A. `cls(...)` can create an instance of the class that received the call | B. `cls(...)` prevents any object from being created | C. `cls(...)` turns the method into a static method | D. `cls(...)` removes the need for `__init__`
<Answer: A. `cls(...)` can create an instance of the class that received the call>
<Explanation: Class methods receive `cls`, which makes alternate constructors more flexible, including when subclasses are involved.>

**11. When is `@staticmethod` the right choice?**
A. When a helper belongs near a class but does not need object or class data | B. When the method must read `self.name` | C. When the method must create subclasses with `cls` | D. When the method must change every instance attribute
<Answer: A. When a helper belongs near a class but does not need object or class data>
<Explanation: Static methods live in the class namespace but do not receive `self` or `cls`.>

**12. In an `Admin` class that inherits from `User`, why call `super().__init__(name, email)`?**
A. To reuse the parent setup for shared attributes | B. To delete the parent class | C. To turn `Admin` into a dictionary | D. To stop `Admin` from having its own methods
<Answer: A. To reuse the parent setup for shared attributes>
<Explanation: `super().__init__` lets the child class reuse parent initialization instead of repeating the same setup code.>

**13. A shopping cart contains many line items. Which relationship best matches the syllabus?**
A. Composition, because a cart has line items | B. Inheritance, because a cart is a line item | C. Static method, because a cart has no state | D. Operator overloading, because a cart must use `+`
<Answer: A. Composition, because a cart has line items>
<Explanation: Composition is appropriate for a has-a relationship, such as a cart containing item objects.>

**14. A list contains `EmailNotification` and `SmsNotification` objects, and both define `send()`. Why can a loop call `notification.send()` on each object?**
A. The objects share a common behavior name even if the implementations differ | B. Python converts both objects into strings before the loop | C. A loop can only call static methods | D. Inheritance prevents method overriding
<Answer: A. The objects share a common behavior name even if the implementations differ>
<Explanation: This is polymorphism: different object types can be used through the same method name.>

**15. If `subtotal + delivery` works for two `Money` objects, which method is Python using?**
A. `subtotal.__add__(delivery)` | B. `delivery.__str__(subtotal)` | C. `Money.from_csv_row(subtotal)` | D. `subtotal.__init__(delivery)`
<Answer: A. `subtotal.__add__(delivery)`>
<Explanation: Operator overloading lets a class define operator behavior through special methods such as `__add__`.>

**16. A `BankAccount` starts with balance 1000. `withdraw(1500)` checks insufficient funds before subtracting. What should happen?**
A. A `ValueError` is raised and the balance stays 1000 | B. The balance becomes negative 500 | C. The balance becomes 0 without an error | D. The owner name is removed
<Answer: A. A `ValueError` is raised and the balance stays 1000>
<Explanation: Validation should reject an impossible withdrawal before changing the account state.>

**17. A `RestaurantOrder` allows adding items only while its status is `"new"`. What should happen if `add_item("Tea")` is called after the status becomes `"preparing"`?**
A. A `ValueError` should be raised | B. The item should be added normally | C. The status should change back to `"new"` | D. The order should delete all existing items
<Answer: A. A `ValueError` should be raised>
<Explanation: The class protects its own rules by rejecting item changes after cooking starts.>

**18. A `RideShareTrip` has `base_fare = 40` and `price_per_km = 18`. What is the fare for 6.5 kilometers?**
A. 157.0 | B. 117.0 | C. 123.0 | D. 180.0
<Answer: A. 157.0>
<Explanation: The fare is `40 + 6.5 * 18`, which equals 157.0.>

**19. An `InventoryItem` starts with quantity 12 and `reorder_at` 5. After `sell(8)`, what should `needs_reorder()` return?**
A. `True` | B. `False` | C. 8 | D. 12
<Answer: A. `True`>
<Explanation: Selling 8 leaves quantity 4, and 4 is less than or equal to the reorder point of 5.>

**20. Which unit test best checks that `BankAccount.withdraw` handles an invalid withdrawal safely?**
A. Start with balance 100, call `withdraw(150)`, expect `ValueError`, and confirm balance is still 100 | B. Start with balance 100, call `withdraw(150)`, and expect balance negative 50 | C. Start with balance 100, call `deposit(50)`, and ignore the balance | D. Start with balance 100, print the account owner only
<Answer: A. Start with balance 100, call `withdraw(150)`, expect `ValueError`, and confirm balance is still 100>
<Explanation: A strong test checks both the exception and the important state that must not change.>

**21. Code writing: Student records with validation**
<Type: Code>
Write a `Student` class with `name` and `house`.
<Instructions: Use an `allowed_houses` class attribute, a `house` property with a setter, `__str__`, and a `from_csv_row` class method. Reject an empty name and invalid house with `ValueError`.>
<Explanation: A complete answer should show validation during object creation and when the house changes later.>

**22. Code writing: Bank account safety**
<Type: Code>
Write a `BankAccount` class with safe deposit and withdrawal behavior.
<Instructions: Include `owner`, `balance`, `deposit`, and `withdraw`. Reject negative opening balances, non-positive deposits, non-positive withdrawals, and withdrawals larger than the balance. Add tests or example calls for at least three invalid cases.>
<Explanation: A complete answer should protect the account balance before changing state.>

**23. Code writing: Shopping cart with composition**
<Type: Code>
Write `LineItem` and `ShoppingCart` classes.
<Instructions: A line item should know its own total from price and quantity. A cart should contain line items, add new items, and calculate the full cart total. Include one example cart with at least three items.>
<Explanation: A complete answer should use composition because a cart has line items.>
