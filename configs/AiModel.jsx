const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };

    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial on following details with field as Course name, Description, along with chapter name and duration. Category: 'Technical Interview', Topic: 'JAVA', Level: 'Basic', Duration: '1 Hour', No of Chapters: '5' in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Course Name\": \"Ace Your Java Technical Interview: Fundamentals\",\n  \"Description\": \"This course provides a comprehensive overview of fundamental Java concepts essential for performing well in technical interviews. It covers basic data types, control flow, object-oriented programming principles, and common data structures, all tailored towards common interview questions and scenarios. This course is designed for candidates with little to no prior experience or those needing a refresher on the basics.\",\n  \"Category\": \"Technical Interview\",\n  \"Topic\": \"JAVA\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"1 Hour\",\n  \"Number of Chapters\": 5,\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"Introduction to Java and Environment Setup\",\n      \"Duration\": \"10 Minutes\",\n      \"Content\": [\n        \"What is Java and why it's important for interviews?\",\n        \"Brief history of Java.\",\n        \"Setting up the JDK (Java Development Kit).\",\n        \"Choosing an IDE (Integrated Development Environment) - Eclipse, IntelliJ IDEA, VS Code.\",\n        \"Writing and running your first \\\"Hello, World!\\\" program.\",\n        \"Understanding the basic Java program structure (class, main method).\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Data Types, Variables, and Operators\",\n      \"Duration\": \"12 Minutes\",\n      \"Content\": [\n        \"Primitive data types: int, float, double, boolean, char, long, short, byte.\",\n        \"Declaring and initializing variables.\",\n        \"Understanding variable scope.\",\n        \"Operators: Arithmetic, Relational, Logical, Assignment.\",\n        \"Operator precedence.\",\n        \"Type casting (implicit and explicit).\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Control Flow: Conditional Statements and Loops\",\n      \"Duration\": \"15 Minutes\",\n      \"Content\": [\n        \"Conditional Statements: if, else if, else.\",\n        \"Switch statement.\",\n        \"Loops: for, while, do-while.\",\n        \"Nested loops.\",\n        \"Break and continue statements.\",\n        \"Example interview questions related to control flow.\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Object-Oriented Programming (OOP) Fundamentals\",\n      \"Duration\": \"18 Minutes\",\n      \"Content\": [\n        \"Introduction to OOP: Concepts of Classes and Objects.\",\n        \"Defining classes, fields (attributes), and methods (behaviors).\",\n        \"Creating objects from classes.\",\n        \"Constructors: Default and parameterized constructors.\",\n        \"Encapsulation: Hiding data and using access modifiers (public, private, protected).\",\n        \"Brief introduction to Inheritance and Polymorphism (covered in more advanced courses).\",\n        \"`this` keyword usage.\"\n      ]\n    },\n    {\n      \"Chapter Name\": \"Introduction to Arrays and Strings\",\n      \"Duration\": \"15 Minutes\",\n      \"Content\": [\n        \"Arrays: Declaring, initializing, and accessing array elements.\",\n        \"One-dimensional and multi-dimensional arrays.\",\n        \"Array length.\",\n        \"Iterating through arrays using loops.\",\n        \"Strings: Creating and manipulating strings.\",\n        \"String methods: length(), charAt(), substring(), equals(), compareTo().\",\n        \"String immutability.\",\n        \"Basic string formatting.\"\n      ]\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // // TODO: Following code needs to be updated for client-side apps.
    // const candidates = result.response.candidates;
    // for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    //   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
    //     const part = candidates[candidate_index].content.parts[part_index];
    //     if(part.inlineData) {
    //       try {
    //         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
    //         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
    //         console.log(`Output written to: ${filename}`);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   }
    // }
    // console.log(result.response.text());
