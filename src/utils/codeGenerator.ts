// Code generation utilities for creating real applications
import JSZip from 'jszip';

export interface GeneratedApp {
  id: string;
  name: string;
  description: string;
  type: string;
  files: Record<string, string>;
  dependencies: Record<string, string>;
  scripts: Record<string, string>;
  instructions: string;
  previewUrl?: string;
}

export function generateAccessibleApp(prompt: string, template: string): GeneratedApp {
  const appName = generateAppName(prompt);
  const sanitizedName = appName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  switch (template) {
    case 'screen-reader':
      return generateScreenReaderApp(prompt, sanitizedName);
    case 'planner':
      return generatePlannerApp(prompt, sanitizedName);
    case 'medication':
      return generateMedicationApp(prompt, sanitizedName);
    default:
      return generateCustomApp(prompt, sanitizedName);
  }
}

function generateAppName(prompt: string): string {
  // Extract key words and create an app name
  const words = prompt.toLowerCase().split(/\s+/).filter(word => 
    word.length > 3 && !['the', 'and', 'for', 'with', 'that', 'this', 'need', 'want', 'help'].includes(word)
  );
  
  if (words.length === 0) return 'AccessibleApp';
  
  return words.slice(0, 3).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function generateScreenReaderApp(prompt: string, name: string): GeneratedApp {
  const files = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Screen Reader Tool</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2563eb;
            margin-bottom: 20px;
        }
        .control-panel {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        button {
            padding: 12px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background: #2563eb;
            color: white;
            transition: background 0.3s;
        }
        button:hover {
            background: #1d4ed8;
        }
        button:focus {
            outline: 3px solid #93c5fd;
            outline-offset: 2px;
        }
        textarea {
            width: 100%;
            min-height: 200px;
            padding: 15px;
            font-size: 16px;
            border: 2px solid #d1d5db;
            border-radius: 5px;
            font-family: inherit;
        }
        textarea:focus {
            outline: none;
            border-color: #2563eb;
        }
        .speed-control {
            margin: 20px 0;
        }
        .speed-control label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="range"] {
            width: 100%;
            height: 8px;
            background: #d1d5db;
            border-radius: 5px;
            outline: none;
        }
        .status {
            margin-top: 20px;
            padding: 10px;
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 5px;
            color: #0c4a6e;
        }
        @media (max-width: 600px) {
            .control-panel {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${name}</h1>
        <p>An accessible screen reader tool based on your request: "${prompt}"</p>
        
        <div class="control-panel">
            <button id="playBtn" aria-label="Play text">▶️ Play</button>
            <button id="pauseBtn" aria-label="Pause reading">⏸️ Pause</button>
            <button id="stopBtn" aria-label="Stop reading">⏹️ Stop</button>
            <button id="clearBtn" aria-label="Clear text">🗑️ Clear</button>
        </div>
        
        <div class="speed-control">
            <label for="speedRange">Reading Speed:</label>
            <input type="range" id="speedRange" min="0.5" max="2" step="0.1" value="1" 
                   aria-label="Adjust reading speed">
            <span id="speedValue">1.0x</span>
        </div>
        
        <textarea id="textInput" placeholder="Enter text to be read aloud..." 
                  aria-label="Text input for screen reader"></textarea>
        
        <div id="status" class="status" aria-live="polite">
            Ready to read text
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>`,

    'script.js': `// ${name} - Screen Reader Application
class ScreenReader {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.isPlaying = false;
        this.isPaused = false;
        
        this.initializeElements();
        this.bindEvents();
        this.loadVoices();
    }
    
    initializeElements() {
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.textInput = document.getElementById('textInput');
        this.speedRange = document.getElementById('speedRange');
        this.speedValue = document.getElementById('speedValue');
        this.status = document.getElementById('status');
    }
    
    bindEvents() {
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.speedRange.addEventListener('input', (e) => this.updateSpeed(e.target.value));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.play();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.isPaused ? this.play() : this.pause();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.stop();
                        break;
                }
            }
        });
    }
    
    loadVoices() {
        // Wait for voices to load
        const setVoices = () => {
            const voices = this.synth.getVoices();
            if (voices.length > 0) {
                // Prefer English voices
                const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                if (englishVoice && this.utterance) {
                    this.utterance.voice = englishVoice;
                }
            }
        };
        
        if (this.synth.getVoices().length > 0) {
            setVoices();
        } else {
            this.synth.addEventListener('voiceschanged', setVoices);
        }
    }
    
    play() {
        const text = this.textInput.value.trim();
        
        if (!text) {
            this.updateStatus('Please enter some text to read');
            this.textInput.focus();
            return;
        }
        
        if (this.isPaused && this.utterance) {
            this.synth.resume();
            this.isPaused = false;
            this.updateStatus('Resumed reading');
            return;
        }
        
        this.stop(); // Stop any current speech
        
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.rate = parseFloat(this.speedRange.value);
        this.utterance.pitch = 1;
        this.utterance.volume = 1;
        
        this.utterance.onstart = () => {
            this.isPlaying = true;
            this.updateStatus('Reading text...');
        };
        
        this.utterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updateStatus('Finished reading');
        };
        
        this.utterance.onerror = (event) => {
            this.updateStatus(\`Error: \${event.error}\`);
            this.isPlaying = false;
            this.isPaused = false;
        };
        
        this.synth.speak(this.utterance);
    }
    
    pause() {
        if (this.isPlaying && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
            this.updateStatus('Paused');
        }
    }
    
    stop() {
        this.synth.cancel();
        this.isPlaying = false;
        this.isPaused = false;
        this.updateStatus('Stopped');
    }
    
    clear() {
        this.stop();
        this.textInput.value = '';
        this.textInput.focus();
        this.updateStatus('Text cleared');
    }
    
    updateSpeed(speed) {
        this.speedValue.textContent = \`\${speed}x\`;
        if (this.utterance) {
            this.utterance.rate = parseFloat(speed);
        }
    }
    
    updateStatus(message) {
        this.status.textContent = message;
        console.log(\`Screen Reader: \${message}\`);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    if ('speechSynthesis' in window) {
        new ScreenReader();
    } else {
        document.getElementById('status').textContent = 
            'Speech synthesis not supported in this browser';
    }
});`,

    'README.md': `# ${name} - Screen Reader Tool

An accessible screen reader application generated by VoiceAble.

## Description
${prompt}

## Features
- Text-to-speech functionality
- Adjustable reading speed
- Keyboard shortcuts (Ctrl+Enter to play, Ctrl+Space to pause/resume, Esc to stop)
- Fully accessible with ARIA labels
- Responsive design
- Error handling

## Usage
1. Open index.html in a modern web browser
2. Enter text in the textarea
3. Use the control buttons or keyboard shortcuts to control playback
4. Adjust reading speed with the slider

## Keyboard Shortcuts
- Ctrl+Enter: Start reading
- Ctrl+Space: Pause/Resume
- Escape: Stop reading

## Browser Support
- Chrome 33+
- Firefox 49+
- Safari 7+
- Edge 14+

## Accessibility Features
- Full keyboard navigation
- Screen reader compatible
- High contrast focus indicators
- ARIA live regions for status updates
- Semantic HTML structure

Generated with ❤️ by VoiceAble
`
  };

  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: `Screen reader tool: ${prompt}`,
    main: 'index.html',
    scripts: {
      start: 'python -m http.server 3000',
      serve: 'npx serve .'
    },
    keywords: ['accessibility', 'screen-reader', 'text-to-speech', 'a11y'],
    author: 'VoiceAble Generator',
    license: 'MIT'
  };
  return {
    id: `app-${Date.now()}`,
    name,
    description: `A screen reader application: ${prompt}`,
    type: 'screen-reader',
    files,
    dependencies: {},
    scripts: {
      dev: "Open index.html in a web browser"
    },
    instructions: `Your accessible screen reader app "${name}" has been generated!`
  };
}

function generatePlannerApp(prompt: string, name: string): GeneratedApp {
  const files = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Daily Planner</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .main-content {
            padding: 30px;
        }
        .add-task {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
        }
        .add-task input {
            flex: 1;
            padding: 15px;
            font-size: 16px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            outline: none;
        }
        .add-task input:focus {
            border-color: #4facfe;
        }
        .add-task button {
            padding: 15px 25px;
            background: #4facfe;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        }
        .add-task button:hover {
            background: #3d8bfe;
        }
        .tasks-container {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            min-height: 300px;
        }
        .task {
            background: white;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            border-left: 4px solid #4facfe;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .task.completed {
            opacity: 0.7;
            border-left-color: #28a745;
        }
        .task.completed .task-text {
            text-decoration: line-through;
        }
        .task-checkbox {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .task-text {
            flex: 1;
            font-size: 16px;
        }
        .task-time {
            color: #6c757d;
            font-size: 14px;
        }
        .task-delete {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
        }
        .task-delete:hover {
            background: #c82333;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
            padding: 20px;
            background: #e9ecef;
            border-radius: 10px;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #4facfe;
        }
        .stat-label {
            color: #6c757d;
            margin-top: 5px;
        }
        .empty-state {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 40px;
        }
        @media (max-width: 600px) {
            .add-task {
                flex-direction: column;
            }
            .header h1 {
                font-size: 2em;
            }
            .stats {
                flex-direction: column;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${name}</h1>
            <p>Accessible daily planning tool - ${prompt}</p>
        </div>
        
        <div class="main-content">
            <div class="add-task">
                <input type="text" id="taskInput" placeholder="Add a new task..." 
                       aria-label="New task input">
                <button id="addBtn" aria-label="Add task">Add Task</button>
            </div>
            
            <div class="tasks-container">
                <div id="tasksContainer">
                    <div class="empty-state">
                        No tasks yet. Add your first task above!
                    </div>
                </div>
            </div>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number" id="totalTasks">0</div>
                    <div class="stat-label">Total Tasks</div>
                </div>
                <div class="stat">
                    <div class="stat-number" id="completedTasks">0</div>
                    <div class="stat-label">Completed</div>
                </div>
                <div class="stat">
                    <div class="stat-number" id="pendingTasks">0</div>
                    <div class="stat-label">Pending</div>
                </div>
            </div>
        </div>
    </div>

    <script src="planner.js"></script>
</body>
</html>`,

    'planner.js': `// ${name} - Daily Planner Application
class DailyPlanner {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('plannerTasks')) || [];
        this.taskIdCounter = parseInt(localStorage.getItem('taskCounter')) || 1;
        
        this.initializeElements();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }
    
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.pendingTasksEl = document.getElementById('pendingTasks');
    }
    
    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }
    
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            alert('Please enter a task!');
            this.taskInput.focus();
            return;
        }
        
        const task = {
            id: this.taskIdCounter++,
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString()
        };
        
        this.tasks.unshift(task);
        this.taskInput.value = '';
        this.taskInput.focus();
        
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.renderTasks();
            this.updateStats();
        }
    }
    
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToStorage();
            this.renderTasks();
            this.updateStats();
        }
    }
    
    renderTasks() {
        if (this.tasks.length === 0) {
            this.tasksContainer.innerHTML = \`
                <div class="empty-state">
                    No tasks yet. Add your first task above!
                </div>
            \`;
            return;
        }
        
        this.tasksContainer.innerHTML = this.tasks.map(task => \`
            <div class="task \${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="task-checkbox" 
                       \${task.completed ? 'checked' : ''}
                       onchange="planner.toggleTask(\${task.id})"
                       aria-label="Mark task as \${task.completed ? 'incomplete' : 'complete'}">
                <span class="task-text">\${this.escapeHtml(task.text)}</span>
                <span class="task-time">\${task.createdAt}</span>
                <button class="task-delete" onclick="planner.deleteTask(\${task.id})"
                        aria-label="Delete task">Delete</button>
            </div>
        \`).join('');
    }
    
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        this.totalTasksEl.textContent = total;
        this.completedTasksEl.textContent = completed;
        this.pendingTasksEl.textContent = pending;
    }
    
    saveToStorage() {
        localStorage.setItem('plannerTasks', JSON.stringify(this.tasks));
        localStorage.setItem('taskCounter', this.taskIdCounter.toString());
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
let planner;
document.addEventListener('DOMContentLoaded', () => {
    planner = new DailyPlanner();
});`,

    'README.md': `# ${name} - Daily Planner

An accessible daily planning application generated by VoiceAble.

## Description
${prompt}

## Features
- Add, complete, and delete tasks
- Persistent storage (tasks saved in browser)
- Real-time statistics
- Fully accessible with keyboard navigation
- Responsive design
- Clean, modern interface

## Usage
1. Open index.html in a web browser
2. Type a task in the input field
3. Press Enter or click "Add Task"
4. Check tasks as complete
5. Delete tasks when no longer needed

## Accessibility Features
- Full keyboard navigation
- Screen reader compatible
- Clear focus indicators
- Semantic HTML structure
- ARIA labels for interactive elements

## Browser Support
Works in all modern browsers with localStorage support.

Generated with ❤️ by VoiceAble
`
  };

  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: `Daily planner tool: ${prompt}`,
    main: 'index.html',
    scripts: {
      start: 'python -m http.server 3000',
      serve: 'npx serve .'
    },
    keywords: ['accessibility', 'planner', 'productivity', 'daily-tasks', 'a11y'],
    author: 'VoiceAble Generator',
    license: 'MIT'
  };

  return {
    name,
    description: `A daily planner application: ${prompt}`,
    files,
    packageJson,
    readme: files['README.md']
  };
}

function generateMedicationApp(prompt: string, name: string): GeneratedApp {
  // Similar structure for medication reminder app
  const files = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Medication Reminder</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .main-content { padding: 30px; }
        .medication-form {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .medication-list {
            margin-top: 20px;
        }
        .medication-item {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            border-left: 4px solid #6c5ce7;
        }
        .btn {
            background: #6c5ce7;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover { background: #5a4fcf; }
        .btn-danger {
            background: #e17055;
            margin-left: 10px;
        }
        .btn-danger:hover { background: #d63434; }
        .reminder-badge {
            background: #00b894;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            margin-left: 10px;
        }
        .overdue { border-left-color: #e17055; }
        @media (max-width: 600px) {
            .form-group { margin-bottom: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💊 ${name}</h1>
            <p>Accessible medication reminder - ${prompt}</p>
        </div>
        
        <div class="main-content">
            <div class="medication-form">
                <h2>Add New Medication</h2>
                <div class="form-group">
                    <label for="medName">Medication Name:</label>
                    <input type="text" id="medName" required>
                </div>
                <div class="form-group">
                    <label for="medDosage">Dosage:</label>
                    <input type="text" id="medDosage" placeholder="e.g., 10mg">
                </div>
                <div class="form-group">
                    <label for="medTime">Time:</label>
                    <input type="time" id="medTime" required>
                </div>
                <div class="form-group">
                    <label for="medFrequency">Frequency:</label>
                    <select id="medFrequency">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="as-needed">As Needed</option>
                    </select>
                </div>
                <button class="btn" onclick="addMedication()">Add Medication</button>
            </div>
            
            <div id="medicationList" class="medication-list">
                <div style="text-align: center; color: #6c757d; padding: 40px;">
                    No medications added yet.
                </div>
            </div>
        </div>
    </div>

    <script src="medication.js"></script>
</body>
</html>`,

    'medication.js': `// Medication Reminder Application
class MedicationReminder {
    constructor() {
        this.medications = JSON.parse(localStorage.getItem('medications')) || [];
        this.renderMedications();
        this.startReminderCheck();
    }
    
    addMedication() {
        const name = document.getElementById('medName').value.trim();
        const dosage = document.getElementById('medDosage').value.trim();
        const time = document.getElementById('medTime').value;
        const frequency = document.getElementById('medFrequency').value;
        
        if (!name || !time) {
            alert('Please fill in medication name and time');
            return;
        }
        
        const medication = {
            id: Date.now(),
            name,
            dosage,
            time,
            frequency,
            lastTaken: null,
            createdAt: new Date().toISOString()
        };
        
        this.medications.push(medication);
        this.saveMedications();
        this.renderMedications();
        this.clearForm();
    }
    
    renderMedications() {
        const container = document.getElementById('medicationList');
        
        if (this.medications.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 40px;">No medications added yet.</div>';
            return;
        }
        
        container.innerHTML = this.medications.map(med => \`
            <div class="medication-item">
                <h3>\${med.name} \${med.dosage ? '(' + med.dosage + ')' : ''}</h3>
                <p><strong>Time:</strong> \${med.time}</p>
                <p><strong>Frequency:</strong> \${med.frequency}</p>
                \${med.lastTaken ? '<p><strong>Last taken:</strong> ' + new Date(med.lastTaken).toLocaleString() + '</p>' : ''}
                <button class="btn" onclick="medicationApp.markTaken(\${med.id})">Mark as Taken</button>
                <button class="btn btn-danger" onclick="medicationApp.deleteMedication(\${med.id})">Delete</button>
            </div>
        \`).join('');
    }
    
    markTaken(id) {
        const med = this.medications.find(m => m.id === id);
        if (med) {
            med.lastTaken = new Date().toISOString();
            this.saveMedications();
            this.renderMedications();
            this.showNotification(\`\${med.name} marked as taken!\`);
        }
    }
    
    deleteMedication(id) {
        if (confirm('Delete this medication?')) {
            this.medications = this.medications.filter(m => m.id !== id);
            this.saveMedications();
            this.renderMedications();
        }
    }
    
    clearForm() {
        document.getElementById('medName').value = '';
        document.getElementById('medDosage').value = '';
        document.getElementById('medTime').value = '';
        document.getElementById('medFrequency').value = 'daily';
    }
    
    saveMedications() {
        localStorage.setItem('medications', JSON.stringify(this.medications));
    }
    
    startReminderCheck() {
        setInterval(() => this.checkReminders(), 60000); // Check every minute
    }
    
    checkReminders() {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                           now.getMinutes().toString().padStart(2, '0');
        
        this.medications.forEach(med => {
            if (med.time === currentTime) {
                this.showReminder(med);
            }
        });
    }
    
    showReminder(medication) {
        if (Notification.permission === 'granted') {
            new Notification('Medication Reminder', {
                body: \`Time to take \${medication.name}\${medication.dosage ? ' (' + medication.dosage + ')' : ''}\`,
                icon: '💊'
            });
        } else {
            alert(\`Reminder: Time to take \${medication.name}\`);
        }
    }
    
    showNotification(message) {
        if (Notification.permission === 'granted') {
            new Notification(message);
        }
    }
}

// Global functions
function addMedication() {
    medicationApp.addMedication();
}

// Initialize app
let medicationApp;
document.addEventListener('DOMContentLoaded', () => {
    medicationApp = new MedicationReminder();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});`,

    'README.md': `# ${name} - Medication Reminder

An accessible medication reminder application generated by VoiceAble.

## Description
${prompt}

## Features
- Add medications with dosage and timing
- Set reminder frequencies
- Mark medications as taken
- Browser notifications (if permissions granted)
- Persistent storage
- Fully accessible interface

## Usage
1. Open index.html in a web browser
2. Add your medications with times
3. Grant notification permissions for reminders
4. Mark medications as taken when you take them

Generated with ❤️ by VoiceAble
`
  };

  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: `Medication reminder: ${prompt}`,
    main: 'index.html',
    keywords: ['accessibility', 'medication', 'reminder', 'health', 'a11y'],
    author: 'VoiceAble Generator',
    license: 'MIT'
  };

  return {
    name,
    description: `A medication reminder application: ${prompt}`,
    files,
    packageJson,
    readme: files['README.md']
  };
}

function generateCustomApp(prompt: string, name: string): GeneratedApp {
  // Generate a custom accessible app based on the prompt
  const files = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
        }
        .main-content {
            padding: 40px;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .feature-card {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border-left: 4px solid #4facfe;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .feature-card h3 {
            color: #4facfe;
            margin-bottom: 15px;
        }
        .btn {
            display: inline-block;
            background: #4facfe;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
            margin: 10px 5px;
        }
        .btn:hover {
            background: #3d8bfe;
        }
        .btn:focus {
            outline: 3px solid #93c5fd;
            outline-offset: 2px;
        }
        .input-group {
            margin: 20px 0;
        }
        .input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .input-group input, .input-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
        }
        .input-group input:focus, .input-group textarea:focus {
            outline: none;
            border-color: #4facfe;
        }
        .status-message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        @media (max-width: 768px) {
            .header h1 { font-size: 2em; }
            .main-content { padding: 20px; }
            .feature-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${name}</h1>
            <p>Accessible application generated for: "${prompt}"</p>
        </div>
        
        <div class="main-content">
            <div class="feature-grid">
                <div class="feature-card">
                    <h3>🎯 Purpose</h3>
                    <p>This application was created to address your specific need: "${prompt}"</p>
                </div>
                
                <div class="feature-card">
                    <h3>♿ Accessibility</h3>
                    <p>Built with accessibility in mind - keyboard navigation, screen reader support, and high contrast design.</p>
                </div>
                
                <div class="feature-card">
                    <h3>📱 Responsive</h3>
                    <p>Works perfectly on desktop, tablet, and mobile devices.</p>
                </div>
            </div>
            
            <div class="input-group">
                <label for="userInput">Enter your information:</label>
                <textarea id="userInput" rows="4" placeholder="Type something here..."></textarea>
            </div>
            
            <button class="btn" onclick="processInput()">Process Input</button>
            <button class="btn" onclick="clearInput()">Clear</button>
            
            <div id="output" class="status-message" style="display: none;">
                Your input will be processed here.
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>`,

    'app.js': `// ${name} - Custom Accessible Application
class AccessibleApp {
    constructor() {
        this.initializeApp();
    }
    
    initializeApp() {
        console.log('${name} initialized');
        console.log('Purpose: ${prompt}');
        
        // Add keyboard navigation
        this.addKeyboardSupport();
        
        // Focus management
        this.manageFocus();
    }
    
    processInput() {
        const input = document.getElementById('userInput').value.trim();
        const output = document.getElementById('output');
        
        if (!input) {
            this.showMessage('Please enter some text to process.', 'error');
            document.getElementById('userInput').focus();
            return;
        }
        
        // Process the input based on the prompt
        const result = this.handleUserInput(input);
        
        output.innerHTML = \`
            <h3>Processed Result:</h3>
            <p><strong>Input:</strong> \${this.escapeHtml(input)}</p>
            <p><strong>Result:</strong> \${result}</p>
            <p><strong>Processed at:</strong> \${new Date().toLocaleString()}</p>
        \`;
        
        output.style.display = 'block';
        output.setAttribute('aria-live', 'polite');
        
        // Save to localStorage
        this.saveToHistory(input, result);
    }
    
    handleUserInput(input) {
        // Customize this based on the specific prompt
        const prompt = '${prompt}';
        
        if (prompt.toLowerCase().includes('calculator')) {
            return this.handleCalculation(input);
        } else if (prompt.toLowerCase().includes('converter')) {
            return this.handleConversion(input);
        } else if (prompt.toLowerCase().includes('timer')) {
            return this.handleTimer(input);
        } else {
            return \`Processed: \${input.toUpperCase()} (Length: \${input.length} characters)\`;
        }
    }
    
    handleCalculation(input) {
        try {
            // Simple safe evaluation for basic math
            const result = Function('"use strict"; return (' + input + ')')();
            return \`\${input} = \${result}\`;
        } catch (e) {
            return 'Invalid calculation. Please enter a valid mathematical expression.';
        }
    }
    
    handleConversion(input) {
        // Example unit conversion
        const number = parseFloat(input);
        if (isNaN(number)) {
            return 'Please enter a valid number for conversion.';
        }
        
        return \`\${number}°F = \${((number - 32) * 5/9).toFixed(2)}°C | \${number} miles = \${(number * 1.609).toFixed(2)} km\`;
    }
    
    handleTimer(input) {
        const minutes = parseInt(input);
        if (isNaN(minutes) || minutes <= 0) {
            return 'Please enter a valid number of minutes.';
        }
        
        // Start a simple timer
        setTimeout(() => {
            this.showNotification(\`Timer finished! \${minutes} minutes have passed.\`);
        }, minutes * 60 * 1000);
        
        return \`Timer set for \${minutes} minutes. You'll be notified when it's done.\`;
    }
    
    clearInput() {
        document.getElementById('userInput').value = '';
        document.getElementById('output').style.display = 'none';
        document.getElementById('userInput').focus();
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Enter to process
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.processInput();
            }
            
            // Ctrl+L to clear
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                this.clearInput();
            }
        });
    }
    
    manageFocus() {
        // Ensure good focus management
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.style.outline = '3px solid #4facfe';
                el.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', () => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        });
    }
    
    saveToHistory(input, result) {
        const history = JSON.parse(localStorage.getItem('appHistory')) || [];
        history.unshift({
            input,
            result,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 entries
        localStorage.setItem('appHistory', JSON.stringify(history.slice(0, 50)));
    }
    
    showMessage(message, type = 'info') {
        const output = document.getElementById('output');
        output.innerHTML = \`<p>\${message}</p>\`;
        output.style.display = 'block';
        output.className = type === 'error' ? 'status-message error' : 'status-message';
    }
    
    showNotification(message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('${name}', { body: message });
        } else {
            alert(message);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global functions
function processInput() {
    app.processInput();
}

function clearInput() {
    app.clearInput();
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AccessibleApp();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});`,

    'README.md': `# ${name}

A custom accessible application generated by VoiceAble.

## Description
${prompt}

## Features
- Fully accessible with ARIA labels and keyboard navigation
- Responsive design for all devices
- Local storage for data persistence
- Clean, modern interface
- Cross-browser compatibility

## Usage
1. Open index.html in a web browser
2. Enter information in the text area
3. Click "Process Input" or use Ctrl+Enter
4. View the processed results
5. Use Ctrl+L to clear the input

## Accessibility Features
- Full keyboard navigation
- Screen reader compatible
- High contrast focus indicators
- Semantic HTML structure
- ARIA live regions for dynamic content

## Keyboard Shortcuts
- Ctrl+Enter: Process input
- Ctrl+L: Clear input

Generated with ❤️ by VoiceAble
`
  };

  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: `Custom accessible app: ${prompt}`,
    main: 'index.html',
    scripts: {
      start: 'python -m http.server 3000',
      serve: 'npx serve .'
    },
    keywords: ['accessibility', 'custom', 'web-app', 'a11y'],
    author: 'VoiceAble Generator',
    license: 'MIT'
  };

  return {
    name,
    description: `A custom accessible application: ${prompt}`,
    files,
    packageJson,
    readme: files['README.md']
  };
}
