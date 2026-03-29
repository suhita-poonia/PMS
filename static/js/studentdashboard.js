// Initialize default tab on page load
document.addEventListener('DOMContentLoaded', () => {
    showTab('track');
    loadDashboardData();
});

// Load dashboard data
function loadDashboardData() {
    // Load user data from localStorage or set defaults
    const userEmail = localStorage.getItem('userEmail') || 'btbti23023_mahek@banasthali.in';
    const userBTBT = localStorage.getItem('userBTBT') || 'BTBT3480';
    const userName = userEmail.split('@')[0].split('_')[1] || 'Student';

    // Update welcome section
    document.getElementById('welcomeName').textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
    document.getElementById('welcomeBTBT').textContent = userBTBT;

    // Update profile data
    document.getElementById('userDisplayName').textContent = userEmail;
    document.getElementById('userBTBT').textContent = userBTBT;
    document.getElementById('profileEmail').textContent = userEmail;
    document.getElementById('profileBTBT').textContent = userBTBT;

    // Load dashboard stats (in a real app, this would come from an API)
    loadDashboardStats();
}

function loadDashboardStats() {
    // Simulate loading stats - in a real app, fetch from API
    document.getElementById('totalParcels').textContent = '12';
    document.getElementById('deliveredParcels').textContent = '8';
    document.getElementById('pendingParcels').textContent = '4';
}

// Tab switching logic
function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    const content = document.getElementById('tab-content');
    
    if (tab === 'track') {
        renderTrackTab(content);
    } else if (tab === 'history') {
        renderHistoryTab(content);
    }
}

// Render Track Tab
function renderTrackTab(contentDiv) {
    contentDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-4 text-blue-700">Track Your Parcel</h2>
        <form id="trackOrderForm" class="space-y-4 mb-4">
            <div>
                <label class="block font-medium mb-1">Order ID</label>
                <input type="text" id="trackId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter Order ID">
            </div>
            <div>
                <label class="block font-medium mb-1">Type of Parcel</label>
                <select id="parcelType" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" onchange="toggleShoppingAppField()">
                    <option value="">Select Type</option>
                    <option value="online">Online</option>
                    <option value="postal">Postal Mail</option>
                </select>
            </div>
            <div id="shoppingAppDiv" style="display:none;">
                <label class="block font-medium mb-1">Shopping App Name</label>
                <input type="text" id="shoppingApp" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. Amazon, Flipkart">
            </div>
            <div>
                <label class="block font-medium mb-1">Hostel Name</label>
                <input type="text" id="hostelName" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter Hostel Name">
            </div>
            <div>
                <label class="block font-medium mb-1">Expected Date of Parcel</label>
                <input type="date" id="expectedDate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            </div>
            <div>
                <label class="block font-medium mb-1">Student Mobile Number</label>
                <input type="tel" id="studentMobile" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter Mobile Number">
            </div>
            <button type="button" onclick="trackParcel()" class="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Track</button>
        </form>
        <div id="trackResult" class="mt-4"></div>
    `;
}

// Render History Tab
function renderHistoryTab(contentDiv) {
    contentDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-4 text-blue-700">Parcel History</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg shadow">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase">Parcel ID</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr>
                        <td class="py-4 px-6">PMS-23456</td>
                        <td class="py-4 px-6"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span></td>
                        <td class="py-4 px-6">2025-09-10</td>
                    </tr>
                    <tr>
                        <td class="py-4 px-6">PMS-87654</td>
                        <td class="py-4 px-6"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Ready for Pickup</span></td>
                        <td class="py-4 px-6">2025-09-15</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Show/hide shopping app field based on parcel type
function toggleShoppingAppField() {
    const type = document.getElementById('parcelType').value;
    const appDiv = document.getElementById('shoppingAppDiv');
    if (type === 'online') {
        appDiv.style.display = '';
    } else {
        appDiv.style.display = 'none';
    }
}

// Track Parcel Function
function trackParcel() {
    const id = document.getElementById('trackId').value.trim();
    const result = document.getElementById('trackResult');
    
    if (!id) {
        result.innerHTML = "<span class='text-red-600'>Please enter a tracking ID.</span>";
        return;
    }
    
    // Demo result based on parcel ID
    if (id === 'PMS-87654') {
        result.innerHTML = "<div class='p-4 bg-blue-50 rounded-lg'><b>Status:</b> Ready for Pickup at Kutir Office</div>";
    } else if (id === 'PMS-23456') {
        result.innerHTML = "<div class='p-4 bg-green-50 rounded-lg'><b>Status:</b> Delivered to Hostel</div>";
    } else {
        result.innerHTML = "<span class='text-gray-600'>No parcel found with this ID.</span>";
    }
}

// Logout function
function handleLogoutStudent() {
    window.location.href = 'login_page.html';
}

// Profile modal functions
function showProfileModal() {
    document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.add('hidden');
}

// Avatar management functions
function changeAvatar() {
    // This would open an avatar selection modal in a real implementation
    alert('Avatar change functionality would be implemented here');
}

function showSettings() {
    // This would open settings modal in a real implementation
    alert('Settings functionality would be implemented here');
}

// Logout function (for dropdown)
function logout() {
    handleLogoutStudent();
}
