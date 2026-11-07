#!/usr/bin/env python3
from html.parser import HTMLParser

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
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    validator = HTMLValidator()
    validator.feed(content)

    assert validator.has_ponytail, "Missing ponytail comment"
    assert len(validator.tags) == 0, f"Unclosed tags: {validator.tags}"
    assert "dalboni.max" not in content, "Personal email leaked"
    assert "lab.dalboni" not in content, "Internal lab domain leaked"
    assert "homelab-mini" not in content, "Internal hostname leaked"
    assert "Tailscale" not in content, "Internal VPN topology leaked"
    assert "Kernel 6.x" not in content, "Kernel version leaked"
    assert "hero-role" not in content, "Redundant subtitle should not exist"
    for lang in ['pt', 'en', 'es', 'zh']:
        assert f'data-lang="{lang}"' in content, f"Missing switcher button for {lang}"
    assert "Fintech" in content, "Missing industry domain"
    assert "https://github.com/mdalboni" in validator.links, "Missing GitHub link"
    print("PASS: index.html fully validated and hardened.")

if __name__ == '__main__':
    main()
