const fs = require('fs');

const inspPath = 'C:\\Users\\Dell\\OneDrive\\Desktop\\Workshop_manger_v2\\inspector.html';
const joPath = 'C:\\Users\\Dell\\OneDrive\\Desktop\\Workshop_manger_v2\\job_order.html';

// 1. Fix inspector.html
let insp = fs.readFileSync(inspPath, 'utf8');
insp = insp.replace(
    "const docId = (currentInspectionId || document.getElementById('inspectionIdDisplay')?.textContent || '').replace(/[^0-9]/g, '') || '---';",
    "const docId = String(currentInspectionId || document.getElementById('inspectionIdDisplay')?.textContent || '').replace(/[^0-9]/g, '') || '---';"
);
fs.writeFileSync(inspPath, insp, 'utf8');
console.log('Fixed inspector.html TypeError on currentInspectionId!');

// 2. Fix job_order.html
let jo = fs.readFileSync(joPath, 'utf8');
jo = jo.replace(
    "const docId = (currentInspectionId || document.getElementById('inspectionIdDisplay')?.textContent || '').replace(/[^0-9]/g, '') || '---';",
    "const docId = String(currentInspectionId || document.getElementById('inspectionIdDisplay')?.textContent || '').replace(/[^0-9]/g, '') || '---';"
);
fs.writeFileSync(joPath, jo, 'utf8');
console.log('Fixed job_order.html TypeError on currentInspectionId!');

// 3. Sync to WS & WS -editing-v
['inspector.html', 'job_order.html', 'inspections_list.html'].forEach(f => {
    const src = 'C:\\Users\\Dell\\OneDrive\\Desktop\\Workshop_manger_v2\\' + f;
    ['C:\\Users\\Dell\\OneDrive\\Desktop\\WS\\' + f, 'C:\\Users\\Dell\\OneDrive\\Desktop\\WS -editing-v\\' + f].forEach(t => {
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, t);
            console.log('Synced', f, 'to', t);
        }
    });
});
