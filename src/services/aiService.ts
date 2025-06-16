import OpenAI from 'openai';
import { GeneratedApp } from '@/utils/codeGenerator';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: 'sk-proj-P-FHXw7T9gs5c0NVi6Qc0a_cUCNgx-NFapLCOvc9DHlbdBtCAqgpwfzHkFg4RHVLE_IN4lskamT3BlbkFJihAifypUswpaJ8JpnhDnXTwRCHl7UqEYQDw882KysIL1jRuaWg2RGQZ3MxetBAuBXEtL5hNkA',
  organization: 'org-H5okHzdQPjAvaGDk2qjb1Ji1',
  dangerouslyAllowBrowser: true
});

export interface AIGenerationRequest {
  prompt: string;
  template: string;
  features?: string[];
}

export async function generateAppWithAI(request: AIGenerationRequest): Promise<GeneratedApp> {
  const { prompt, template } = request;
  
  // Create a comprehensive system prompt for generating accessible apps
  const systemPrompt = `You are VoiceAble AI, an expert at creating accessible web applications. 

Your task is to generate a complete, functional, accessible web application based on the user's prompt and template choice.

Template Types:
- "default": General purpose app
- "screen-reader": Optimized for screen readers with ARIA labels
- "planner": Task/calendar management app
- "medication": Medication reminder/tracking app

Requirements:
1. Generate COMPLETE, WORKING code - not just examples
2. Use modern React with TypeScript
3. Include proper accessibility features (ARIA labels, semantic HTML, keyboard navigation)
4. Use Tailwind CSS for styling
5. Make it visually appealing and user-friendly
6. Include proper error handling and loading states
7. Generate multiple files if needed (components, utilities, etc.)
8. Ensure the app is fully functional out of the box

Return your response as a JSON object with this exact structure:
{
  "name": "App Name",
  "description": "Brief description",
  "files": {
    "index.html": "Complete HTML content",
    "style.css": "Complete CSS content", 
    "script.js": "Complete JavaScript content",
    "README.md": "Setup and usage instructions"
  },
  "features": ["feature1", "feature2"],
  "accessibilityFeatures": ["aria-labels", "keyboard-navigation"],
  "dependencies": ["dependency1", "dependency2"]
}

Make sure the generated app is:
- Fully functional
- Accessible to users with disabilities
- Well-documented
- Ready to run without modifications`;

  const userPrompt = `Create a ${template} accessibility tool: ${prompt}

Please generate a complete, working web application that addresses this request. Include all necessary HTML, CSS, and JavaScript code.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse the AI response as JSON
    let generatedApp: GeneratedApp;
    try {
      // Extract JSON from the response (in case it's wrapped in markdown)
      const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/) || aiResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : aiResponse;
      
      generatedApp = JSON.parse(jsonStr);
    } catch (parseError) {
      // Fallback: create a structured app from the text response
      generatedApp = createFallbackApp(prompt, template, aiResponse);
    }    // Ensure the app has all required properties
    return {
      id: `app-${Date.now()}`,
      name: generatedApp.name || generateAppName(prompt),
      description: generatedApp.description || `An accessible ${template} application: ${prompt}`,
      type: template,
      files: generatedApp.files || createDefaultFiles(prompt, template),
      dependencies: generatedApp.dependencies || {},
      scripts: generatedApp.scripts || { "start": "Open index.html in a browser" },
      instructions: `# ${generatedApp.name || generateAppName(prompt)}\n\nGenerated with AI using prompt: "${prompt}"\n\nFeatures: Accessible Design, Responsive Layout\n\nAccessibility: ARIA Labels, Keyboard Navigation\n\nTo use this app:\n1. Extract the downloaded files\n2. Open index.html in a web browser\n3. The app is ready to use!`,
      previewUrl: undefined
    };

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    // Fallback to local generation if AI fails
    return createFallbackApp(prompt, template);
  }
}

function createFallbackApp(prompt: string, template: string, aiContent?: string): GeneratedApp {
  const appName = generateAppName(prompt);
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${appName}</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans">
    <div id="app" class="min-h-screen">
        <header class="bg-blue-600 text-white p-4" role="banner">
            <h1 class="text-2xl font-bold" id="app-title">${appName}</h1>
            <p class="text-blue-100">Accessible ${template} application</p>
        </header>
        
        <main class="container mx-auto p-6" role="main" aria-labelledby="app-title">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-semibold mb-4">Welcome to ${appName}</h2>
                <p class="text-gray-600 mb-6">${prompt}</p>
                
                ${getTemplateSpecificContent(template)}
            </div>
        </main>
        
        <footer class="bg-gray-800 text-white p-4 mt-8" role="contentinfo">
            <p class="text-center">Generated by VoiceAble - Accessible by Design</p>
        </footer>
    </div>
    <script src="script.js"></script>
</body>
</html>`;

  const cssContent = `/* ${appName} - Accessible Styles */
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
}

/* Focus styles for accessibility */
*:focus {
    outline: 3px solid #3b82f6;
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .bg-blue-600 { background-color: #000 !important; }
    .text-blue-100 { color: #fff !important; }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

.btn {
    display: inline-block;
    padding: 12px 24px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
}

.btn:hover {
    background: #2563eb;
}

.btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.input {
    width: 100%;
    padding: 12px;
    border: 2px solid #d1d5db;
    border-radius: 6px;
    font-size: 16px;
}

.input:focus {
    border-color: #3b82f6;
}`;

  const jsContent = `// ${appName} - Accessible JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('${appName} loaded successfully');
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Announce page changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    ${getTemplateSpecificJS(template)}
    
    announceToScreenReader('${appName} application loaded and ready to use');
});`;

  const readmeContent = `# ${appName}

An accessible ${template} application generated by VoiceAble.

## Description
${prompt}

## Features
- Fully accessible design with ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Responsive layout
- High contrast mode support
- Reduced motion support

## How to Use
1. Open index.html in a web browser
2. The application is ready to use immediately
3. Navigate using keyboard (Tab, Enter, Arrow keys)
4. Compatible with screen readers

## Accessibility Features
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation
- Focus management
- High contrast support
- Reduced motion respect

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Screen readers (NVDA, JAWS, VoiceOver)

Generated by VoiceAble - Making the web accessible for everyone.`;
  return {
    id: `app-${Date.now()}`,
    name: appName,
    description: `An accessible ${template} application: ${prompt}`,
    type: template,
    files: {
      'index.html': htmlContent,
      'style.css': cssContent,
      'script.js': jsContent,
      'README.md': readmeContent
    },
    dependencies: { 'tailwindcss': 'via CDN' },
    scripts: { 'start': 'Open index.html in a browser' },
    instructions: readmeContent
  };
}

function generateAppName(prompt: string): string {
  const words = prompt.split(' ').slice(0, 3);
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Tool';
}

function getTemplateSpecificContent(template: string): string {
  switch (template) {
    case 'screen-reader':
      return `
        <div class="space-y-4">
          <button class="btn" onclick="speak('Welcome to the screen reader optimized application')" 
                  aria-label="Test text-to-speech functionality">
            Test Speech
          </button>
          <div role="region" aria-label="Content area" class="p-4 border rounded">
            <p>This application is optimized for screen readers with enhanced ARIA support.</p>
          </div>
        </div>`;
    
    case 'planner':
      return `
        <div class="space-y-4">
          <div>
            <label for="task-input" class="block font-medium mb-2">Add New Task:</label>
            <input type="text" id="task-input" class="input mb-2" placeholder="Enter your task">
            <button class="btn" onclick="addTask()" aria-label="Add new task">Add Task</button>
          </div>
          <div role="region" aria-label="Task list">
            <h3>Your Tasks:</h3>
            <ul id="task-list" class="space-y-2"></ul>
          </div>
        </div>`;
    
    case 'medication':
      return `
        <div class="space-y-4">
          <div>
            <label for="med-name" class="block font-medium mb-2">Medication Name:</label>
            <input type="text" id="med-name" class="input mb-2" placeholder="Enter medication name">
            <label for="med-time" class="block font-medium mb-2">Time:</label>
            <input type="time" id="med-time" class="input mb-2">
            <button class="btn" onclick="addMedication()" aria-label="Add medication reminder">
              Add Reminder
            </button>
          </div>
          <div role="region" aria-label="Medication schedule">
            <h3>Your Medications:</h3>
            <div id="med-list"></div>
          </div>
        </div>`;
    
    default:
      return `
        <div class="space-y-4">
          <p>This is your custom accessible application.</p>
          <button class="btn" onclick="handleAction()" aria-label="Perform main action">
            Get Started
          </button>
          <div role="region" aria-label="Application content" class="p-4 border rounded">
            <p>Ready to use!</p>
          </div>
        </div>`;
  }
}

function getTemplateSpecificJS(template: string): string {
  switch (template) {
    case 'screen-reader':
      return `
    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
        announceToScreenReader(text);
    }`;
    
    case 'planner':
      return `
    let tasks = [];
    
    function addTask() {
        const input = document.getElementById('task-input');
        const task = input.value.trim();
        if (task) {
            tasks.push({id: Date.now(), text: task, completed: false});
            renderTasks();
            input.value = '';
            announceToScreenReader('Task added: ' + task);
        }
    }
    
    function renderTasks() {
        const list = document.getElementById('task-list');
        list.innerHTML = tasks.map(task => 
            \`<li class="flex items-center gap-2">
                <input type="checkbox" id="task-\${task.id}" \${task.completed ? 'checked' : ''} 
                       onchange="toggleTask(\${task.id})" aria-label="Mark task as completed">
                <label for="task-\${task.id}" class="\${task.completed ? 'line-through text-gray-500' : ''}">\${task.text}</label>
            </li>\`
        ).join('');
    }
    
    function toggleTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
            announceToScreenReader(task.completed ? 'Task completed' : 'Task uncompleted');
        }
    }`;
    
    case 'medication':
      return `
    let medications = [];
    
    function addMedication() {
        const name = document.getElementById('med-name').value.trim();
        const time = document.getElementById('med-time').value;
        if (name && time) {
            medications.push({id: Date.now(), name, time});
            renderMedications();
            document.getElementById('med-name').value = '';
            document.getElementById('med-time').value = '';
            announceToScreenReader('Medication reminder added: ' + name + ' at ' + time);
        }
    }
    
    function renderMedications() {
        const list = document.getElementById('med-list');
        list.innerHTML = medications.map(med => 
            \`<div class="p-3 border rounded mb-2">
                <div class="font-medium">\${med.name}</div>
                <div class="text-sm text-gray-600">Time: \${med.time}</div>
            </div>\`
        ).join('');
    }`;
    
    default:
      return `
    function handleAction() {
        announceToScreenReader('Action performed successfully');
        console.log('Application action triggered');
    }`;
  }
}

function createDefaultFiles(prompt: string, template: string): Record<string, string> {
  return createFallbackApp(prompt, template).files;
}

export { generateAppName };
