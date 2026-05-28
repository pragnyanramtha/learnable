**1. What is an exception in Python?**
A. A problem that occurs while a program is running | B. A kind of list index | C. A required comment | D. A package installer
<Answer: A. A problem that occurs while a program is running>
<Explanation: Exceptions represent errors or unusual conditions that appear during program execution.>

**2. What kind of error is caused by `print("hello, world)`?**
A. ValueError | B. SyntaxError | C. NameError | D. ImportError
<Answer: B. SyntaxError>
<Explanation: The missing quote makes the code structurally invalid, so Python cannot parse it.>

**3. What does a runtime error mean?**
A. The code is always misspelled | B. The program encounters a problem while running | C. The program has no functions | D. The terminal is closed
<Answer: B. The program encounters a problem while running>
<Explanation: Runtime errors happen after the program starts and reaches a situation it cannot handle normally.>

**4. Why can `int(input("What's x? "))` raise a `ValueError`?**
A. The user may type text that cannot be converted to an integer | B. `input` always returns an integer | C. `int` only works on lists | D. The prompt has a question mark
<Answer: A. The user may type text that cannot be converted to an integer>
<Explanation: If the user types something like `cat`, `int` cannot convert that text into a number.>

**5. Which block contains code that might fail?**
A. try | B. except | C. else | D. pass
<Answer: A. try>
<Explanation: The `try` block holds the risky operation that Python should attempt.>

**6. What does `except ValueError:` do?**
A. Handles only `ValueError` exceptions from the matching `try` block | B. Handles all possible bugs forever | C. Starts a loop | D. Converts every value to an integer
<Answer: A. Handles only `ValueError` exceptions from the matching `try` block>
<Explanation: Naming `ValueError` tells Python which specific exception type this handler is meant to catch.>

**7. Why is it usually best to keep the `try` block small?**
A. It makes clear which line is expected to fail | B. Python forbids long `try` blocks | C. It makes variables global | D. It removes the need for indentation
<Answer: A. It makes clear which line is expected to fail>
<Explanation: A smaller `try` block makes error handling more precise and easier to reason about.>

**8. What can cause a `NameError` in the example where `print(f"x is {x}")` comes after `except`?**
A. The conversion can fail before `x` is assigned | B. F-strings cannot use variables | C. `print` deletes `x` | D. `except` always renames variables
<Answer: A. The conversion can fail before `x` is assigned>
<Explanation: If `int(...)` fails, the assignment to `x` never happens, so printing `x` later is unsafe.>

**9. When does an `else` block attached to `try` run?**
A. Only when the `try` block succeeds without an exception | B. Only when the `except` block runs | C. Before the risky code | D. Every time the program starts
<Answer: A. Only when the `try` block succeeds without an exception>
<Explanation: In `try`/`except`/`else`, the `else` block is the success path.>

**10. Why is `else` useful in the integer input example?**
A. It prints `x` only after the conversion has succeeded | B. It catches syntax errors | C. It repeats the prompt automatically | D. It changes strings into floats
<Answer: A. It prints `x` only after the conversion has succeeded>
<Explanation: The `else` block avoids using `x` after a failed conversion.>

**11. What does `while True:` create?**
A. A loop that continues until something inside it exits | B. A condition that is always false | C. A list of Boolean values | D. A syntax error
<Answer: A. A loop that continues until something inside it exits>
<Explanation: `while True` repeats indefinitely unless a statement such as `break` or `return` stops it.>

**12. What does `break` do in the input-validation loop?**
A. Exits the loop after valid input | B. Skips the entire file | C. Raises a `ValueError` | D. Converts input to text
<Answer: A. Exits the loop after valid input>
<Explanation: Once a valid integer is received, `break` stops the loop so the program can continue.>

**13. Why move input validation into a function like `get_int()`?**
A. To make the validation reusable and keep `main` simpler | B. To prevent functions from returning values | C. To avoid using loops | D. To make all inputs invalid
<Answer: A. To make the validation reusable and keep `main` simpler>
<Explanation: A helper function hides repeated validation details behind a clear name.>

**14. What does `return x` do inside `get_int()`?**
A. Sends `x` back to the caller and exits the function | B. Prints `x` without leaving the function | C. Deletes the loop | D. Catches all exceptions
<Answer: A. Sends `x` back to the caller and exits the function>
<Explanation: `return` ends the function call and provides a result to the code that called it.>

**15. Why can `return int(input("What's x? "))` work inside the `try` block?**
A. If conversion succeeds, the value can be returned immediately | B. `return` catches syntax errors | C. `input` stops asking questions | D. `int` always returns zero
<Answer: A. If conversion succeeds, the value can be returned immediately>
<Explanation: A successful conversion produces the integer the function needs, so it can return at once.>

**16. What is `pass` used for in an `except` block?**
A. To intentionally do nothing | B. To print a traceback | C. To leave a function with a value | D. To start a new `try` block
<Answer: A. To intentionally do nothing>
<Explanation: `pass` is a placeholder statement that lets a required block exist without visible behavior.>

**17. What is a possible downside of using `pass` for invalid input?**
A. The user may not know what went wrong | B. Python will refuse to loop | C. It always changes the value to `None` | D. It prevents future input
<Answer: A. The user may not know what went wrong>
<Explanation: Silently asking again can be less helpful than explaining that the input was not an integer.>

**18. Why pass a `prompt` argument into `get_int(prompt)`?**
A. So the function can be reused with different prompt text | B. So `prompt` becomes an exception type | C. So Python ignores user input | D. So `int` converts every string
<Answer: A. So the function can be reused with different prompt text>
<Explanation: Passing the prompt lets the caller decide what question the user sees.>

**19. Which exception name means a variable was used before it had a value?**
A. NameError | B. ValueError | C. SyntaxError | D. TypeError
<Answer: A. NameError>
<Explanation: `NameError` can occur when code refers to a name that has not been assigned.>

**20. What is defensive programming?**
A. Writing code that anticipates mistakes and handles them clearly | B. Refusing to use functions | C. Deleting all error messages | D. Running code only once
<Answer: A. Writing code that anticipates mistakes and handles them clearly>
<Explanation: Defensive programming assumes unexpected input can happen and prepares safe responses.>
