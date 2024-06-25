const consoleError = console.error;
console.error = (...args) => {
    if (args[0].includes('Maximum update depth exceeded') || args[0].includes('A component is changing an uncontrolled input')) {
        return;
    }
    consoleError(...args);
};