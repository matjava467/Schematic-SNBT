// script.js
const fileInput = document.getElementById('snbtFile');
const convertBtn = document.getElementById('convertBtn');

convertBtn.addEventListener('click', async () => {
    if (!fileInput.files[0]) {
        alert('Please select a SNBT file first.');
        return;
    }

    const file = fileInput.files[0];
    const text = await file.text();

    try {
        // Parse SNBT
        const snbtObj = JSON.parse(text.replace(/([a-zA-Z0-9_]+):/g, '"$1":')); // simple fix for SNBT keys

        // Convert to NBT
        const nbt = prismarineNbt.simplify(prismarineNbt.writeUncompressedSync(snbtObj));

        // Create a Blob for download
        const blob = new Blob([nbt], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace('.snbt', '.nbt');
        a.click();
        URL.revokeObjectURL(url);

    } catch (e) {
        alert('Error converting SNBT: ' + e.message);
    }
});