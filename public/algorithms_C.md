# Algorithms

## Main idea

An algorithm is a clear set of steps for solving a problem. Some algorithms are simple but slow. Others need more setup but become much faster as the input grows.

The ideas here are shown with Python lists, functions, dictionaries, and recursion.

## Why efficiency matters

Two programs can produce the same correct answer but take very different amounts of time.

Example problem:

```text
Is the number 50 inside this list?
```

If the list is short, almost any clear solution is fine. If the list has millions of values, the choice of algorithm matters.

## Pseudocode

Pseudocode is a human-readable plan before writing real code.

Example:

```text
For each number in the list:
    If the number is the target:
        Return true
Return false
```

This is not Python yet, but it is close enough to guide the Python version.

## Linear search

Linear search checks items one by one from the beginning until it finds the target or reaches the end.

Code example:

```python
def linear_search(numbers: list[int], target: int) -> bool:
    for number in numbers:
        if number == target:
            return True
    return False


values = [20, 500, 10, 5, 100, 1, 50]
print(linear_search(values, 50))
```

Linear search works even when the list is not sorted.

Worst case:

- the target is at the end, or
- the target is not present

In those cases, Python may need to check every item.

## Searching strings

In C, strings need special comparison functions. In Python, strings can be compared with `==`.

Code example:

```python
def contains_word(words: list[str], target: str) -> bool:
    for word in words:
        if word == target:
            return True
    return False


tokens = ["battleship", "boot", "cannon", "iron", "thimble", "top hat"]
print(contains_word(tokens, "iron"))
```

Python lists know their own length, so loops usually do not need hard-coded indexes.

## Binary search

Binary search is faster than linear search for large sorted lists.

Important condition:

- binary search only works correctly when the list is sorted

Instead of checking from left to right, binary search checks the middle. Then it discards the half that cannot contain the answer.

Code example:

```python
def binary_search(numbers: list[int], target: int) -> bool:
    left = 0
    right = len(numbers) - 1

    while left <= right:
        middle = (left + right) // 2

        if numbers[middle] == target:
            return True
        if target < numbers[middle]:
            right = middle - 1
        else:
            left = middle + 1

    return False


values = [1, 5, 10, 20, 50, 100, 500]
print(binary_search(values, 50))
```

Each step removes about half of the remaining list.

## Running time

Running time describes how an algorithm grows as the input grows.

Computer scientists often use asymptotic notation:

- Big O describes an upper bound, often the worst case
- Omega describes a lower bound, often the best case
- Theta describes a tight bound when the upper and lower bounds match

Common running times from faster to slower:

- `O(1)`: constant time
- `O(log n)`: logarithmic time
- `O(n)`: linear time
- `O(n log n)`: common for efficient sorting
- `O(n^2)`: quadratic time

Constants are usually dropped. An algorithm that takes about `n / 2` steps is still described as `O(n)` because it grows linearly.

## Phone book data in Python

Some languages use custom record-like types to group related values. In Python, a simple way to group a name and number is a dictionary.

Code example:

```python
people = [
    {"name": "Kelly", "number": "+1-617-495-1000"},
    {"name": "David", "number": "+1-617-495-1000"},
    {"name": "John", "number": "+1-949-468-2750"},
]

name = input("Name: ").strip()

for person in people:
    if person["name"] == name:
        print(f"Found {person['number']}")
        break
else:
    print("Not found")
```

This avoids two separate lists that must stay in the same order.

## Sorting

Sorting means arranging values in a useful order, such as smallest to largest or alphabetically.

Sorting can make later searching faster. For example, binary search requires sorted data.

Python has built-in sorting:

```python
numbers = [6, 3, 4, 1]
print(sorted(numbers))
```

But learning sorting algorithms helps explain why some solutions scale better than others.

## Selection sort

Selection sort repeatedly finds the smallest remaining value and puts it in the next position.

Code example:

```python
def selection_sort(numbers: list[int]) -> list[int]:
    numbers = numbers.copy()

    for i in range(len(numbers)):
        smallest_index = i

        for j in range(i + 1, len(numbers)):
            if numbers[j] < numbers[smallest_index]:
                smallest_index = j

        numbers[i], numbers[smallest_index] = numbers[smallest_index], numbers[i]

    return numbers


print(selection_sort([6, 3, 4, 1]))
```

Selection sort is easy to understand, but it is slow for large lists. Its worst case is `O(n^2)`.

## Bubble sort

Bubble sort repeatedly compares neighboring values and swaps them if they are out of order.

Code example:

```python
def bubble_sort(numbers: list[int]) -> list[int]:
    numbers = numbers.copy()

    for end in range(len(numbers) - 1, 0, -1):
        swapped = False

        for i in range(end):
            if numbers[i] > numbers[i + 1]:
                numbers[i], numbers[i + 1] = numbers[i + 1], numbers[i]
                swapped = True

        if not swapped:
            break

    return numbers


print(bubble_sort([6, 3, 4, 1]))
```

Bubble sort can stop early if no swaps happen. Its worst case is still `O(n^2)`, but its best case can be `Omega(n)` when the list is already sorted.

## Recursion

Recursion means a function calls itself.

A recursive function needs:

- a base case that stops the recursion
- a recursive case that calls the function with a smaller or simpler problem

Code example:

```python
def draw(height: int) -> None:
    if height <= 0:
        return

    draw(height - 1)
    print("#" * height)


draw(4)
```

The base case is `height <= 0`. Without a base case, a recursive function can keep calling itself until Python raises an error.

## Merge sort

Merge sort uses recursion to sort more efficiently:

```text
If the list has zero or one item:
    Return it
Otherwise:
    Sort the left half
    Sort the right half
    Merge the sorted halves
```

Code example:

```python
def merge_sort(numbers: list[int]) -> list[int]:
    if len(numbers) <= 1:
        return numbers

    middle = len(numbers) // 2
    left = merge_sort(numbers[:middle])
    right = merge_sort(numbers[middle:])

    return merge(left, right)


def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result


print(merge_sort([6, 3, 4, 1]))
```

Merge sort is usually much faster than selection sort or bubble sort on large lists. Its running time is `O(n log n)`.

## Reading note for screen readers

When studying algorithms:

- listen for the goal first
- then identify the input and output
- then follow one small example by hand
- then connect each loop or recursive call to how the remaining problem gets smaller

For running time, focus on the growth pattern. `O(n^2)` grows much faster than `O(n)` as the list becomes large.

## Summary

Algorithms are step-by-step solutions. Linear search works on any list but may check every item. Binary search is faster but requires sorted data. Sorting algorithms organize data, and different sorting strategies have different running times. Recursion solves a problem by breaking it into smaller versions of itself.
