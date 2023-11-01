// Import Chart.js


// Sample data
const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Mining Revenue',
        data: [65, 59, 80, 81, 56],
        borderColor: '#4299E1',
        borderWidth: 2,
        fill: false,
    }],
};

const ctx = document.getElementById('miningChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: data,
});

// Fetch mining statistics (replace with your actual endpoint)
fetch('http://192.168.1.251:3000/mining-statistics')
    .then(response => response.json())
    .then(data => {
        // Populate the HTML elements with mining statistics data
        document.getElementById('totalHashrate').textContent = data.totalHashrate + ' MH/s';
        document.getElementById('poolHashrate').textContent = data.poolHashrate + ' MH/s';
        document.getElementById('activeMiners').textContent = data.activeMiners;
        document.getElementById('currentBlock').textContent = data.currentBlock;
    })
    .catch(error => {
        console.error('Error fetching mining statistics:', error);
    });
// Fetch latest block data (replace with your actual endpoint)
fetch('http://192.168.1.251:3000/latest-blocks')
    .then(response => response.json())
    .then(data => {
        const latestBlocksTable = document.getElementById('latestBlocks');

        // Clear any existing rows in the table
        latestBlocksTable.innerHTML = '';

        // Populate the table with the latest block data
        data.forEach(block => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2">${block.blockNumber}</td>
                <td class="px-4 py-2">${block.blockHash}</td>
                <td class="px-4 py-2">${block.miner}</td>
            `;
            latestBlocksTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching latest block data:', error);
    });
