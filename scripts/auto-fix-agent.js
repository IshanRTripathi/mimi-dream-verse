import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE_PATH = path.join(__dirname, '..', 'dev-logs.json');
const SOURCE_DIR = path.join(__dirname, '..');

// Define fix patterns for common issues
const FIX_PATTERNS = [
  {
    // Fix for multiple instances of background music
    pattern: /multiple instances of bg music/i,
    files: [
      'src/pages/CreateStory.tsx',
      'src/components/ControlPanel.tsx'
    ],
    fix: (content, filePath) => {
      const fileName = path.basename(filePath);
       
      if (fileName === 'CreateStory.tsx') {
        // Remove BackgroundMusic from CreateStory.tsx
        return content.replace(
          /<BackgroundMusic[^/>]*\/>|<BackgroundMusic[^>]*>[\s\S]*?<\/BackgroundMusic>/g,
          ''
        );
      } else if (fileName === 'ControlPanel.tsx') {
        // Add conditional rendering in ControlPanel.tsx
        if (!content.includes('useLocation')) {
          content = content.replace(
            /import React[^;]*;/,
            "import React, { useState } from 'react';\nimport { useLocation } from 'react-router-dom';"
          );
        }
        
        if (!content.includes('isCreateStoryPage')) {
          content = content.replace(
            /const ControlPanel[^{]*{/,
            "const ControlPanel = () => {\n  const location = useLocation();\n  const isCreateStoryPage = location.pathname === '/create-story';"
          );
          
          // Wrap BackgroundMusic with conditional
          content = content.replace(
            /(<div[^>]*>\s*<BackgroundMusic[\s\S]*?\/>\s*<\/div>)/,
            '{!isCreateStoryPage && ($1)}'
          );
        }
        
        return content;
      }
      
      return content;
    }
  },
  {
    // Fix for WebSocket connection issues
    pattern: /WebSocket connection.*closed|websocket.*error/i,
    files: ['src/components/ConversationalAgent.tsx'],
    fix: (content, filePath) => {
      // Check if we already have reconnection logic
      if (content.includes('reconnectAttempts') || content.includes('handleReconnect')) {
        return content; // Already fixed
      }
      
      // Add imports if needed
      if (!content.includes('useEffect') || !content.includes('useRef')) {
        content = content.replace(
          /import[^;]*{([^}]*)}/,
          (match, imports) => {
            const newImports = imports.includes('useState') 
              ? imports.replace('useState', 'useState, useEffect, useRef')
              : imports + ', useState, useEffect, useRef';
            return match.replace(imports, newImports);
          }
        );
      }
      
      // Add state variables
      content = content.replace(
        /(\s*const\s*\[[^\]]+\]\s*=\s*useState[^;]*;)/,
        '$1\n  const [connectionError, setConnectionError] = useState(null);\n  const [isReconnecting, setIsReconnecting] = useState(false);\n  const reconnectTimeoutRef = useRef(null);\n  const reconnectAttemptsRef = useRef(0);'
      );
      
      // Add reconnection logic to onDisconnect
      content = content.replace(
        /(onDisconnect:\s*\(\)\s*=>\s*{[^}]*})/,
        (match) => {
          return match.replace(
            /}/,
            '\n      // If not manually disconnected and not reconnecting, attempt to reconnect\n      if (!isReconnecting && reconnectAttemptsRef.current < 3) {\n        handleReconnect();\n      }\n    }'
          );
        }
      );
      
      // Add handleReconnect function
      content = content.replace(
        /(const\s+handleStartConversation\s*=)/,
        '// Handle reconnection logic\n  const handleReconnect = () => {\n    setIsReconnecting(true);\n    reconnectAttemptsRef.current += 1;\n    \n    console.log(`Attempting to reconnect (attempt ${reconnectAttemptsRef.current}/3)...`);\n    \n    // Clear any existing timeout\n    if (reconnectTimeoutRef.current) {\n      window.clearTimeout(reconnectTimeoutRef.current);\n    }\n    \n    // Exponential backoff for reconnection attempts\n    const backoffTime = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);\n    \n    reconnectTimeoutRef.current = window.setTimeout(async () => {\n      try {\n        if (reconnectAttemptsRef.current <= 3) {\n          await handleStartConversation(true);\n        } else {\n          setIsReconnecting(false);\n          setConnectionError("Failed to reconnect after multiple attempts. Please try again later.");\n        }\n      } catch (error) {\n        console.error("Reconnection failed:", error);\n        setConnectionError("Failed to reconnect. Please try again manually.");\n        setIsReconnecting(false);\n      }\n    }, backoffTime);\n  };\n\n  // Cleanup function for all timers and intervals\n  useEffect(() => {\n    return () => {\n      if (reconnectTimeoutRef.current) {\n        window.clearTimeout(reconnectTimeoutRef.current);\n      }\n    };\n  }, []);\n\n  $1'
      );
      
      // Update handleStartConversation to accept reconnect parameter
      content = content.replace(
        /const\s+handleStartConversation\s*=\s*async\s*\(\)\s*=>/,
        'const handleStartConversation = async (isReconnect = false) =>'
      );
      
      // Add error handling UI
      content = content.replace(
        /(<div[^>]*>[\s\S]*?{conversation\.status[\s\S]*?<\/div>\s*<\/div>)/,
        '$1\n      {connectionError && (\n        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">\n          <div className="flex items-center gap-2 mb-2">\n            <AlertCircle className="w-4 h-4 text-red-600" />\n            <span className="text-red-600 dark:text-red-400 font-medium">\n              Connection Error\n            </span>\n          </div>\n          <p className="text-sm text-red-600 dark:text-red-400">\n            {connectionError}\n          </p>\n          <Button \n            variant="outline" \n            size="sm" \n            className="mt-2 text-red-600 border-red-200 hover:bg-red-50"\n            onClick={() => handleStartConversation(false)}\n            disabled={isReconnecting}\n          >\n            Try Again\n          </Button>\n        </div>\n      )}'
      );
      
      return content;
    }
  },
  {
    // Fix for null/undefined property access
    pattern: /Cannot read properties of (null|undefined)/i,
    files: null, // Will be determined from the error
    fix: (content, filePath, errorDetails) => {
      if (!errorDetails || !errorDetails.property) {
        return content; // Not enough information to fix
      }
      
      const property = errorDetails.property;
      const variableName = errorDetails.variable || '';
      
      // Add null check before accessing property
      const regex = new RegExp(`(${variableName})\.${property}`, 'g');
      return content.replace(regex, `$1 && $1.${property}`);
    }
  },
  {
    // Fix for missing import
    pattern: /ReferenceError: (\w+) is not defined/i,
    files: null, // Will be determined from the error
    fix: (content, filePath, errorDetails) => {
      if (!errorDetails || !errorDetails.match) {
        return content;
      }
      
      const missingImport = errorDetails.match[1];
      
      // Common imports and their sources
      const commonImports = {
        'useState': 'react',
        'useEffect': 'react',
        'useRef': 'react',
        'useCallback': 'react',
        'useMemo': 'react',
        'useContext': 'react',
        'useLocation': 'react-router-dom',
        'useNavigate': 'react-router-dom',
        'useParams': 'react-router-dom',
        'Button': '@/components/ui/button',
        'AlertCircle': 'lucide-react',
        'Mic': 'lucide-react',
        'MicOff': 'lucide-react',
        'RefreshCw': 'lucide-react'
      };
      
      if (commonImports[missingImport]) {
        // Add import statement
        if (content.includes(`import { ${missingImport} }`)) {
          return content; // Already imported
        }
        
        if (content.includes(`import { `) && content.includes(` from '${commonImports[missingImport]}'`)) {
          // Add to existing import
          return content.replace(
            new RegExp(`import\s*{([^}]*)}\s*from\s*['"](${commonImports[missingImport]})['"]`),
            (match, imports) => {
              return match.replace(imports, imports.includes(missingImport) ? imports : `${imports}, ${missingImport}`);
            }
          );
        } else {
          // Add new import statement
          return content.replace(
            /^(import[\s\S]*?;)(\s*)/m,
            `$1\nimport { ${missingImport} } from '${commonImports[missingImport]}';$2`
          );
        }
      }
      
      return content;
    }
  }
];

/**
 * Extract error details from error message
 * @param {string} errorMessage - The error message
 * @returns {Object|null} - Extracted details or null if not recognized
 */
function extractErrorDetails(errorMessage) {
  // Extract property from "Cannot read properties of null/undefined" errors
  const propertyMatch = errorMessage.match(/Cannot read properties of (null|undefined) \(reading ['"](\w+)['"]\)/);
  if (propertyMatch) {
    return {
      type: 'property_access',
      property: propertyMatch[2],
      variable: extractVariableFromError(errorMessage)
    };
  }
  
  // Extract variable name from reference errors
  const referenceMatch = errorMessage.match(/ReferenceError: (\w+) is not defined/);
  if (referenceMatch) {
    return {
      type: 'reference_error',
      match: referenceMatch
    };
  }
  
  return null;
}

/**
 * Try to extract the variable name from an error message and stack trace
 * @param {string} errorText - The error message and stack trace
 * @returns {string|null} - The variable name or null if not found
 */
function extractVariableFromError(errorText) {
  // This is a simplistic approach and might not work in all cases
  const lines = errorText.split('\n');
  for (const line of lines) {
    if (line.includes('.') && !line.includes('at ')) {
      const parts = line.split('.');
      if (parts.length >= 2) {
        return parts[0].trim().split(' ').pop();
      }
    }
  }
  return null;
}

/**
 * Read logs from file
 * @returns {Object} - The parsed logs
 */
function readLogs() {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      console.error(`❌ Log file not found: ${LOG_FILE_PATH}`);
      return { console: [], network: [], errors: [], warnings: [] };
    }
    
    const logsContent = fs.readFileSync(LOG_FILE_PATH, 'utf8');
    return JSON.parse(logsContent);
  } catch (error) {
    console.error(`❌ Failed to read logs: ${error.message}`);
    return { console: [], network: [], errors: [], warnings: [] };
  }
}

/**
 * Apply fixes to files based on detected issues
 * @returns {Promise<Array>} - Array of applied fixes
 */
async function applyFixes() {
  const logs = readLogs();
  const appliedFixes = [];
  
  if (!logs.errors || logs.errors.length === 0) {
    console.log('✅ No errors found in logs');
    return appliedFixes;
  }
  
  console.log(`🔍 Analyzing ${logs.errors.length} errors for potential fixes...`);
  
  for (const error of logs.errors) {
    const errorMessage = error.text || '';
    const errorDetails = extractErrorDetails(errorMessage);
    
    // Find matching fix patterns
    for (const fixPattern of FIX_PATTERNS) {
      if (fixPattern.pattern.test(errorMessage)) {
        console.log(`\n🔧 Found issue: ${errorMessage}`);
        
        const filesToFix = fixPattern.files || [];
        let fixApplied = false;
        
        for (const filePath of filesToFix) {
          const fullPath = path.join(SOURCE_DIR, filePath);
          
          if (fs.existsSync(fullPath)) {
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              const fixedContent = fixPattern.fix(content, fullPath, errorDetails);
              
              if (content !== fixedContent) {
                fs.writeFileSync(fullPath, fixedContent);
                console.log(`✅ Applied fix to ${filePath}`);
                
                appliedFixes.push({
                  file: filePath,
                  error: errorMessage,
                  timestamp: new Date().toISOString()
                });
                
                fixApplied = true;
              } else {
                console.log(`ℹ️ No changes needed for ${filePath}`);
              }
            } catch (fileError) {
              console.error(`❌ Error processing ${filePath}: ${fileError.message}`);
            }
          } else {
            console.log(`⚠️ File not found: ${filePath}`);
          }
        }
        
        if (!fixApplied) {
          console.log(`⚠️ Could not apply fix for: ${errorMessage}`);
        }
      }
    }
  }
  
  return appliedFixes;
}

/**
 * Main function
 */
async function main() {
  console.log('🤖 Starting Auto-Fix Agent...');
  
  try {
    const fixes = await applyFixes();
    
    if (fixes.length > 0) {
      console.log(`\n🎉 Applied ${fixes.length} fixes:`);
      fixes.forEach((fix, index) => {
        console.log(`${index + 1}. Fixed "${fix.error.substring(0, 50)}..." in ${fix.file}`);
      });
    } else {
      console.log('\nℹ️ No fixes were applied');
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
  }
}

// Run the main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
});