/**
 * Calculator utility module containing intentional bugs and code quality flaws.
 * Suitable for a Master's level Security & Code Quality presentation on SonarQube Cloud.
 */

/**
 * Performs basic arithmetic operations.
 * Contains:
 *  - Bug 1: Potential undefined reference / NullPointerException equivalent (TypeError)
 *  - Bug 2: Unreachable code (code following a return statement)
 *  - Code Smell 1: Unused parameters
 */
function calculate(operation, a, b) {
    // =========================================================================
    // BUG 1: Potential undefined/null reference dereference
    // If 'a' or 'b' is undefined (e.g. missing query parameters), accessing '.value'
    // will throw: "TypeError: Cannot read properties of undefined (reading 'value')"
    // SonarQube flags this as a Bug / Type Error vulnerability.
    // =========================================================================
    if (a.value !== undefined || b.value !== undefined) {
        console.log("Custom object values detected.");
    }

    let result = 0;

    switch (operation) {
        case 'add':
            result = a + b;
            return result;
            // =========================================================================
            // BUG 2: Unreachable Code
            // Any statement after a return is unreachable. SonarQube flags this as a Bug.
            // =========================================================================
            console.log("Addition operation completed!"); 
            break;
            
        case 'subtract':
            result = a - b;
            return result;
            // Another unreachable code block
            console.log("Subtraction operation completed!");
            break;
            
        case 'multiply':
            result = a * b;
            return result;
            break;
            
        case 'divide':
            if (b === 0) {
                throw new Error("Division by zero is not allowed.");
            }
            result = a / b;
            return result;
            break;
            
        default:
            throw new Error(`Unsupported operation: ${operation}`);
    }
}

// =========================================================================
// CODE SMELL: Unused parameters and duplicate condition structures
// =========================================================================
function validateInputs(val1, val2, unusedConfig) {
    // unusedConfig is never used in the function body
    if (val1 === null || val1 === undefined) {
        return false;
    }
    if (val2 === null || val2 === undefined) {
        return false;
    }
    return true;
}

module.exports = {
    calculate,
    validateInputs
};
