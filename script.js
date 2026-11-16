console.log("🚀 CLONE WHATSAPP: VERSÃO 25 (Mobile e Câmera Fixos)");

// Pede permissão para mostrar notificações fora da tela assim que abre o site
if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission();
}

const SVG_MIC = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.349 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2.002z"></path></svg>`;
const SVG_SEND = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>`;
const SVG_SINGLE_TICK = `<svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>`;
const SVG_DOUBLE_TICK = `<svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.318.318 0 0 0 .036.408l1.51 1.369c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path><path fill="currentColor" d="M9.663 3.116l-.478-.372a.365.365 0 0 0-.51.063L3.319 9.679a.32.32 0 0 1-.484.033L.645 7.569a.366.366 0 0 0-.515.006L.2 8.008a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>`;

let chatsData = {}; let myProfile = {}; let activeChatId = "chat_maria"; 

function carregarDados() {
  const dadosSalvos = localStorage.getItem('whatsapp_clone_data_v25'); 
  if (dadosSalvos) { const dataObj = JSON.parse(dadosSalvos); chatsData = dataObj.chats; myProfile = dataObj.profile; } 
  else {
    chatsData = {
      "chat_maria": { name: "Maria Silva", phone: "+55 11 98765-4321", recado: "Ocupada", avatar: "M", color: "#00a884", archived: false, messages: [{ id: Date.now()-1000, text: "Olá! Tudo bem?", time: "14:02", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }] },
      "chat_joao": { name: "João Pedro", phone: "+55 21 91234-5678", recado: "No trabalho.", avatar: "J", color: "#53bdeb", archived: false, messages: [{ id: Date.now(), text: "Testando o retorno no celular!", time: "09:30", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }] }
    };
    myProfile = { name: "Administrador", bio: "Disponível", avatar: null, theme: "dark" }; salvarDados();
  }
  mudarTema(myProfile.theme || 'dark');
}
function salvarDados() { localStorage.setItem('whatsapp_clone_data_v25', JSON.stringify({ chats: chatsData, profile: myProfile })); }
function abrirModalTema() { document.getElementById("theme-modal").style.display = "flex"; setTimeout(() => document.getElementById("theme-modal").classList.add("show"), 10); }
function fecharModalTema() { document.getElementById("theme-modal").classList.remove("show"); setTimeout(() => document.getElementById("theme-modal").style.display = "none", 300); }
function mudarTema(themeName) {
  document.body.className = `theme-${themeName}`;
  myProfile.theme = themeName;
  const metaTheme = document.getElementById('meta-theme-color');
  if (metaTheme) {
    const themeColors = { dark: '#202c33', light: '#f0f2f5', dracula: '#282a36', hacker: '#000000' };
    metaTheme.setAttribute('content', themeColors[themeName] || '#202c33');
  }
  salvarDados();
}

const AudioContext = window.AudioContext || window.webkitAudioContext; let audioCtx;
function playSound(type) { try { if (!audioCtx) audioCtx = new AudioContext(); if (audioCtx.state === 'suspended') audioCtx.resume(); const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain(); if (type === 'sent') { osc.type = 'sine'; osc.frequency.setValueAtTime(600, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1); gain.gain.setValueAtTime(0.5, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1); osc.start(); osc.stop(audioCtx.currentTime + 0.1); } else { osc.type = 'sine'; osc.frequency.setValueAtTime(800, audioCtx.currentTime); gain.gain.setValueAtTime(1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5); osc.start(); osc.stop(audioCtx.currentTime + 0.5); } osc.connect(gain); gain.connect(audioCtx.destination); } catch(e){} }

function atualizarMeuPerfilUI() { document.getElementById('my-name-display').textContent = myProfile.name; document.getElementById('my-bio-display').textContent = myProfile.bio; const avatarHTML = myProfile.avatar ? `<img src="${myProfile.avatar}" style="width:100%; height:100%; object-fit:cover;">` : `Eu`; document.getElementById('sidebar-my-avatar').innerHTML = avatarHTML; document.getElementById('my-profile-avatar').innerHTML = avatarHTML; }
function iniciarEdicao(field) { document.getElementById(`my-${field}-display`).style.display = 'none'; document.getElementById(`btn-edit-${field}`).style.display = 'none'; const input = document.getElementById(`my-${field}-input`); const btnSave = document.getElementById(`btn-save-${field}`); input.style.display = 'block'; btnSave.style.display = 'block'; input.value = myProfile[field]; input.focus(); }
function salvarEdicao(field) { const input = document.getElementById(`my-${field}-input`); myProfile[field] = input.value.trim() || (field === 'name' ? 'Sem Nome' : 'Disponível'); salvarDados(); atualizarMeuPerfilUI(); input.style.display = 'none'; document.getElementById(`btn-save-${field}`).style.display = 'none'; document.getElementById(`my-${field}-display`).style.display = 'block'; document.getElementById(`btn-edit-${field}`).style.display = 'block'; }
document.getElementById('my-name-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') salvarEdicao('name'); }); document.getElementById('my-bio-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') salvarEdicao('bio'); });
document.getElementById('my-avatar-input').addEventListener('change', function(e) { const file = e.target.files[0]; if(!file) return; if (file.size > 2.5 * 1024 * 1024) { alert("Máximo 2.5MB."); return; } const reader = new FileReader(); reader.onload = function(evt) { myProfile.avatar = evt.target.result; salvarDados(); atualizarMeuPerfilUI(); abrirConversa(activeChatId); }; reader.readAsDataURL(file); this.value = ''; });
function visualizarMinhaFoto(e) { e.stopPropagation(); if (myProfile.avatar) abrirModalMedia(myProfile.avatar, 'image'); else alert('Você ainda não adicionou uma foto.'); }

function gerarHTMLItemChat(chatId, chat, isListaArquivada) {
  const msgsVisiveis = chat.messages.filter(m => !m.deleted); let ultimaMensagem = "Nenhuma mensagem..."; let lastTick = "";
  if (chat.isTyping) { ultimaMensagem = `<span style="color: var(--primary-color); font-weight: 500;">digitando...</span>`; } 
  else if (msgsVisiveis.length > 0) { const lastMsg = msgsVisiveis[msgsVisiveis.length - 1]; if (lastMsg.type === 'sent') { lastTick = lastMsg.status === 'read' ? `<span style="color:var(--secondary-color)">${SVG_DOUBLE_TICK}</span> ` : `<span style="color:var(--text-secondary)">${SVG_DOUBLE_TICK}</span> `; } if (lastMsg.isImage) ultimaMensagem = "📷 Imagem"; else if (lastMsg.isVideo) ultimaMensagem = "🎥 Vídeo"; else if (lastMsg.isAudio) ultimaMensagem = "🎤 Áudio"; else ultimaMensagem = lastMsg.text; }
  const divItem = document.createElement('div'); divItem.classList.add('chat-item'); if (chatId === activeChatId) divItem.classList.add('active');
  const menuHTML = `<button class="sidebar-item-btn" onclick="event.stopPropagation(); toggleMenu(event, 'sidebar-menu-${chatId}')">▼</button><div id="sidebar-menu-${chatId}" class="msg-dropdown" style="right: 25px; top: 35px;"><div class="msg-dropdown-item" onclick="event.stopPropagation(); alternarArquivamento('${chatId}')">${isListaArquivada ? 'Desarquivar conversa' : 'Arquivar conversa'}</div></div>`;
  let fotoContato = chat.avatar; if(chat.avatar.length > 5) { fotoContato = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`; }
  divItem.innerHTML = `<div class="avatar" style="background-color: ${chat.color}">${fotoContato}</div><div class="chat-item-info"><span class="chat-item-name">${chat.name}</span><span class="chat-item-last-msg">${lastTick}${ultimaMensagem}</span></div>${menuHTML}`; 
  divItem.onclick = () => { sairModoSelecao(); abrirConversa(chatId); if(window.innerWidth <= 768) { document.querySelector('.sidebar-wrapper').classList.add('hide-mobile'); history.pushState({ view: 'chat', chatId }, ''); } }; 
  return divItem;
}
function atualizarSidebar() { const sidebarList = document.getElementById('sidebar-list'); const archivedList = document.getElementById('archived-list'); const btnShowArchived = document.getElementById('btn-show-archived'); const archivedCountText = document.getElementById('archived-count'); sidebarList.innerHTML = ''; archivedList.innerHTML = ''; let countArchived = 0; for (const chatId in chatsData) { const chat = chatsData[chatId]; if (chat.archived) { countArchived++; archivedList.appendChild(gerarHTMLItemChat(chatId, chat, true)); } else { sidebarList.appendChild(gerarHTMLItemChat(chatId, chat, false)); } } if (countArchived > 0) { btnShowArchived.style.display = 'flex'; archivedCountText.textContent = countArchived; } else { btnShowArchived.style.display = 'none'; } }
function alternarArquivamento(chatId) { fecharMenus(); chatsData[chatId].archived = !chatsData[chatId].archived; salvarDados(); atualizarSidebar(); }

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
if(btnScrollBottom) chatWindow.onscroll = verificarBotaoDescer;
function verificarBotaoDescer() { if (btnScrollBottom && chatWindow.scrollHeight - chatWindow.scrollTop > chatWindow.clientHeight + 150) { btnScrollBottom.style.display = 'flex'; } else if (btnScrollBottom) { btnScrollBottom.style.display = 'none'; } }
function scrollToBottom() { chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' }); }

function playCustomAudio(btn) {
  if (isSelectionMode) return;
  const player = btn.closest('.custom-audio-player'); const audio = player.querySelector('.hidden-audio'); const pb = player.querySelector('.audio-progress-bar'); const slider = player.querySelector('.audio-seek-slider'); const timerDisplay = player.querySelector('.audio-timer-display');
  
  let duration = parseFloat(timerDisplay.dataset.duration) || 0;
  if (duration <= 0.1) duration = (isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 1;

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
           
           if (audio.ended || audio.currentTime >= duration - 0.05 || percent >= 100) {
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
  let duration = parseFloat(timerDisplay.dataset.duration) || 0;
  if (duration <= 0.1 && isFinite(audio.duration)) duration = audio.duration;
  if (duration > 0) { const newTime = (slider.value / 100) * duration; audio.currentTime = newTime; pb.style.width = slider.value + '%'; timerDisplay.textContent = formatarSegundosParaTempo(newTime); } 
}

let isSelectionMode = false; let selectedMsgIds = new Set(); let backupMensagensApagadas = []; let undoTimeout = null;
const chatHeaderNormal = document.getElementById('chat-header'); const selectionHeader = document.getElementById('selection-header'); const selectionCountText = document.getElementById('selection-count'); const snackbar = document.getElementById('undo-snackbar');
function entrarModoSelecao(idInicial) { fecharMenus(); isSelectionMode = true; selectedMsgIds.clear(); if(chatHeaderNormal) chatHeaderNormal.style.display = 'none'; if(selectionHeader) selectionHeader.classList.add('show'); chatWindow.classList.add('selection-mode-active'); const elemento = document.getElementById(`msg-${idInicial}`); if(elemento) toggleMensagemSelecionada(idInicial, elemento); }
function sairModoSelecao() { isSelectionMode = false; selectedMsgIds.clear(); if(chatHeaderNormal) chatHeaderNormal.style.display = 'flex'; if(selectionHeader) selectionHeader.classList.remove('show'); chatWindow.classList.remove('selection-mode-active'); document.querySelectorAll('.message.selected').forEach(el => el.classList.remove('selected')); }
function toggleMensagemSelecionada(id, elementoDOM) { if (selectedMsgIds.has(id)) { selectedMsgIds.delete(id); elementoDOM.classList.remove('selected'); } else { selectedMsgIds.add(id); elementoDOM.classList.add('selected'); } if (selectedMsgIds.size === 0) { sairModoSelecao(); } else if(selectionCountText) { selectionCountText.textContent = `${selectedMsgIds.size} selecionada(s)`; } }
function solicitarApagarUm(id) { fecharMenus(); processarExclusao([id]); } function apagarMensagensSelecionadas() { processarExclusao(Array.from(selectedMsgIds)); sairModoSelecao(); }
function processarExclusao(arrayIds) { backupMensagensApagadas = []; arrayIds.forEach(id => { const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === id); if(msgIndex !== -1) { chatsData[activeChatId].messages[msgIndex].deleted = true; backupMensagensApagadas.push({ id: id, chatId: activeChatId }); } }); salvarDados(); abrirConversa(activeChatId); if(snackbar) snackbar.classList.add('show'); if(undoTimeout) clearTimeout(undoTimeout); undoTimeout = setTimeout(() => { if(snackbar) snackbar.classList.remove('show'); backupMensagensApagadas.forEach(backup => { chatsData[backup.chatId].messages = chatsData[backup.chatId].messages.filter(m => !m.deleted); }); salvarDados(); backupMensagensApagadas = []; }, 5000); }
const btnUndo = document.getElementById('btn-undo');
if(btnUndo) btnUndo.addEventListener('click', () => { if (backupMensagensApagadas.length > 0) { backupMensagensApagadas.forEach(backup => { const msgIndex = chatsData[backup.chatId].messages.findIndex(m => m.id === backup.id); if(msgIndex !== -1) chatsData[backup.chatId].messages[msgIndex].deleted = false; }); salvarDados(); abrirConversa(activeChatId); if(snackbar) snackbar.classList.remove('show'); clearTimeout(undoTimeout); backupMensagensApagadas = []; } });
function toggleMenu(e, id) { e.stopPropagation(); fecharMenus(); const m = document.getElementById(id); if(m) m.classList.add('show'); } function fecharMenus() { document.querySelectorAll('.msg-dropdown').forEach(m => m.classList.remove('show')); }

const messageInput = document.getElementById('message-input'); 
const btnActionMain = document.getElementById('btn-action-main'); 
const btnAttachMenu = document.getElementById('btn-attach-menu'); 
const attachMenu = document.getElementById('attach-menu'); 
const fileInput = document.getElementById('file-input');
const emojiPicker = document.getElementById('emoji-picker'); 
const btnEmoji = document.getElementById('btn-emoji'); 

if (btnAttachMenu && attachMenu) { btnAttachMenu.onclick = (e) => { e.stopPropagation(); attachMenu.classList.toggle('show'); if(emojiPicker) emojiPicker.classList.remove('show'); }; }
if (emojiPicker && btnEmoji && messageInput) {
  const listaEmojis = ['😀','😂','🥰','😎','🤔','👍','🙏','🔥','🎉','❤️','👀','✨','🤣','🙌','💡','✅','❌','💯'];
  listaEmojis.forEach(e => { const span = document.createElement('span'); span.className = 'emoji-item'; span.textContent = e; span.onclick = () => { messageInput.value += e; messageInput.focus(); messageInput.dispatchEvent(new Event('input')); }; emojiPicker.appendChild(span); });
  btnEmoji.onclick = (e) => { e.stopPropagation(); emojiPicker.classList.toggle('show'); if(attachMenu) attachMenu.classList.remove('show'); }; 
}
document.addEventListener('click', (e) => { 
  if (emojiPicker && btnEmoji && !emojiPicker.contains(e.target) && !btnEmoji.contains(e.target)) emojiPicker.classList.remove('show'); 
  if (attachMenu && btnAttachMenu && !attachMenu.contains(e.target) && !btnAttachMenu.contains(e.target)) attachMenu.classList.remove('show'); 
});

function formatarHora() { const a = new Date(); return a.getHours().toString().padStart(2, '0') + ':' + a.getMinutes().toString().padStart(2, '0'); }

if (messageInput && btnActionMain) {
  messageInput.addEventListener('input', () => { if (messageInput.value.trim() !== '') { btnActionMain.innerHTML = SVG_SEND; btnActionMain.onclick = sendMessage; } else { btnActionMain.innerHTML = SVG_MIC; btnActionMain.onclick = iniciarGravacao; } });
  messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

function processarEnvioMensagem(objMensagem) { chatsData[activeChatId].messages.push(objMensagem); salvarDados(); abrirConversa(activeChatId); playSound('sent'); setTimeout(() => { const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === objMensagem.id); if (msgIndex !== -1) { chatsData[activeChatId].messages[msgIndex].status = 'delivered'; salvarDados(); if(activeChatId === activeChatId) abrirConversa(activeChatId); } }, 1000); setTimeout(() => { const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === objMensagem.id); if (msgIndex !== -1) { chatsData[activeChatId].messages[msgIndex].status = 'read'; salvarDados(); if(activeChatId === activeChatId) abrirConversa(activeChatId); } }, 2500); }
function sendMessage() { const text = messageInput.value.trim(); if (text === '') return; processarEnvioMensagem({ id: Date.now(), text: text, time: formatarHora(), type: 'sent', isImage: false, isVideo: false, isAudio: false, deleted: false, status: 'sent', audioDuration: 0 }); messageInput.value = ''; btnActionMain.innerHTML = SVG_MIC; btnActionMain.onclick = iniciarGravacao; if(emojiPicker) emojiPicker.classList.remove('show'); if(attachMenu) attachMenu.classList.remove('show');}

if (fileInput) { fileInput.addEventListener('change', function(e) { const file = e.target.files[0]; if (!file) return; if (file.size > 2.5 * 1024 * 1024) { alert("Limite de 2.5 MB."); fileInput.value = ''; return; } const isVideoFile = file.type.startsWith('video/'); const reader = new FileReader(); reader.onload = function(evt) { processarEnvioMensagem({ id: Date.now(), text: evt.target.result, time: formatarHora(), type: 'sent', isImage: !isVideoFile, isVideo: isVideoFile, isAudio: false, deleted: false, status: 'sent', audioDuration: 0 }); }; reader.readAsDataURL(file); fileInput.value = ''; if(attachMenu) attachMenu.classList.remove('show');}); }

const cameraModal = document.getElementById('camera-modal'); const cameraStream = document.getElementById('camera-stream'); const cameraCanvas = document.getElementById('camera-canvas'); const cameraPreview = document.getElementById('camera-preview'); const btnTakePhoto = document.getElementById('btn-take-photo'); const btnRetakePhoto = document.getElementById('btn-retake-photo'); const btnSendPhoto = document.getElementById('btn-send-photo'); let streamAtual = null;

const btnOpenCamera = document.getElementById('btn-open-camera');
if(btnOpenCamera) {
  btnOpenCamera.onclick = async () => { 
    if(attachMenu) attachMenu.classList.remove('show'); 
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert("Abra usando a extensão Live Server para permitir a câmera."); return; } 
    try { const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); streamAtual = stream; cameraStream.srcObject = stream; cameraModal.style.display = 'flex'; setTimeout(() => cameraModal.classList.add('show'), 10); cameraStream.style.display = 'block'; btnTakePhoto.style.display = 'block'; cameraPreview.style.display = 'none'; btnRetakePhoto.style.display = 'none'; btnSendPhoto.style.display = 'none'; } catch (err) { alert("Acesso à câmera negado."); } 
  };
}

const btnCloseCamera = document.getElementById('btn-close-camera');
if (btnCloseCamera) { btnCloseCamera.onclick = () => { cameraModal.classList.remove('show'); setTimeout(() => { cameraModal.style.display = 'none'; if (streamAtual) { streamAtual.getTracks().forEach(track => track.stop()); streamAtual = null; } }, 300); } }
if (btnTakePhoto) { btnTakePhoto.onclick = () => { cameraCanvas.width = cameraStream.videoWidth; cameraCanvas.height = cameraStream.videoHeight; cameraCanvas.getContext('2d').drawImage(cameraStream, 0, 0); cameraPreview.src = cameraCanvas.toDataURL('image/jpeg'); cameraStream.style.display = 'none'; btnTakePhoto.style.display = 'none'; cameraPreview.style.display = 'block'; btnRetakePhoto.style.display = 'block'; btnSendPhoto.style.display = 'flex'; }; }
if(btnRetakePhoto) { btnRetakePhoto.onclick = () => { cameraStream.style.display = 'block'; btnTakePhoto.style.display = 'block'; cameraPreview.style.display = 'none'; btnRetakePhoto.style.display = 'none'; btnSendPhoto.style.display = 'none'; }; }
if(btnSendPhoto) { btnSendPhoto.onclick = () => { processarEnvioMensagem({ id: Date.now(), text: cameraPreview.src, time: formatarHora(), type: 'sent', isImage: true, isVideo: false, isAudio: false, deleted: false, status: 'sent', audioDuration: 0 }); btnCloseCamera.onclick(); }; }

// GRAVAÇÃO ÁUDIO
const recordingControls = document.getElementById('recording-controls'); 
const recordingTime = document.getElementById('recording-time'); 
const btnCancelMic = document.getElementById('btn-cancel-mic');

let mediaRecorder = null; let audioChunks = []; let recTimer = null; let recSeconds = 0; let gravarParaEnviar = true; let isRequestingMic = false; let recStartTime = 0;

async function iniciarGravacao() {
  if(messageInput.value.trim() !== '' || isRequestingMic) return; 
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { alert("Abra usando o Live Server para permitir o microfone."); return; }

  isRequestingMic = true; gravarParaEnviar = true; 
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); 
    isRequestingMic = false;
    
    if (!gravarParaEnviar) { stream.getTracks().forEach(t => t.stop()); resetMicUI(); return; }
    if (recTimer) clearInterval(recTimer);
    
    mediaRecorder = new MediaRecorder(stream); audioChunks = []; recSeconds = 0; 
    recStartTime = Date.now(); 
    
    messageInput.style.display = 'none'; 
    if(btnAttachMenu) btnAttachMenu.style.display = 'none'; 
    if(btnEmoji) btnEmoji.style.display = 'none'; 
    document.querySelector('.footer-right').classList.add('recording-mode');
    btnActionMain.classList.add('recording-active'); btnActionMain.innerHTML = SVG_SEND;
    if(recordingControls) recordingControls.classList.add('show'); 
    if(recordingTime) recordingTime.textContent = '00:00';
    
    recTimer = setInterval(() => { recSeconds++; if(recordingTime) recordingTime.textContent = formatarSegundosParaTempo(recSeconds); }, 1000);
    
    mediaRecorder.ondataavailable = e => { if(e.data.size > 0) audioChunks.push(e.data); };
    
    mediaRecorder.onstop = () => {
      clearInterval(recTimer); recTimer = null; 
      const finalDuration = (Date.now() - recStartTime) / 1000; 
      resetMicUI();
      
      if (gravarParaEnviar && audioChunks.length > 0) { 
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); 
        const reader = new FileReader();
        reader.onload = function(event) { 
          processarEnvioMensagem({ id: Date.now(), text: event.target.result, time: formatarHora(), type: 'sent', isImage: false, isVideo: false, isAudio: true, deleted: false, status: 'sent', audioDuration: finalDuration }); 
        }; 
        reader.readAsDataURL(audioBlob);
      } 
      stream.getTracks().forEach(t => t.stop()); 
    }; 
    
    mediaRecorder.start(); 
    btnActionMain.onclick = function() { if (mediaRecorder && mediaRecorder.state === 'recording') { gravarParaEnviar = true; mediaRecorder.stop(); } };
  } catch (err) { 
    isRequestingMic = false; resetMicUI(); alert("Permita o uso do microfone no navegador."); 
  }
}

if (btnCancelMic) {
  btnCancelMic.addEventListener('click', () => { 
    gravarParaEnviar = false; 
    if (mediaRecorder && mediaRecorder.state === 'recording') { audioChunks = []; mediaRecorder.stop(); } else { resetMicUI(); }
  });
}

function resetMicUI() { 
  if(messageInput) messageInput.style.display = 'block'; 
  if(btnAttachMenu) btnAttachMenu.style.display = 'flex'; 
  if(btnEmoji) btnEmoji.style.display = 'flex'; 
  const footerRight = document.querySelector('.footer-right');
  if(footerRight) footerRight.classList.remove('recording-mode'); 
  if(btnActionMain) { btnActionMain.classList.remove('recording-active'); btnActionMain.innerHTML = SVG_MIC; btnActionMain.onclick = iniciarGravacao; }
  if(recordingControls) recordingControls.classList.remove('show'); 
}

const myProfileDrawer = document.getElementById('my-profile-drawer'); const contactDrawer = document.getElementById('contact-profile-drawer'); const archivedDrawer = document.getElementById('archived-drawer');
function abrirMeuPerfil() { if(myProfileDrawer) myProfileDrawer.classList.add('open'); } function fecharMeuPerfil() { if(myProfileDrawer) myProfileDrawer.classList.remove('open'); } function abrirArquivadas() { if(archivedDrawer) archivedDrawer.classList.add('open'); } function fecharArquivadas() { if(archivedDrawer) archivedDrawer.classList.remove('open'); }
function abrirPerfilContato() { const chat = chatsData[activeChatId]; const avatarEl = document.getElementById('contact-big-avatar'); if(chat.avatar.length > 5) { avatarEl.innerHTML = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`; avatarEl.style.backgroundColor = 'transparent'; avatarEl.style.cursor = 'pointer'; avatarEl.onclick = () => abrirModalMedia(chat.avatar, 'image'); } else { avatarEl.innerHTML = chat.avatar; avatarEl.style.backgroundColor = chat.color; avatarEl.style.cursor = 'default'; avatarEl.onclick = null; } document.getElementById('contact-big-name').textContent = chat.name; document.getElementById('contact-big-phone').textContent = chat.phone; document.getElementById('contact-big-bio').textContent = chat.recado; if(contactDrawer) contactDrawer.classList.add('open'); }
function fecharPerfilContato() { if(contactDrawer) contactDrawer.classList.remove('open'); }
const mediaModal = document.getElementById("media-modal"); const modalBody = document.getElementById("modal-body"); let currentZoom = 1;
function abrirModalMedia(src, type) { if(isSelectionMode) return; currentZoom = 1; if (type === 'video') { modalBody.innerHTML = `<video src="${src}" id="modal-media-content" controls autoplay></video>`; } else { modalBody.innerHTML = `<img src="${src}" id="modal-media-content">`; } if(mediaModal) { mediaModal.style.display = "flex"; setTimeout(() => mediaModal.classList.add("show"), 10); } }
function fecharModal() { if(mediaModal) { mediaModal.classList.remove("show"); setTimeout(() => { mediaModal.style.display = "none"; modalBody.innerHTML = ''; }, 300); } }
function zoomIn() { currentZoom += 0.2; const content = document.getElementById('modal-media-content'); if(content) content.style.transform = `scale(${currentZoom})`; }
function zoomOut() { currentZoom = Math.max(0.5, currentZoom - 0.2); const content = document.getElementById('modal-media-content'); if(content) content.style.transform = `scale(${currentZoom})`; }
if(mediaModal) mediaModal.addEventListener('click', (e) => { if (e.target === mediaModal || e.target === modalBody) fecharModal(); });

function showNotification(name, message, chatIdParam = null) { 
  try { playSound('received'); } catch(e) {} 
  const container = document.getElementById('toast-container'); 
  const toast = document.createElement('div'); toast.classList.add('toast'); 
  toast.innerHTML = `<div class="toast-avatar" style="background-color: var(--secondary-color)">${name.charAt(0)}</div><div class="toast-content"><span class="toast-title">${name}</span><span class="toast-message">${message}</span></div>`; 
  toast.onclick = () => { 
    toast.classList.remove('show'); 
    setTimeout(() => toast.remove(), 300); 
    if (chatIdParam) { sairModoSelecao(); abrirConversa(chatIdParam); if(window.innerWidth <= 768) { document.querySelector('.sidebar-wrapper').classList.add('hide-mobile'); } }
  }; 
  if(container) container.appendChild(toast); setTimeout(() => toast.classList.add('show'), 10); setTimeout(() => { if(container && container.contains(toast)) toast.onclick(); }, 4000); 

  if ("Notification" in window && Notification.permission === "granted" && document.hidden) {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(name, {
          body: message,
          icon: './icon-192.png',
          badge: './icon-192.png',
          data: { chatId: chatIdParam }
        });
      }).catch(() => {});
    } else {
      const sysNotif = new Notification(name, { body: message, icon: './icon-192.png' });
      sysNotif.onclick = () => {
        window.focus();
        if (chatIdParam) { sairModoSelecao(); abrirConversa(chatIdParam); if(window.innerWidth <= 768) { document.querySelector('.sidebar-wrapper').classList.add('hide-mobile'); } }
        sysNotif.close();
      };
    }
  }
}

const btnSimular = document.getElementById('btn-simular-externa');
if (btnSimular) {
  btnSimular.addEventListener('click', () => { 
    chatsData["chat_joao"].isTyping = true; atualizarSidebar();
    const headerStatus = document.getElementById('header-status');
    if (activeChatId === "chat_joao" && headerStatus) { headerStatus.textContent = 'digitando...'; headerStatus.style.display = 'block'; }
    setTimeout(() => {
      chatsData["chat_joao"].isTyping = false; chatsData["chat_joao"].archived = false; 
      chatsData["chat_joao"].messages.push({ id: Date.now(), text: "Essa simulação ficou muito real!", time: formatarHora(), type: 'received', isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }); salvarDados(); 
      if (activeChatId === "chat_joao") abrirConversa(activeChatId); else atualizarSidebar(); 
      showNotification("João Pedro", "Essa simulação ficou muito real!", "chat_joao"); 
    }, 2000);
  });
}

// LÓGICA DO BOTÃO DE VOLTAR NO MOBILE E HISTÓRICO DO CELULAR
function voltarParaLista(e) { 
  if(e) e.stopPropagation();
  document.querySelector('.sidebar-wrapper').classList.remove('hide-mobile'); 
}

window.addEventListener('popstate', () => {
  if (mediaModal && mediaModal.classList.contains('show')) { fecharModal(); return; }
  if (cameraModal && cameraModal.classList.contains('show') && btnCloseCamera) { btnCloseCamera.onclick(); return; }
  if (contactDrawer && contactDrawer.classList.contains('open')) { fecharPerfilContato(); return; }
  if (myProfileDrawer && myProfileDrawer.classList.contains('open')) { fecharMeuPerfil(); return; }
  if (archivedDrawer && archivedDrawer.classList.contains('open')) { fecharArquivadas(); return; }
  if (isSelectionMode) { sairModoSelecao(); return; }
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  if (window.innerWidth <= 768 && sidebarWrapper && sidebarWrapper.classList.contains('hide-mobile')) {
    sidebarWrapper.classList.remove('hide-mobile');
  }
});

window.addEventListener('resize', () => { 
  const btnBack = document.getElementById('btn-back-mobile');
  if(window.innerWidth > 768) { 
    document.querySelector('.sidebar-wrapper').classList.remove('hide-mobile'); 
    if(btnBack) btnBack.style.display = 'none'; 
  } else { 
    if(btnBack) btnBack.style.display = 'block'; 
  } 
});

// REGISTRO DO SERVICE WORKER E INSTALAÇÃO PWA
let deferredInstallPrompt = null;
const btnInstallPwa = document.getElementById('btn-install-pwa');
const installModal = document.getElementById('install-modal');
const btnConfirmInstall = document.getElementById('btn-confirm-install');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.warn('SW registro:', err));
  });
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'OPEN_CHAT' && event.data.chatId) {
      sairModoSelecao();
      abrirConversa(event.data.chatId);
      if (window.innerWidth <= 768) {
        document.querySelector('.sidebar-wrapper').classList.add('hide-mobile');
      }
    }
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (btnInstallPwa) btnInstallPwa.style.display = 'flex';
  if (btnConfirmInstall) btnConfirmInstall.style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  if (btnInstallPwa) btnInstallPwa.style.display = 'none';
  fecharModalInstalar();
});

async function clicarInstalarApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredInstallPrompt = null;
      if (btnInstallPwa) btnInstallPwa.style.display = 'none';
    }
  } else if (installModal) {
    installModal.style.display = 'flex';
    setTimeout(() => installModal.classList.add('show'), 10);
  }
}

async function confirmarInstalacaoNativa() {
  fecharModalInstalar();
  if (deferredInstallPrompt) {
    await clicarInstalarApp();
  }
}

function fecharModalInstalar() {
  if (installModal) {
    installModal.classList.remove('show');
    setTimeout(() => { installModal.style.display = 'none'; }, 300);
  }
}

if (btnActionMain) btnActionMain.onclick = iniciarGravacao;

carregarDados(); atualizarMeuPerfilUI(); abrirConversa(activeChatId);