// ============================================
// GLOBAL VARIABLES & INITIALIZATION
// ============================================

// Global scope variables
const globalAppState = {
    animationRunning: false,
    currentProgress: 0,
    progressInterval: null,
    modalOpen: false
};

// DOM Elements
const elements = {
    // Part 2 Elements
    scopeDemo: document.getElementById('scope-demo'),
    scopeOutput: document.getElementById('scope-output'),
    calculateSum: document.getElementById('calculate-sum'),
    calculateProduct: document.getElementById('calculate-product'),
    calculatePower: document.getElementById('calculate-power'),
    calculationOutput: document.getElementById('calculation-output'),
    reverseText: document.getElementById('reverse-text'),
    countChars: document.getElementById('count-chars'),
    toggleCase: document.getElementById('toggle-case'),
    textOutput: document.getElementById('text-output'),
    
    // Part 3 Elements
    startAnimation: document.getElementById('start-animation'),
    stopAnimation: document.getElementById('stop-animation'),
    resetAnimation: document.getElementById('reset-animation'),
    controlledBox: document.getElementById('controlled-box'),
    flipCard: document.getElementById('flip-card'),
    flipCardBtn: document.getElementById('flip-card-btn'),
    openModal: document.getElementById('open-modal'),
    modal: document.getElementById('modal'),
    closeModal: document.getElementById('close-modal'),
    modalClose: document.querySelector('.close'),
    startLoading: document.getElementById('start-loading'),
    resetLoading: document.getElementById('reset-loading'),
    progressFill: document.getElementById('progress-fill')
};

// ============================================
// PART 2: JAVASCRIPT FUNCTIONS
// ============================================

/**
 * Demonstrates function scope by showing local vs global variables
 * This function creates local variables and compares them with global ones
 */
function demonstrateScope() {
    // Local scope variables
    const localVar = "I'm a local variable";
    let counter = 0;
    
    // Nested function demonstrating closure and scope chain
    function innerFunction() {
        const innerVar = "I'm in the inner function";
        counter++; // Can access parent function's variables
        
        return {
            localVar: localVar,
            innerVar: innerVar,
            counter: counter,
            globalState: globalAppState.animationRunning
        };
    }
    
    // Call inner function multiple times to show closure in action
    const result1 = innerFunction();
    const result2 = innerFunction();
    const result3 = innerFunction();
    
    return {
        firstCall: result1,
        secondCall: result2,
        thirdCall: result3,
        cannotAccessInner: "Cannot access innerVar from outside innerFunction"
    };
}

/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function calculateSum(a, b) {
    // Parameter scope - a and b are only accessible within this function
    const result = a + b;
    return result;
}

/**
 * Calculates the product of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The product of a and b
 */
function calculateProduct(a, b) {
    return a * b;
}

/**
 * Calculates the power of a number raised to an exponent
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} base raised to the power of exponent
 */
function calculatePower(base, exponent) {
    // Using Math.pow for the calculation
    return Math.pow(base, exponent);
}

/**
 * Reverses a string
 * @param {string} text - The text to reverse
 * @returns {string} The reversed text
 */
function reverseString(text) {
    // Convert to array, reverse, then back to string
    return text.split('').reverse().join('');
}

/**
 * Counts characters in a string (excluding spaces)
 * @param {string} text - The text to analyze
 * @returns {Object} Object containing total characters and character count without spaces
 */
function countCharacters(text) {
    const totalChars = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    
    return {
        total: totalChars,
        withoutSpaces: charsWithoutSpaces,
        spaceCount: totalChars - charsWithoutSpaces
    };
}

/**
 * Toggles the case of each character in a string
 * @param {string} text - The text to transform
 * @returns {string} The text with case toggled
 */
function toggleCase(text) {
    return text.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }).join('');
}

/**
 * Gets input values from number inputs
 * @returns {Object} Object containing the two numbers
 */
function getNumberInputs() {
    const num1 = parseFloat(document.getElementById('num1').value) || 0;
    const num2 = parseFloat(document.getElementById('num2').value) || 0;
    
    return { num1, num2 };
}

/**
 * Gets text input value
 * @returns {string} The text from input
 */
function getTextInput() {
    return document.getElementById('text-input').value;
}

// ============================================
// PART 3: CSS + JAVASCRIPT INTEGRATION
// ============================================

/**
 * Controls the animation state of the box
 * @param {string} action - The action to perform: 'start', 'stop', or 'reset'
 */
function controlAnimation(action) {
    const box = elements.controlledBox;
    
    switch(action) {
        case 'start':
            if (!globalAppState.animationRunning) {
                box.classList.add('animated');
                globalAppState.animationRunning = true;
                console.log('Animation started');
            }
            break;
            
        case 'stop':
            box.classList.remove('animated');
            globalAppState.animationRunning = false;
            console.log('Animation stopped');
            break;
            
        case 'reset':
            box.classList.remove('animated');
            // Force reflow to restart animation if added back
            void box.offsetWidth;
            globalAppState.animationRunning = false;
            console.log('Animation reset');
            break;
    }
}

/**
 * Toggles the card flip animation
 */
function flipCard() {
    elements.flipCard.classList.toggle('flipped');
}

/**
 * Opens the modal with animation
 */
function openModal() {
    if (!globalAppState.modalOpen) {
        elements.modal.style.display = 'block';
        globalAppState.modalOpen = true;
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes the modal
 */
function closeModal() {
    elements.modal.style.display = 'none';
    globalAppState.modalOpen = false;
    document.body.style.overflow = 'auto';
}

/**
 * Starts the progress loading animation
 */
function startLoading() {
    if (globalAppState.progressInterval) {
        clearInterval(globalAppState.progressInterval);
    }
    
    globalAppState.currentProgress = 0;
    elements.progressFill.style.width = '0%';
    elements.progressFill.classList.add('animated');
    
    globalAppState.progressInterval = setInterval(() => {
        if (globalAppState.currentProgress < 100) {
            globalAppState.currentProgress += 2;
            elements.progressFill.style.width = globalAppState.currentProgress + '%';
        } else {
            clearInterval(globalAppState.progressInterval);
            setTimeout(() => {
                elements.progressFill.classList.remove('animated');
            }, 500);
        }
    }, 50);
}

/**
 * Resets the progress loader
 */
function resetLoading() {
    if (globalAppState.progressInterval) {
        clearInterval(globalAppState.progressInterval);
    }
    
    globalAppState.currentProgress = 0;
    elements.progressFill.style.width = '0%';
    elements.progressFill.classList.remove('animated');
}

// ============================================
// EVENT HANDLERS & INITIALIZATION
// ============================================

/**
 * Initializes all event listeners
 */
function initializeEventListeners() {
    // Part 2: Function Demonstrations
    elements.scopeDemo.addEventListener('click', () => {
        const scopeResults = demonstrateScope();
        elements.scopeOutput.innerHTML = `
            <h4>Function Scope Demonstration:</h4>
            <p><strong>First Call:</strong> Counter = ${scopeResults.firstCall.counter}</p>
            <p><strong>Second Call:</strong> Counter = ${scopeResults.secondCall.counter}</p>
            <p><strong>Third Call:</strong> Counter = ${scopeResults.thirdCall.counter}</p>
            <p><strong>Local Variable:</strong> "${scopeResults.firstCall.localVar}"</p>
            <p><strong>Global State Access:</strong> ${scopeResults.firstCall.globalState}</p>
            <p><strong>Scope Limitation:</strong> ${scopeResults.cannotAccessInner}</p>
        `;
    });
    
    // Calculation functions
    elements.calculateSum.addEventListener('click', () => {
        const { num1, num2 } = getNumberInputs();
        const result = calculateSum(num1, num2);
        elements.calculationOutput.innerHTML = `
            <p><strong>Sum Calculation:</strong></p>
            <p>${num1} + ${num2} = <strong>${result}</strong></p>
        `;
    });
    
    elements.calculateProduct.addEventListener('click', () => {
        const { num1, num2 } = getNumberInputs();
        const result = calculateProduct(num1, num2);
        elements.calculationOutput.innerHTML = `
            <p><strong>Product Calculation:</strong></p>
            <p>${num1} × ${num2} = <strong>${result}</strong></p>
        `;
    });
    
    elements.calculatePower.addEventListener('click', () => {
        const { num1, num2 } = getNumberInputs();
        const result = calculatePower(num1, num2);
        elements.calculationOutput.innerHTML = `
            <p><strong>Power Calculation:</strong></p>
            <p>${num1}<sup>${num2}</sup> = <strong>${result}</strong></p>
        `;
    });
    
    // Text manipulation functions
    elements.reverseText.addEventListener('click', () => {
        const text = getTextInput();
        const result = reverseString(text);
        elements.textOutput.innerHTML = `
            <p><strong>Original:</strong> "${text}"</p>
            <p><strong>Reversed:</strong> "${result}"</p>
        `;
    });
    
    elements.countChars.addEventListener('click', () => {
        const text = getTextInput();
        const result = countCharacters(text);
        elements.textOutput.innerHTML = `
            <p><strong>Text Analysis:</strong> "${text}"</p>
            <p>Total Characters: <strong>${result.total}</strong></p>
            <p>Without Spaces: <strong>${result.withoutSpaces}</strong></p>
            <p>Space Count: <strong>${result.spaceCount}</strong></p>
        `;
    });
    
    elements.toggleCase.addEventListener('click', () => {
        const text = getTextInput();
        const result = toggleCase(text);
        elements.textOutput.innerHTML = `
            <p><strong>Original:</strong> "${text}"</p>
            <p><strong>Case Toggled:</strong> "${result}"</p>
        `;
    });
    
    // Part 3: Animation Controls
    elements.startAnimation.addEventListener('click', () => controlAnimation('start'));
    elements.stopAnimation.addEventListener('click', () => controlAnimation('stop'));
    elements.resetAnimation.addEventListener('click', () => controlAnimation('reset'));
    
    // Card flip
    elements.flipCard.addEventListener('click', flipCard);
    elements.flipCardBtn.addEventListener('click', flipCard);
    
    // Modal controls
    elements.openModal.addEventListener('click', openModal);
    elements.closeModal.addEventListener('click', closeModal);
    elements.modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    elements.modal.addEventListener('click', (event) => {
        if (event.target === elements.modal) {
            closeModal();
        }
    });
    
    // Progress loader
    elements.startLoading.addEventListener('click', startLoading);
    elements.resetLoading.addEventListener('click', resetLoading);
}

/**
 * Initializes the application when DOM is loaded
 */
function initializeApp() {
    console.log('Initializing Interactive Animation Experience...');
    
    // Set initial states
    globalAppState.animationRunning = false;
    globalAppState.modalOpen = false;
    
    // Initialize event listeners
    initializeEventListeners();
    
    console.log('Application initialized successfully!');
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

/**
 * Utility function to log function calls for debugging
 * @param {string} functionName - Name of the function being called
 * @param {...any} args - Arguments passed to the function
 */
function logFunctionCall(functionName, ...args) {
    console.log(`Function called: ${functionName}`, args);
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}// ============================================
// GLOBAL VARIABLES & INITIALIZATION
// ============================================

// Global scope variables
const globalAppState = {
    animationRunning: false,
    currentProgress: 0,
    progressInterval: null,
    modalOpen: false
};

// DOM Elements
const elements = {
    // Part 2 Elements
    scopeDemo: document.getElementById('scope-demo'),
    scopeOutput: document.getElementById('scope-output'),
    calculateSum: document.getElementById('calculate-sum'),
    calculateProduct: document.getElementById('calculate-product'),
    calculatePower: document.getElementById('calculate-power'),
    calculationOutput: document.getElementById('calculation-output'),
    reverseText: document.getElementById('reverse-text'),
    countChars: document.getElementById('count-chars'),
    toggleCase: document.getElementById('toggle-case'),
    textOutput: document.getElementById('text-output'),
    
    // Part 3 Elements
    startAnimation: document.getElementById('start-animation'),
    stopAnimation: document.getElementById('stop-animation'),
    resetAnimation: document.getElementById('reset-animation'),
    controlledBox: document.getElementById('controlled-box'),
    flipCard: document.getElementById('flip-card'),
    flipCardBtn: document.getElementById('flip-card-btn'),
    openModal: document.getElementById('open-modal'),
    modal: document.getElementById('modal'),
    closeModal: document.getElementById('close-modal'),
    modalClose: document.querySelector('.close'),
    startLoading: document.getElementById('start-loading'),
    resetLoading: document.getElementById('reset-loading'),
    progressFill: document.getElementById('progress-fill')
};

// ============================================
// PART 2: JAVASCRIPT FUNCTIONS
// ============================================

/**
 * Demonstrates function scope by showing local vs global variables
 * This function creates local variables and compares them with global ones
 */
function demonstrateScope() {
    // Local scope variables
    const localVar = "I'm a local variable";
    let counter = 0;
    
    // Nested function demonstrating closure and scope chain
    function innerFunction() {
        const innerVar = "I'm in the inner function";
        counter++; // Can access parent function's variables
        
        return {
            localVar: localVar,
            innerVar: innerVar,
            counter: counter,
            globalState: globalAppState.animationRunning
        };
    }
    
    // Call inner function multiple times to show closure in action
    const result1 = innerFunction();
    const result2 = innerFunction();
    const result3 = innerFunction();
    
    return {
        firstCall: result1,
        secondCall: result2,
        thirdCall: result3,
        cannotAccessInner: "Cannot access innerVar from outside innerFunction"
    };
}

/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function calculateSum(a, b) {
    // Parameter scope - a and b are only accessible within this function
    const result = a + b;
    return result;
}

/**
 * Calculates the product of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The product of a and b
 */
function calculateProduct(a, b) {
    return a * b;
}

/**
 * Calculates the power of a number raised to an exponent
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} base raised to the power of exponent
 */
function calculatePower(base, exponent) {
    // Using Math.pow for the calculation
    return Math.pow(base, exponent);
}

/**
 * Reverses a string
 * @param {string} text - The text to reverse
 * @returns {string} The reversed text
 */
function reverseString(text) {
    // Convert to array, reverse, then back to string
    return text.split('').reverse().join('');
}

/**
 * Counts characters in a string (excluding spaces)
 * @param {string} text - The text to analyze
 * @returns {Object} Object containing total characters and character count without spaces
 */
function countCharacters(text) {
    const totalChars = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    
    return {
        total: totalChars,
        withoutSpaces: charsWithoutSpaces,
        spaceCount: totalChars - charsWithoutSpaces
    };
}

/**
 * Toggles the case of each character in a string
 * @param {string} text - The text to transform
 * @returns {string} The text with case toggled
 */
function toggleCase(text) {
    return text.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }).join('');
}

/**
 * Gets input values from number inputs
 * @returns {Object} Object containing the two numbers
 */
function getNumberInputs() {
    const num1 = parseFloat(document.getElementById('num1').value) || 0;
    const num2 = parseFloat(document.getElementById('num2').value) || 0;
    
    return { num1, num2 };
}

/**
 * Gets text input value
 * @returns {string} The text from input
 */
function getTextInput() {
    return document.getElementById('text-input').value;
}

// ============================================
// PART 3: CSS + JAVASCRIPT INTEGRATION
// ============================================

/**
 * Controls the animation state of the box
 * @param {string} action - The action to perform: 'start', 'stop', or 'reset'
 */
function controlAnimation(action) {
    const box = elements.controlledBox;
    
    switch(action) {
        case 'start':
            if (!globalAppState.animationRunning) {
                box.classList.add('animated');
                globalAppState.animationRunning = true;
                console.log('Animation started');
            }
            break;
            
        case 'stop':
            box.classList.remove('animated');
            globalAppState.animationRunning = false;
            console.log('Animation stopped');
            break;
            
        case 'reset':
            box.classList.remove('animated');
            // Force reflow to restart animation if added back
            void box.offsetWidth;
            globalAppState.animationRunning = false;
            console.log('Animation reset');
            break;
    }
}

/**
 * Toggles the card flip animation
 */
function flipCard() {
    elements.flipCard.classList.toggle('flipped');
}

/**
 * Opens the modal with animation
 */
function openModal() {
    if (!globalAppState.modalOpen) {
        elements.modal.style.display = 'block';
        globalAppState.modalOpen = true;
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes the modal
 */
function closeModal() {
    elements.modal.style.display = 'none';
    globalAppState.modalOpen = false;
    document.body.style.overflow = 'auto';
}

/**
 * Starts the progress loading animation
 */
function startLoading() {
    if (globalAppState.progressInterval) {
        clearInterval(globalAppState.progressInterval);
    }
    
    globalAppState.currentProgress = 0;
    elements.progressFill.style.width = '0%';
    elements.progressFill.classList.add('animated');
    
    globalAppState.progressInterval = setInterval(() => {
        if (globalAppState.currentProgress < 100) {
            globalAppState.currentProgress += 2;
            elements.progressFill.style.width = globalAppState.currentProgress + '%';
        } else {
            clearInterval(globalAppState.progressInterval);
            setTimeout(() => {
                elements.progressFill.classList.remove('animated');
            }, 500);
        }
    }, 50);
}

/**
 * Resets the progress loader
 */
function resetLoading() {
    if (globalAppState.progressInterval) {
        clearInterval(globalAppState.progressInterval);
    }
    
    globalAppState.currentProgress = 0;
    elements.progressFill.style.width = '0%';
    elements.progressFill.classList.remove('animated');
}

// ============================================
// EVENT HANDLERS & INITIALIZATION
// ============================================

/**
 * Initializes all event listeners
 */
function initializeEventListeners() {
    // Part 2: Function Demonstrations
    elements.scopeDemo.addEventListener('click', () => {
        const scopeResults = demonstrateScope();
        elements.scopeOutput.innerHTML = `
            <h4>Function Scope Demonstration:</h4>
            <p><strong>First Call:</strong> Counter = ${scopeResults.firstCall.counter}</p>
            <p><strong>Second Call:</strong> Counter = ${scopeResults.secondCall.counter}</p>
            <p><strong>Third Call:</strong> Counter = ${scopeResults.thirdCall.counter}</p>
            <p><strong>Local Variable:</strong> "${scopeResults.firstCall.localVar}"</p>
            <p><strong>Global State Access:</strong> ${scopeResults.firstCall.globalState}</p>
            <p><strong>Scope Limitation:</strong> ${scopeResults.cannotAccessInner}</p>
        `;
    });
    
    // Calculation functions
    elements.calculateSum.addEventListener('click', () => {
        const { num1, num2 } = getNumberInputs();
        const result = calculateSum(num1, num2);
        elements.calculationOutput.innerHTML = `
            <p><strong>Sum Calculation:</strong></p>
            <p>${num1} + ${num2} = <strong>${result}</strong></p>
        `;
    });
    
    elements.calculateProduct.addEventListener('click', () => {
        const { num1, num2 } = getNumberInputs();
        const result = calculateProduct(num1, num2);
        elements.calculationOutput.innerHTML = `
            <p><strong>Product Calculation:</strong></p>
            <p>${num1} × ${num2} = <strong>${result}</strong></p>
        `;
    });
    
    elements.calculatePower.addEventListener('click', () => {
        const { num1, num2 } = getNumberInputs();
        const result = calculatePower(num1, num2);
        elements.calculationOutput.innerHTML = `
            <p><strong>Power Calculation:</strong></p>
            <p>${num1}<sup>${num2}</sup> = <strong>${result}</strong></p>
        `;
    });
    
    // Text manipulation functions
    elements.reverseText.addEventListener('click', () => {
        const text = getTextInput();
        const result = reverseString(text);
        elements.textOutput.innerHTML = `
            <p><strong>Original:</strong> "${text}"</p>
            <p><strong>Reversed:</strong> "${result}"</p>
        `;
    });
    
    elements.countChars.addEventListener('click', () => {
        const text = getTextInput();
        const result = countCharacters(text);
        elements.textOutput.innerHTML = `
            <p><strong>Text Analysis:</strong> "${text}"</p>
            <p>Total Characters: <strong>${result.total}</strong></p>
            <p>Without Spaces: <strong>${result.withoutSpaces}</strong></p>
            <p>Space Count: <strong>${result.spaceCount}</strong></p>
        `;
    });
    
    elements.toggleCase.addEventListener('click', () => {
        const text = getTextInput();
        const result = toggleCase(text);
        elements.textOutput.innerHTML = `
            <p><strong>Original:</strong> "${text}"</p>
            <p><strong>Case Toggled:</strong> "${result}"</p>
        `;
    });
    
    // Part 3: Animation Controls
    elements.startAnimation.addEventListener('click', () => controlAnimation('start'));
    elements.stopAnimation.addEventListener('click', () => controlAnimation('stop'));
    elements.resetAnimation.addEventListener('click', () => controlAnimation('reset'));
    
    // Card flip
    elements.flipCard.addEventListener('click', flipCard);
    elements.flipCardBtn.addEventListener('click', flipCard);
    
    // Modal controls
    elements.openModal.addEventListener('click', openModal);
    elements.closeModal.addEventListener('click', closeModal);
    elements.modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    elements.modal.addEventListener('click', (event) => {
        if (event.target === elements.modal) {
            closeModal();
        }
    });
    
    // Progress loader
    elements.startLoading.addEventListener('click', startLoading);
    elements.resetLoading.addEventListener('click', resetLoading);
}

/**
 * Initializes the application when DOM is loaded
 */
function initializeApp() {
    console.log('Initializing Interactive Animation Experience...');
    
    // Set initial states
    globalAppState.animationRunning = false;
    globalAppState.modalOpen = false;
    
    // Initialize event listeners
    initializeEventListeners();
    
    console.log('Application initialized successfully!');
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

/**
 * Utility function to log function calls for debugging
 * @param {string} functionName - Name of the function being called
 * @param {...any} args - Arguments passed to the function
 */
function logFunctionCall(functionName, ...args) {
    console.log(`Function called: ${functionName}`, args);
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
