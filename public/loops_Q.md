**1. What is the main purpose of a loop in Python?**
A. To store key-value pairs | B. To repeat a block of code | C. To convert text to numbers | D. To define a new function
<Answer: B. To repeat a block of code>
<Explanation: Loops let a program run the same code over and over without manually copying it.>

**2. In the lecture's first `while` example, why does `while i != 0:` loop forever when `i` starts at 3?**
A. `i` is never changed inside the loop | B. `print` stops numbers from changing | C. `while` loops always run forever | D. The condition starts as false
<Answer: A. `i` is never changed inside the loop>
<Explanation: Since `i` remains 3, the condition `i != 0` keeps being true forever.>

**3. What keyboard shortcut does the lecture mention for breaking out of an infinite loop in the terminal?**
A. Ctrl+A | B. Ctrl+B | C. Ctrl+C | D. Ctrl+Z
<Answer: C. Ctrl+C>
<Explanation: Pressing Ctrl+C interrupts a program that is stuck running indefinitely.>

**4. In `i = i - 1`, what happens during each iteration of a countdown loop?**
A. `i` increases by 1 | B. `i` becomes a string | C. `i` decreases by 1 | D. `i` resets to 0
<Answer: C. `i` decreases by 1>
<Explanation: The assignment replaces `i` with a value that is one smaller than before.>

**5. Why does the lecture recommend starting counts at 0 in programming?**
A. Python cannot count from 1 | B. Counting from 0 is common programming practice | C. It makes loops run forever | D. Lists require negative numbers
<Answer: B. Counting from 0 is common programming practice>
<Explanation: The lecture notes that programmers typically count from 0, then 1, then 2.>

**6. What is `i += 1` equivalent to in Python?**
A. `i = i + 1` | B. `i = i - 1` | C. `i == 1` | D. `i = 1`
<Answer: A. `i = i + 1`>
<Explanation: The `+=` operator updates a variable by adding the value on the right to its current value.>

**7. What values does `range(3)` provide to a `for` loop?**
A. 1, 2, and 3 | B. 0, 1, and 2 | C. 0, 1, 2, and 3 | D. 3, 2, and 1
<Answer: B. 0, 1, and 2>
<Explanation: `range(3)` counts up from 0 and stops before reaching 3.>

**8. Why might a programmer write `for _ in range(3):` instead of `for i in range(3):`?**
A. The loop should skip every other value | B. The loop variable is not used in the body | C. The loop needs a dictionary | D. The range must start at 1
<Answer: B. The loop variable is not used in the body>
<Explanation: An underscore signals that the loop variable exists only to repeat the code.>

**9. What output issue occurs with `print("meow" * 3)`?**
A. It prints only one meow | B. It prints three meows without line breaks | C. It raises a syntax error | D. It prints the number 3
<Answer: B. It prints three meows without line breaks>
<Explanation: Multiplying the string repeats it directly, producing `meowmeowmeow` on one line.>

**10. In `print("meow\n" * 3, end="")`, what does `end=""` help avoid?**
A. An extra blank line after the repeated text | B. The first meow being printed | C. A loop condition becoming false | D. The string being multiplied
<Answer: A. An extra blank line after the repeated text>
<Explanation: Setting `end` to an empty string prevents `print` from adding its usual final newline.>

**11. In the input-validation pattern from the lecture, what does `continue` do inside a loop?**
A. Ends the entire program | B. Moves immediately to the next iteration | C. Returns a value to `main` | D. Creates a new list
<Answer: B. Moves immediately to the next iteration>
<Explanation: `continue` tells Python to skip the rest of the current iteration and loop again.>

**12. In the input-validation pattern from the lecture, what does `break` do?**
A. Exits the loop early | B. Converts input to an integer | C. Repeats the current line | D. Prints a blank line
<Answer: A. Exits the loop early>
<Explanation: `break` stops the loop before it would otherwise continue iterating.>

**13. Why does `while True:` commonly appear in input-validation code?**
A. It guarantees the input is already valid | B. It creates a loop that can keep asking until `break` runs | C. It prevents `int` from raising errors | D. It makes the program count from 0
<Answer: B. It creates a loop that can keep asking until `break` runs>
<Explanation: A `while True` loop runs indefinitely until some condition inside the loop explicitly breaks out.>

**14. In the lecture's function-based version, what does `return n` do in `get_number()`?**
A. Prints `n` three times | B. Sends the validated number back to the caller | C. Starts the loop over | D. Deletes the user's input
<Answer: B. Sends the validated number back to the caller>
<Explanation: `return n` gives the accepted value to the function that called `get_number()`.>

**15. Given `students = ["Hermione", "Harry", "Ron"]`, what does `students[0]` access?**
A. Hermione | B. Harry | C. Ron | D. Gryffindor
<Answer: A. Hermione>
<Explanation: Python list indexes start at 0, so index 0 refers to the first item.>

**16. Why does the lecture use `for student in students:` when printing each student name?**
A. The loop needs the actual list values | B. The loop must ignore every value | C. Dictionaries cannot be looped over | D. `len` only works with strings
<Answer: A. The loop needs the actual list values>
<Explanation: The variable `student` holds each name from the list and is used inside the loop body.>

**17. What does `len(students)` provide in `for i in range(len(students)):`?**
A. The first student in the list | B. The number of items in the list | C. The house for each student | D. The final printed line
<Answer: B. The number of items in the list>
<Explanation: `len` returns the list's length so the loop can cover all valid indexes.>

**18. What is a Python dictionary designed to associate?**
A. Conditions with loops | B. Keys with values | C. Numbers with comments | D. Functions with files
<Answer: B. Keys with values>
<Explanation: A dictionary stores values under keys so related information can be looked up by name.>

**19. When looping with `for student in students:` over a dictionary of names to houses, what does `student` represent by default?**
A. A dictionary key | B. A dictionary value | C. A list index | D. A printed separator
<Answer: A. A dictionary key>
<Explanation: Iterating directly over a dictionary visits its keys, such as the student names.>

**20. In `print(student, students[student], sep=", ")`, what does `sep=", "` control?**
A. The text placed between printed values | B. The number of loop iterations | C. The key used in the dictionary | D. The value returned by a function
<Answer: A. The text placed between printed values>
<Explanation: The `sep` argument tells `print` what separator to place between multiple values.>

**21. Which description matches the lecture's richer `students` data structure?**
A. A list of dictionaries, with `None` for a missing patronus | B. A dictionary of loops, with `break` for a missing patronus | C. A string of lists, with `_` for a missing patronus | D. A tuple of functions, with `range` for a missing patronus
<Answer: A. A list of dictionaries, with `None` for a missing patronus>
<Explanation: Each student is stored as a dictionary in a list, and `None` represents the absence of a patronus value.>

**22. In the Mario square example, why does the code use one loop inside another loop?**
A. One loop handles rows and the inner loop handles bricks in each row | B. Python requires two loops for every print call | C. The inner loop validates user input | D. Dictionaries can only be printed with nested loops
<Answer: A. One loop handles rows and the inner loop handles bricks in each row>
<Explanation: The outer loop moves through rows while the inner loop prints each brick across that row.>
