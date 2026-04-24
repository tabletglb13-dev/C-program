
export interface Chapter {
  id: string;
  title: string;
  content: string;
  codeSnippets?: { title: string; code: string; language: string }[];
  insights?: string[];
}

export const chapters: Chapter[] = [
  {
    id: "intro",
    title: "Chapter 1: Introduction to C",
    content: `C was created in the early 1970s by Dennis Ritchie at Bell Labs. It is a "middle-level" language. It provides high-level programming constructs (like loops and functions) but allows low-level memory manipulation (like pointers and bitwise operations).

### Why Learn C?
C is the grandfather of modern languages (C++, Java, Python, C#). Operating systems (Windows, Linux, macOS), embedded systems (microwaves, car engines), and game engines are all built on C or C-like languages because of its speed and raw control over memory.

### How C Works (Compilation)
C is a compiled language. The code you write (Source Code) cannot be understood by the computer. A tool called a Compiler (like GCC or Clang) translates your code into Machine Code (binary) that your CPU can execute.`,
    insights: ["Thinking like the machine is the first step to mastering C."]
  },
  {
    id: "anatomy",
    title: "Chapter 2: The Anatomy of a C Program",
    content: `Let's look at the foundational structure of a C program.

### The "Hello World" Program
Execution of EVERY C program begins inside the main function. The standard library provides the interface for screen output.`,
    codeSnippets: [
      {
        title: "Hello World",
        language: "c",
        code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
      }
    ],
    insights: [
      "Every statement in C must end with a semicolon (;).",
      "The main function's return value (0) tells the OS the program ran successfully."
    ]
  },
  {
    id: "variables",
    title: "Chapter 3: Variables, Data Types, and Memory",
    content: `A variable is a named storage location in the computer's memory. In C, you must declare the type of data a variable will hold before you use it (C is statically typed).

### Primitive Data Types
* **int**: Whole numbers (4 bytes).
* **float**: Decimal numbers (4 bytes).
* **double**: High-precision decimals (8 bytes).
* **char**: Single characters (1 byte).`,
    codeSnippets: [
      {
        title: "Declarations",
        language: "c",
        code: `int age = 25;              
float salary = 50500.50;   
char grade = 'A';`
      },
      {
        title: "Input and Output",
        language: "c",
        code: `#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age); 
    printf("You are %d years old.\\n", age);
    return 0;
}`
      }
    ],
    insights: ["The '&' in scanf means 'Address of'. It tells C where in RAM to store the value."]
  },
  {
    id: "operators",
    title: "Chapter 4: Operators",
    content: `Operators are symbols that tell the compiler to perform mathematical or logical manipulations.

### Arithmetic Operators
+, -, *, /, % (Modulo).

### Relational & Logical
Used for comparison and combining conditions.`,
    codeSnippets: [
      {
        title: "Logical Check",
        language: "c",
        code: `int age = 20;
int has_license = 1; 
if (age >= 18 && has_license == 1) {
    printf("You can drive.");
}`
      }
    ]
  },
  {
    id: "control-flow",
    title: "Chapter 5: Control Flow",
    content: `Programs normally run top-to-bottom. Control flow allows you to skip code (Conditionals) or repeat code (Loops).

### The switch Statement
Used when you have a single variable you want to check against many exact values.`,
    codeSnippets: [
      {
        title: "The for Loop",
        language: "c",
        code: `for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}`
      }
    ],
    insights: ["The 'break;' keyword in a switch is vital to prevent 'falling through' cases."]
  },
  {
    id: "functions",
    title: "Chapter 6: Functions",
    content: `Functions are blocks of reusable code. They take inputs (arguments), process them, and give an output (return value). Variables created inside a function are local to that function.`,
    codeSnippets: [
      {
        title: "Add Numbers",
        language: "c",
        code: `int addNumbers(int a, int b) {
    int sum = a + b;
    return sum;
}`
      }
    ]
  },
  {
    id: "arrays-strings",
    title: "Chapter 7: Arrays and Strings",
    content: `An array is a collection of variables of the same type stored in contiguous memory.

### Strings
C does not have a built-in String type. A string is an array of characters ending with a Null Terminator (\\0).`,
    codeSnippets: [
      {
        title: "Array Access",
        language: "c",
        code: `int scores[5] = {90, 85, 78, 92, 88};
printf("First score: %d", scores[0]);`
      }
    ]
  },
  {
    id: "pointers",
    title: "Chapter 8: Pointers",
    content: `A pointer is a variable that stores the memory address of another variable. This is what makes C powerful and efficient.`,
    codeSnippets: [
      {
        title: "Dereferencing",
        language: "c",
        code: `int age = 30;
int *ptr = &age; 
printf("Value via pointer: %d", *ptr); 
*ptr = 35; // Changes 'age' to 35`
      }
    ],
    insights: ["Pointers allow 'Pass by Reference', which is lightning-fast for large data."]
  },
  {
    id: "dynamic-memory",
    title: "Chapter 9: Dynamic Memory Allocation",
    content: `Dynamic memory uses the Heap. You must manage it yourself using malloc and free.`,
    codeSnippets: [
      {
        title: "Allocation",
        language: "c",
        code: `int *arr = (int*) malloc(5 * sizeof(int)); 
// ... use array ...
free(arr); // Prevent memory leaks!`
      }
    ],
    insights: ["If you forget to free memory, you create a 'Memory Leak'."]
  },
  {
    id: "structures",
    title: "Chapter 10: Structures",
    content: `Structures (struct) hold many items of different types. They are the predecessors to Objects in newer languages.`,
    codeSnippets: [
      {
        title: "Struct Definition",
        language: "c",
        code: `struct Student {
    char name[50];
    int id;
    float gpa;
};`
      }
    ]
  },
  {
    id: "file-handling",
    title: "Chapter 11: File Handling",
    content: `C can read from and write to text or binary files on your hard drive, allowing data to persist after the program closes.`,
    codeSnippets: [
      {
        title: "File Write",
        language: "c",
        code: `FILE *file = fopen("data.txt", "w");
fprintf(file, "Learning C is amazing!");
fclose(file);`
      }
    ]
  }
];
