# File I/O

## Main idea

File I/O means reading information from files and writing information to files. Unlike values stored only in memory, file data can remain after the program ends.

## Writing to a file

Code example:

```python
name = input("What's your name? ")

with open("names.txt", "a") as file:
    file.write(f"{name}\n")
```

What this does:

- opens `names.txt`
- uses append mode `"a"` so new data is added instead of replacing old data
- writes the name followed by a newline

## Reading from a file

Code example:

```python
with open("names.txt", "r") as file:
    for line in file:
        print("hello,", line.rstrip())
```

## Why `with` matters

The `with` statement handles opening and closing cleanly. It reduces the risk of forgetting to close a file.

## CSV files

CSV means comma-separated values. These files store row-and-column style data and are common in spreadsheets and data exchange.

Lecture 6 introduces tools for reading CSV files more reliably than splitting raw text by hand.

## Sorting and processing file data

Once file data is loaded, Python can:

- sort it
- filter it
- print summaries

## Binary files and images

Lecture 6 also introduces the idea that not all files are plain text. Some files, such as images, are binary data and need different tools, such as PIL, to work with them.

## Reading note for screen readers

When a file example includes mode letters:

- `"r"` means read
- `"w"` means write
- `"a"` means append

These single letters change program behavior significantly.

## Summary

File I/O lets Python preserve data, reuse saved information, and work with structured files like text files and CSVs.
