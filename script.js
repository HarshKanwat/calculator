document.addEventListener('DOMContentLoaded', function () {
    // Create container
    const container = document.createElement('div');
    container.classList.add('container', 'mt-5');
    document.body.appendChild(container);

    // Create calculator pad
    const pad = document.createElement('div');
    pad.classList.add('pad');
    container.appendChild(pad);

    // Create span for display
    const span = document.createElement('span');
    span.classList.add('text-right', 'd-block', 'mb-2');
    span.id = 'span';
    pad.appendChild(span);

    // Create input for display
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'input';
    input.classList.add('text-right', 'form-control', 'mb-2');
    pad.appendChild(input);

    // Button values and their classes
    const buttons = [
        { value: '7', id: 'seven', classes: 'bg-dark text-light' },
        { value: '8', id: 'eight', classes: 'bg-dark text-light' },
        { value: '9', id: 'nine', classes: 'bg-dark text-light' },
        { value: '+', id: 'add', classes: 'bg-warning text-dark' },
        { value: '4', id: 'four', classes: 'bg-dark text-light' },
        { value: '5', id: 'five', classes: 'bg-dark text-light' },
        { value: '6', id: 'six', classes: 'bg-dark text-light' },
        { value: '-', id: 'sub', classes: 'bg-warning text-dark' },
        { value: '1', id: 'one', classes: 'bg-dark text-light' },
        { value: '2', id: 'two', classes: 'bg-dark text-light' },
        { value: '3', id: 'three', classes: 'bg-dark text-light' },
        { value: '*', id: 'mul', classes: 'bg-warning text-dark' },
        { value: 'C', id: 'clear', classes: 'bg-danger text-light' },
        { value: '0', id: 'zero', classes: 'bg-dark text-light' },
        { value: '=', id: 'equal', classes: 'bg-success text-light' },
        { value: '/', id: 'div', classes: 'bg-warning text-dark' }
    ];

    // Create buttons
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.value = button.value;
        btn.id = button.id;
        btn.className = button.classes;
        btn.innerText = button.value;
        pad.appendChild(btn);

        // Add line break after specific buttons
        if (['+', '-', '*', '/'].includes(button.value)) {
            pad.appendChild(document.createElement('br'));
        }
    });

    // Event listeners for buttons
    pad.addEventListener('click', display);
    document.getElementById('clear').addEventListener('click', clearHistory);
    document.getElementById('equal').addEventListener('click', result);

    // Handle button click
    function display(e) {
        let span = document.querySelector("#span");
        if (e.target.tagName === 'BUTTON' && e.target.value !== '=' && e.target.value !== 'C') {
            span.innerText += e.target.value;
        }
    }

    // Clear history
    function clearHistory() {
        let span = document.querySelector("#span");
        let finalResult = document.querySelector("#input");
        span.innerText = "";
        finalResult.value = "";
    }

    // Calculate result
    function result() {
        let span = document.querySelector("#span");
        let finalResult = document.querySelector("#input");
        try {
            finalResult.value = eval(span.innerText);
        } catch {
            finalResult.value = 'Error';
        }
    }

    // Handle keyboard events
    document.addEventListener('keydown', (event) => {
        let span = document.querySelector("#span");
        if ((event.key >= 0 && event.key <= 9) || ['+', '-', '*', '/'].includes(event.key)) {
            span.innerText += event.key;
        } else if (event.key === 'Enter') {
            result();
        } else if (event.key === 'Backspace') {
            span.innerText = span.innerText.slice(0, -1);
        } else {
            alert('Only numbers and operators are allowed!');
            event.preventDefault();
        }
    });
});
