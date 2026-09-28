console.log("🚀 CLONE WHATSAPP: VERSÃO 20 INICIADA!");

const SVG_MIC = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.349 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2.002z"></path></svg>`;
const SVG_SEND = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>`;
const SVG_SINGLE_TICK = `<svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>`;
const SVG_DOUBLE_TICK = `<svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.318.318 0 0 0 .036.408l1.51 1.369c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path><path fill="currentColor" d="M9.663 3.116l-.478-.372a.365.365 0 0 0-.51.063L3.319 9.679a.32.32 0 0 1-.484.033L.645 7.569a.366.366 0 0 0-.515.006L.2 8.008a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>`;

let chatsData = {}; let myProfile = {}; let activeChatId = "chat_maria"; 

// 1. DADOS E TEMAS
function carregarDados() {
  const dadosSalvos = localStorage.getItem('whatsapp_clone_data_v20'); 
  if (dadosSalvos) { const dataObj = JSON.parse(dadosSalvos); chatsData = dataObj.chats; myProfile = dataObj.profile; } 
  else {
    chatsData = {
      "chat_maria": { name: "Maria Silva", phone: "+55 11 98765-4321", recado: "Ocupada", avatar: "M", color: "#00a884", archived: false, messages: [{ id: Date.now()-1000, text: "Olá! Tudo bem?", time: "14:02", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }] },
      "chat_joao": { name: "João Pedro", phone: "+55 21 91234-5678", recado: "No trabalho.", avatar: "J", color: "#53bdeb", archived: false, messages: [{ id: Date.now(), text: "Bora testar os áudios novo!", time: "09:30", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }] }
    };
    myProfile = { name: "Administrador", bio: "Disponível", avatar: null, theme: "dark" }; salvarDados();
  }
  mudarTema(myProfile.theme || 'dark');
}
function salvarDados() { localStorage.setItem('whatsapp_clone_data_v20', JSON.stringify({ chats: chatsData, profile: myProfile })); }
function abrirModalTema() { document.getElementById("theme-modal").style.display = "flex"; setTimeout(() => document.getElementById("theme-modal").classList.add("show"), 10); }
function fecharModalTema() { document.getElementById("theme-modal").classList.remove("show"); setTimeout(() => document.getElementById("theme-modal").style.display = "none", 300); }
function mudarTema(themeName) { document.body.className = `theme-${themeName}`; myProfile.theme = themeName; salvarDados(); }

// 2. SONS E PERFIL
const AudioContext = window.AudioContext || window.webkitAudioContext; let audioCtx;
function playSound(type) { try { if (!audioCtx) audioCtx = new AudioContext(); if (audioCtx.state === 'suspended') audioCtx.resume(); const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain(); if (type === 'sent') { osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.5, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1); osc.start(); osc.stop(audioCtx.currentTime + 0.1); } else { osc.type = 'sine'; osc.frequency.setValueAtTime(800, audioCtx.currentTime); gain.gain.setValueAtTime(1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5); osc.start(); osc.stop(audioCtx.currentTime + 0.5); } osc.connect(gain); gain.connect(audioCtx.destination); } catch(e){} }

function atualizarMeuPerfilUI() { document.getElementById('my-name-display').textContent = myProfile.name; document.getElementById('my-bio-display').textContent = myProfile.bio; const avatarHTML = myProfile.avatar ? `<img src="${myProfile.avatar}" style="width:100%; height:100%; object-fit:cover;">` : `Eu`; document.getElementById('sidebar-my-avatar').innerHTML = avatarHTML; document.getElementById('my-profile-avatar').innerHTML = avatarHTML; }
function iniciarEdicao(field) { document.getElementById(`my-${field}-display`).style.display = 'none'; document.getElementById(`btn-edit-${field}`).style.display = 'none'; const input = document.getElementById(`my-${field}-input`); const btnSave = document.getElementById(`btn-save-${field}`); input.style.display = 'block'; btnSave.style.display = 'block'; input.value = myProfile[field]; input.focus(); }
function salvarEdicao(field) { const input = document.getElementById(`my-${field}-input`); myProfile[field] = input.value.trim() || (field === 'name' ? 'Sem Nome' : 'Disponível'); salvarDados(); atualizarMeuPerfilUI(); input.style.display = 'none'; document.getElementById(`btn-save-${field}`).style.display = 'none'; document.getElementById(`my-${field}-display`).style.display = 'block'; document.getElementById(`btn-edit-${field}`).style.display = 'block'; }
document.getElementById('my-name-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') salvarEdicao('name'); }); document.getElementById('my-bio-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') salvarEdicao('bio'); });
document.getElementById('my-avatar-input').addEventListener('change', function(e) { const file = e.target.files[0]; if(!file) return; if (file.size > 2.5 * 1024 * 1024) { alert("Máximo 2.5MB."); return; } const reader = new FileReader(); reader.onload = function(evt) { myProfile.avatar = evt.target.result; salvarDados(); atualizarMeuPerfilUI(); abrirConversa(activeChatId); }; reader.readAsDataURL(file); this.value = ''; });
function visualizarMinhaFoto(e) { e.stopPropagation(); if (myProfile.avatar) abrirModalMedia(myProfile.avatar, 'image'); else alert('Você ainda não adicionou uma foto.'); }

// 3. LISTA DE CHATS
function gerarHTMLItemChat(chatId, chat, isListaArquivada) {
  const msgsVisiveis = chat.messages.filter(m => !m.deleted); let ultimaMensagem = "Nenhuma mensagem..."; let lastTick = "";
  if (chat.isTyping) { ultimaMensagem = `<span style="color: var(--primary-color); font-weight: 500;">digitando...</span>`; } 
  else if (msgsVisiveis.length > 0) { const lastMsg = msgsVisiveis[msgsVisiveis.length - 1]; if (lastMsg.type === 'sent') { lastTick = lastMsg.status === 'read' ? `<span style="color:var(--secondary-color)">${SVG_DOUBLE_TICK}</span> ` : `<span style="color:var(--text-secondary)">${SVG_DOUBLE_TICK}</span> `; } if (lastMsg.isImage) ultimaMensagem = "📷 Imagem"; else if (lastMsg.isVideo) ultimaMensagem = "🎥 Vídeo"; else if (lastMsg.isAudio) ultimaMensagem = "🎤 Áudio"; else ultimaMensagem = lastMsg.text; }
  const divItem = document.createElement('div'); divItem.classList.add('chat-item'); if (chatId === activeChatId) divItem.classList.add('active');
  const menuHTML = `<button class="sidebar-item-btn" onclick="event.stopPropagation(); toggleMenu(event, 'sidebar-menu-${chatId}')">▼</button><div id="sidebar-menu-${chatId}" class="msg-dropdown" style="right: 25px; top: 35px;"><div class="msg-dropdown-item" onclick="event.stopPropagation(); alternarArquivamento('${chatId}')">${isListaArquivada ? 'Desarquivar conversa' : 'Arquivar conversa'}</div></div>`;
  let fotoContato = chat.avatar; if(chat.avatar.length > 5) { fotoContato = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`; }
  divItem.innerHTML = `<div class="avatar" style="background-color: ${chat.color}">${fotoContato}</div><div class="chat-item-info"><span class="chat-item-name">${chat.name}</span><span class="chat-item-last-msg">${lastTick}${ultimaMensagem}</span></div>${menuHTML}`; 
  divItem.onclick = () => { sairModoSelecao(); abrirConversa(chatId); if(window.innerWidth <= 768) document.querySelector('.sidebar-wrapper').classList.add('hide-mobile'); }; 
  return divItem;
}
function atualizarSidebar() { const sidebarList = document.getElementById('sidebar-list'); const archivedList = document.getElementById('archived-list'); const btnShowArchived = document.getElementById('btn-show-archived'); const archivedCountText = document.getElementById('archived-count'); sidebarList.innerHTML = ''; archivedList.innerHTML = ''; let countArchived = 0; for (const chatId in chatsData) { const chat = chatsData[chatId]; if (chat.archived) { countArchived++; archivedList.appendChild(gerarHTMLItemChat(chatId, chat, true)); } else { sidebarList.appendChild(gerarHTMLItemChat(chatId, chat, false)); } } if (countArchived > 0) { btnShowArchived.style.display = 'flex'; archivedCountText.textContent = countArchived; } else { btnShowArchived.style.display = 'none'; } }
function alternarArquivamento(chatId) { fecharMenus(); chatsData[chatId].archived = !chatsData[chatId].archived; salvarDados(); atualizarSidebar(); }

// 4. RENDERIZAÇÃO DO CHAT
const chatWindow = document.getElementById('chat-window'); 
function formatarSegundosParaTempo(seg) { if (isNaN(seg) || !isFinite(seg)) return "00:00"; const m = Math.floor(seg / 60).toString().padStart(2, '0'); const s = Math.floor(seg % 60).toString().padStart(2, '0'); return `${m}:${s}`; }

function abrirConversa(chatId) {
  activeChatId = chatId; const chat = chatsData[chatId]; 
  document.getElementById('header-name').textContent = chat.name; 
  
  const btnMobile = document.getElementById('btn-back-mobile');
  if(window.innerWidth <= 768 && btnMobile) btnMobile.style.display = 'block';
  
  const headerAvatar = document.getElementById('header-avatar');
  if (chat.avatar.length > 5) { headerAvatar.innerHTML = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`; headerAvatar.style.backgroundColor = 'transparent'; } else { headerAvatar.innerHTML = chat.avatar; headerAvatar.style.backgroundColor = chat.color; }
  
  const statusElement = document.getElementById('header-status'); 
  if (chat.isTyping) { statusElement.textContent = 'digitando...'; statusElement.style.display = 'block'; } else { statusElement.style.display = 'none'; }
  
  chatWindow.classList.remove('fade-in-content'); void chatWindow.offsetWidth; chatWindow.classList.add('fade-in-content'); chatWindow.innerHTML = '';
  
  chat.messages.filter(m => !m.deleted).forEach(msg => { 
    const divMsg = document.createElement('div'); divMsg.classList.add('message', msg.type); divMsg.id = `msg-${msg.id}`; 
    let tickHTML = '';
    if (msg.type === 'sent') { if (msg.status === 'read') tickHTML = `<span class="tick tick-read">${SVG_DOUBLE_TICK}</span>`; else if (msg.status === 'delivered') tickHTML = `<span class="tick">${SVG_DOUBLE_TICK}</span>`; else tickHTML = `<span class="tick">${SVG_SINGLE_TICK}</span>`; }
    let contentHTML = ''; let avatarPlayer = msg.type === 'sent' ? 'E' : chat.avatar;
    if (msg.type === 'sent' && myProfile.avatar) avatarPlayer = `<img src="${myProfile.avatar}" style="width:100%; height:100%; object-fit:cover;">`; else if (msg.type === 'received' && chat.avatar.length > 5) avatarPlayer = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`;
    
    if (msg.isImage) { contentHTML = `<img src="${msg.text}" class="chat-media" alt="Imagem" onclick="abrirModalMedia('${msg.text}', 'image')"> <div class="message-time-block"><span class="time">${msg.time}</span>${tickHTML}</div>`; divMsg.classList.add('media-message'); } 
    else if (msg.isVideo) { contentHTML = `<video src="${msg.text}" class="chat-media" onclick="abrirModalMedia('${msg.text}', 'video')"></video> <div class="video-overlay-icon">▶</div><div class="message-time-block"><span class="time">${msg.time}</span>${tickHTML}</div>`; divMsg.classList.add('media-message'); } 
    else if (msg.isAudio) { 
      divMsg.classList.add('audio-message'); const duracao = msg.audioDuration || 0; const displayTempoInicial = formatarSegundosParaTempo(duracao);
      contentHTML = `<div class="custom-audio-player"><audio src="${msg.text}" class="hidden-audio" preload="metadata"></audio><div class="audio-avatar">${avatarPlayer}</div><div class="audio-controls-wrapper"><div class="audio-top-row"><button class="play-btn" onclick="playCustomAudio(this)">▶</button><div class="audio-progress"><div class="audio-progress-bar"></div><input type="range" class="audio-seek-slider" min="0" max="100" value="0" step="0.1" oninput="arrastarAudio(this)" onchange="arrastarAudio(this)"></div></div><div class="audio-bottom-row"><span class="audio-timer-display" data-duration="${duracao}">${displayTempoInicial}</span><div class="message-time-block"><span class="time" style="margin:0;">${msg.time}</span>${tickHTML}</div></div></div></div>`; 
    } else { contentHTML = `<span class="text">${msg.text}</span><div class="message-time-block"><span class="time">${msg.time}</span>${tickHTML}</div>`; }
    
    divMsg.innerHTML = `${contentHTML}<button class="msg-options-btn" onclick="event.stopPropagation(); toggleMenu(event, 'menu-${msg.id}')">▼</button><div id="menu-${msg.id}" class="msg-dropdown"><div class="msg-dropdown-item" onclick="event.stopPropagation(); solicitarApagarUm(${msg.id})">Apagar Mensagem</div><div class="msg-dropdown-item" onclick="event.stopPropagation(); entrarModoSelecao(${msg.id})">Selecionar Mensagem</div></div>`;
    divMsg.addEventListener('click', (e) => { if (isSelectionMode) { e.preventDefault(); e.stopPropagation(); toggleMensagemSelecionada(msg.id, divMsg); } }); chatWindow.appendChild(divMsg);
  });
  atualizarSidebar(); chatWindow.scrollTop = chatWindow.scrollHeight; verificarBotaoDescer();
}

const btnScrollBottom = document.getElementById('btn-scroll-bottom'); 
chatWindow.onscroll = verificarBotaoDescer;
function verificarBotaoDescer() { if (chatWindow.scrollHeight - chatWindow.scrollTop > chatWindow.clientHeight + 150) { btnScrollBottom.style.display = 'flex'; } else { btnScrollBottom.style.display = 'none'; } }
function scrollToBottom() { chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' }); }

// 5. MOTOR DE ÁUDIO REPRODUÇÃO
function playCustomAudio(btn) {
  if (isSelectionMode) return;
  const player = btn.closest('.custom-audio-player'); const audio = player.querySelector('.hidden-audio'); const pb = player.querySelector('.audio-progress-bar'); const slider = player.querySelector('.audio-seek-slider'); const timerDisplay = player.querySelector('.audio-timer-display');
  const duration = parseFloat(timerDisplay.dataset.duration) || 0;

  document.querySelectorAll('audio.hidden-audio').forEach(a => { if(a !== audio) { a.pause(); a.parentElement.querySelector('.play-btn').textContent = '▶'; if(a.uiInterval) clearInterval(a.uiInterval); } }); 
  
  if (audio.paused) { 
    audio.play().then(() => {
      btn.textContent = '⏸'; 
      if(audio.uiInterval) clearInterval(audio.uiInterval);
      audio.uiInterval = setInterval(() => {
        if (duration > 0) {
           let percent = (audio.currentTime / duration) * 100;
           if(percent >= 100) percent = 100;
           pb.style.width = percent + '%'; slider.value = percent; timerDisplay.textContent = formatarSegundosParaTempo(audio.currentTime);
           if (audio.currentTime >= duration - 0.1 || percent === 100) {
              audio.pause(); audio.currentTime = 0; clearInterval(audio.uiInterval);
              btn.textContent = '▶'; pb.style.width = '0%'; slider.value = 0; timerDisplay.textContent = formatarSegundosParaTempo(duration);
           }
        }
      }, 50); 
    }).catch(err => { console.error("Erro no player:", err); });
  } else { audio.pause(); btn.textContent = '▶'; if(audio.uiInterval) clearInterval(audio.uiInterval); } 
}
function arrastarAudio(slider) {
  const player = slider.closest('.custom-audio-player'); const audio = player.querySelector('.hidden-audio'); const pb = player.querySelector('.audio-progress-bar'); const timerDisplay = player.querySelector('.audio-timer-display');
  const duration = parseFloat(timerDisplay.dataset.duration) || 0;
  if (duration > 0) { const newTime = (slider.value / 100) * duration; audio.currentTime = newTime; pb.style.width = slider.value + '%'; timerDisplay.textContent = formatarSegundosParaTempo(newTime); } 
}

// 6. SELEÇÃO E EXCLUSÃO
let isSelectionMode = false; let selectedMsgIds = new Set(); let backupMensagensApagadas = []; let undoTimeout = null;
const chatHeaderNormal = document.getElementById('chat-header'); const selectionHeader = document.getElementById('selection-header'); const selectionCountText = document.getElementById('selection-count'); const snackbar = document.getElementById('undo-snackbar');
function entrarModoSelecao(idInicial) { fecharMenus(); isSelectionMode = true; selectedMsgIds.clear(); chatHeaderNormal.style.display = 'none'; selectionHeader.classList.add('show'); chatWindow.classList.add('selection-mode-active'); toggleMensagemSelecionada(idInicial, document.getElementById(`msg-${idInicial}`)); }
function sairModoSelecao() { isSelectionMode = false; selectedMsgIds.clear(); chatHeaderNormal.style.display = 'flex'; selectionHeader.classList.remove('show'); chatWindow.classList.remove('selection-mode-active'); document.querySelectorAll('.message.selected').forEach(el => el.classList.remove('selected')); }
function toggleMensagemSelecionada(id, elementoDOM) { if (selectedMsgIds.has(id)) { selectedMsgIds.delete(id); elementoDOM.classList.remove('selected'); } else { selectedMsgIds.add(id); elementoDOM.classList.add('selected'); } if (selectedMsgIds.size === 0) { sairModoSelecao(); } else { selectionCountText.textContent = `${selectedMsgIds.size} selecionada(s)`; } }
function solicitarApagarUm(id) { fecharMenus(); processarExclusao([id]); } function apagarMensagensSelecionadas() { processarExclusao(Array.from(selectedMsgIds)); sairModoSelecao(); }
function processarExclusao(arrayIds) { backupMensagensApagadas = []; arrayIds.forEach(id => { const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === id); if(msgIndex !== -1) { chatsData[activeChatId].messages[msgIndex].deleted = true; backupMensagensApagadas.push({ id: id, chatId: activeChatId }); } }); salvarDados(); abrirConversa(activeChatId); snackbar.classList.add('show'); if(undoTimeout) clearTimeout(undoTimeout); undoTimeout = setTimeout(() => { snackbar.classList.remove('show'); backupMensagensApagadas.forEach(backup => { chatsData[backup.chatId].messages = chatsData[backup.chatId].messages.filter(m => !m.deleted); }); salvarDados(); backupMensagensApagadas = []; }, 5000); }
document.getElementById('btn-undo').addEventListener('click', () => { if (backupMensagensApagadas.length > 0) { backupMensagensApagadas.forEach(backup => { const msgIndex = chatsData[backup.chatId].messages.findIndex(m => m.id === backup.id); if(msgIndex !== -1) chatsData[backup.chatId].messages[msgIndex].deleted = false; }); salvarDados(); abrirConversa(activeChatId); snackbar.classList.remove('show'); clearTimeout(undoTimeout); backupMensagensApagadas = []; } });
function toggleMenu(e, id) { e.stopPropagation(); fecharMenus(); document.getElementById(id).classList.add('show'); } function fecharMenus() { document.querySelectorAll('.msg-dropdown').forEach(m => m.classList.remove('show')); }

// 7. EMOJIS, MENSAGEM E ANEXOS
const messageInput = document.getElementById('message-input'); const btnActionMain = document.getElementById('btn-action-main'); 
const btnAttachMenu = document.getElementById('btn-attach-menu'); const attachMenu = document.getElementById('attach-menu'); const fileInput = document.getElementById('file-input');
btnAttachMenu.onclick = (e) => { e.stopPropagation(); attachMenu.classList.toggle('show'); emojiPicker.classList.remove('show'); };
const emojiPicker = document.getElementById('emoji-picker'); const btnEmoji = document.getElementById('btn-emoji'); const listaEmojis = ['😀','😂','🥰','😎','🤔','👍','🙏','🔥','🎉','❤️','👀','✨','🤣','🙌','💡','✅','❌','💯'];
listaEmojis.forEach(e => { const span = document.createElement('span'); span.className = 'emoji-item'; span.textContent = e; span.onclick = () => { messageInput.value += e; messageInput.focus(); messageInput.dispatchEvent(new Event('input')); }; emojiPicker.appendChild(span); });
btnEmoji.onclick = (e) => { e.stopPropagation(); emojiPicker.classList.toggle('show'); attachMenu.classList.remove('show'); }; 
document.addEventListener('click', (e) => { if (!emojiPicker.contains(e.target) && !btnEmoji.contains(e.target)) emojiPicker.classList.remove('show'); if (!attachMenu.contains(e.target) && !btnAttachMenu.contains(e.target)) attachMenu.classList.remove('show'); });

function formatarHora() { const a = new Date(); return a.getHours().toString().padStart(2, '0') + ':' + a.getMinutes().toString().padStart(2, '0'); }

messageInput.addEventListener('input', () => { if (messageInput.value.trim() !== '') { btnActionMain.innerHTML = SVG_SEND; btnActionMain.onclick = sendMessage; } else { btnActionMain.innerHTML = SVG_MIC; btnActionMain.onclick = iniciarGravacao; } });
function processarEnvioMensagem(objMensagem) { chatsData[activeChatId].messages.push(objMensagem); salvarDados(); abrirConversa(activeChatId); playSound('sent'); setTimeout(() => { const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === objMensagem.id); if (msgIndex !== -1) { chatsData[activeChatId].messages[msgIndex].status = 'delivered'; salvarDados(); if(activeChatId === activeChatId) abrirConversa(activeChatId); } }, 1000); setTimeout(() => { const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === objMensagem.id); if (msgIndex !== -1) { chatsData[activeChatId].messages[msgIndex].status = 'read'; salvarDados(); if(activeChatId === activeChatId) abrirConversa(activeChatId); } }, 2500); }
function sendMessage() { const text = messageInput.value.trim(); if (text === '') return; processarEnvioMensagem({ id: Date.now(), text: text, time: formatarHora(), type: 'sent', isImage: false, isVideo: false, isAudio: false, deleted: false, status: 'sent', audioDuration: 0 }); messageInput.value = ''; btnActionMain.innerHTML = SVG_MIC; btnActionMain.onclick = iniciarGravacao; emojiPicker.classList.remove('show'); attachMenu.classList.remove('show');}
messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
fileInput.addEventListener('change', function(e) { const file = e.target.files[0]; if (!file) return; if (file.size > 2.5 * 1024 * 1024) { alert("Limite de 2.5 MB."); fileInput.value = ''; return; } const isVideoFile = file.type.startsWith('video/'); const reader = new FileReader(); reader.onload = function(evt) { processarEnvioMensagem({ id: Date.now(), text: evt.target.result, time: formatarHora(), type: 'sent', isImage: !isVideoFile, isVideo: isVideoFile, isAudio: false, deleted: false, status: 'sent', audioDuration: 0 }); }; reader.readAsDataURL(file); fileInput.value = ''; attachMenu.classList.remove('show');});

// 8. CÂMERA
const cameraModal = document.getElementById('camera-modal'); const cameraStream = document.getElementById('camera-stream'); const cameraCanvas = document.getElementById('camera-canvas'); const cameraPreview = document.getElementById('camera-preview'); const btnTakePhoto = document.getElementById('btn-take-photo'); const btnRetakePhoto = document.getElementById('btn-retake-photo'); const btnSendPhoto = document.getElementById('btn-send-photo'); let streamAtual = null;
async function abrirCamera() { 
  attachMenu.classList.remove('show'); 
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert("Permissão de câmera negada. Abra via Live Server."); return; } 
  try { const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); streamAtual = stream; cameraStream.srcObject = stream; cameraModal.style.display = 'flex'; setTimeout(() => cameraModal.classList.add('show'), 10); cameraStream.style.display = 'block'; btnTakePhoto.style.display = 'block'; cameraPreview.style.display = 'none'; btnRetakePhoto.style.display = 'none'; btnSendPhoto.style.display = 'none'; } catch (err) { alert("Acesso à câmera negado."); } 
}
function fecharCamera() { cameraModal.classList.remove('show'); setTimeout(() => { cameraModal.style.display = 'none'; if (streamAtual) { streamAtual.getTracks().forEach(track => track.stop()); streamAtual = null; } }, 300); }
btnTakePhoto.onclick = () => { cameraCanvas.width = cameraStream.videoWidth; cameraCanvas.height = cameraStream.videoHeight; cameraCanvas.getContext('2d').drawImage(cameraStream, 0, 0); cameraPreview.src = cameraCanvas.toDataURL('image/jpeg'); cameraStream.style.display = 'none'; btnTakePhoto.style.display = 'none'; cameraPreview.style.display = 'block'; btnRetakePhoto.style.display = 'block'; btnSendPhoto.style.display = 'flex'; };
btnRetakePhoto.onclick = () => { cameraStream.style.display = 'block'; btnTakePhoto.style.display = 'block'; cameraPreview.style.display = 'none'; btnRetakePhoto.style.display = 'none'; btnSendPhoto.style.display = 'none'; };
btnSendPhoto.onclick = () => { processarEnvioMensagem({ id: Date.now(), text: cameraPreview.src, time: formatarHora(), type: 'sent', isImage: true, isVideo: false, isAudio: false, deleted: false, status: 'sent', audioDuration: 0 }); fecharCamera(); };

// 9. GRAVAÇÃO ÁUDIO
const recordingControls = document.getElementById('recording-controls'); 
const recordingTime = document.getElementById('recording-time'); 
const btnCancelMic = document.getElementById('btn-cancel-mic');
let mediaRecorder = null; let audioChunks = []; let recTimer = null; let recSeconds = 0; let gravarParaEnviar = true; let isRequestingMic = false;

async function iniciarGravacao() {
  if(messageInput.value.trim() !== '' || isRequestingMic) return; 
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert("Abra o site com Live Server para permitir o microfone."); return; }
  
  isRequestingMic = true; gravarParaEnviar = true; 
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); 
    isRequestingMic = false;
    
    if (!gravarParaEnviar) { stream.getTracks().forEach(t => t.stop()); resetMicUI(); return; }
    if (recTimer) clearInterval(recTimer);
    
    mediaRecorder = new MediaRecorder(stream); audioChunks = []; recSeconds = 0;
    
    messageInput.style.display = 'none'; btnAttachMenu.style.display = 'none'; btnEmoji.style.display = 'none'; 
    document.querySelector('.footer-right').classList.add('recording-mode');
    btnActionMain.classList.add('recording-active'); btnActionMain.innerHTML = SVG_SEND;
    recordingControls.classList.add('show'); recordingTime.textContent = '00:00';
    
    recTimer = setInterval(() => { recSeconds++; recordingTime.textContent = formatarSegundosParaTempo(recSeconds); }, 1000);
    
    mediaRecorder.ondataavailable = e => { if(e.data.size > 0) audioChunks.push(e.data); };
    
    mediaRecorder.onstop = () => {
      clearInterval(recTimer); recTimer = null; const finalDuration = recSeconds; resetMicUI();
      if (gravarParaEnviar && audioChunks.length > 0) { 
        const audioBlob = new Blob(audioChunks); const reader = new FileReader();
        reader.onload = function(event) { processarEnvioMensagem({ id: Date.now(), text: event.target.result, time: formatarHora(), type: 'sent', isImage: false, isVideo: false, isAudio: true, deleted: false, status: 'sent', audioDuration: finalDuration }); }; 
        reader.readAsDataURL(audioBlob);
      } 
      stream.getTracks().forEach(t => t.stop()); 
    }; 
    mediaRecorder.start(200); 
    btnActionMain.onclick = function() { if (mediaRecorder && mediaRecorder.state === 'recording') { gravarParaEnviar = true; mediaRecorder.stop(); } };
  } catch (err) { isRequestingMic = false; resetMicUI(); alert("Permita o uso do microfone no navegador."); }
}

btnCancelMic.addEventListener('click', () => { 
  gravarParaEnviar = false; 
  if (mediaRecorder && mediaRecorder.state === 'recording') { mediaRecorder.stop(); } else { resetMicUI(); }
});

function resetMicUI() { 
  messageInput.style.display = 'block'; btnAttachMenu.style.display = 'flex'; btnEmoji.style.display = 'flex'; 
  document.querySelector('.footer-right').classList.remove('recording-mode'); btnActionMain.classList.remove('recording-active'); btnActionMain.innerHTML = SVG_MIC; 
  recordingControls.classList.remove('show'); btnActionMain.onclick = iniciarGravacao; 
}

// 10. FUNÇÕES SECUNDÁRIAS (Menus e UI)
const myProfileDrawer = document.getElementById('my-profile-drawer'); const contactDrawer = document.getElementById('contact-profile-drawer'); const archivedDrawer = document.getElementById('archived-drawer');
function abrirMeuPerfil() { myProfileDrawer.classList.add('open'); } function fecharMeuPerfil() { myProfileDrawer.classList.remove('open'); } function abrirArquivadas() { archivedDrawer.classList.add('open'); } function fecharArquivadas() { archivedDrawer.classList.remove('open'); }
function abrirPerfilContato() { const chat = chatsData[activeChatId]; const avatarEl = document.getElementById('contact-big-avatar'); if(chat.avatar.length > 5) { avatarEl.innerHTML = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`; avatarEl.style.backgroundColor = 'transparent'; avatarEl.style.cursor = 'pointer'; avatarEl.onclick = () => abrirModalMedia(chat.avatar, 'image'); } else { avatarEl.innerHTML = chat.avatar; avatarEl.style.backgroundColor = chat.color; avatarEl.style.cursor = 'default'; avatarEl.onclick = null; } document.getElementById('contact-big-name').textContent = chat.name; document.getElementById('contact-big-phone').textContent = chat.phone; document.getElementById('contact-big-bio').textContent = chat.recado; contactDrawer.classList.add('open'); }
function fecharPerfilContato() { contactDrawer.classList.remove('open'); }
const mediaModal = document.getElementById("media-modal"); const modalBody = document.getElementById("modal-body"); let currentZoom = 1;
function abrirModalMedia(src, type) { if(isSelectionMode) return; currentZoom = 1; if (type === 'video') { modalBody.innerHTML = `<video src="${src}" id="modal-media-content" controls autoplay></video>`; } else { modalBody.innerHTML = `<img src="${src}" id="modal-media-content">`; } mediaModal.style.display = "flex"; setTimeout(() => mediaModal.classList.add("show"), 10); }
function fecharModal() { mediaModal.classList.remove("show"); setTimeout(() => { mediaModal.style.display = "none"; modalBody.innerHTML = ''; }, 300); }
function zoomIn() { currentZoom += 0.2; const content = document.getElementById('modal-media-content'); if(content) content.style.transform = `scale(${currentZoom})`; }
function zoomOut() { currentZoom = Math.max(0.5, currentZoom - 0.2); const content = document.getElementById('modal-media-content'); if(content) content.style.transform = `scale(${currentZoom})`; }
mediaModal.addEventListener('click', (e) => { if (e.target === mediaModal || e.target === modalBody) fecharModal(); });

function showNotification(name, message) { try { playSound('received'); } catch(e) {} const container = document.getElementById('toast-container'); const toast = document.createElement('div'); toast.classList.add('toast'); toast.innerHTML = `<div class="toast-avatar" style="background-color: var(--secondary-color)">${name.charAt(0)}</div><div class="toast-content"><span class="toast-title">${name}</span><span class="toast-message">${message}</span></div>`; toast.onclick = () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }; container.appendChild(toast); setTimeout(() => toast.classList.add('show'), 10); setTimeout(() => { if(container.contains(toast)) toast.onclick(); }, 4000); }

document.getElementById('btn-simular-externa').addEventListener('click', () => { 
  chatsData["chat_joao"].isTyping = true; atualizarSidebar();
  if (activeChatId === "chat_joao") { document.getElementById('header-status').textContent = 'digitando...'; document.getElementById('header-status').style.display = 'block'; }
  setTimeout(() => {
    chatsData["chat_joao"].isTyping = false; chatsData["chat_joao"].archived = false; 
    chatsData["chat_joao"].messages.push({ id: Date.now(), text: "Essa simulação ficou muito real!", time: formatarHora(), type: 'received', isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }); salvarDados(); 
    if (activeChatId === "chat_joao") abrirConversa(activeChatId); else atualizarSidebar(); 
    showNotification("João Pedro", "Essa simulação ficou muito real!"); 
  }, 2000);
});

window.addEventListener('resize', () => { if(window.innerWidth > 768) { document.querySelector('.sidebar-wrapper').classList.remove('hide-mobile'); document.getElementById('btn-back-mobile').style.display = 'none'; } else { document.getElementById('btn-back-mobile').style.display = 'block'; } });
function voltarParaLista() { document.querySelector('.sidebar-wrapper').classList.remove('hide-mobile'); }

carregarDados(); atualizarMeuPerfilUI(); abrirConversa(activeChatId);