// Templates
const templates = {
    blank: {
        html: '<div class="container">\n  <h1>Hello World!</h1>\n</div>',
        css: '.container {\n  text-align: center;\n  padding: 2rem;\n}\n\nh1 {\n  color: #3b82f6;\n}',
        js: '// Your JavaScript code here\nconsole.log("Welcome to Code Playground!");'
    },
    gradientCard: {
        html: '<div class="card">\n  <h2>Gradient Card</h2>\n  <p>Hover over me!</p>\n</div>',
        css: '.card {\n  width: 300px;\n  padding: 2rem;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 1rem;\n  color: white;\n  transition: transform 0.3s;\n  cursor: pointer;\n}\n\n.card:hover {\n  transform: translateY(-10px);\n}\n\nh2 { margin: 0 0 1rem; }\np { margin: 0; opacity: 0.9; }',
        js: 'const card = document.querySelector(".card");\n\ncard.addEventListener("click", () => {\n  card.style.background = `linear-gradient(135deg, \n    hsl(${Math.random() * 360}, 70%, 60%), \n    hsl(${Math.random() * 360}, 70%, 60%))`;\n});'
    },
    particleEffect: {
        html: '<canvas id="canvas"></canvas>\n<div class="info">Click to create particles!</div>',
        css: 'body { margin: 0; overflow: hidden; background: #000; }\n\n#canvas {\n  display: block;\n  width: 100vw;\n  height: 100vh;\n}\n\n.info {\n  position: fixed;\n  top: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n  color: white;\n  font-family: Arial;\n  font-size: 1.2rem;\n}',
        js: 'const canvas = document.getElementById("canvas");\nconst ctx = canvas.getContext("2d");\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\n\nconst particles = [];\n\nclass Particle {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n    this.vx = (Math.random() - 0.5) * 4;\n    this.vy = (Math.random() - 0.5) * 4;\n    this.size = Math.random() * 3 + 2;\n    this.life = 100;\n    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;\n  }\n  \n  update() {\n    this.x += this.vx;\n    this.y += this.vy;\n    this.vy += 0.1;\n    this.life -= 1;\n  }\n  \n  draw() {\n    ctx.globalAlpha = this.life / 100;\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);\n    ctx.fill();\n  }\n}\n\ncanvas.addEventListener("click", (e) => {\n  for (let i = 0; i < 30; i++) {\n    particles.push(new Particle(e.clientX, e.clientY));\n  }\n});\n\nfunction animate() {\n  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n  \n  for (let i = particles.length - 1; i >= 0; i--) {\n    particles[i].update();\n    particles[i].draw();\n    if (particles[i].life <= 0) particles.splice(i, 1);\n  }\n  \n  requestAnimationFrame(animate);\n}\n\nanimate();'
    },
    todoApp: {
        html: '<div class="app">\n  <h1>📝 Todo List</h1>\n  <div class="input-group">\n    <input id="taskInput" placeholder="Add a new task...">\n    <button id="addBtn">Add</button>\n  </div>\n  <ul id="taskList"></ul>\n</div>',
        css: '.app {\n  max-width: 500px;\n  margin: 2rem auto;\n  padding: 2rem;\n  background: white;\n  border-radius: 1rem;\n  box-shadow: 0 10px 40px rgba(0,0,0,0.1);\n}\n\nh1 { text-align: center; color: #333; }\n\n.input-group {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n\ninput {\n  flex: 1;\n  padding: 0.75rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 0.5rem;\n  font-size: 1rem;\n}\n\nbutton {\n  padding: 0.75rem 1.5rem;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-weight: 600;\n}\n\nbutton:hover { background: #2563eb; }\n\n#taskList {\n  list-style: none;\n  padding: 0;\n}\n\n.task-item {\n  padding: 1rem;\n  background: #f9fafb;\n  margin-bottom: 0.5rem;\n  border-radius: 0.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.task-item.completed {\n  text-decoration: line-through;\n  opacity: 0.6;\n}\n\n.delete-btn {\n  padding: 0.25rem 0.75rem;\n  background: #ef4444;\n  font-size: 0.875rem;\n}',
        js: 'const taskInput = document.getElementById("taskInput");\nconst addBtn = document.getElementById("addBtn");\nconst taskList = document.getElementById("taskList");\n\nfunction addTask() {\n  const text = taskInput.value.trim();\n  if (!text) return;\n  \n  const li = document.createElement("li");\n  li.className = "task-item";\n  li.innerHTML = `\n    <span>${text}</span>\n    <button class="delete-btn">Delete</button>\n  `;\n  \n  li.querySelector("span").addEventListener("click", () => {\n    li.classList.toggle("completed");\n  });\n  \n  li.querySelector(".delete-btn").addEventListener("click", () => {\n    li.remove();\n  });\n  \n  taskList.appendChild(li);\n  taskInput.value = "";\n}\n\naddBtn.addEventListener("click", addTask);\ntaskInput.addEventListener("keypress", (e) => {\n  if (e.key === "Enter") addTask();\n});'
    }
};

// DOM Elements
let htmlEditor, cssEditor, jsEditor, preview, tabs, editors, templateSelect, shareBtn, downloadBtn, runBtn, consolePanel, consoleOutput;

let logs = [];
let autoRunTimeout;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements after page loads
    htmlEditor = document.getElementById('htmlEditor');
    cssEditor = document.getElementById('cssEditor');
    jsEditor = document.getElementById('jsEditor');
    preview = document.getElementById('preview');
    tabs = document.querySelectorAll('.tab');
    editors = document.querySelectorAll('.editor');
    templateSelect = document.getElementById('templateSelect');
    shareBtn = document.getElementById('shareBtn');
    downloadBtn = document.getElementById('downloadBtn');
    runBtn = document.getElementById('runBtn');
    consolePanel = document.getElementById('consolePanel');
    consoleOutput = document.getElementById('consoleOutput');

    // Initialize with blank template
    setTimeout(() => {
        loadTemplate('blank');
    }, 100);

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update editors
            editors.forEach(e => e.classList.remove('active'));
            document.getElementById(`${tabName}Editor`).classList.add('active');
        });
    });

    // Auto-run code on input
    function setupAutoRun(editor) {
        editor.addEventListener('input', () => {
            clearTimeout(autoRunTimeout);
            autoRunTimeout = setTimeout(runCode, 500);
        });
    }

    setupAutoRun(htmlEditor);
    setupAutoRun(cssEditor);
    setupAutoRun(jsEditor);

    // Template select
    templateSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            loadTemplate(e.target.value);
            e.target.value = '';
        }
    });

    // Share functionality
    shareBtn.addEventListener('click', () => {
        const code = {
            html: htmlEditor.value,
            css: cssEditor.value,
            js: jsEditor.value
        };
        
        const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(code))));
        const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
        
        navigator.clipboard.writeText(url).then(() => {
            alert('✅ Link copied to clipboard! Share it with others.');
        }).catch(() => {
            prompt('Copy this link:', url);
        });
    });

    // Download functionality
    downloadBtn.addEventListener('click', () => {
        const content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground Export</title>
    <style>
${cssEditor.value}
    </style>
</head>
<body>
${htmlEditor.value}
    <script>
${jsEditor.value}
    <\/script>
</body>
</html>`;
        
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.html';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Manual run button
    runBtn.addEventListener('click', runCode);

    // Load shared code from URL
    const hash = window.location.hash.slice(1);
    if (hash) {
        try {
            const decoded = JSON.parse(decodeURIComponent(escape(atob(hash))));
            htmlEditor.value = decoded.html || '';
            cssEditor.value = decoded.css || '';
            jsEditor.value = decoded.js || '';
            setTimeout(() => runCode(), 100);
        } catch (e) {
            console.error('Failed to load shared code:', e);
        }
    }

    // Handle console messages from iframe
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'log') {
            logs.push(event.data);
            displayLog(event.data);
            consolePanel.classList.remove('hidden');
        }
    });
});

// Run code function - FIXED VERSION
function runCode() {
    if (!preview || !htmlEditor || !cssEditor || !jsEditor) return;
    
    logs = [];
    if (consoleOutput) consoleOutput.innerHTML = '';
    
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;
    const jsCode = jsEditor.value;
    
    // Create the complete HTML document as a data URL to avoid CORS
    const content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>
        // Console capture
        (function() {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
                window.parent.postMessage({ 
                    type: 'log', 
                    level: 'log', 
                    message: args.map(a => String(a)).join(' ') 
                }, '*');
                originalLog.apply(console, args);
            };
            
            console.error = function(...args) {
                window.parent.postMessage({ 
                    type: 'log', 
                    level: 'error', 
                    message: args.map(a => String(a)).join(' ') 
                }, '*');
                originalError.apply(console, args);
            };
            
            console.warn = function(...args) {
                window.parent.postMessage({ 
                    type: 'log', 
                    level: 'warn', 
                    message: args.map(a => String(a)).join(' ') 
                }, '*');
                originalWarn.apply(console, args);
            };
            
            window.onerror = function(msg, source, line, col, error) {
                window.parent.postMessage({ 
                    type: 'log', 
                    level: 'error', 
                    message: 'Error: ' + msg
                }, '*');
                return true;
            };
        })();
        
        // User code
        try {
            ${jsCode}
        } catch (error) {
            console.error(error.message);
        }
    <\/script>
</body>
</html>`;

    // Use srcdoc instead of accessing contentDocument (avoids CORS issues)
    preview.srcdoc = content;
}

function displayLog(log) {
    if (!consoleOutput) return;
    
    const logElement = document.createElement('div');
    logElement.className = `console-${log.level}`;
    logElement.textContent = log.message;
    consoleOutput.appendChild(logElement);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Load template
function loadTemplate(templateName) {
    if (!templates[templateName]) return;
    
    if (htmlEditor && cssEditor && jsEditor) {
        htmlEditor.value = templates[templateName].html;
        cssEditor.value = templates[templateName].css;
        jsEditor.value = templates[templateName].js;
        setTimeout(() => runCode(), 100);
    }
}