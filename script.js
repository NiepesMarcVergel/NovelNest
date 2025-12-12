// Show main app after loading
setTimeout(() => {
    document.getElementById('main-app').classList.add('active');
}, 5000);

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const section = item.dataset.section;
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// Like button interaction
document.addEventListener('click', (e) => {
    if (e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        const countSpan = btn.querySelector('.like-count');
        let count = parseInt(countSpan.textContent);
        
        if (btn.classList.contains('liked')) {
            btn.classList.remove('liked');
            countSpan.textContent = count - 1;
        } else {
            btn.classList.add('liked');
            countSpan.textContent = count + 1;
        }
        e.stopPropagation(); // prevent card click
    }
});

// Three dots menu interaction
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('three-dots')) {
        e.stopPropagation(); // prevent card click
        const isOwner = e.target.dataset.owner === 'true';
        const menuPopup = document.getElementById('menu-popup');
        const menuContent = document.getElementById('menu-content');
        
        if (isOwner) {
            menuContent.innerHTML = `
                <div class="menu-item" onclick="editPost(); closePopup('menu-popup');">✏️ Edit</div>
                <div class="menu-item danger" onclick="deletePost(); closePopup('menu-popup');">🗑️ Delete</div>
                <div class="menu-item" onclick="copyLink(); closePopup('menu-popup');">🔗 Copy Link</div>
            `;
        } else {
            menuContent.innerHTML = `
                <div class="menu-item danger" onclick="reportPost(); closePopup('menu-popup');">🚫 Report</div>
                <div class="menu-item" onclick="notInterested(); closePopup('menu-popup');">👎 Not Interested</div>
                <div class="menu-item" onclick="copyLink(); closePopup('menu-popup');">🔗 Copy Link</div>
            `;
        }
        // open the menu popup
        menuPopup.classList.add('active');
    }
});

// Create Post Logic
function openCreatePost() {
    document.getElementById('create-post-popup').classList.add('active');
}

function submitNewPost() {
    const title = document.getElementById('new-post-title').value;
    const novel = document.getElementById('new-post-novel').value;
    const desc = document.getElementById('new-post-desc').value;

    if (title && novel && desc) {
        alert(`Posted:\nTitle: ${title}\nNovel: ${novel}\nDescription: ${desc}`);
        document.getElementById('new-post-title').value = '';
        document.getElementById('new-post-novel').value = '';
        document.getElementById('new-post-desc').value = '';
        closePopup('create-post-popup');
    } else {
        alert('Please fill in all fields');
    }
}

// Post Detail Interaction
function openPostDetail(id) {
    const popup = document.getElementById('post-popup');
    const content = document.getElementById('popup-post-content');
    const comments = document.getElementById('comments-section');
    
    // Hardcoded content for John Doe's post
    if (id === 1) {
        content.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <div class="avatar">JD</div>
                    <div>
                        <div><strong>John Doe</strong></div>
                        <div style="font-size: 12px; color: #999;">2 hours ago</div>
                    </div>
                </div>
            </div>
            <div class="post-title">Omniscient Reader's Viewpoint is a masterpiece!</div>
            <p>Just finished ORV and I'm blown away. The meta-narrative and character development are incredible. Kim Dokja's journey from a reader to a protagonist is so well crafted. Anyone else feel the same?</p>
        `;
        
        comments.innerHTML = `
            <div class="comment"><strong>Alice:</strong> Totally agree! The ending wrecked me.</div>
            <div class="comment"><strong>Bob:</strong> Best novel I've read in years.</div>
            <div class="comment"><strong>Charlie:</strong> I cried so much 😭</div>
            <div class="comment"><strong>Dave:</strong> Han Sooyoung is the real MVP though.</div>
            <div class="comment"><strong>Eve:</strong> Can't wait for the anime adaptation!</div>
        `;
        popup.classList.add('active');
    }
}

// Add Comment Popup
function openAddCommentPopup() {
    document.getElementById('add-comment-popup').classList.add('active');
}

function submitPopupComment() {
    const text = document.getElementById('popup-comment-text').value;
    if (text.trim()) {
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `<strong>You:</strong> ${escapeHtml(text)}`;
        document.getElementById('comments-section').appendChild(div);
        document.getElementById('popup-comment-text').value = '';
        closePopup('add-comment-popup');
    } else {
        alert('Please write a comment');
    }
}

// Filter Logic
function filterPosts(type, btn) {
    // Update active button
    document.querySelectorAll('.filter-buttons .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const posts = document.querySelectorAll('#home .post-card');
    
    if (type === 'all') {
        posts.forEach(post => post.style.display = 'block');
    } else if (type === 'following') {
        posts.forEach(post => {
            const author = post.querySelector('.post-author strong').textContent;
            if (author === 'John Doe' || author === 'Emma Lee') {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
}

// Helper functions
function closePopup(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('active');
}

function editPost() {
    alert('Edit post: not implemented in demo.');
}

function deletePost() {
    alert('Delete post: not implemented in demo.');
}

function copyLink() {
    alert('Link copied to clipboard');
}

function reportPost() {
    alert('Reported. Thank you for your feedback.');
}

function notInterested() {
    alert('Marked as not interested.');
}

// Groups handling
function showGroupsList() {
    document.getElementById('groups-list').style.display = '';
    document.getElementById('group-posts').style.display = 'none';
}

function showGroupPosts(groupKey) {
    const title = document.getElementById('group-title');
    const feed = document.getElementById('group-feed');
    // Using simple selector to get text
    title.textContent = document.querySelector(`.group-card[data-group="${groupKey}"] .post-title`).textContent || groupKey;
    
    // Custom logic for ORV group (Data mocked in JS)
    if (groupKey === 'orv') {
        feed.innerHTML = `
            <div class="post-card">
                <div class="post-header">
                    <div class="post-author"><div class="avatar">KD</div><div><strong>Kim Dokja</strong></div></div>
                </div>
                <div class="post-title">The ending...</div>
                <p>I still can't get over the ending. 51% vs 49%...</p>
            </div>
            <div class="post-card">
                <div class="post-header">
                    <div class="post-author"><div class="avatar">YJ</div><div><strong>Yoo Joonghyuk</strong></div></div>
                </div>
                <div class="post-title">Looking for a reader</div>
                <p>Has anyone seen a reader who wears a white coat? He keeps disappearing.</p>
            </div>
            <div class="post-card">
                <div class="post-header">
                    <div class="post-author"><div class="avatar">HS</div><div><strong>Han Sooyoung</strong></div></div>
                </div>
                <div class="post-title">New chapter update</div>
                <p>Just uploaded the latest chapter. Make sure to read it or I'll plagiarize your life.</p>
            </div>
        `;
    } else {
        feed.innerHTML = '<p style="text-align:center; color:#666;">No posts loaded for this group in demo.</p>';
    }

    document.getElementById('groups-list').style.display = 'none';
    document.getElementById('group-posts').style.display = '';
}

document.querySelectorAll('.group-card').forEach(card => {
    card.addEventListener('click', () => showGroupPosts(card.dataset.group));
});

// Notifications
function markAllRead() {
    document.querySelectorAll('.notification-card.unread').forEach(n => n.classList.remove('unread'));
}

function deleteAllNotifications() {
    const container = document.getElementById('notifications');
    if (!container) return;
    container.querySelectorAll('.notification-card').forEach(n => n.remove());
}

// Settings
function showSettings() {
    document.getElementById('settings-popup').classList.add('active');
}

// Follow toggle
function toggleFollow(btn) {
    if (!btn) return;
    const isFollowing = btn.classList.toggle('following');
    if (btn.classList.contains('following')) {
        btn.textContent = 'Following';
        btn.style.background = 'white';
        btn.style.color = '#2d5016';
    } else {
        btn.textContent = 'Follow';
        btn.style.background = '';
        btn.style.color = '';
    }
}

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Profile tabs
function showProfileTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.profile-tab-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.tab').forEach(t => { if (t.textContent.toLowerCase().includes(tab)) t.classList.add('active'); });
    
    const tabMap = {
        'posts': 'profile-posts',
        'followers': 'profile-followers',
        'following': 'profile-following'
    };
    
    const elementId = tabMap[tab];
    if (elementId) {
        document.getElementById(elementId).style.display = '';
    }
}