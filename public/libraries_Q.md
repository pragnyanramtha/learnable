**1. What is a library in Python?**
A. A collection of reusable code | B. A type of syntax error | C. A loop that never ends | D. A required command-line argument
<Answer: A. A collection of reusable code>
<Explanation: Libraries provide reusable functions, modules, or packages that programs can import.>

**2. What does `import random` do?**
A. Loads the `random` module so its names can be used | B. Prints a random number immediately | C. Deletes unused variables | D. Installs Python
<Answer: A. Loads the `random` module so its names can be used>
<Explanation: `import random` makes functions such as `random.choice` and `random.randint` available.>

**3. In `random.choice(["heads", "tails"])`, what does `choice` do?**
A. Picks one item from the sequence | B. Sorts the list alphabetically | C. Adds both strings together | D. Counts the number of items
<Answer: A. Picks one item from the sequence>
<Explanation: `choice` returns one randomly selected element from a non-empty sequence.>

**4. What does the dot mean in `random.choice`?**
A. `choice` belongs to or is found inside the `random` module | B. Python should ignore `choice` | C. The code is a decimal number | D. The list should be shuffled
<Answer: A. `choice` belongs to or is found inside the `random` module>
<Explanation: Dot notation accesses a function or value inside a module or object.>

**5. What does `from random import choice` allow you to write?**
A. `choice(["heads", "tails"])` | B. `random.choice.choice()` | C. `import.choice(random)` | D. `sys.argv.choice`
<Answer: A. `choice(["heads", "tails"])`>
<Explanation: Importing the function directly lets the program call `choice` without the `random.` prefix.>

**6. What does `random.randint(1, 10)` return?**
A. A random integer from 1 through 10 | B. A random string | C. A shuffled list | D. Always the number 10
<Answer: A. A random integer from 1 through 10>
<Explanation: `randint(a, b)` includes both endpoints in the possible integer results.>

**7. What does `random.shuffle(cards)` do?**
A. Reorders the existing list in place | B. Returns a brand-new sorted list | C. Converts the list to a string | D. Counts the list items
<Answer: A. Reorders the existing list in place>
<Explanation: `shuffle` mutates the list directly instead of returning a separate shuffled list.>

**8. Which module provides a `mean` function for calculating averages?**
A. statistics | B. random | C. sys | D. json
<Answer: A. statistics>
<Explanation: The `statistics` module includes functions such as `statistics.mean`.>

**9. What is `sys.argv`?**
A. A list of command-line arguments | B. A random number generator | C. A package installer | D. A JSON formatter
<Answer: A. A list of command-line arguments>
<Explanation: `sys.argv` stores the program name and any extra command-line words supplied by the user.>

**10. In `python name.py David`, what is usually stored in `sys.argv[1]`?**
A. David | B. name.py | C. python | D. argv
<Answer: A. David>
<Explanation: `sys.argv[0]` is the script name, so the first user-provided argument is at index 1.>

**11. Why should a program check `len(sys.argv)` before using `sys.argv[1]`?**
A. To avoid indexing an argument that does not exist | B. To shuffle the arguments | C. To convert every argument to JSON | D. To import the `sys` module automatically
<Answer: A. To avoid indexing an argument that does not exist>
<Explanation: If the user provides too few arguments, accessing `sys.argv[1]` can raise an `IndexError`.>

**12. What does `sys.exit("Too few arguments")` do?**
A. Stops the program and reports the message | B. Adds another argument | C. Starts a new loop | D. Imports all packages
<Answer: A. Stops the program and reports the message>
<Explanation: `sys.exit` terminates the program early, optionally showing an explanatory message.>

**13. What does the slice `sys.argv[1:]` mean?**
A. All command-line items from index 1 through the end | B. Only the program name | C. The first character of every argument | D. Every argument except the last one
<Answer: A. All command-line items from index 1 through the end>
<Explanation: A slice with no ending index continues to the end of the sequence.>

**14. In Python slicing, is the ending index included?**
A. No, the ending index is excluded | B. Yes, always | C. Only for strings | D. Only for command-line arguments
<Answer: A. No, the ending index is excluded>
<Explanation: Python slices include the start position but stop before the end position.>

**15. What is `pip` used for?**
A. Installing third-party Python packages | B. Catching exceptions | C. Creating command-line arguments | D. Printing JSON data
<Answer: A. Installing third-party Python packages>
<Explanation: `pip` installs packages from sources such as the Python Package Index.>

**16. Why can third-party packages be called dependencies?**
A. The program depends on them being installed to run | B. They always come built into Python | C. They remove the need for imports | D. They are only comments
<Answer: A. The program depends on them being installed to run>
<Explanation: If code imports an external package, that package must exist in the environment.>

**17. What is an API?**
A. A way for one program to interact with another program or service | B. A Python-only loop keyword | C. A file extension for images | D. A kind of syntax error
<Answer: A. A way for one program to interact with another program or service>
<Explanation: APIs define how programs can request data or actions from other software.>

**18. What does `requests.get(url)` commonly do?**
A. Sends an HTTP GET request to a URL | B. Shuffles a list | C. Calculates an average | D. Exits the program
<Answer: A. Sends an HTTP GET request to a URL>
<Explanation: The `requests` package is often used to fetch data from web APIs.>

**19. What is JSON commonly used for?**
A. Exchanging structured text-based data between programs | B. Generating random numbers | C. Catching `ValueError` | D. Installing packages
<Answer: A. Exchanging structured text-based data between programs>
<Explanation: JSON is a common data format for API responses and configuration-like structured text.>

**20. Why use `json.dumps(data, indent=2)`?**
A. To format data in a more readable JSON string | B. To make a web request | C. To install `requests` | D. To choose a random song
<Answer: A. To format data in a more readable JSON string>
<Explanation: The `indent` option adds spacing that makes nested data easier for humans to read.>

**21. In API response code, what might `data["results"]` access?**
A. The list stored under the `results` key | B. The name of the Python file | C. The number of command-line arguments | D. The random module
<Answer: A. The list stored under the `results` key>
<Explanation: Dictionary indexing with a string key retrieves the value associated with that key.>

**22. How can you make your own Python library?**
A. Put reusable functions in one file and import them from another | B. Only write code in the terminal | C. Avoid all function definitions | D. Put every line inside `sys.argv`
<Answer: A. Put reusable functions in one file and import them from another>
<Explanation: A Python file containing functions can be imported as a module by another file.>
