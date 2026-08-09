const express = require('express');
const path = require('path');
const calculator = require('./utils/calculator');

const app = express();
const PORT = process.env.PORT || 3000;

// =========================================================================
// SECURITY VULNERABILITY 1: Hardcoded credentials/secrets
// SonarQube will detect this as a Security Hotspot / Vulnerability (Hardcoded Secrets)
// =========================================================================
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"; 
const SONAR_DEMO_API_KEY = "sqc_7a9f8e4b3c2d1e0f6b8a9c0d1e2f3a4b5c6d";

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =========================================================================
// SECURITY VULNERABILITY 2: Unsafe eval() on user-controlled input
// SonarQube flags this as a critical Security Vulnerability (Code Injection / Dynamic Code Execution)
// =========================================================================
app.get('/api/eval', (req, res) => {
    const expression = req.query.expr;
    if (!expression) {
        return res.status(400).json({ error: "Missing expression parameter 'expr'" });
    }
    
    try {
        // VULNERABLE: Executing raw user input directly using eval()
        const result = eval(expression); 
        res.json(formatResponse({ input: expression, result: result }));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Bug demonstration endpoint calling calculator utility
app.get('/api/calculate', (req, res) => {
    const { operation, a, b } = req.query;
    
    try {
        const numA = a ? parseFloat(a) : undefined;
        const numB = b ? parseFloat(b) : undefined;
        
        // This will call the buggy calculator utility
        const result = calculator.calculate(operation, numA, numB);
        res.json(formatResult({ operation, a, b, result }));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =========================================================================
// CODE SMELL 1: Unused variables
// SonarQube flags variables declared but never read/used
// =========================================================================
const unusedConfigurationToken = "temp_value_unused";
let inactiveCounter = 0;

// =========================================================================
// CODE SMELL 2: Duplicated code blocks
// SonarQube scans for near-identical block copies and flags code duplication
// =========================================================================
function formatResponse(data) {
    console.log("Formatting response payload for output...");
    const timestamp = new Date().toISOString();
    return {
        success: true,
        data: data,
        timestamp: timestamp,
        version: "1.0.0"
    };
}

function formatResult(data) {
    console.log("Formatting response payload for output...");
    const timestamp = new Date().toISOString();
    return {
        success: true,
        data: data,
        timestamp: timestamp,
        version: "1.0.0"
    };
}

// =========================================================================
// CODE SMELL 3: Heavily commented-out code blocks
// SonarQube flags commented-out source code as a smell because it should be removed
// =========================================================================
/*
function legacyCalculator(op, x, y) {
    if (op === 'add') {
        return x + y;
    } else if (op === 'sub') {
        return x - y;
    } else if (op === 'mul') {
        return x * y;
    } else if (op === 'div') {
        if (y === 0) {
            throw new Error("Zero division");
        }
        return x / y;
    }
    return 0;
}
*/

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Credentials check: Key length ${SONAR_DEMO_API_KEY.length}, AWS Secret exists: ${!!AWS_SECRET_ACCESS_KEY}`);
});
