// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userType = params.get('userType');
    renderDashboard(userType);
});

// Render dashboard based on user type
function renderDashboard(userType) {
    const contentDiv = document.getElementById('dashboard-content');
    let content = '';
    const effectiveUserType = userType || 'default';

    if (effectiveUserType === 'default') {
        content = `
        <div class="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
            <img src="${STATIC_IMAGES.bvlogo}" alt="Banasthali Vidyapith Logo" class="w-24 h-24 mb-4 animate-bounce-slow">
            <h2 class="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight animate-slide-in">Welcome to BV ParcelPing</h2>
            <p class="text-lg text-gray-600 mb-8 text-center max-w-xl animate-fade-in">BV ParcelPing is parcel management system which helps Banasthali Vidyapith students and staff manage parcel deliveries on campus.</p>
            <!-- Animated Parcel Delivery Illustration -->
            <div class="flex justify-center items-center my-6 ">
                <div class="flex justify-center items-center">
                <div class="rounded-2xl shadow-2xl bg-white/80 p-6 border border-gray-200 transition-all duration-300 flex justify-center items-center" style="max-width:1100px; width:100%; height:340px;">
                        <svg viewBox="0 0 900 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-fade-in h-full w-full" style="display:block;">
                            <!-- Center all SVG content both horizontally and vertically -->
                            <g>
                                <g transform="translate(200,0)">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
                                            <polygon points="0 0, 8 4, 0 8" fill="#6366f1"/>
                                        </marker>
                                    </defs>
                                    <!-- Kutir (animated hut) -->
                                    <g>
                                        <!-- Hut base (walls) -->
                                        <rect x="15" y="54" width="50" height="26" rx="6" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
                                        <!-- Door -->
                                        <rect x="38" y="66" width="14" height="14" rx="3" fill="#fff7ed" stroke="#92400e" stroke-width="1.2"/>
                                        <!-- Roof (thatched, animated) -->
                                        <polygon id="kutirRoof" points="10,54 40,32 70,54" fill="#a3e635" stroke="#15803d" stroke-width="2">
                                            <animate attributeName="points" values="10,54 40,32 70,54;10,54 40,28 70,54;10,54 40,32 70,54" dur="1.2s" repeatCount="indefinite"/>
                                        </polygon>
                                        <!-- Roof lines for thatch -->
                                        <line x1="40" y1="32" x2="40" y2="54" stroke="#65a30d" stroke-width="2"/>
                                        <line x1="25" y1="44" x2="40" y2="54" stroke="#65a30d" stroke-width="1.2"/>
                                        <line x1="55" y1="44" x2="40" y2="54" stroke="#65a30d" stroke-width="1.2"/>
                                        <!-- Floating parcel icon -->
                                        <text x="40" y="50" text-anchor="middle" font-size="20">
                                            <animate attributeName="y" values="50;44;50" dur="1.2s" repeatCount="indefinite"/>
                                            📦
                                        </text>
                                    </g>
                                    <!-- Kutir label below hut -->
                                    <text x="40" y="95" text-anchor="middle" fill="#065f46" font-size="15" font-weight="bold">Kutir</text>

                                    <!-- Post Office (animated building, shifted down) -->
                                    <g>
                                        <rect x="10" y="130" width="60" height="24" rx="4" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
                                        <!-- Roof -->
                                        <polygon points="7,130 40,115 73,130" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
                                        <!-- Door -->
                                        <rect x="36" y="144" width="8" height="10" rx="2" fill="#fff" stroke="#b45309" stroke-width="1.2"/>
                                        <!-- Windows -->
                                        <rect x="18" y="140" width="7" height="6" rx="1.5" fill="#fff" stroke="#b45309" stroke-width="1"/>
                                        <rect x="55" y="140" width="7" height="6" rx="1.5" fill="#fff" stroke="#b45309" stroke-width="1"/>
                                        <!-- Animated flag -->
                                        <path id="flag" d="M70 115 Q75 118 70 121" fill="#ef4444">
                                            <animate attributeName="d" values="M70 115 Q75 118 70 121;M70 115 Q77 116 70 121;M70 115 Q75 118 70 121" dur="1.2s" repeatCount="indefinite"/>
                                        </path>
                                        <!-- Floating parcel icon -->
                                        <text x="40" y="128" text-anchor="middle" font-size="18">
                                            <animate attributeName="y" values="128;122;128" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
                                            📦
                                        </text>
                                    </g>
                                    <!-- Post Office label below building -->
                                    <text x="40" y="165" text-anchor="middle" fill="#92400e" font-size="13" font-weight="bold">Post Office</text>
                                    <!-- Student (female animated cartoon) -->
                                    <g>
                                        <!-- Background circle -->
                                        <circle cx="370" cy="70" r="30" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
                                        <!-- Hair (long, brown) -->
                                        <ellipse cx="370" cy="80" rx="15" ry="18" fill="#a16207"/>
                                        <!-- Face -->
                                        <ellipse cx="370" cy="70" rx="14" ry="15" fill="#fef3c7"/>
                                        <!-- Bangs -->
                                        <path d="M356 70 Q370 60 384 70 Q370 65 356 70" fill="#a16207"/>
                                        <!-- Eyes -->
                                        <ellipse cx="364" cy="72" rx="2" ry="2.5" fill="#1e293b"/>
                                        <ellipse cx="376" cy="72" rx="2" ry="2.5" fill="#1e293b"/>
                                        <!-- Smile -->
                                        <path d="M364 78 Q370 84 376 78" stroke="#ea580c" stroke-width="2" fill="none"/>
                                        <!-- Blush -->
                                        <ellipse cx="362" cy="76" rx="1.5" ry="0.7" fill="#fca5a5"/>
                                        <ellipse cx="378" cy="76" rx="1.5" ry="0.7" fill="#fca5a5"/>
                                        <!-- Body (shirt) -->
                                        <rect x="362" y="85" width="16" height="12" rx="6" fill="#60a5fa"/>
                                        <!-- Skirt -->
                                        <path d="M362 97 Q370 110 378 97 Z" fill="#f472b6"/>
                                        <!-- Left arm -->
                                        <rect x="355" y="88" width="7" height="3.5" rx="1.5" fill="#fef3c7" transform="rotate(-20 355 88)"/>
                                        <!-- Right arm (waving) -->
                                        <g>
                                            <rect x="378" y="88" width="13" height="3.5" rx="1.5" fill="#fef3c7">
                                                <animateTransform attributeName="transform" type="rotate" values="0 378 88;25 378 88;0 378 88" dur="1.2s" repeatCount="indefinite"/>
                                            </rect>
                                            <!-- Hand -->
                                            <ellipse cx="391" cy="89.5" rx="3" ry="2.2" fill="#fde68a" stroke="#b45309" stroke-width="1"/>
                                            <animateTransform attributeName="transform" type="rotate" values="0 378 88;25 378 88;0 378 88" dur="1.2s" repeatCount="indefinite"/>
                                        </g>
                                        <!-- Student label -->
                                        <text x="370" y="128" text-anchor="middle" fill="#1d4ed8" font-size="16" font-weight="bold">Student</text>
                                    </g>
                                    <!-- Parcel from Kutir (animated) -->
                                    <g>
                                        <path id="kutirZigzag" d="M70,60 L110,70 L150,50 L190,70 L230,50 L270,70 L310,50 L360,70" fill="none"/>
                                        <g>
                                            <rect id="parcelKutir" width="28" height="18" rx="4" fill="#34d399">
                                                <animateMotion dur="2.5s" repeatCount="indefinite">
                                                    <mpath xlink:href="#kutirZigzag"/>
                                                </animateMotion>
                                            </rect>
                                            <rect width="28" height="18" rx="4" fill="none" stroke="#059669" stroke-width="2">
                                                <animateMotion dur="2.5s" repeatCount="indefinite">
                                                    <mpath xlink:href="#kutirZigzag"/>
                                                </animateMotion>
                                            </rect>
                                            <!-- Small SVG parcel box inside the moving box -->
                                            <g>
                                                <rect x="7" y="5" width="14" height="8" rx="2" fill="#fbbf24" stroke="#b45309" stroke-width="1"/>
                                                <polygon points="7,5 14,1 21,5 14,9" fill="#fde68a" stroke="#b45309" stroke-width="1"/>
                                                <line x1="14" y1="1" x2="14" y2="9" stroke="#b45309" stroke-width="0.8"/>
                                                <animateMotion dur="2.5s" repeatCount="indefinite">
                                                    <mpath xlink:href="#kutirZigzag"/>
                                                </animateMotion>
                                            </g>
                                        </g>
                                    </g>
                                    <!-- Parcel from Post Office (animated) -->
                                    <g>
                                        <path id="poZigzag" d="M70,142 L110,150 L150,130 L190,150 L230,130 L270,150 L310,130 L360,100" fill="none"/>
                                        <g>
                                            <rect id="parcelPO" width="28" height="18" rx="4" fill="#fbbf24">
                                                <animateMotion dur="2.5s" begin="1.2s" repeatCount="indefinite">
                                                    <mpath xlink:href="#poZigzag"/>
                                                </animateMotion>
                                            </rect>
                                            <rect width="28" height="18" rx="4" fill="none" stroke="#b45309" stroke-width="2">
                                                <animateMotion dur="2.5s" begin="1.2s" repeatCount="indefinite">
                                                    <mpath xlink:href="#poZigzag"/>
                                                </animateMotion>
                                            </rect>
                                            <!-- Small SVG parcel box inside the moving box -->
                                            <g>
                                                <rect x="7" y="5" width="14" height="8" rx="2" fill="#fbbf24" stroke="#b45309" stroke-width="1"/>
                                                <polygon points="7,5 14,1 21,5 14,9" fill="#fde68a" stroke="#b45309" stroke-width="1"/>
                                                <line x1="14" y1="1" x2="14" y2="9" stroke="#b45309" stroke-width="0.8"/>
                                                <animateMotion dur="2.5s" begin="1.2s" repeatCount="indefinite">
                                                    <mpath xlink:href="#poZigzag"/>
                                                </animateMotion>
                                            </g>
                                        </g>
                                    </g>
                                    <!-- Zig-zag Path from Kutir (dashed) -->
                                    <polyline points="70,60 110,70 150,50 190,70 230,50 270,70 310,50 360,70" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="10,7"/>
                                    <!-- Zig-zag Path from Post Office (dashed) -->
                                    <polyline points="70,142 110,150 150,130 190,150 230,130 270,150 310,130 360,100" fill="none" stroke="#f59e42" stroke-width="3" stroke-dasharray="10,7"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            
            
            <!-- Carousel -->
            <div id="image-container" style="height: 450px; width: 100%; max-width: 1100px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 12px; margin-bottom: 20px; position: relative; overflow: hidden;">
                <button id="left-arrow" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.85); border: 1px solid #ddd; border-radius: 50%; width: 40px; height: 40px; font-size: 18px; cursor: pointer; color: #333; z-index: 10; display: flex; align-items: center; justify-content: center;">&larr;</button>
                <img id="carousel-img" src="${STATIC_IMAGES.box}" style="height: 100%; width: 100%; object-fit: cover; transition: opacity 0.3s ease;" alt="Carousel" />
                <button id="right-arrow" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.85); border: 1px solid #ddd; border-radius: 50%; width: 40px; height: 40px; font-size: 18px; cursor: pointer; color: #333; z-index: 10; display: flex; align-items: center; justify-content: center;">&rarr;</button>
                <!-- Dots -->
                <div id="carousel-dots" style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;"></div>
            </div>
            
        `;
    } else {
        // Dashboards for different user types
        switch (effectiveUserType) {
            case 'student':
                content = `
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Student Dashboard</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <button onclick="viewTrackParcel()" class="dashboard-button bg-blue-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002-2h2a2 2 0 002 2m-6 0v6m-6-6v6"></path></svg>
                            Track Parcel
                        </button>
                        <button onclick="viewHistory()" class="dashboard-button bg-gray-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            My Parcel History
                        </button>
                    </div>
                    <section id="student-content"></section>
                `;
                break;
            case 'kutir_supervisor':
            case 'post_office_supervisor':
                const supervisorType = effectiveUserType === 'kutir_supervisor' ? 'Kutir' : 'Post Office';
                content = `
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">${supervisorType} Supervisor Dashboard</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <button onclick="viewAddParcel()" class="dashboard-button bg-green-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            Add New Parcel
                        </button>
                        <button onclick="viewPendingParcels()" class="dashboard-button bg-yellow-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            View Pending Parcels
                        </button>
                    </div>
                    <section id="supervisor-content"></section>
                `;
                break;
            case 'admin':
                content = `
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <button onclick="viewSystemOverview()" class="dashboard-button bg-indigo-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10v11m6-9v9m6-5v5m6-5v5M3 10h18"></path></svg>
                            System Overview
                        </button>
                        <button onclick="viewManageUsers()" class="dashboard-button bg-purple-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m4-12h6m-6 4h6m-6 4h2"></path></svg>
                            Manage Users
                        </button>
                        <button onclick="viewSystemLogs()" class="dashboard-button bg-red-500 text-white">
                            <svg class="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.27 1.482-1.325 2.825-2.73 3.633a9.04 9.04 0 01-2.91 1.761"></path></svg>
                            View Logs
                        </button>
                    </div>
                    <section id="admin-content"></section>
                `;
                break;
            default:
                content = `<p class="text-center text-gray-500">Invalid user type. Please log in again.</p>`;
                break;
        }
    }
    contentDiv.innerHTML = content;

    // Hover effects for individual images
    const poImg = document.getElementById('po-img');
    if (poImg) {
        let poTimeout;
        poImg.addEventListener('mouseenter', () => {
            poTimeout = setTimeout(() => {
                poImg.src = STATIC_IMAGES.box;
            }, 1000);
        });
        poImg.addEventListener('mouseleave', () => {
            clearTimeout(poTimeout);
            poImg.src = STATIC_IMAGES.post;
        });
    }

    const delImg = document.getElementById('del-img');
    if (delImg) {
        let delTimeout;
        delImg.addEventListener('mouseenter', () => {
            delTimeout = setTimeout(() => {
                delImg.src = STATIC_IMAGES.del;
            }, 1000);
        });
        delImg.addEventListener('mouseleave', () => {
            clearTimeout(delTimeout);
            delImg.src = STATIC_IMAGES.parcel;
        });
    }

    const trackImg = document.getElementById('track-img');
    if (trackImg) {
        let trackTimeout;
        trackImg.addEventListener('mouseenter', () => {
            trackTimeout = setTimeout(() => {
                trackImg.src = STATIC_IMAGES.parcel;
            }, 1000);
        });
        trackImg.addEventListener('mouseleave', () => {
            clearTimeout(trackTimeout);
            trackImg.src = STATIC_IMAGES.box;
        });
    }

    const warImg = document.getElementById('war-img');
    if (warImg) {
        let warTimeout;
        warImg.addEventListener('mouseenter', () => {
            warTimeout = setTimeout(() => {
                warImg.src = STATIC_IMAGES.post;
            }, 1000);
        });
        warImg.addEventListener('mouseleave', () => {
            clearTimeout(warTimeout);
            warImg.src = STATIC_IMAGES.del;
        });
    }
    // ── Carousel ─────────────────────────────────────────────────
    const carouselImg = document.getElementById('carousel-img');
    if (carouselImg) {
        const images = [
            STATIC_IMAGES.box,
            STATIC_IMAGES.del,
            STATIC_IMAGES.parcel,
            STATIC_IMAGES.post,
        ];
        let current = 0;

        // Build dots
        const dotsContainer = document.getElementById('carousel-dots');
        images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:${i === 0 ? '#2563eb' : 'rgba(255,255,255,0.7)'};border:1px solid #ccc;cursor:pointer;transition:background 0.2s;`;
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.style.background = i === current ? '#2563eb' : 'rgba(255,255,255,0.7)';
            });
        }

        function goTo(index) {
            current = (index + images.length) % images.length;
            carouselImg.style.opacity = '0';
            setTimeout(() => {
                carouselImg.src = images[current];
                carouselImg.style.opacity = '1';
            }, 150);
            updateDots();
        }

        document.getElementById('left-arrow').addEventListener('click', () => goTo(current - 1));
        document.getElementById('right-arrow').addEventListener('click', () => goTo(current + 1));

        // Auto-advance every 3 seconds
        setInterval(() => goTo(current + 1), 3000);
    }
}


// Event handlers for student dashboard
function viewTrackParcel() {
    // Functionality to view the parcel tracking form
    document.getElementById('student-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Track Parcel</h3>
        <div class="flex items-center space-x-4">
            <input type="text" placeholder="Enter Tracking ID" class="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <button class="px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Track
            </button>
        </div>
    `;
}

function viewHistory() {
    // Functionality to view parcel history
    document.getElementById('student-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">My Parcel History</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Parcel ID</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <!-- Placeholder data -->
                    <tr>
                        <td class="py-4 px-6 whitespace-nowrap">PMS-23456</td>
                        <td class="py-4 px-6 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span></td>
                        <td class="py-4 px-6 whitespace-nowrap">2023-10-25</td>
                    </tr>
                    <tr>
                        <td class="py-4 px-6 whitespace-nowrap">PMS-87654</td>
                        <td class="py-4 px-6 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Ready for Pickup</span></td>
                        <td class="py-4 px-6 whitespace-nowrap">2023-11-01</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Event handlers for supervisor dashboard
function viewAddParcel() {
    // Functionality to add a new parcel
    document.getElementById('supervisor-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Add New Parcel</h3>
        <form class="space-y-4">
            <input type="text" placeholder="Student ID/Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <input type="text" placeholder="Parcel Details" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <button type="submit" class="w-full px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors">
                Add Parcel
            </button>
        </form>
    `;
}

function viewPendingParcels() {
    // Functionality to view pending parcels
    document.getElementById('supervisor-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Pending Parcels</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Parcel ID</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <!-- Placeholder data -->
                    <tr>
                        <td class="py-4 px-6 whitespace-nowrap">PMS-99887</td>
                        <td class="py-4 px-6 whitespace-nowrap">2317219</td>
                        <td class="py-4 px-6 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Received at University</span></td>
                        <td class="py-4 px-6 whitespace-nowrap">
                            <button class="text-blue-600 hover:text-blue-900 transition-colors">Update Status</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Event handlers for admin dashboard
function viewSystemOverview() {
    // Functionality to view system overview
    document.getElementById('admin-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">System Overview</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-50 p-6 rounded-lg shadow-inner text-center">
                <p class="text-4xl font-bold text-blue-600">124</p>
                <p class="mt-2 text-gray-500">Parcels Today</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg shadow-inner text-center">
                <p class="text-4xl font-bold text-yellow-600">32</p>
                <p class="mt-2 text-gray-500">Pending Deliveries</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg shadow-inner text-center">
                <p class="text-4xl font-bold text-green-600">450</p>
                <p class="mt-2 text-gray-500">Total Users</p>
            </div>
        </div>
    `;
}

function viewManageUsers() {
    // Functionality to manage users
    document.getElementById('admin-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Manage Users</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <!-- Placeholder data -->
                    <tr>
                        <td class="py-4 px-6 whitespace-nowrap">2317267</td>
                        <td class="py-4 px-6 whitespace-nowrap">Suhita Poonia</td>
                        <td class="py-4 px-6 whitespace-nowrap">Student</td>
                        <td class="py-4 px-6 whitespace-nowrap">
                            <button class="text-blue-600 hover:text-blue-900 transition-colors">Edit</button>
                            <button class="text-red-600 hover:text-red-900 transition-colors ml-4">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function viewSystemLogs() {
    // Functionality to view system logs
    document.getElementById('admin-content').innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4">System Logs</h3>
        <div class="bg-gray-900 text-white rounded-lg p-4 overflow-y-scroll max-h-96">
            <pre class="text-sm">
[2023-11-15 10:00:01] INFO: User 'admin' logged in from 10.1.2.3.
[2023-11-15 10:01:23] INFO: Parcel 'PMS-99887' added by 'kutir_supervisor'.
[2023-11-15 10:03:45] WARNING: Failed login attempt for user '2317219'.
[2023-11-15 10:05:12] INFO: Parcel 'PMS-87654' status updated to 'Ready for Pickup'.
[2023-11-15 10:06:00] ERROR: Database connection failed.
            </pre>
        </div>
    `;
}

// Navigation event handlers
function handleLogout() {
    window.location.href = 'index.html';
}

function handleLoginRedirect() {
    window.location.href = 'index.html';
}

