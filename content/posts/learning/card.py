from enum import Enum


class Card():
    class CardValue(Enum):
        ACE = 1
        TWO = 2
        THREE = 3
        FOUR = 4
        FIVE = 5
        SIX = 6
        SEVEN = 7
        EIGHT = 8
        NINE = 9
        JACK = 10
        QUEEN = 11
        KING = 12

        def __str__(self):
            return f"{self.name.title()}"

    class CardSuit(Enum):
        SPADES = 0
        HEARTS = 1
        DIAMONDS = 2
        CLUBS = 3

        def __str__(self):
            return f"{self.name.title()}"

    DEFAULT_VAL = CardValue.THREE
    DEFAULT_SUIT = CardSuit.SPADES

    def __init__(self, cardValue=DEFAULT_VAL, cardSuit=DEFAULT_SUIT):
        self.set(cardValue, cardSuit)

    @staticmethod
    def valid_card(cardValue, cardSuit):
        if type(cardValue) != Card.CardValue:
            return False

        if type(cardSuit) != Card.CardSuit:
            return False

        return True

    def set(self, cardValue, cardSuit):
        self.error_flag = not Card.valid_card(cardValue, cardSuit)
        self.cardValue = cardValue
        self.cardSuit = cardSuit

    def get_cardSuit(self):
        return self.cardSuit

    def get_cardValue(self):
        return self.cardValue

    def get_error_flag(self):
        return self.error_flag

    def equals(self, other_card):
        if self.cardValue == other_card.cardValue:
            self.cardSuit == other_card.cardSuit
            self.error_flag = self.cardSuit
        return True

    def __str__(self):
        if self.error_flag:
            return "** illegal **"

        return f"{self.cardValue} of {self.cardSuit}"


class Hand:
    MAX_CARDS_PER_HAND = 50

    def __init__(self):
        self.reset_hand()

    def reset_hand(self):
        self.my_cards = []
        self.num_cards = len(self.my_cards)

    def take_card(self, card):
        if len(self.my_cards) == Hand.MAX_CARDS_PER_HAND:
            return False

        if not card.error_flag:
            self.my_cards.append(card)
            self.num_cards = len(self.my_cards)
        else:
            print("takeCard() GOOD: rejected bad card and returned true")

        return True

    def play_card(self):
        if len(self.my_cards) == 0:
            return None

        self.num_cards = self.num_cards - 1
        return self.my_cards.pop()

    def get_num_cards(self):
        return self.num_cards

    def inspect_card(self, k):
        if k < 0 or k >= len(self.my_cards):
            return Card("Invalid", "Invalid")

        return Card(self.my_cards[k].get_cardValue(),
                    self.my_cards[k].get_cardSuit())

    def __str__(self):
        result = ""
        if len(self.my_cards) > 0:
            result = f"{self.my_cards[0]}"
            for card in self.my_cards[1:]:
                result += f", {card}"

        return f"Hand = ( {result} )"


def test_card():
    print("=" * 80)
    # Two legal cards and one illegal
    legal = Card(Card.CardValue.TWO, Card.CardSuit.CLUBS)
    legal1 = Card(Card.CardValue.THREE, Card.CardSuit.HEARTS)
    illegal = Card("blah", 3)
    print(legal)
    print(legal1)
    print(illegal)

    # Now let's make the illegal card legal
    illegal.set(Card.CardValue.QUEEN, Card.CardSuit.HEARTS)
    print(illegal)

    print("=" * 80)


def test_hand():
    print("=" * 30 + " run of Hand Client " + "=" * 30)
    a = Card(Card.CardValue.QUEEN, Card.CardSuit.DIAMONDS)
    b = Card(Card.CardValue.NINE, Card.CardSuit.HEARTS)
    c = Card(Card.CardValue.THREE, Card.CardSuit.CLUBS)
    d = Card(Card.CardValue.FOUR, Card.CardSuit.SPADES)
    badCard = Card("Illegal", "Illegal")

    cards = [a, b, c, d, badCard]

    hand = Hand()
    print("hand before deal")
    print(f"    {hand}")
    print(f"    num cards = {hand.get_num_cards()}")

    cardIndex = 0
    while hand.take_card(cards[cardIndex % len(cards)]):
        cardIndex = cardIndex + 1

    print("\nHand full\n")

    print("hand after deal")
    print(f"    {hand}")
    print(f"    num cards = {hand.get_num_cards()}")

    print()

    print("inspecting card 5")
    test = hand.inspect_card(5)
    print(test)
    print("changing inspected card to Ace of Spades")
    test.set(Card.CardValue.ACE, Card.CardSuit.SPADES)
    print("card 5 unchanged?")
    print(hand.inspect_card(5))


if __name__ == "__main__":
    test_card()
    print()
    test_hand()
