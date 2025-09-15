---
title: Software
sect: software
upd: 02O06
---

I develop programs on a frequent basis, but few make it past prototyping. I believe increased motivation to work on personal projects comes with greater maturity. Expect this section of the website to become less empty in the future.

My main editor is [Neovim](https://neovim.io/), sometimes I use [VSCodium](https://vscodium.com/) but it's becoming rarer for me to do so.

I have at least some form of minor to major hatred for every programming language that exists, and if you give me a library with many bindings for different languages then I am never going to be able to pick which one I dislike the least. Most of the time it's C though. In terms of what programming language I hate the most, it's either Python or JavaScript. I have a very love-hate relationship with Rust so on any other day it'd be in that list as well. My favorite types of languages are purely functional programming languages and those based on Lisp.

snake_case forever and always.

# Holy War Territory

I indent my code with tabs, never spaces. Consistency is very important to me; if a programming or markup language is whitespace-significant (ew) and has the gall to outright forbid tabs (Nim or YAML) then I indent with one single space per level of indentation. I have multiple reasons for preferring tabs, chiefly because:

- It makes sense to define levels of indentation as a logical unit rather than a forced amount of spaces. People complain about tabs providing "undefined behavior" but this exact supposedly "undesirable" behavior is the primary reason I, and many others, use tabs in the first place. Any good editor can handle tabs perfectly well, and if it's a great editor it defaults to tabs in the first place. It's useful to be able to immediately intuit that any given line of code is N levels deep just by looking at the number of TAB characters at the start of that line. If you go on any code repository and do the same, you don't get that niceness because some people use two spaces, some people use four spaces, and it's never immediately obvious. It's a mostly negligible issue because both forms of indentation are just whitespace at the beginning of a line which is mostly unmistakable, but TABs being a single character make them much more immediately effective at simply communicating how "nested" a line is. There are no tricks, and it ends up being up to four times smaller than using spaces which are nothing more than an inelegant hack in my view.
- Being able to choose how far a TAB character should indent is important for reasons of personalizaton and [accessibility](https://alexandersandberg.com/articles/default-to-tabs-instead-of-spaces-for-an-accessible-first-environment/). I personally have a very hard time reading two-space indented files. Some people much prefer it due to the greater horizontal space it provides. Why not just let the viewer of the source file choose how far they want the TABs to advance the text so that no code is uncomfortable or convoluted to read at the indentation level to any viewer?

I don't usually align my code. Presentation is important, and code is an art, but making parts of code line up with others is not something I ever really see myself doing. On the off chance that it's necessary (Haskell?), I follow the time-honored practice of [**tabs for indentation, spaces for alignment**](https://tabsarebetterthanspaces.com/).

There are no good reasons for forbidding tabs in any file format or language specification edited by text. Define indentation as nothing more than whitespace at the start of a line, and both sides will be happy. Obviously, there are no reasons for me to use tabs in already space-indented source code &mdash; unless it's mine, in which case I convert it.

An argument can be made for spaces in that the fact that their indentation width is consistent and will never change, which for many is a good thing. Ultimately the main appeal of tabs to many &mdash; the flexible indentation width &mdash; is a preferential thing and lots of people have no need for anything like that. At any rate, I've made my case for using tabs, and it's never too late to switch over if you feel it suits you more. Don't convert to spaces just because some crude language is warning you against it. There are always greener pastures, and spaces for indentation is not one of them.

