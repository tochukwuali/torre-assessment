# Torre Assessment

A minimal Next.js 15 project with TypeScript and Tailwind CSS for interview assessment.

## Tech Stack

- **Next.js 15** - version 15 with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Prompts used for this project

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** Setup a minimal Nextjs, tailwind project for a interview assessment. Use the guide below but reduce it to a minimalist version for my use case

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** what are the different patterns (something like to NVVM) that we we can adopt in this codebase?

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** just edit the readme to show only the recommended pattern that you're using. remove the emojis and write with some form personalization and let it sound human

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** Create a user card component that will contain these information - Name - Headline(job/bio title) - Location - Skills This card component will the ui component to display the list of users fetched as response from a users search.

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** Implement a home page with a top search input bar. This input search bar is to search for people and organizations

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** Following the codebase pattern of a Feature-Based Architecture with MVVM, implement the search endpoint: POST https://torre.ai/api/entities/_searchStream. it should take a request payload of type: { "query": "string", "torreGgId": "string", "identityType": "person", "limit": 0, "meta": true, "excluding": [ "string" ], "excludedPeople": [ "string" ], "excludeContacts": true } This is the endpoint that is to be called when a search occurs on the search input on the home page. The input takes a debounced input and passes it to the query request payload property. Display the response list. using the user card component we earlier implemented for each item of the list

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** Second implement a user profile page, such that when you click on a user card item, it takes you to a user profile page with details about the user or organization

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** GET https://torre.ai/api/genome/bios/$username This is the endpoint that calls the user profile for each user. Following our code pattern and design, implement the function(s), flow that will fetch and display this information.

**Tool:** Cursor  
**Model:** Claude Sonnet 4  
**Prompt:** Ensure all of the compnents and pages are mobile responnsive]

## Development
