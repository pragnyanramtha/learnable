**1. What is a class in object-oriented programming?**
A. A blueprint for creating objects | B. A file-reading mode | C. A type of loop | D. A command-line argument
<Answer: A. A blueprint for creating objects>
<Explanation: A class defines the structure and behavior that its objects will have.>

**2. What is an object?**
A. An instance created from a class | B. Only a string value | C. A Python comment | D. A package installer
<Answer: A. An instance created from a class>
<Explanation: If a class is the blueprint, an object is one actual thing built from it.>

**3. What does `self` usually refer to inside an instance method?**
A. The current object instance | B. The Python interpreter | C. A global variable | D. The file name
<Answer: A. The current object instance>
<Explanation: `self` lets a method read or change data stored on the specific object.>

**4. What is the purpose of `__init__`?**
A. To initialize a new object | B. To close every file | C. To sort a list automatically | D. To stop all exceptions
<Answer: A. To initialize a new object>
<Explanation: `__init__` runs when a new object is created and usually sets initial attributes.>

**5. What is an instance method?**
A. A function that belongs to an object and usually uses `self` | B. A variable that cannot change | C. A loop that never ends | D. A dictionary key only
<Answer: A. A function that belongs to an object and usually uses `self`>
<Explanation: Instance methods define behavior for a particular object.>

**6. Why define `__str__` in a class?**
A. To control the readable text version of an object | B. To delete the object | C. To import a module | D. To create a CSV file
<Answer: A. To control the readable text version of an object>
<Explanation: Python uses `__str__` when an object is converted to human-readable text.>

**7. Why might a class raise a `ValueError`?**
A. To reject invalid data or state | B. To make code less readable | C. To repeat a loop | D. To install a dependency
<Answer: A. To reject invalid data or state>
<Explanation: Raising an exception can prevent an object from entering an invalid state.>

**8. What does `@property` help a class do?**
A. Provide controlled access to an attribute | B. Turn a class into a list | C. Skip all validation | D. Run code only from the terminal
<Answer: A. Provide controlled access to an attribute>
<Explanation: A property can make attribute access look simple while still using getter and setter logic.>

**9. Why might an internal attribute be named `_house` instead of `house`?**
A. To signal that it should be treated as internal implementation detail | B. To make it global | C. To force it to be a string | D. To turn it into a method
<Answer: A. To signal that it should be treated as internal implementation detail>
<Explanation: A leading underscore is a convention that warns other code not to modify the value directly.>

**10. What is a class attribute?**
A. A value stored on the class and shared by instances | B. A value that can only exist inside a loop | C. A file path | D. A syntax error
<Answer: A. A value stored on the class and shared by instances>
<Explanation: Class attributes are useful for shared constants or shared class-level data.>

**11. What does a class method receive as its first parameter?**
A. `cls` | B. `self` | C. `args` | D. `file`
<Answer: A. `cls`>
<Explanation: Class methods use `cls` because they operate on the class rather than one existing object.>

**12. When is a static method useful?**
A. When a helper belongs near a class but does not need `self` or `cls` | B. When a method must change every object | C. When a file must stay open | D. When a list must be unsorted
<Answer: A. When a helper belongs near a class but does not need `self` or `cls`>
<Explanation: Static methods are namespaced inside a class without depending on object or class state.>

**13. What is inheritance used for?**
A. Letting one class reuse or extend another class | B. Writing comments faster | C. Avoiding all methods | D. Converting strings into integers
<Answer: A. Letting one class reuse or extend another class>
<Explanation: A child class can inherit behavior from a parent class and add its own details.>

**14. What is composition?**
A. Building an object that contains other objects | B. Making every class inherit from every other class | C. Removing all attributes | D. Turning a class into a tuple
<Answer: A. Building an object that contains other objects>
<Explanation: A shopping cart containing line items is an example of composition.>

**15. What does operator overloading allow?**
A. Custom classes can define behavior for operators like `+` | B. Operators stop working in Python | C. Every object becomes a number | D. Loops become methods
<Answer: A. Custom classes can define behavior for operators like `+`>
<Explanation: Methods like `__add__` let a class define natural operator behavior.>
