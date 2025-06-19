# Developer Log & Network Inspector Agent

This tool automatically monitors your web application's console logs, network activity, and WebSocket connections to help identify and fix issues in real-time.

## Features

- 🔍 **Real-time Monitoring**: Opens a browser pointing to your local app and monitors all console logs, network requests, and WebSocket activity
- 🧠 **Intelligent Analysis**: Automatically analyzes logs for errors and warnings, identifying common patterns
- 🛠️ **Automatic Fixes**: Can apply fixes to common issues like WebSocket connection problems and duplicate component rendering
- 🔄 **Continuous Monitoring**: Keeps monitoring until all issues are resolved or until manually stopped
- 📊 **Detailed Logging**: Saves all monitoring data to a JSON file for later analysis

## Getting Started

### Setup

Run the setup script to ensure all dependencies are installed and scripts are configured:

```bash
npm run setup:monitor
```

### Usage

You have several options for running the monitoring tools:

#### 1. Start the monitoring agent alongside your development server

```bash
npm run dev:monitor
```

This will start both your Vite development server and the monitoring agent.

#### 2. Start only the monitoring agent (if your app is already running)

```bash
npm run monitor
```

#### 3. Run the auto-fix agent to analyze logs and apply fixes

```bash
npm run auto-fix
```

## How It Works

### Monitoring Process

1. The agent launches a Chrome browser pointing to your local app (http://localhost:9999)
2. It connects to the Chrome DevTools Protocol to monitor:
   - Console logs (info, warnings, errors)
   - Network requests and responses
   - WebSocket connections and messages
   - JavaScript exceptions
3. It analyzes logs in real-time to identify patterns of known issues
4. It provides suggestions for fixes or can automatically apply them

### Auto-Fix Capabilities

The auto-fix agent can automatically fix several common issues:

1. **Multiple instances of background music**: Ensures BackgroundMusic component is only rendered once
2. **WebSocket connection issues**: Adds reconnection logic and proper error handling
3. **Null/undefined property access**: Adds null checks before accessing properties
4. **Missing imports**: Adds required import statements for undefined references

## Logs and Analysis

All monitoring data is saved to `dev-logs.json` in the project root. This file contains:

- Console logs (info, warnings, errors)
- Network requests and responses
- WebSocket messages
- JavaScript exceptions
- Applied fixes

## Troubleshooting

### Browser doesn't open or connect

If the browser doesn't open or can't connect to your app:

1. Make sure your app is running on http://localhost:9999
2. Check that Puppeteer is installed correctly
3. Try running the setup script again: `npm run setup:monitor`

### Monitoring agent crashes

If the monitoring agent crashes:

1. Check the console output for error messages
2. Make sure you have the latest version of Node.js installed
3. Try reinstalling dependencies: `npm install`

## Extending the Agent

You can extend the agent by adding new error patterns and fixes to the `ERROR_PATTERNS` array in `dev-log-monitor-agent.js` or the `FIX_PATTERNS` array in `auto-fix-agent.js`.

Each pattern consists of:

- `pattern`: A regular expression to match in error messages
- `description`: A human-readable description of the issue
- `filePatterns`: An array of file patterns where the issue might be found
- `suggestedFix`: A description of how to fix the issue
- `fix`: (auto-fix only) A function that applies the fix to the file content

## License

This tool is part of the Mimi Dream Verse project and is subject to the same license terms.