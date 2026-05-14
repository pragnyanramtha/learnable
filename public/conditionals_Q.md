**1. What are conditionals used for in Python programs?**
A. To make decisions based on conditions | B. To store many files | C. To repeat code a fixed number of times | D. To install packages
<Answer: A. To make decisions based on conditions>
<Explanation: Conditionals let a program choose which path to take depending on whether a condition is true or false.>

**2. Which operator means greater than or equal to?**
A. > | B. >= | C. <= | D. !=
<Answer: B. >=>
<Explanation: The operator `>=` checks whether the value on the left is greater than or equal to the value on the right.>

**3. Which operator checks whether two values are equal?**
A. = | B. == | C. != | D. <=
<Answer: B. ==>
<Explanation: Double equals checks equality, while a single equals sign is used for assignment.>

**4. What does `!=` mean in a condition?**
A. Equal to | B. Less than | C. Not equal to | D. Greater than or equal to
<Answer: C. Not equal to>
<Explanation: The `!=` operator asks whether the values on its left and right are different.>

**5. Which keyword starts a decision block in Python?**
A. for | B. while | C. if | D. with
<Answer: C. if>
<Explanation: The `if` keyword begins a conditional block and tells Python to test a Boolean expression.>

**6. In `if x < y:`, what happens when `x < y` is true?**
A. Python skips the indented block | B. Python runs the indented block | C. Python deletes `x` and `y` | D. Python repeats the test forever
<Answer: B. Python runs the indented block>
<Explanation: An `if` statement executes its indented code only when its condition evaluates to `True`.>

**7. What is control flow?**
A. The order in which a program evaluates and runs steps | B. A way to change text color | C. A file naming rule | D. A command for opening the terminal
<Answer: A. The order in which a program evaluates and runs steps>
<Explanation: Control flow describes how execution moves through a program as conditions are checked.>

**8. What does `elif` do in a conditional chain?**
A. It checks another condition if earlier conditions were false | B. It creates a new integer | C. It always runs after `if` | D. It ends the program immediately
<Answer: A. It checks another condition if earlier conditions were false>
<Explanation: `elif` gives Python another condition to test only when the previous branch did not match.>

**9. Why can `else` replace `elif x == y` after checking `x < y` and `x > y`?**
A. Because `else` repeats every comparison | B. Because equality is the only remaining possibility | C. Because `else` converts strings to integers | D. Because equality cannot be tested in Python
<Answer: B. Because equality is the only remaining possibility>
<Explanation: If `x` is neither less than nor greater than `y`, then `x` must equal `y`.>

**10. Why can an `elif` chain be more efficient than three separate `if` statements?**
A. It avoids checking later branches once a match is found | B. It automatically sorts all variables | C. It runs every branch no matter what | D. It removes the need for indentation
<Answer: A. It avoids checking later branches once a match is found>
<Explanation: In an `if`/`elif` chain, Python stops checking the chain after the first true branch runs.>

**11. What does `or` mean in a condition?**
A. Both conditions must be true | B. At least one condition must be true | C. The condition must be false | D. The condition is ignored
<Answer: B. At least one condition must be true>
<Explanation: `or` makes the whole condition true when any one of its connected tests is true.>

**12. Which condition is a simpler way to ask whether `x` is less than `y` or greater than `y`?**
A. x == y | B. x != y | C. x <= y | D. x >= y
<Answer: B. x != y>
<Explanation: If `x` is either less than or greater than `y`, then `x` is not equal to `y`.>

**13. What does `and` mean in a condition?**
A. Both conditions must be true | B. Only the first condition is checked | C. At least one condition must be false | D. The condition becomes a string
<Answer: A. Both conditions must be true>
<Explanation: `and` requires every connected condition to be true for the whole expression to be true.>

**14. Which expression is a Pythonic chained comparison for an A grade from 90 through 100?**
A. score >= 90 and score <= 100 | B. 90 <= score <= 100 | C. score <= 90 <= 100 | D. 100 <= score <= 90
<Answer: B. 90 <= score <= 100>
<Explanation: Python allows chained comparisons such as `90 <= score <= 100` to express a range clearly.>

**15. Why can the grade logic be simplified to `if score >= 90`, `elif score >= 80`, and so on?**
A. Earlier branches rule out higher ranges before later ones are checked | B. Python ignores all `elif` conditions | C. Scores cannot be less than zero | D. `else` always prints an A
<Answer: A. Earlier branches rule out higher ranges before later ones are checked>
<Explanation: Once higher score ranges have failed, each later `elif` only needs to check its lower boundary.>

**16. What does the modulo operator `%` return?**
A. The product after multiplication | B. The remainder after division | C. The larger of two numbers | D. The number rounded down
<Answer: B. The remainder after division>
<Explanation: Modulo gives the remainder left over after one number is divided by another.>

**17. Why is `x % 2 == 0` used in the parity example?**
A. It checks whether `x` is even | B. It checks whether `x` is a string | C. It doubles `x` | D. It asks whether `x` is negative
<Answer: A. It checks whether `x` is even>
<Explanation: A number is even when dividing it by 2 leaves a remainder of 0.>

**18. Why can `if is_even(x):` work without writing `== True`?**
A. `is_even(x)` returns a Boolean value | B. `if` statements cannot compare values | C. Python automatically prints the function name | D. Functions always return strings
<Answer: A. `is_even(x)` returns a Boolean value>
<Explanation: If a function returns `True` or `False`, an `if` statement can evaluate that return value directly.>

**19. Which implementation is the most concise Pythonic version of `is_even(n)` from the lecture?**
A. return n % 2 == 0 | B. print(n % 2 == 0) | C. if n = 2: return True | D. return "Even"
<Answer: A. return n % 2 == 0>
<Explanation: The expression `n % 2 == 0` already evaluates to `True` or `False`, so it can be returned directly.>

**20. In a `match` statement, what does `case _:` do?**
A. It matches any value not handled by earlier cases | B. It stops the program before matching | C. It creates a variable named `_` that must equal zero | D. It repeats all previous cases
<Answer: A. It matches any value not handled by earlier cases>
<Explanation: The underscore case acts like a default branch when no earlier `case` pattern matched.>

**21. In a `match` statement, what does the single vertical bar between case patterns do?**
A. It allows one case to match any of several values | B. It starts a loop inside the case | C. It converts the input to a string | D. It makes every case run
<Answer: A. It allows one case to match any of several values>
<Explanation: The vertical bar in a `case` pattern works like `or` by grouping multiple matching values into one branch.>
