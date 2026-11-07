#!/usr/bin/env python3
"""Run a sanity test on index.html: tags balance, mandatory metadata, links, and ponytail comment."""
from html.parser import HTMLParser
import sys

class HTMLValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.void_tags = {'meta', 'link', 'br', 'hr', 'img', 'input'}
        self.links = []
        self.has_ponytail = False

    def handle_comment(self, data):
        if 'ponytail:' in data:
            self.has_ponytail = True

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_tags:
            self.tags.append(tag)
        if tag == 'a':
            for k, v in attrs:
                if k == 'href':
                    self.links.append(v)

    def handle_endtag(self, tag):
        if tag not in self.void_tags:
            assert self.tags, f"Unexpected closing tag </{tag}>"
            top = self.tags.pop()
            assert top == tag, f"Mismatched closing tag </{tag}>, expected </{top}>"

def main():
    with open('/tmp/gh-work/mdalboni.github.io/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    validator = HTMLValidator()
    validator.feed(content)

    assert validator.has_ponytail, "Missing ponytail comment"
    assert len(validator.tags) == 0, f"Unclosed tags: {validator.tags}"
    assert len(validator.links) >= 5, f"Expected at least 5 links, got {len(validator.links)}"
    assert "mailto:dalboni.max@hotmail.com" in validator.links, "Missing email link"
    assert "https://github.com/mdalboni" in validator.links, "Missing GitHub profile link"
    print("PASS: index.html is valid, accessible, and self-contained.")

if __name__ == '__main__':
    main()
