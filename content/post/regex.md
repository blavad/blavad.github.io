---
title: "Regex"
date: 2020-08-16T18:18:02+02:00
archives: "2020"
tags: [ "linux", "python" ]
categories: ["work"]
author: David Albert
summary: "Quick tuto Regex."
---

# REGEX

Created By: David ALBERT
Last Edited: Jul 13, 2020 11:14 AM
Tags: linux, python

# Expressions régulières

## Carectères spéciaux

`.` : match any single character

`^` : match the start of the string

`$` : match the end of the string or just before the newline at the end of the
string

`*` : match 0 or more repetitions of the preceding RE → `ab*` will match ‘a’, ‘ab’, or ‘a’ followed by any number of ‘b’s.

`+` : match 1 or more repetitions of the preceding RE

`?` : match 0 or 1 repetitions of the preceding RE → `ab?` will match either ‘a’ or ‘ab’.

`{m}` : match exactly *m* repetitions of the preceding RE

`{m,n}` : match from *m* to *n* repetitions of the preceding RE

`\` : escapes special characters (permitting you to match characters like `'*'`, `'?'` )

`[]` : used to indicate a set of characters

- `[amk]` will match `'a'`, `'m'`, or `'k'`
- `[a-z]`
- `[0-5][0-9]` will match all the two-digits numbers from `00` to `59`
- `[0-9A-Fa-f]` will match any hexadecimal digit
- If `-` is escaped (e.g. `[a\-z]`), it will match a literal `'-'`
- Special characters lose their special meaning inside sets
- `^` has no special meaning if it’s not the first character in
the set → means "all except" `[^5]` signifie "tout sauf 5"

`|` :  `A|B` match either *A* or *B*. 

`(...)` : match whatever regular expression is inside the parentheses, and indicates the
start and end of a group

## Usage en python *re*

URL Doc Officielle : [https://docs.python.org/3/library/re.html](https://docs.python.org/3/library/re.html)

`(?...)` : extension notation (a `'?'` following a `'('` is not meaningful otherwise). The first character after the '?' determines what the meaning and further syntax of the construct is.

`\b` and `\B` : match empty string when it is (resp. it is not) at the beginning or end of a word

`\d` and `\D` : match any decimal → `[0-9]` en ASCII (resp. any not decimal → `[^0-9]`) 

`\s` and `\S` : Same for whitespace (including `[ \t\r\n\f\v]`)

`\w` and `\W` : Same for alphanumerics (`[a-zA-Z0-9_]`)

### → Usage général

```python
import re

# Cas 1 : Cree un objet regex avec le pattern et l'utilise
# -> plus efficace si on utilise beaucoup de fois (evite d'instancier tt le temps)
prog = re.compile(pattern)
result = prog.match(string)

# Cas 2 : utilise les fonctionnalités pratiques de 're'
result = re.match(pattern, string)
```

### → *re.match() vs re.search()*

```python
# 1) Match : Check a match only at/from the beginning of the string
# 2) Search : Check a match anywhere in the string

re.match("c", "abcdef")    # No match
re.search("c", "abcdef")   # Match

re.match("c", "abcdef")    # No match
re.search("^c", "abcdef")  # No match
re.search("^a", "abcdef")  # Match
```

### → re.split()

```python
re.split(r'\W+', 'David, Thierry, Jean-Yves, Albert')
# Out : ['David', 'Thierry', 'Jean', 'Yves', 'Albert']

re.split(r',\W+', 'David, Thierry, Jean-Yves, Albert')
# Out : ['David', 'Thierry', 'Jean-Yves', 'Albert']
```

### → match.group()

```python
# Cas 1 : Sans specifier de nom
m = re.match(r"(\w+) (\w+) (\w+)", "Isaac Newton physicist, the best")
m.group(0) # or m[0] The entire match
# Out : 'Isaac Newton physicist'
m.group(1)       # The first parenthesized subgroup.
# Out : 'Isaac'
m.group(2)       # The second parenthesized subgroup.
# Out : 'Newton'
m.group(1, 3)    # Multiple arguments give us a tuple.
# Out : ('Isaac', 'physicist')
m.groups()
#Out : ('Isaac', 'Newton', 'physicist')
m = re.match(r"(\w+) (\w+) (\w+)", "Isaac Newton, the best physicist")
m.groups('0') # Set default value if not find (default set None)
# Out : ('Isaac', 'Newton', '0')
```

```python
# Cas 2 : En specifiant les noms

m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Isaac Newton")
m.group('first_name')
# Out : 'Isaac'
m.group('last_name')
# Out : 'Reynolds'

m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Malcolm Reynolds")
m.groupdict()
# Out : {'first_name': 'Malcolm', 'last_name': 'Reynolds'}
```

```python
# Cas 2 : En specifier les noms (?P<nom_var>..regex..)

m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Isaac Newton")
m.group('first_name')
# Out : 'Isaac'
m.group('last_name')
# Out : 'Newton'

m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Isaac Newton")
m.groupdict()
# Out : {'first_name': 'Isaac', 'last_name': 'Newton'}
```
