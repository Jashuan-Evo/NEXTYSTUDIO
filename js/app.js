let currentAuthMode = 'login';

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  const targetTab = document.getElementById('tab-' + tabName);
  if (targetTab) {
    targetTab.classList.add('active');
  }
}

function openAuthModal(mode) {
  currentAuthMode = mode;
  const modal = document.getElementById('authModal');
  const title = document.getElementById('modalTitle');
  const submitBtn = document.getElementById('modalSubmitBtn');
  const usernameGroup = document.getElementById('usernameGroup');

  if (mode === 'login') {
    title.innerText = 'Masuk ke NEXTYSTUDIO';
    submitBtn.innerText = 'Masuk';
    usernameGroup.style.display = 'none';
  } else {
    title.innerText = 'Daftar Akun Baru';
    submitBtn.innerText = 'Daftar Akun';
    usernameGroup.style.display = 'block';
  }
  modal.style.display = 'flex';
}

function closeAuthModal() {
  document.getElementById('authModal').style.display = 'none';
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  const username = document.getElementById('authUsername').value;

  if (!supabase || SUPABASE_ANON_KEY === "PASTE_ANON_KEY_KAMU_DI_SINI") {
    alert("Perhatian: Jangan lupa tempelkan Publishable API Key (anon) kamu di file js/supabase-client.js!");
    return;
  }

  if (currentAuthMode === 'register') {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { username: username } }
    });

    if (error) {
      alert("Gagal Daftar: " + error.message);
    } else {
      alert("Pendaftaran Berhasil! Silakan cek email kamu atau langsung login.");
      closeAuthModal();
    }
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      alert("Gagal Login: " + error.message);
    } else {
      alert("Berhasil Login!");
      closeAuthModal();
      checkCurrentUser();
    }
  }
}

async function checkCurrentUser() {
  if (!supabase || SUPABASE_ANON_KEY === "PASTE_ANON_KEY_KAMU_DI_SINI") return;

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    document.getElementById('authContainer').innerHTML = `
      <span style="color:#4ade80; align-self:center;"><i class="fa-solid fa-user-check"></i> ${user.email}</span>
      <button class="btn btn-outline" onclick="logout()">Keluar</button>
    `;
    const profUser = document.getElementById('profUsername');
    if (profUser) profUser.innerText = user.email;
  }
}

async function logout() {
  if (supabase) await supabase.auth.signOut();
  location.reload();
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text) return;

  const body = document.getElementById('chatMessages');
  const newMsg = document.createElement('div');
  newMsg.className = 'msg seller';
  newMsg.innerHTML = `<b>Kamu:</b> ${text}`;
  body.appendChild(newMsg);
  input.value = '';
  body.scrollTop = body.scrollHeight;
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function submitSellerForm(e) {
  e.preventDefault();
  alert("Pengajuan Toko berhasil dikirim ke Admin/Owner! Status toko kamu sekarang: PENDING.");
  document.getElementById('sellerForm').reset();
}

function createOrderDemo(prodName) {
  alert(`Pesanan untuk "${prodName}" dibuat! Kamu otomatis diarahkan ke Ruang Chat MIDMAN.`);
  showTab('pesan');
}

document.addEventListener('DOMContentLoaded', () => {
  checkCurrentUser();
});
  
