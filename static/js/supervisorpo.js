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
        <h2 class="text-xl font-bold mb-4 text-yellow-700">Add Parcel</h2>
        <form id="addParcelForm" class="space-y-4 mb-4">
            <div>
                <label class="block font-medium mb-1">Order ID</label>
                <input type="text" id="orderId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter Order ID">
            </div>
            <div>
                <label class="block font-medium mb-1">Hostel Name</label>
                <input type="text" id="hostelName" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter Hostel Name">
            </div>
            <div>
                <label class="block font-medium mb-1">Date</label>
                <input type="date" id="parcelDate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
            </div>
            <div>
                <label class="block font-medium mb-1">Student Mobile Number</label>
                <input type="tel" id="studentMobile" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter Mobile Number">
            </div>
            <button type="button" onclick="addParcel()" class="w-full px-6 py-3 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition">Add Parcel</button>
        </form>
        <div id="addParcelResult" class="mt-4"></div>
    `;
}

// Render Update Parcel Tab
function renderUpdateParcelTab(contentDiv) {
    contentDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-4 text-yellow-700">Update Parcel Status</h2>
        <form id="updateParcelForm" class="space-y-4 mb-4">
            <div>
                <label class="block font-medium mb-1">Order ID</label>
                <input type="text" id="updateOrderId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter Order ID">
            </div>
            <div>
                <label class="block font-medium mb-1">New Status</label>
                <select id="newStatus" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <option value="">Select Status</option>
                    <option value="Received at Post Office">Received at Post Office</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
            <button type="button" onclick="updateParcelStatus()" class="w-full px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition">Update Status</button>
        </form>
        <div id="updateParcelResult" class="mt-4"></div>
    `;
}

// Add Parcel Function
function addParcel() {
    const orderId = document.getElementById('orderId').value.trim();
    const hostelName = document.getElementById('hostelName').value.trim();
    const parcelDate = document.getElementById('parcelDate').value;
    const studentMobile = document.getElementById('studentMobile').value.trim();
    const result = document.getElementById('addParcelResult');
    
    if (!orderId || !hostelName || !parcelDate || !studentMobile) {
        result.innerHTML = "<span class='text-red-600'>Please fill all fields.</span>";
        return;
    }
    
    result.innerHTML = `<div class='p-4 bg-yellow-50 rounded-lg'>Parcel <b>${orderId}</b> added for hostel <b>${hostelName}</b> on <b>${parcelDate}</b>.</div>`;
}

// Update Parcel Status Function
function updateParcelStatus() {
    const orderId = document.getElementById('updateOrderId').value.trim();
    const newStatus = document.getElementById('newStatus').value;
    const result = document.getElementById('updateParcelResult');
    
    if (!orderId || !newStatus) {
        result.innerHTML = "<span class='text-red-600'>Please fill all fields.</span>";
        return;
    }
    
    result.innerHTML = `<div class='p-4 bg-orange-50 rounded-lg'>Status for <b>${orderId}</b> updated to <b>${newStatus}</b>.</div>`;
}

// Logout function
function handleLogoutSupervisorPO() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// Load dashboard statistics
function loadDashboardStats() {
    // Simulate loading data - in a real app, this would come from an API
    const stats = {
        parcelsReceived: Math.floor(Math.random() * 100) + 50, // Random between 50-150
        pendingParcelsPO: Math.floor(Math.random() * 30) + 10, // Random between 10-40
        deliveredTodayPO: Math.floor(Math.random() * 50) + 20, // Random between 20-70
        avgDeliveryTimePO: (Math.random() * 2 + 1.5).toFixed(1), // Random between 1.5-3.5 hours
        successRatePO: (Math.random() * 5 + 92).toFixed(1), // Random between 92-97%
        dailyVolume: Math.floor(Math.random() * 100) + 200, // Random between 200-300
        hostelsServedPO: Math.floor(Math.random() * 3) + 10 // Random between 10-13
    };
    
    // Update the dashboard cards
    document.getElementById('parcelsReceived').textContent = stats.parcelsReceived;
    document.getElementById('pendingParcelsPO').textContent = stats.pendingParcelsPO;
    document.getElementById('deliveredTodayPO').textContent = stats.deliveredTodayPO;
    
    // Update additional stats
    document.getElementById('avgDeliveryTimePO').textContent = stats.avgDeliveryTimePO + ' hrs';
    document.getElementById('successRatePO').textContent = stats.successRatePO + '%';
    document.getElementById('dailyVolume').textContent = stats.dailyVolume;
    document.getElementById('hostelsServedPO').textContent = stats.hostelsServedPO;
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
