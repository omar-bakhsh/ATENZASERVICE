/**
 * ==========================================================================
 * Quotation & Print Engine - Interactive Client Application Logic
 * Atenza Service / ورشة عبدالله عصام عيد الزين لصيانة السيارات
 * ==========================================================================
 */

// Initial State (Defaulting to the sample quotation from the user's template)
let currentQuote = {
  quoteNo: '867',
  claimNo: '',
  date: new Date().toISOString().split('T')[0],
  customerName: 'خالد الزهراني',
  carType: 'مازدا 6',
  carModel: '2018',
  plateNo: 'د ر ط 9372',
  chassisNo: '',
  userName: 'admin',
  workshopTitleAr: 'ورشة عبدالله عصام عيد الزين لصيانة السيارات',
  workshopTitleEn: 'Mazda Service',
  phones: '0556565135   0566522351',
  customNote: 'اعمال بعد الفك Possible appear damage after jaw',
  laborDiscount: 0,
  partsDiscount: 0,
  laborItems: [
    { no: 1, desc: 'فك جربكس + غيار صوفة المحرك الخلفية', price: 1000 },
    { no: 2, desc: 'غيار صوف عكوس عدد 2', price: 0 },
    { no: 3, desc: 'غيار صوفة جربكس الامامية', price: 0 },
    { no: 4, desc: 'فك كرتير المحرك + غيار سليكون + تنظيف مصفى', price: 200 },
    { no: 5, desc: 'غيار زيت المحرك + فلتر + صرة + وردة', price: 0 },
    { no: 6, desc: 'يد زيت جربكس 1 لتر (لايوجد ضمان على الجربكس)', price: 0 },
    { no: 7, desc: 'فك كمر + خيار علبة دركسون سفلية', price: 0 },
    { no: 8, desc: 'غيار مقصات اماميه', price: 0 },
    { no: 9, desc: 'غيار مسامير توازن + جلود امامية', price: 0 },
    { no: 10, desc: 'غيار عكوس امامية ( لا يوجد ضمان على الجربكس )', price: 0 },
    { no: 11, desc: 'غيار طرمبة ماء', price: 300 },
    { no: 12, desc: 'غيار بلف الحرارة + غيار ماء رديتر 2', price: 100 },
    { no: 13, desc: 'غيار سيور + شداد', price: 100 },
    { no: 14, desc: 'غيار جهاز ABS + تنسيم نظام الفرامل + برمجة', price: 600 },
    { no: 15, desc: 'غيار اقمشة خلفية + مسح هوبات ( خارجي )', price: 100 },
    { no: 16, desc: 'اعادة كشف على ظفيرة جهاز ABS + حساس', price: 0 },
    { no: 17, desc: 'اعادة كشف على رمانات ( يوجد صوت )', price: 0 },
    { no: 18, desc: 'فك جهاز الدركسون + غيار نجمة الدركسون', price: 200 },
    { no: 19, desc: 'اعادة كشف على عمود الدركسون + الجهاز', price: 0 },
    { no: 20, desc: 'غيار مساعدات الامامية + كراسي المساعدات', price: 200 }
  ],
  partsItems: [
    { no: 1, name: 'مخرطة هوبات 2', qty: 1, price: 30 },
    { no: 2, name: 'زيت فرامل 3 علب', qty: 1, price: 39 }
  ]
};

// DOM ready initialization
document.addEventListener('DOMContentLoaded', () => {
  // Load saved quote if exists, or use default
  loadSavedQuoteFromStorage();
  
  // Initialize form controls
  populateFormInputs();
  
  // Render tables and preview
  renderLaborEditorRows();
  renderPartsEditorRows();
  updatePaperPreview();

  // Attach event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Bind simple text inputs
  const simpleInputs = [
    'quoteNo', 'claimNo', 'date', 'customerName',
    'carType', 'carModel', 'plateNo', 'chassisNo',
    'userName', 'customNote', 'laborDiscount', 'partsDiscount'
  ];

  simpleInputs.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', (e) => {
        if (fieldId === 'laborDiscount' || fieldId === 'partsDiscount') {
          currentQuote[fieldId] = parseFloat(e.target.value) || 0;
        } else {
          currentQuote[fieldId] = e.target.value;
        }
        updatePaperPreview();
      });
    }
  });

  // Action Buttons
  document.getElementById('btnPrint')?.addEventListener('click', () => triggerPrint());
  document.getElementById('btnPrintDirect')?.addEventListener('click', () => triggerPrint());
  document.getElementById('btnSaveQuote')?.addEventListener('click', () => saveQuote());
  document.getElementById('btnNewQuote')?.addEventListener('click', () => createNewQuote());
  document.getElementById('btnLoadDemo')?.addEventListener('click', () => loadDemoQuote());
  document.getElementById('btnAddLabor')?.addEventListener('click', () => addLaborRow());
  document.getElementById('btnAddPart')?.addEventListener('click', () => addPartRow());

  // Density & Fit Toggles
  document.getElementById('fitOnePageToggle')?.addEventListener('change', (e) => {
    const sheet = document.getElementById('printableSheet');
    if (e.target.checked) {
      sheet.classList.add('has-many-items');
    } else {
      sheet.classList.remove('has-many-items');
    }
  });

  // Keyboard shortcut Ctrl+P
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      triggerPrint();
    }
  });
}

function populateFormInputs() {
  document.getElementById('quoteNo').value = currentQuote.quoteNo || '';
  document.getElementById('claimNo').value = currentQuote.claimNo || '';
  document.getElementById('date').value = currentQuote.date || '';
  document.getElementById('customerName').value = currentQuote.customerName || '';
  document.getElementById('carType').value = currentQuote.carType || '';
  document.getElementById('carModel').value = currentQuote.carModel || '';
  document.getElementById('plateNo').value = currentQuote.plateNo || '';
  document.getElementById('chassisNo').value = currentQuote.chassisNo || '';
  document.getElementById('userName').value = currentQuote.userName || 'admin';
  document.getElementById('customNote').value = currentQuote.customNote || '';
  document.getElementById('laborDiscount').value = currentQuote.laborDiscount || 0;
  document.getElementById('partsDiscount').value = currentQuote.partsDiscount || 0;
}

// --------------------------------------------------------------------------
// Labor Rows Management (تفصيل الإصلاح)
// --------------------------------------------------------------------------
function renderLaborEditorRows() {
  const container = document.getElementById('laborRowsEditor');
  if (!container) return;
  
  container.innerHTML = '';
  currentQuote.laborItems.forEach((item, index) => {
    item.no = index + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center; width: 28px; font-weight: bold;">${item.no}</td>
      <td>
        <input type="text" value="${escapeHtml(item.desc)}" placeholder="وصف الإصلاح..." 
          oninput="updateLaborItem(${index}, 'desc', this.value)">
      </td>
      <td style="width: 75px;">
        <input type="number" step="any" value="${item.price}" placeholder="السعر" 
          oninput="updateLaborItem(${index}, 'price', this.value)" style="text-align: center;">
      </td>
      <td style="text-align: center; width: 28px;">
        <button type="button" class="btn-danger-sm" onclick="removeLaborRow(${index})" title="حذف">✕</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

function addLaborRow(desc = '', price = 0) {
  currentQuote.laborItems.push({
    no: currentQuote.laborItems.length + 1,
    desc: desc,
    price: price
  });
  renderLaborEditorRows();
  updatePaperPreview();
}

function removeLaborRow(index) {
  currentQuote.laborItems.splice(index, 1);
  renderLaborEditorRows();
  updatePaperPreview();
}

window.updateLaborItem = function(index, field, value) {
  if (field === 'price') {
    currentQuote.laborItems[index][field] = parseFloat(value) || 0;
  } else {
    currentQuote.laborItems[index][field] = value;
  }
  updatePaperPreview();
};

window.removeLaborRow = removeLaborRow;

// --------------------------------------------------------------------------
// Parts Rows Management (القطع المراد تغييرها)
// --------------------------------------------------------------------------
function renderPartsEditorRows() {
  const container = document.getElementById('partsRowsEditor');
  if (!container) return;

  container.innerHTML = '';
  currentQuote.partsItems.forEach((item, index) => {
    item.no = index + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center; width: 28px; font-weight: bold;">${item.no}</td>
      <td>
        <input type="text" value="${escapeHtml(item.name)}" placeholder="اسم القطعة..." 
          oninput="updatePartItem(${index}, 'name', this.value)">
      </td>
      <td style="width: 50px;">
        <input type="number" min="1" value="${item.qty}" placeholder="الكمية" 
          oninput="updatePartItem(${index}, 'qty', this.value)" style="text-align: center;">
      </td>
      <td style="width: 70px;">
        <input type="number" step="any" value="${item.price}" placeholder="السعر" 
          oninput="updatePartItem(${index}, 'price', this.value)" style="text-align: center;">
      </td>
      <td style="text-align: center; width: 28px;">
        <button type="button" class="btn-danger-sm" onclick="removePartRow(${index})" title="حذف">✕</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

function addPartRow(name = '', qty = 1, price = 0) {
  currentQuote.partsItems.push({
    no: currentQuote.partsItems.length + 1,
    name: name,
    qty: qty,
    price: price
  });
  renderPartsEditorRows();
  updatePaperPreview();
}

function removePartRow(index) {
  currentQuote.partsItems.splice(index, 1);
  renderPartsEditorRows();
  updatePaperPreview();
}

window.updatePartItem = function(index, field, value) {
  if (field === 'price' || field === 'qty') {
    currentQuote.partsItems[index][field] = parseFloat(value) || 0;
  } else {
    currentQuote.partsItems[index][field] = value;
  }
  updatePaperPreview();
};

window.removePartRow = removePartRow;

// --------------------------------------------------------------------------
// Real-Time Paper Preview Update & Math Calculation
// --------------------------------------------------------------------------
function updatePaperPreview() {
  // Sync meta values
  document.getElementById('pvDate').textContent = currentQuote.date || new Date().toISOString().split('T')[0];
  document.getElementById('pvQuoteNo').textContent = currentQuote.quoteNo || '---';
  document.getElementById('pvClaimNo').textContent = currentQuote.claimNo || '';
  document.getElementById('pvCustomerName').textContent = currentQuote.customerName || '---';
  
  // Sync car details
  document.getElementById('pvCarType').textContent = currentQuote.carType || '---';
  document.getElementById('pvCarModel').textContent = currentQuote.carModel || '---';
  document.getElementById('pvPlateNo').textContent = currentQuote.plateNo || '---';
  document.getElementById('pvChassisNo').textContent = currentQuote.chassisNo || '---';

  // Sync Footer text
  document.getElementById('pvCustomNote').textContent = currentQuote.customNote || '';
  document.getElementById('pvUserName').textContent = currentQuote.userName || 'admin';

  // Render Labor Rows in Preview
  const pvLaborTbody = document.getElementById('pvLaborTbody');
  let rawLaborSum = 0;
  pvLaborTbody.innerHTML = '';

  // Max rows to equalize height if needed, or exact item list
  const laborCount = currentQuote.laborItems.length;
  const partsCount = currentQuote.partsItems.length;
  const maxRows = Math.max(laborCount, partsCount, 1);

  currentQuote.laborItems.forEach((item, index) => {
    rawLaborSum += (item.price || 0);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-no">${index + 1}</td>
      <td class="col-desc">${escapeHtml(item.desc || '')}</td>
      <td class="col-price">${formatNumber(item.price)}</td>
    `;
    pvLaborTbody.appendChild(tr);
  });

  // If labor has fewer rows than parts, fill empty rows to keep the layout neat and balanced
  if (laborCount < partsCount) {
    for (let i = laborCount; i < partsCount; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="col-no">&nbsp;</td>
        <td class="col-desc">&nbsp;</td>
        <td class="col-price">&nbsp;</td>
      `;
      pvLaborTbody.appendChild(tr);
    }
  }

  // Render Parts Rows in Preview
  const pvPartsTbody = document.getElementById('pvPartsTbody');
  let rawPartsSum = 0;
  pvPartsTbody.innerHTML = '';

  currentQuote.partsItems.forEach((item, index) => {
    const itemTotal = (item.price || 0) * (item.qty || 1);
    rawPartsSum += itemTotal;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-no">${index + 1}</td>
      <td class="col-desc">${escapeHtml(item.name || '')}</td>
      <td class="col-qty">${item.qty || 1}</td>
      <td class="col-price">${formatNumber(item.price)}</td>
    `;
    pvPartsTbody.appendChild(tr);
  });

  // If parts has fewer rows than labor, fill empty rows to keep the layout neat and balanced
  if (partsCount < laborCount) {
    for (let i = partsCount; i < laborCount; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="col-no">&nbsp;</td>
        <td class="col-desc">&nbsp;</td>
        <td class="col-qty">&nbsp;</td>
        <td class="col-price">&nbsp;</td>
      `;
      pvPartsTbody.appendChild(tr);
    }
  }

  // ------------------------------------------------------------------------
  // Financial Calculations (Matching Saudi 15% VAT & Image Layout)
  // ------------------------------------------------------------------------
  const laborDiscount = parseFloat(currentQuote.laborDiscount) || 0;
  const partsDiscount = parseFloat(currentQuote.partsDiscount) || 0;

  const netLabor = Math.max(0, rawLaborSum - laborDiscount);
  const netParts = Math.max(0, rawPartsSum - partsDiscount);
  const totalBeforeVat = netLabor + netParts;
  const totalTax = +(totalBeforeVat * 0.15).toFixed(2);
  const grandTotal = +(totalBeforeVat + totalTax).toFixed(2);

  // Update Right Box (Labor / Reform Totals)
  document.getElementById('pvLaborTotal').textContent = formatNumber(rawLaborSum);
  document.getElementById('pvLaborDiscount').textContent = formatNumber(laborDiscount);
  document.getElementById('pvSubtotalBeforeVat').textContent = formatNumber(totalBeforeVat);
  document.getElementById('pvGrandTotalRight').textContent = formatNumber(grandTotal);

  // Update Left Box (Parts Totals & Grand Total)
  document.getElementById('pvPartsTotal').textContent = formatNumber(rawPartsSum);
  document.getElementById('pvPartsDiscount').textContent = formatNumber(partsDiscount);
  document.getElementById('pvTotalTax').textContent = formatNumber(totalTax);
  document.getElementById('pvGrandTotalLeft').textContent = formatNumber(grandTotal);

  // Auto density adjustment if more than 16 items
  const sheet = document.getElementById('printableSheet');
  if (maxRows >= 15) {
    sheet.classList.add('has-many-items');
  } else {
    const fitToggle = document.getElementById('fitOnePageToggle');
    if (!fitToggle || !fitToggle.checked) {
      sheet.classList.remove('has-many-items');
    }
  }
}

// --------------------------------------------------------------------------
// Print Engine Trigger (Strict Single Page or Dynamic Content Fit)
// --------------------------------------------------------------------------
function triggerPrint() {
  const maxRows = Math.max(currentQuote.laborItems.length, currentQuote.partsItems.length);
  const sheet = document.getElementById('printableSheet');
  
  // Ensure compactness if needed so it fits perfectly on 1 A4 page
  if (maxRows >= 14) {
    sheet.classList.add('has-many-items');
  }

  // Launch native browser print
  window.print();
}

// --------------------------------------------------------------------------
// Demo & Template Loading
// --------------------------------------------------------------------------
function loadDemoQuote() {
  currentQuote = {
    quoteNo: '867',
    claimNo: '',
    date: '2026-03-18',
    customerName: 'خالد الزهراني',
    carType: 'مازدا 6',
    carModel: '2018',
    plateNo: 'د ر ط 9372',
    chassisNo: '',
    userName: 'admin',
    workshopTitleAr: 'ورشة عبدالله عصام عيد الزين لصيانة السيارات',
    workshopTitleEn: 'Mazda Service',
    phones: '0556565135   0566522351',
    customNote: 'اعمال بعد الفك Possible appear damage after jaw',
    laborDiscount: 0,
    partsDiscount: 0,
    laborItems: [
      { no: 1, desc: 'فك جربكس + غيار صوفة المحرك الخلفية', price: 1000 },
      { no: 2, desc: 'غيار صوف عكوس عدد 2', price: 0 },
      { no: 3, desc: 'غيار صوفة جربكس الامامية', price: 0 },
      { no: 4, desc: 'فك كرتير المحرك + غيار سليكون + تنظيف مصفى', price: 200 },
      { no: 5, desc: 'غيار زيت المحرك + فلتر + صرة + وردة', price: 0 },
      { no: 6, desc: 'يد زيت جربكس 1 لتر (لايوجد ضمان على الجربكس)', price: 0 },
      { no: 7, desc: 'فك كمر + خيار علبة دركسون سفلية', price: 0 },
      { no: 8, desc: 'غيار مقصات اماميه', price: 0 },
      { no: 9, desc: 'غيار مسامير توازن + جلود امامية', price: 0 },
      { no: 10, desc: 'غيار عكوس امامية ( لا يوجد ضمان على الجربكس )', price: 0 },
      { no: 11, desc: 'غيار طرمبة ماء', price: 300 },
      { no: 12, desc: 'غيار بلف الحرارة + غيار ماء رديتر 2', price: 100 },
      { no: 13, desc: 'غيار سيور + شداد', price: 100 },
      { no: 14, desc: 'غيار جهاز ABS + تنسيم نظام الفرامل + برمجة', price: 600 },
      { no: 15, desc: 'غيار اقمشة خلفية + مسح هوبات ( خارجي )', price: 100 },
      { no: 16, desc: 'اعادة كشف على ظفيرة جهاز ABS + حساس', price: 0 },
      { no: 17, desc: 'اعادة كشف على رمانات ( يوجد صوت )', price: 0 },
      { no: 18, desc: 'فك جهاز الدركسون + غيار نجمة الدركسون', price: 200 },
      { no: 19, desc: 'اعادة كشف على عمود الدركسون + الجهاز', price: 0 },
      { no: 20, desc: 'غيار مساعدات الامامية + كراسي المساعدات', price: 200 }
    ],
    partsItems: [
      { no: 1, name: 'مخرطة هوبات 2', qty: 1, price: 30 },
      { no: 2, name: 'زيت فرامل 3 علب', qty: 1, price: 39 }
    ]
  };

  populateFormInputs();
  renderLaborEditorRows();
  renderPartsEditorRows();
  updatePaperPreview();
  showToast('تم تحميل النموذج الأصلي بنجاح!', 'success');
}

function createNewQuote() {
  if (confirm('هل تريد إنشاء تسعيرة جديدة وتفريغ الحقول الحالية؟')) {
    const nextNum = Math.floor(Math.random() * 900) + 100;
    currentQuote = {
      quoteNo: nextNum.toString(),
      claimNo: '',
      date: new Date().toISOString().split('T')[0],
      customerName: '',
      carType: 'مازدا ',
      carModel: new Date().getFullYear().toString(),
      plateNo: '',
      chassisNo: '',
      userName: 'admin',
      workshopTitleAr: 'ورشة عبدالله عصام عيد الزين لصيانة السيارات',
      workshopTitleEn: 'Mazda Service',
      phones: '0556565135   0566522351',
      customNote: 'اعمال بعد الفك Possible appear damage after jaw',
      laborDiscount: 0,
      partsDiscount: 0,
      laborItems: [
        { no: 1, desc: '', price: 0 }
      ],
      partsItems: [
        { no: 1, name: '', qty: 1, price: 0 }
      ]
    };

    populateFormInputs();
    renderLaborEditorRows();
    renderPartsEditorRows();
    updatePaperPreview();
    showToast('تم إنشاء تسعيرة جديدة فارغة.', 'success');
  }
}

// --------------------------------------------------------------------------
// Storage & Persistence
// --------------------------------------------------------------------------
function saveQuote() {
  try {
    localStorage.setItem('atenza_current_quote', JSON.stringify(currentQuote));
    
    // Also save to server API asynchronously if online
    fetch('/api/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentQuote)
    }).catch(err => console.log('Server save skipped / offline: ', err));

    showToast(`تم حفظ التسعيرة رقم (${currentQuote.quoteNo}) بنجاح!`, 'success');
  } catch (err) {
    showToast('تعذر حفظ التسعيرة محلياً', 'error');
  }
}

function loadSavedQuoteFromStorage() {
  try {
    const saved = localStorage.getItem('atenza_current_quote');
    if (saved) {
      currentQuote = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading saved quote:', e);
  }
}

// --------------------------------------------------------------------------
// Utilities
// --------------------------------------------------------------------------
function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0.00';
  return Number(num).toFixed(2);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
