import random


def analyse(text: str) -> str:
    number = random.random()
    sentiment = ""
    if number >= 0.5:
        sentiment = "negative"
    else:
        sentiment = "positive"

    return sentiment
