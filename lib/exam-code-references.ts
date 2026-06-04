export const codeReferenceAnswers: Record<string, string> = {
  'functions-variables-exam-code': `
def format_student(name: str, age: int, course: str) -> str:
    clean_name = name.strip().title()
    clean_course = course.strip().title()

    if not clean_name:
        raise ValueError("Name is required")
    if age < 1:
        raise ValueError("Age must be positive")
    if not clean_course:
        raise ValueError("Course is required")

    return f"{clean_name} ({age}) - {clean_course}"

print(format_student("  priya raman  ", 18, " python "))
print(format_student("arjun", 21, "data science"))
`,
  'conditionals-exam-code': `
def scholarship_status(mark: int, attendance: int, income: int) -> str:
    if not 0 <= mark <= 100:
        raise ValueError("Invalid mark")
    if not 0 <= attendance <= 100:
        raise ValueError("Invalid attendance")
    if income < 0:
        raise ValueError("Invalid income")

    if mark >= 90 and attendance >= 85 and income <= 300000:
        return "full"
    if mark >= 75 and attendance >= 75:
        return "partial"
    return "not eligible"
`,
  'loops-exam-code': `
def summarize_marks(marks: list[int]) -> dict[str, int]:
    summary = {
        "total": 0,
        "pass": 0,
        "fail": 0,
        "distinction": 0,
    }

    for mark in marks:
        if not 0 <= mark <= 100:
            raise ValueError("Invalid mark")

        summary["total"] += 1
        if mark >= 40:
            summary["pass"] += 1
        else:
            summary["fail"] += 1

        if mark >= 75:
            summary["distinction"] += 1

    return summary
`,
  'exceptions-exam-code': `
def split_bill(total_text: str, people_text: str) -> float:
    try:
        total = float(total_text)
        people = int(people_text)
    except ValueError as error:
        raise ValueError("Enter valid numbers") from error

    if total <= 0:
        raise ValueError("Bill total must be positive")
    if people <= 0:
        raise ValueError("People count must be positive")

    return round(total / people, 2)
`,
  'libraries-exam-code': `
import statistics

def report_scores(scores: list[int]) -> dict[str, float]:
    if not scores:
        raise ValueError("At least one score is required")

    for score in scores:
        if not 0 <= score <= 100:
            raise ValueError("Invalid score")

    return {
        "mean": round(statistics.mean(scores), 2),
        "median": round(statistics.median(scores), 2),
        "highest": max(scores),
    }
`,
  'unit-tests-exam-code': `
def classify_mark(mark: int) -> str:
    if mark < 0 or mark > 100:
        return "invalid"
    if mark < 40:
        return "fail"
    if mark < 75:
        return "pass"
    return "distinction"

def test_invalid_mark():
    assert classify_mark(-1) == "invalid"
    assert classify_mark(101) == "invalid"

def test_fail_mark():
    assert classify_mark(0) == "fail"
    assert classify_mark(39) == "fail"

def test_pass_mark():
    assert classify_mark(40) == "pass"
    assert classify_mark(74) == "pass"

def test_distinction_mark():
    assert classify_mark(75) == "distinction"
    assert classify_mark(100) == "distinction"
`,
  'file-io-exam-code': `
import csv

def load_present_names(path: str) -> list[str]:
    present_names: list[str] = []

    with open(path, "r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            name = (row.get("name") or "").strip()
            status = (row.get("status") or "").strip().lower()

            if name and status == "present":
                present_names.append(name)

    return present_names
`,
  'regex-exam-code': `
import re

def normalize_indian_phone(text: str) -> str:
    cleaned = re.sub(r"[\\s-]+", "", text.strip())
    match = re.fullmatch(r"(?:\\+?91)?([6-9]\\d{9})", cleaned)

    if not match:
        raise ValueError("Invalid phone number")

    return f"+91{match.group(1)}"
`,
  'algorithms-exam-code': `
def find_insert_position(numbers: list[int], target: int) -> int:
    left = 0
    right = len(numbers)

    while left < right:
        middle = (left + right) // 2

        if numbers[middle] < target:
            left = middle + 1
        else:
            right = middle

    return left
`,
  'oop-exam-code': `
class LibraryMember:
    max_books = 3

    def __init__(self, name: str):
        clean_name = name.strip()
        if not clean_name:
            raise ValueError("Name is required")
        self.name = clean_name
        self.borrowed: list[str] = []

    def can_borrow(self) -> bool:
        return len(self.borrowed) < self.max_books

    def borrow(self, title: str) -> None:
        clean_title = title.strip()
        if not clean_title:
            raise ValueError("Title is required")
        if not self.can_borrow():
            raise ValueError("Borrowing limit reached")
        self.borrowed.append(clean_title)

    def return_book(self, title: str) -> None:
        clean_title = title.strip()
        if clean_title not in self.borrowed:
            raise ValueError("Book was not borrowed")
        self.borrowed.remove(clean_title)
`,
};
