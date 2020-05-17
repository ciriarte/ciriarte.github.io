class Cat:  # if you don't specify the base class, python assumes it comes from Object
  def __init__(self, oos_when_hungry, oos_when_playful, oos_when_open_door):  # the reference to the cat we're constructing (self), and the number of oos they use when meowing
    self.oos_when_hungry = oos_when_hungry
    self.oos_when_playful = oos_when_playful
    self.oos_when_open_door = oos_when_open_door

  @staticmethod
  def meow(number_of_os):
    print("ฅ^•ﻌ•^ฅ Me" + "o" * number_of_os + "w")

  def open_the_door(self):
    Cat.meow(self.oos_when_open_door)

  def hungry(self):
    Cat.meow(self.oos_when_hungry)

  def i_wanna_play(self):
    Cat.meow(self.oos_when_playful)

  def equals(self, other_cat):
    if self.oos_when_hungry == other_cat.oos_when_hungry and \
      self.oos_when_playful == other_cat.oos_when_playful and \
      self.oos_when_open_door == other_cat.oos_when_open_door:
      return True
    else:
      return False

  def __equals__(self, other_cat):
    return self.equals(other_cat)

# Let me tell you about my girly kitty's morning
a = Cat(1, 4, 8)
a.open_the_door()
a.hungry()
a.i_wanna_play()

print()  # Let's add some space for readability. This line has nothing to do with the cats.

# Let me tell you about my big macho kitty
b = Cat(2, 10, 5)
b.open_the_door()
b.hungry()
b.i_wanna_play()

print()  # Let's add some space for readability. This line has nothing to do with the cats.

if a.equals(b):
  print("a == b Same Cat")
else:
  print("a == b Not the same Cat!")

print()  # Let's add some space for readability. This line has nothing to do with the cats.

if a.equals(a):
  print("a == a Same Cat")
else:
  print("a == a Not the same Cat!")

print()  # Let's add some space for readability. This line has nothing to do with the cats.

if b.equals(b):
  print("b == b Same Cat")
else:
  print("b == b Not the same Cat!")

print()  # Let's add some space for readability. This line has nothing to do with the cats.

if a == b:
  print("a == b It's the same cat!")
else:
  print("a == b It's not the same cat!")

print()  # Let's add some space for readability. This line has nothing to do with the cats.

if a == a:
  print("a == a It's the same cat!")
else:
  print("a == a It's not the same cat!")
