import { getSubjectTitle } from './config';
import { codeReferenceAnswers } from './exam-code-references';
import {
  CODE_WRITING_QUESTIONS,
  type ExamQuestion,
  HARD_MCQ_QUESTIONS,
} from './exam';

const mixedMultipleChoiceQuestionSpecs = [
  {
    id: 'functions-variables-exam-mcq-1',
    correctLetter: 'A',
    explanation: '`strip()` removes extra outside spaces and `title()` formats the name for display.',
    options: ['name.strip().title()', 'name.lower().split()', 'int(name)', 'print(name)'],
    question: 'A student enters `"  priya raman  "`. Which expression best prepares it as a display name?',
    subjectId: 'functions-variables',
  },
  {
    id: 'functions-variables-exam-mcq-2',
    correctLetter: 'C',
    explanation: '`input()` returns text, so numeric input must be converted before arithmetic.',
    options: ['Because `input()` returns an integer automatically', 'Because `+` never works with numbers', 'Because `input()` returns a string until converted', 'Because f-strings cannot show integers'],
    question: 'Why does a program often use `int(input("Age: "))` instead of only `input("Age: ")` before doing math?',
    subjectId: 'functions-variables',
  },
  {
    id: 'conditionals-exam-mcq-1',
    correctLetter: 'B',
    explanation: 'Earlier branches already ruled out scores 90 and above, so the second branch only needs the lower boundary.',
    options: ['It accidentally accepts all scores', 'It relies on earlier `if` and `elif` checks ruling out higher ranges', 'It makes Python sort the scores first', 'It prevents the final `else` from running'],
    question: 'In a grade chain using `if score >= 90` then `elif score >= 80`, why does the second branch correctly mean 80 through 89?',
    subjectId: 'conditionals',
  },
  {
    id: 'conditionals-exam-mcq-2',
    correctLetter: 'D',
    explanation: '`and` requires both conditions to be true, while `or` allows either condition to be true.',
    options: ['`and` checks only the first condition; `or` checks only the second', '`and` is for strings; `or` is for numbers', '`and` always returns `False`; `or` always returns `True`', '`and` requires every connected test; `or` needs at least one connected test'],
    question: 'What is the key difference between `and` and `or` in a Python condition?',
    subjectId: 'conditionals',
  },
  {
    id: 'loops-exam-mcq-1',
    correctLetter: 'A',
    explanation: 'The loop condition must eventually become false, so the variable in the condition must change.',
    options: ['The loop variable is not updated inside the loop', 'The loop starts at zero', 'The loop uses `range`', 'The loop contains a function call'],
    question: 'A `while attempts < 3:` loop never stops. What is the most likely bug?',
    subjectId: 'loops',
  },
  {
    id: 'loops-exam-mcq-2',
    correctLetter: 'C',
    explanation: 'The outer loop handles each row and the inner loop handles each column inside that row.',
    options: ['One loop validates input and the other imports modules', 'One loop catches errors and the other returns data', 'One loop walks rows and the other walks columns', 'One loop creates a class and the other creates objects'],
    question: 'Why does a grid-printing problem often use a loop inside another loop?',
    subjectId: 'loops',
  },
  {
    id: 'algorithms-exam-mcq-1',
    correctLetter: 'B',
    explanation: 'Binary search depends on sorted order so it can discard the half that cannot contain the target.',
    options: ['The list must have no repeated values', 'The list must already be sorted', 'The list must contain only strings', 'The list must be stored in a CSV file'],
    question: 'Which condition is required before binary search can safely replace linear search?',
    subjectId: 'algorithms',
  },
  {
    id: 'algorithms-exam-mcq-2',
    correctLetter: 'D',
    explanation: 'Dropping constants keeps the focus on growth rate; both `n` and `n / 2` grow linearly.',
    options: ['Because constants are syntax errors', 'Because `n / 2` is always faster than `O(1)`', 'Because Big O only describes memory', 'Because both grow in proportion to input size'],
    question: 'Why is an algorithm that checks about `n / 2` items still described as `O(n)`?',
    subjectId: 'algorithms',
  },
  {
    id: 'algorithms-exam-mcq-3',
    correctLetter: 'A',
    explanation: 'A base case is the stopping condition that prevents recursive calls from continuing forever.',
    options: ['A condition that returns without another recursive call', 'A loop that sorts the list first', 'A file opened in read mode', 'A dictionary key used for lookup'],
    question: 'What is the safest description of a recursion base case?',
    subjectId: 'algorithms',
  },
  {
    id: 'exceptions-exam-mcq-1',
    correctLetter: 'C',
    explanation: 'A small `try` block makes it clear which specific operation is expected to fail.',
    options: ['Python rejects long `try` blocks', 'It makes exceptions impossible', 'It makes the risky line easier to identify', 'It automatically retries the code'],
    question: 'Why should a `try` block usually contain only the risky conversion or operation?',
    subjectId: 'exceptions',
  },
  {
    id: 'exceptions-exam-mcq-2',
    correctLetter: 'B',
    explanation: 'The `else` block on `try` runs only when the `try` block completes without an exception.',
    options: ['When an exception is caught', 'When the risky code succeeds', 'Before the `try` block starts', 'Every time the file is imported'],
    question: 'In `try` / `except` / `else`, when does the `else` block run?',
    subjectId: 'exceptions',
  },
  {
    id: 'libraries-exam-mcq-1',
    correctLetter: 'A',
    explanation: 'Importing the module keeps its names under the module namespace, so calls use dot notation.',
    options: ['`random.choice(items)`', '`choice.random(items)`', '`items.random.choice()`', '`import.choice(items)`'],
    question: 'After `import random`, which call correctly uses the `choice` function?',
    subjectId: 'libraries',
  },
  {
    id: 'libraries-exam-mcq-2',
    correctLetter: 'D',
    explanation: 'Checking argument count prevents indexing a command-line argument that was not provided.',
    options: ['To make the program run slower', 'To convert every argument to JSON', 'To install missing packages', 'To avoid reading a missing argument index'],
    question: 'Why should code check `len(sys.argv)` before using `sys.argv[1]`?',
    subjectId: 'libraries',
  },
  {
    id: 'unit-tests-exam-mcq-1',
    correctLetter: 'B',
    explanation: 'Unit tests check small pieces of behavior so bugs are caught close to their source.',
    options: ['To replace the program with comments', 'To verify a small function or behavior gives the expected result', 'To skip all edge cases', 'To make Python ignore errors'],
    question: 'What is the practical purpose of a unit test?',
    subjectId: 'unit-tests',
  },
  {
    id: 'unit-tests-exam-mcq-2',
    correctLetter: 'C',
    explanation: 'A strong invalid-withdrawal test checks both the raised error and that the balance did not change.',
    options: ['Only print the account object', 'Withdraw a valid amount and ignore the result', 'Expect `ValueError` and confirm the balance is unchanged', 'Deposit money and check the owner name'],
    question: 'Which assertion pattern best tests that an invalid withdrawal is handled safely?',
    subjectId: 'unit-tests',
  },
  {
    id: 'file-io-exam-mcq-1',
    correctLetter: 'A',
    explanation: 'The `with` statement closes the file automatically even if the block exits.',
    options: ['It closes the file automatically after the block', 'It sorts every line in the file', 'It prevents CSV files from being read', 'It converts text to integers'],
    question: 'Why is `with open(path, "r", encoding="utf-8") as file:` preferred for reading files?',
    subjectId: 'et-cetera',
  },
  {
    id: 'file-io-exam-mcq-2',
    correctLetter: 'D',
    explanation: 'DictReader uses column headings, which is safer than relying only on numeric positions.',
    options: ['It reads only image files', 'It removes the need for loops', 'It changes CSV rows into classes automatically', 'It lets code access fields by column name'],
    question: 'Why is `csv.DictReader` useful when a CSV file has headings?',
    subjectId: 'et-cetera',
  },
  {
    id: 'regex-exam-mcq-1',
    correctLetter: 'C',
    explanation: '`^` anchors the start, `$` anchors the end, and `\\.` matches a literal dot.',
    options: ['`^` means any character and `$` means a literal dot', '`^` sorts the text and `$` imports regex', '`^` anchors the start, `$` anchors the end, and `\\.` matches a literal dot', '`^` repeats a group and `$` deletes spaces'],
    question: 'In a regex such as `^[^@]+@[^@]+\\.[^@]+$`, what do the anchors and escaped dot do?',
    subjectId: 'et-cetera',
  },
  {
    id: 'object-oriented-programming-exam-mcq-1',
    correctLetter: 'B',
    explanation: 'The public property calls the setter; the private-style backing attribute stores the validated value.',
    options: ['Because `_house` cannot be read by any method', 'Because assigning to `self.house` inside the setter would call the setter again', 'Because setters only work on class attributes', 'Because `__init__` cannot use properties'],
    question: 'Why should a property setter store the final value in `_house` instead of assigning again to `self.house`?',
    subjectId: 'object-oriented-programming',
  },
  {
    id: 'object-oriented-programming-exam-mcq-2',
    correctLetter: 'A',
    explanation: 'Polymorphism lets different object types expose the same behavior name with different implementations.',
    options: ['Different classes can share a method name such as `send()` with different behavior', 'Python converts every object into a dictionary first', 'The loop ignores method names', 'Inheritance prevents subclasses from changing methods'],
    question: 'Why can a loop call `notification.send()` on both email and SMS notification objects?',
    subjectId: 'object-oriented-programming',
  },
] as const;

const mixedCodeQuestionSpecs = [
  {
    id: 'functions-variables-exam-code',
    instructions:
      'Write `format_student(name: str, age: int, course: str) -> str`. Clean the name and course with `strip()` and `title()`. Reject an empty name, empty course, or age below 1 with `ValueError`. Return text in the format `Name (age) - Course`. Include at least two example calls.',
    question: 'Code writing: Student profile formatter',
    subjectId: 'functions-variables',
  },
  {
    id: 'conditionals-exam-code',
    instructions:
      'Write `scholarship_status(mark: int, attendance: int, income: int) -> str`. Validate that mark and attendance are between 0 and 100 and income is not negative. Return `full` when mark is at least 90, attendance is at least 85, and income is at most 300000. Return `partial` when mark is at least 75 and attendance is at least 75. Otherwise return `not eligible`.',
    question: 'Code writing: Scholarship eligibility decision',
    subjectId: 'conditionals',
  },
  {
    id: 'loops-exam-code',
    instructions:
      'Write `summarize_marks(marks: list[int]) -> dict[str, int]`. Loop through all marks, validate that each mark is between 0 and 100, and return counts for `total`, `pass`, `fail`, and `distinction`. A pass is 40 or above. A distinction is 75 or above.',
    question: 'Code writing: Grade summary with loops',
    subjectId: 'loops',
  },
  {
    id: 'exceptions-exam-code',
    instructions:
      'Write `split_bill(total_text: str, people_text: str) -> float`. Convert the text inputs to a bill amount and number of people. Raise `ValueError` for invalid numbers, a non-positive bill, or a non-positive number of people. Return each person\'s share rounded to 2 decimal places.',
    question: 'Code writing: Safe bill splitter',
    subjectId: 'exceptions',
  },
  {
    id: 'libraries-exam-code',
    instructions:
      'Use the `statistics` module. Write `report_scores(scores: list[int]) -> dict[str, float]`. Reject an empty list, validate all scores from 0 through 100, and return `mean`, `median`, and `highest`. Round mean and median to 2 decimals.',
    question: 'Code writing: Score report using a library',
    subjectId: 'libraries',
  },
  {
    id: 'unit-tests-exam-code',
    instructions:
      'Write `classify_mark(mark: int) -> str`, returning `invalid` outside 0 through 100, `fail` below 40, `pass` from 40 through 74, and `distinction` from 75 through 100. Then write pytest-style test functions that cover invalid, fail, pass, and distinction cases.',
    question: 'Code writing: Unit tests for a mark classifier',
    subjectId: 'unit-tests',
  },
  {
    id: 'file-io-exam-code',
    instructions:
      'Write `load_present_names(path: str) -> list[str]`. Use `csv.DictReader` and `with open(path, "r", encoding="utf-8", newline="")`. The CSV has `name` and `status` columns. Return stripped names whose status is `present` after lowercasing. Skip blank names.',
    question: 'Code writing: CSV attendance reader',
    subjectId: 'et-cetera',
  },
  {
    id: 'regex-exam-code',
    instructions:
      'Use the `re` module. Write `normalize_indian_phone(text: str) -> str`. Accept spaces, dashes, and an optional `+91` or `91` prefix. Require exactly 10 final digits starting with 6, 7, 8, or 9. Return the normalized form `+91XXXXXXXXXX`. Raise `ValueError` when the input is invalid.',
    question: 'Code writing: Phone number sanitizer with regex',
    subjectId: 'et-cetera',
  },
  {
    id: 'algorithms-exam-code',
    instructions:
      'Write `find_insert_position(numbers: list[int], target: int) -> int` using binary search on a sorted ascending list. Return the index where the target exists or where it should be inserted. Do not use `list.index` or the `bisect` module.',
    question: 'Code writing: Binary search insertion point',
    subjectId: 'algorithms',
  },
  {
    id: 'oop-exam-code',
    instructions:
      'Write a `LibraryMember` class with `name`, `borrowed`, a `max_books` class attribute set to 3, and methods `borrow(title)`, `return_book(title)`, and `can_borrow()`. Reject blank names or titles. Reject borrowing more than 3 books. Reject returning a book that is not currently borrowed.',
    question: 'Code writing: Library member borrowing rules',
    subjectId: 'object-oriented-programming',
  },
] as const;

export async function getExamQuestions(): Promise<ExamQuestion[]> {
  const multipleChoiceQuestions = mixedMultipleChoiceQuestionSpecs
    .slice(0, HARD_MCQ_QUESTIONS)
    .map<ExamQuestion>((question) => ({
      correctAnswer: question.options[question.correctLetter.charCodeAt(0) - 65] ?? '',
      correctLetter: question.correctLetter,
      difficulty: 'Hard',
      explanation: question.explanation,
      id: question.id,
      marks: 1,
      options: [...question.options],
      question: question.question,
      subjectId: question.subjectId,
      subjectTitle: getSubjectTitle(question.subjectId),
      type: 'multiple-choice',
    }));
  const codeQuestions = mixedCodeQuestionSpecs
    .slice(0, CODE_WRITING_QUESTIONS)
    .map<ExamQuestion>((question) => ({
      correctAnswer: codeReferenceAnswers[question.id] ?? '',
      correctLetter: '',
      difficulty: 'Hard',
      id: question.id,
      instructions: question.instructions,
      marks: 1,
      options: [],
      question: question.question,
      subjectId: question.subjectId,
      subjectTitle: getSubjectTitle(question.subjectId),
      type: 'code',
    }));

  return [...multipleChoiceQuestions, ...codeQuestions];
}
