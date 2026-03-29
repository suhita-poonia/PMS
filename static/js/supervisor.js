// Initialize default tab on page load
document.addEventListener('DOMContentLoaded', () => {
    showTab('add');
    setupAvatar();
    loadDashboardStats();
});

// Tab switching logic
function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    const content = document.getElementById('tab-content');
    
    if (tab === 'add') {
        renderAddParcelTab(content);
    } else if (tab === 'update') {
        renderUpdateParcelTab(content);
    }
}

// Render Add Parcel Tab
function renderAddParcelTab(contentDiv) {
    contentDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-4 text-green-700">Add Parcel</h2>
        <form id="addParcelForm" class="space-y-4 mb-4">
            <div>
                <label class="block font-medium mb-1">Order ID</label>
                <input type="text" id="orderId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter Order ID">
            </div>
            <div>
                <label class="block font-medium mb-1">Hostel Name</label>
                <input type="text" id="hostelName" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter Hostel Name">
            </div>
            <div>
                <label class="block font-medium mb-1">Date</label>
                <input type="date" id="parcelDate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
            </div>
            <div>
                <label class="block font-medium mb-1">Student Mobile Number</label>
                <input type="tel" id="studentMobile" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter Mobile Number">
            </div>
            <button type="button" onclick="addParcel()" class="w-full px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">Add Parcel</button>
        </form>
        <div id="addParcelResult" class="mt-4"></div>
    `;
    // Restrict future dates
setTimeout(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('parcelDate').setAttribute('max', today);
}, 100);

}

// Render Update Parcel Tab
function renderUpdateParcelTab(contentDiv) {
    contentDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-4 text-green-700">Update Parcel Status</h2>
        <form id="updateParcelForm" class="space-y-4 mb-4">
            <div>
                <label class="block font-medium mb-1">Order ID</label>
                <input type="text" id="updateOrderId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter Order ID">
            </div>
            <div>
                <label class="block font-medium mb-1">New Status</label>
                <select id="newStatus" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option value="">Select Status</option>
                    <option value="Received at Kutir">Received at Kutir</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
            <button type="button" onclick="updateParcelStatus()" class="w-full px-6 py-3 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition">Update Status</button>
        </form>
        <div id="updateParcelResult" class="mt-4"></div>
    `;
}

// Add Parcel Function
function addParcel() {
    document.getElementById('addParcelResult').innerHTML = '';
    clearAddErrors();

    const orderId = document.getElementById('orderId').value.trim();
    const hostelName = document.getElementById('hostelName').value.trim();
    const parcelDate = document.getElementById('parcelDate').value;
    const studentMobile = document.getElementById('studentMobile').value.trim();

    let isValid = true;

    // Order ID - only not empty
    if (!orderId) {
        document.getElementById('orderIdError').textContent = 'Order ID is required.';
        isValid = false;
    }

    // Hostel - not empty
    if (!hostelName) {
        document.getElementById('hostelNameError').textContent = 'Please select a hostel.';
        isValid = false;
    }

    // Date - not future
    if (!parcelDate) {
        document.getElementById('parcelDateError').textContent = 'Date is required.';
        isValid = false;
    } else {
        const today = new Date().toISOString().split('T')[0];
        if (parcelDate > today) {
            document.getElementById('parcelDateError').textContent = 'Date cannot be in the future.';
            isValid = false;
        }
    }

    // Mobile - exactly 10 digits
    if (!studentMobile) {
        document.getElementById('studentMobileError').textContent = 'Student mobile number is required.';
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(studentMobile)) {
        document.getElementById('studentMobileError').textContent = 'Mobile number must be exactly 10 digits.';
        isValid = false;
    }

    if (!isValid) return;

    const result = document.getElementById('addParcelResult');
    result.innerHTML = `
        <div class='p-4 bg-green-50 rounded-lg'>
            Parcel <b>${orderId}</b> added for hostel <b>${hostelName}</b> on <b>${parcelDate}</b>.
        </div>
    `;
}


// Update Parcel Status Function
function updateParcelStatus() {
    document.getElementById('updateParcelResult').innerHTML = '';
    clearUpdateErrors();

    const orderId = document.getElementById('updateOrderId').value.trim();
    const newStatus = document.getElementById('newStatus').value;

    let isValid = true;

    // Order ID - only not empty
    if (!orderId) {
        document.getElementById('updateOrderIdError').textContent = 'Order ID is required.';
        isValid = false;
    }

    // Status - not empty
    if (!newStatus) {
        document.getElementById('newStatusError').textContent = 'New Status is required.';
        isValid = false;
    }

    if (!isValid) return;

    const result = document.getElementById('updateParcelResult');
    result.innerHTML = `
        <div class='p-4 bg-yellow-50 rounded-lg'>
            Status for <b>${orderId}</b> updated to <b>${newStatus}</b>.
        </div>
    `;
}


// Logout function
function handleLogoutSupervisor() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// Setup avatar functionality
function setupAvatar() {
    const avatar = document.getElementById('avatar');
    const dropdown = document.getElementById('dropdown');
    
    if (avatar && dropdown) {
        // Avatar click handler
        avatar.addEventListener('click', function() {
            dropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });
    }
}

// Load dashboard statistics
function loadDashboardStats() {

    // CURRENTLY NO DATABASE → KEEP 0
    const stats = {
        totalParcels: 0,
        pendingParcels: 0,
        deliveredToday: 0,
        avgDeliveryTime: 0,
        successRate: 0,
        activeStudents: 0,
        hostelsServed: 0
    };

    /*
    // 🔥 FUTURE DJANGO API CONNECTION
    fetch('/api/kutir/dashboard/')
        .then(res => res.json())
        .then(data => {
            updateStatsUI(data);
        });
    */

    updateStatsUI(stats);
}

function updateStatsUI(stats) {
    document.getElementById('totalParcels').textContent = stats.totalParcels;
    document.getElementById('pendingParcels').textContent = stats.pendingParcels;
    document.getElementById('deliveredToday').textContent = stats.deliveredToday;

    document.getElementById('avgDeliveryTime').textContent = stats.avgDeliveryTime + ' hrs';
    document.getElementById('successRate').textContent = stats.successRate + '%';
    document.getElementById('activeStudents').textContent = stats.activeStudents;
    document.getElementById('hostelsServed').textContent = stats.hostelsServed;
}
