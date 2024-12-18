# Client Side Logo Interpreter

## Introduction

The Logo programming language is an excellent tool for teaching beginners to 
code. It has been used successfully since its inception to teach children in
schools, college students, as well as working professionals to write computer 
programs.

Logo has been integrated with Python using Tkinter. This project introduces a 
client-side Logo engine which can run inside a web browser in the client side.
This is a work in progress, so the current instruction set is a subset of the 
full plethora of logo commands.

## Instruction Set

As of now, the following instructions have been implemented:

Instruction | Syntax | Description
-- | -- | --
__fd__ | `fd (amount)` | Moves the turtle forward by *amount* pixels
__bk__ | `bk (amount)` | Moves the turtle backward by *amount* pixels
__rt__ | `rt (amount)` | Turns the turtle clockwise by *amount* degrees
__lt__ | `lt (amount)` | Turns the turtle clockwise by *amount* degrees
__pu__ | `pu` | Pen Up (turtle stops drawing lines after this)
__pd__ | `pd` | Pen Down (turtle draws lines after this)
__ht__ | `ht` | Hide Turtle
__st__ | `st` | Show Turtle *(its supposed to be dt, but I have always hated that)*
__cs__ | `cs` | Clear Screen (resets the imagew)
__repeat__ | `repeat (times) [(instructions)]` | Repeat *instructions* *times* times
__make__ | `make (name) (expression)` | Assigned the value of *expression* to variable *name*
__setx__ | `setx (value)` | Move the turtle to the x-coordinate *value*
__sety__ | `setx (value)` | Move the turtle to the y-coordinate *value*

**NOTE:** Only integer variable support has been implemented so far. Access the 7
value of a variable using the colon operator. For instance, if the variable name
is `bear`, then its value is accessed using `:bear`

Further instructions for Logo are available at several places. I am referring to
the page on [Tutorials Point](https://www.tutorialspoint.com/logo/logo_quick_guide.htm).