export const codeReferenceAnswers: Record<string, string> = {
  'object-oriented-programming-21': `
class Student:
    allowed_houses = ["Blue", "Green", "Red", "Yellow"]

    def __init__(self, name: str, house: str):
        if not name:
            raise ValueError("Missing name")
        self.name = name
        self.house = house

    @property
    def house(self) -> str:
        return self._house

    @house.setter
    def house(self, value: str) -> None:
        if value not in self.allowed_houses:
            raise ValueError("Invalid house")
        self._house = value

    def __str__(self) -> str:
        return f"{self.name} from {self.house}"

    @classmethod
    def from_csv_row(cls, row: str):
        name, house = row.split(",")
        return cls(name.strip(), house.strip())
`,
  'object-oriented-programming-22': `
class BankAccount:
    def __init__(self, owner: str, balance: int = 0):
        if balance < 0:
            raise ValueError("Opening balance cannot be negative")
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.balance += amount

    def withdraw(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount

account = BankAccount("Maya", 100)
try:
    account.withdraw(150)
except ValueError:
    pass
`,
  'object-oriented-programming-23': `
class LineItem:
    def __init__(self, name: str, price: int, quantity: int):
        self.name = name
        self.price = price
        self.quantity = quantity

    def total(self) -> int:
        return self.price * self.quantity

class ShoppingCart:
    def __init__(self):
        self.items: list[LineItem] = []

    def add(self, item: LineItem) -> None:
        self.items.append(item)

    def total(self) -> int:
        return sum(item.total() for item in self.items)

cart = ShoppingCart()
cart.add(LineItem("Notebook", 80, 2))
cart.add(LineItem("Pen", 20, 3))
cart.add(LineItem("Bag", 500, 1))
print(cart.total())
`,
  'object-oriented-programming-24': `
class LibraryBook:
    def __init__(self, title: str, author: str):
        self.title = title
        self.author = author
        self.borrower = None

    def check_out(self, member_name: str) -> None:
        if self.borrower is not None:
            raise ValueError("Book is already checked out")
        self.borrower = member_name

    def return_book(self) -> None:
        self.borrower = None

    def is_available(self) -> bool:
        return self.borrower is None

book = LibraryBook("Python Basics", "LearnABLE")
book.check_out("Ira")
book.return_book()
`,
  'object-oriented-programming-25': `
class RestaurantOrder:
    allowed_statuses = ["new", "preparing", "ready", "delivered"]

    def __init__(self, table_number: int):
        self.table_number = table_number
        self.items: list[str] = []
        self.status = "new"

    def add_item(self, item: str) -> None:
        if self.status != "new":
            raise ValueError("Cannot add items after cooking starts")
        self.items.append(item)

    def update_status(self, status: str) -> None:
        if status not in self.allowed_statuses:
            raise ValueError("Invalid status")
        self.status = status
`,
  'object-oriented-programming-26': `
class RideShareTrip:
    base_fare = 40
    price_per_km = 18

    def __init__(self, rider: str, distance_km: float):
        if distance_km <= 0:
            raise ValueError("Distance must be positive")
        self.rider = rider
        self.distance_km = distance_km

    def fare(self) -> float:
        return self.base_fare + self.distance_km * self.price_per_km
`,
  'object-oriented-programming-27': `
class SupportTicket:
    def __init__(self, customer: str, issue: str):
        self.customer = customer
        self.issue = issue
        self.priority = "normal"
        self.closed = False

    def escalate(self) -> None:
        if self.closed:
            raise ValueError("Cannot escalate a closed ticket")
        self.priority = "high"

    def close(self) -> None:
        self.closed = True
`,
  'object-oriented-programming-28': `
class InventoryItem:
    def __init__(self, name: str, quantity: int, reorder_at: int):
        self.name = name
        self.quantity = quantity
        self.reorder_at = reorder_at

    def sell(self, count: int) -> None:
        if count <= 0:
            raise ValueError("Sell count must be positive")
        if count > self.quantity:
            raise ValueError("Not enough stock")
        self.quantity -= count

    def restock(self, count: int) -> None:
        if count <= 0:
            raise ValueError("Restock count must be positive")
        self.quantity += count

    def needs_reorder(self) -> bool:
        return self.quantity <= self.reorder_at
`,
  'object-oriented-programming-29': `
class Notification:
    def __init__(self, recipient: str, message: str):
        self.recipient = recipient
        self.message = message

    def send(self) -> str:
        raise NotImplementedError("Subclasses must implement send")

class EmailNotification(Notification):
    def send(self) -> str:
        return f"Email to {self.recipient}: {self.message}"

class SmsNotification(Notification):
    def send(self) -> str:
        return f"SMS to {self.recipient}: {self.message}"

notifications = [
    EmailNotification("user@example.com", "Ready"),
    SmsNotification("+919000000000", "OTP"),
]

for notification in notifications:
    print(notification.send())
`,
  'object-oriented-programming-30': `
class Password:
    @staticmethod
    def is_strong(value: str) -> bool:
        return len(value) >= 8 and any(char.isdigit() for char in value)

class User:
    def __init__(self, name: str, email: str, password: str):
        if not name:
            raise ValueError("Missing name")
        if "@" not in email:
            raise ValueError("Invalid email")
        if not Password.is_strong(password):
            raise ValueError("Weak password")
        self.name = name
        self.email = email

    @classmethod
    def from_form(cls, form: dict[str, str]):
        return cls(
            form["name"].strip(),
            form["email"].strip(),
            form["password"].strip(),
        )
`,
};
