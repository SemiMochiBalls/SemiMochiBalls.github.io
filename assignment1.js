// The core function of this script: dynamically generate an HTML table
function drawTable() {

    // Obtain the number of rows and columns from the user's input
    var rows = document.getElementById('inputRows').value;
    var columns = document.getElementById('inputColumns').value;

    // Create a new table element
    var table = document.createElement('table');

    // Iterate through the rows
    for (var i = 0; i < rows; i++) {
        // Create a new row element for each iteration
        var row = document.createElement('tr');
        
        // Iterate through the columns for each row
        for (var j = 0; j < columns; j++) {
            // Create a new cell element for each column in each row
            var cell = document.createElement('td');
            
            // Calculate the content of each cell as the product of the row and column numbers
            cell.textContent = (i + 1) * (j + 1);
            
            // Change the color of the cell text based on its value to create a rainbow effect
            // Use the HSL color scheme, which stands for Hue, Saturation, and Lightness
            cell.style.color = `hsl(${cell.textContent % 360}, 100%, 50%)`;
            
            // Append each cell to its parent row element
            row.appendChild(cell);
        }
        
        // Append the row to the table after filling it with cells
        table.appendChild(row);
    }
    
    // Remove any existing content within the tableContainer div before inserting the new table
    var tableContainer = document.getElementById('tableContainer');
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }
    // Append the newly created table to the tableContainer div
    tableContainer.appendChild(table);
}