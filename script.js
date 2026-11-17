console.log("🚀 CLONEZAP: VERSÃO COMPLETA (PWA + Recursos Avançados)");

if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
  Notification.requestPermission();
}

const SVG_MIC = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.349 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2.002z"></path></svg>`;
const SVG_SEND = `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>`;
const SVG_SINGLE_TICK = `<svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>`;
const SVG_DOUBLE_TICK = `<svg viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.318.318 0 0 0 .036.408l1.51 1.369c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path><path fill="currentColor" d="M9.663 3.116l-.478-.372a.365.365 0 0 0-.51.063L3.319 9.679a.32.32 0 0 1-.484.033L.645 7.569a.366.366 0 0 0-.515.006L.2 8.008a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>`;

let chatsData = {};
let myProfile = {};
let activeChatId = "chat_maria";
let currentSidebarFilter = "all";
let replyingToMsg = null;
let editingMsgId = null;
let forwardingMsgId = null;
let statusList = [];

function carregarDados() {
  const dadosSalvos = localStorage.getItem('whatsapp_clone_data_v25');
  if (dadosSalvos) {
    const dataObj = JSON.parse(dadosSalvos);
    chatsData = dataObj.chats || {};
    myProfile = dataObj.profile || { name: "Administrador", bio: "Disponível", avatar: null, theme: "dark", autoReply: true };
    statusList = dataObj.stories || obterStatusPadrao();
  } else {
    chatsData = {
      "chat_maria": {
        name: "Maria Silva",
        phone: "+55 11 98765-4321",
        recado: "Focada nos projetos 🚀",
        avatar: "M",
        color: "#00a884",
        archived: false,
        pinned: true,
        unread: 0,
        online: true,
        messages: [
          { id: Date.now() - 60000, text: "Olá! Tudo bem? Viu as novas funções do nosso app?", time: "14:02", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0, starred: true }
        ]
      },
      "chat_joao": {
        name: "João Pedro",
        phone: "+55 21 91234-5678",
        recado: "No trabalho 💻",
        avatar: "J",
        color: "#53bdeb",
        archived: false,
        pinned: false,
        unread: 1,
        online: true,
        messages: [
          { id: Date.now() - 30000, text: "Testando o retorno no celular! Ficou top demais 🔥", time: "09:30", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }
        ]
      },
      "chat_grupo": {
        name: "Devs Brasil 💻🇧🇷",
        phone: "+55 11 90000-1111",
        recado: "Grupo oficial de tecnologia e programação",
        avatar: "D",
        color: "#7f66ff",
        archived: false,
        pinned: false,
        unread: 0,
        online: true,
        messages: [
          { id: Date.now() - 15000, text: "Bem-vindos ao grupo! Experimentem reagir ou responder às mensagens dando dois cliques.", time: "11:15", type: "received", isImage: false, isVideo: false, isAudio: false, deleted: false, audioDuration: 0 }
        ]
      }
    };
    myProfile = { name: "Administrador", bio: "Disponível", avatar: null, theme: "dark", autoReply: true };
    statusList = obterStatusPadrao();
    salvarDados();
  }

  if (myProfile.autoReply === undefined) myProfile.autoReply = true;
  const toggleAuto = document.getElementById('toggle-auto-reply');
  if (toggleAuto) toggleAuto.checked = !!myProfile.autoReply;

  if (!statusList || statusList.length === 0) statusList = obterStatusPadrao();
  mudarTema(myProfile.theme || 'dark');
}

function obterStatusPadrao() {
  return [
    { user: "Maria Silva", avatar: "M", color: "#00a884", time: "Hoje às 14:20", bg: "linear-gradient(135deg, #00a884, #005c4b)", text: "Transformando nosso projeto em um PWA completo! 🚀✨" },
    { user: "João Pedro", avatar: "J", color: "#53bdeb", time: "Hoje às 11:05", bg: "linear-gradient(135deg, #5157AE, #1d2247)", text: "Alguém aí para testar as chamadas de voz e reações? 🔥🎧" }
  ];
}

function salvarDados() {
  localStorage.setItem('whatsapp_clone_data_v25', JSON.stringify({
    chats: chatsData,
    profile: myProfile,
    stories: statusList
  }));
}

function alternarAutoReply(val) {
  myProfile.autoReply = val;
  salvarDados();
}

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

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playSound(type) {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    if (type === 'sent') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'ring') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.setValueAtTime(480, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    }
    osc.connect(gain);
    gain.connect(audioCtx.destination);
  } catch (e) {}
}

function atualizarMeuPerfilUI() {
  document.getElementById('my-name-display').textContent = myProfile.name;
  document.getElementById('my-bio-display').textContent = myProfile.bio;
  const avatarHTML = myProfile.avatar ? `<img src="${myProfile.avatar}" style="width:100%; height:100%; object-fit:cover;">` : `Eu`;
  document.getElementById('sidebar-my-avatar').innerHTML = avatarHTML;
  document.getElementById('my-profile-avatar').innerHTML = avatarHTML;
}

function iniciarEdicao(field) {
  document.getElementById(`my-${field}-display`).style.display = 'none';
  document.getElementById(`btn-edit-${field}`).style.display = 'none';
  const input = document.getElementById(`my-${field}-input`);
  const btnSave = document.getElementById(`btn-save-${field}`);
  input.style.display = 'block';
  btnSave.style.display = 'block';
  input.value = myProfile[field];
  input.focus();
}

function salvarEdicao(field) {
  const input = document.getElementById(`my-${field}-input`);
  myProfile[field] = input.value.trim() || (field === 'name' ? 'Sem Nome' : 'Disponível');
  salvarDados();
  atualizarMeuPerfilUI();
  input.style.display = 'none';
  document.getElementById(`btn-save-${field}`).style.display = 'none';
  document.getElementById(`my-${field}-display`).style.display = 'block';
  document.getElementById(`btn-edit-${field}`).style.display = 'block';
}

document.getElementById('my-name-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') salvarEdicao('name'); });
document.getElementById('my-bio-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') salvarEdicao('bio'); });
document.getElementById('my-avatar-input').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2.5 * 1024 * 1024) { alert("Máximo 2.5MB."); return; }
  const reader = new FileReader();
  reader.onload = function (evt) {
    myProfile.avatar = evt.target.result;
    salvarDados();
    atualizarMeuPerfilUI();
    abrirConversa(activeChatId);
  };
  reader.readAsDataURL(file);
  this.value = '';
});

function visualizarMinhaFoto(e) {
  e.stopPropagation();
  if (myProfile.avatar) abrirModalMedia(myProfile.avatar, 'image');
  else alert('Você ainda não adicionou uma foto.');
}

/* FILTROS E BUSCA NA SIDEBAR */
function mudarFiltroSidebar(filtro, btnEl) {
  currentSidebarFilter = filtro;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  atualizarSidebar();
}

function limparBuscaSidebar() {
  const input = document.getElementById('sidebar-search-input');
  if (input) input.value = '';
  atualizarSidebar();
}

function resumoMensagemTexto(msg) {
  if (!msg) return "Nenhuma mensagem...";
  if (msg.isImage) return "📷 Imagem";
  if (msg.isVideo) return "🎥 Vídeo";
  if (msg.isAudio) return "🎤 Mensagem de voz";
  if (msg.isDoc) return `📄 ${msg.fileName || 'Documento'}`;
  if (msg.isLocation) return "📍 Localização atual";
  return msg.text;
}

function gerarHTMLItemChat(chatId, chat, isListaArquivada) {
  const msgsVisiveis = chat.messages.filter(m => !m.deleted);
  let ultimaMensagem = "Nenhuma mensagem...";
  let ultimoHorario = "";
  let lastTick = "";

  if (chat.isTyping) {
    ultimaMensagem = `<span style="color: var(--primary-color); font-weight: 500;">digitando...</span>`;
  } else if (msgsVisiveis.length > 0) {
    const lastMsg = msgsVisiveis[msgsVisiveis.length - 1];
    ultimoHorario = lastMsg.time || "";
    if (lastMsg.type === 'sent') {
      lastTick = lastMsg.status === 'read'
        ? `<span style="color:var(--secondary-color)">${SVG_DOUBLE_TICK}</span> `
        : `<span style="color:var(--text-secondary)">${SVG_DOUBLE_TICK}</span> `;
    }
    ultimaMensagem = resumoMensagemTexto(lastMsg);
  }

  const divItem = document.createElement('div');
  divItem.classList.add('chat-item');
  if (chatId === activeChatId) divItem.classList.add('active');

  const unreadCount = chat.unread || 0;
  const isPinned = !!chat.pinned;
  const badgesHTML = `
    <div class="chat-item-badges">
      ${isPinned ? `<span class="pin-badge" title="Fixada">📌</span>` : ''}
      ${unreadCount > 0 ? `<span class="unread-badge">${unreadCount}</span>` : ''}
      <button class="sidebar-item-btn" onclick="event.stopPropagation(); toggleMenu(event, 'sidebar-menu-${chatId}')">▼</button>
    </div>
  `;

  const menuHTML = `
    <div id="sidebar-menu-${chatId}" class="msg-dropdown" style="right: 15px; top: 45px;">
      <div class="msg-dropdown-item" onclick="event.stopPropagation(); alternarFixarConversa('${chatId}')">${isPinned ? '📌 Desafixar conversa' : '📌 Fixar conversa'}</div>
      <div class="msg-dropdown-item" onclick="event.stopPropagation(); alternarNaoLida('${chatId}')">${unreadCount > 0 ? '📩 Marcar como lida' : '🟢 Marcar como não lida'}</div>
      <div class="msg-dropdown-item" onclick="event.stopPropagation(); alternarArquivamento('${chatId}')">${isListaArquivada ? '📤 Desarquivar conversa' : '📦 Arquivar conversa'}</div>
      <div class="msg-dropdown-item" style="color: #f15c6d;" onclick="event.stopPropagation(); excluirConversa('${chatId}')">🗑️ Excluir conversa</div>
    </div>
  `;

  let fotoContato = chat.avatar;
  if (chat.avatar && chat.avatar.length > 5) {
    fotoContato = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`;
  }

  divItem.innerHTML = `
    <div class="avatar" style="background-color: ${chat.color}">${fotoContato}</div>
    <div class="chat-item-info">
      <div class="chat-item-top">
        <span class="chat-item-name">${chat.name}</span>
        <span class="chat-item-time ${unreadCount > 0 ? 'unread' : ''}">${ultimoHorario}</span>
      </div>
      <div class="chat-item-bottom">
        <span class="chat-item-last-msg">${lastTick}${ultimaMensagem}</span>
        ${badgesHTML}
      </div>
    </div>
    ${menuHTML}
  `;

  divItem.onclick = () => {
    sairModoSelecao();
    chatsData[chatId].unread = 0;
    salvarDados();
    abrirConversa(chatId);
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar-wrapper').classList.add('hide-mobile');
      history.pushState({ view: 'chat', chatId }, '');
    }
  };
  return divItem;
}

function atualizarSidebar() {
  const sidebarList = document.getElementById('sidebar-list');
  const archivedList = document.getElementById('archived-list');
  const btnShowArchived = document.getElementById('btn-show-archived');
  const archivedCountText = document.getElementById('archived-count');
  const searchInput = document.getElementById('sidebar-search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');

  const termoBusca = searchInput ? searchInput.value.trim().toLowerCase() : '';
  if (btnClearSearch) btnClearSearch.style.display = termoBusca ? 'block' : 'none';

  sidebarList.innerHTML = '';
  archivedList.innerHTML = '';
  let countArchived = 0;

  const idsOrdenados = Object.keys(chatsData).sort((a, b) => {
    const pinA = chatsData[a].pinned ? 1 : 0;
    const pinB = chatsData[b].pinned ? 1 : 0;
    if (pinA !== pinB) return pinB - pinA;
    const msgsA = chatsData[a].messages.filter(m => !m.deleted);
    const msgsB = chatsData[b].messages.filter(m => !m.deleted);
    const lastIdA = msgsA.length ? msgsA[msgsA.length - 1].id : 0;
    const lastIdB = msgsB.length ? msgsB[msgsB.length - 1].id : 0;
    return lastIdB - lastIdA;
  });

  for (const chatId of idsOrdenados) {
    const chat = chatsData[chatId];
    if (chat.archived) {
      countArchived++;
      archivedList.appendChild(gerarHTMLItemChat(chatId, chat, true));
      continue;
    }

    if (currentSidebarFilter === 'unread' && (!chat.unread || chat.unread <= 0)) continue;
    if (currentSidebarFilter === 'pinned' && !chat.pinned) continue;

    if (termoBusca) {
      const matchNome = chat.name.toLowerCase().includes(termoBusca);
      const matchMsg = chat.messages.some(m => !m.deleted && !m.isImage && !m.isVideo && !m.isAudio && m.text.toLowerCase().includes(termoBusca));
      if (!matchNome && !matchMsg) continue;
    }

    sidebarList.appendChild(gerarHTMLItemChat(chatId, chat, false));
  }

  if (countArchived > 0) {
    btnShowArchived.style.display = 'flex';
    archivedCountText.textContent = countArchived;
  } else {
    btnShowArchived.style.display = 'none';
  }
}

function alternarArquivamento(chatId) {
  fecharMenus();
  chatsData[chatId].archived = !chatsData[chatId].archived;
  salvarDados();
  atualizarSidebar();
}

function alternarFixarConversa(chatId) {
  fecharMenus();
  chatsData[chatId].pinned = !chatsData[chatId].pinned;
  salvarDados();
  atualizarSidebar();
}

function alternarNaoLida(chatId) {
  fecharMenus();
  chatsData[chatId].unread = chatsData[chatId].unread > 0 ? 0 : 1;
  salvarDados();
  atualizarSidebar();
}

function excluirConversa(chatId) {
  fecharMenus();
  if (Object.keys(chatsData).length <= 1) {
    alert("Mantenha pelo menos uma conversa ativa.");
    return;
  }
  if (!confirm(`Deseja excluir a conversa com ${chatsData[chatId].name}?`)) return;
  delete chatsData[chatId];
  if (activeChatId === chatId) {
    activeChatId = Object.keys(chatsData)[0];
  }
  salvarDados();
  abrirConversa(activeChatId);
}

/* CRIAR NOVO CONTATO / CONVERSA */
function abrirModalNovoContato() {
  const modal = document.getElementById('new-contact-modal');
  if (!modal) return;
  document.getElementById('new-contact-name').value = '';
  document.getElementById('new-contact-phone').value = '';
  document.getElementById('new-contact-bio').value = '';
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  document.getElementById('new-contact-name').focus();
}

function fecharModalNovoContato() {
  const modal = document.getElementById('new-contact-modal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

function salvarNovoContato() {
  const nome = document.getElementById('new-contact-name').value.trim();
  const fone = document.getElementById('new-contact-phone').value.trim() || '+55 11 98888-0000';
  const bio = document.getElementById('new-contact-bio').value.trim() || 'Disponível no CloneZap';
  if (!nome) {
    alert('Digite o nome do contato!');
    return;
  }
  const cores = ['#00a884', '#53bdeb', '#7f66ff', '#e542a3', '#f57c00', '#029d5b'];
  const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
  const novoId = 'chat_' + Date.now();
  chatsData[novoId] = {
    name: nome,
    phone: fone,
    recado: bio,
    avatar: nome.charAt(0).toUpperCase(),
    color: corAleatoria,
    archived: false,
    pinned: false,
    unread: 0,
    online: true,
    messages: []
  };
  salvarDados();
  fecharModalNovoContato();
  abrirConversa(novoId);
}

const chatWindow = document.getElementById('chat-window');
function formatarSegundosParaTempo(seg) {
  if (isNaN(seg) || !isFinite(seg)) return "00:00";
  const m = Math.floor(seg / 60).toString().padStart(2, '0');
  const s = Math.floor(seg % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function abrirConversa(chatId, highlightMsgId = null) {
  if (!chatsData[chatId]) chatId = Object.keys(chatsData)[0];
  activeChatId = chatId;
  const chat = chatsData[chatId];
  chat.unread = 0;

  document.getElementById('header-name').textContent = chat.name;

  const btnMobile = document.getElementById('btn-back-mobile');
  if (window.innerWidth <= 768 && btnMobile) btnMobile.style.display = 'block';

  const headerAvatar = document.getElementById('header-avatar');
  if (chat.avatar && chat.avatar.length > 5) {
    headerAvatar.innerHTML = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`;
    headerAvatar.style.backgroundColor = 'transparent';
  } else {
    headerAvatar.innerHTML = chat.avatar;
    headerAvatar.style.backgroundColor = chat.color;
  }

  const statusElement = document.getElementById('header-status');
  if (statusElement) {
    statusElement.style.display = 'block';
    if (chat.isTyping) {
      statusElement.textContent = 'digitando...';
      statusElement.classList.add('typing');
    } else {
      statusElement.textContent = chat.online !== false ? 'online' : 'visto por último hoje';
      statusElement.classList.remove('typing');
    }
  }

  chatWindow.classList.remove('fade-in-content');
  void chatWindow.offsetWidth;
  chatWindow.classList.add('fade-in-content');
  chatWindow.innerHTML = '';

  const emojisReacao = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  chat.messages.filter(m => !m.deleted).forEach(msg => {
    const divMsg = document.createElement('div');
    divMsg.classList.add('message', msg.type);
    if (msg.reaction) divMsg.classList.add('has-reaction');
    divMsg.id = `msg-${msg.id}`;

    let tickHTML = '';
    if (msg.type === 'sent') {
      if (msg.status === 'read') tickHTML = `<span class="tick tick-read">${SVG_DOUBLE_TICK}</span>`;
      else if (msg.status === 'delivered') tickHTML = `<span class="tick">${SVG_DOUBLE_TICK}</span>`;
      else tickHTML = `<span class="tick">${SVG_SINGLE_TICK}</span>`;
    }

    const starHTML = msg.starred ? `<span class="star-tag" title="Favorita">★</span>` : '';
    const editedHTML = msg.edited ? `<span class="edited-tag">editada</span>` : '';
    const forwardedHTML = msg.forwarded ? `<div class="forwarded-tag">↪ Encaminhada</div>` : '';

    let quotedHTML = '';
    if (msg.replyTo) {
      quotedHTML = `
        <div class="quoted-msg" onclick="event.stopPropagation(); rolarParaMensagem(${msg.replyTo.id})">
          <span class="quoted-msg-author">${msg.replyTo.author}</span>
          <span class="quoted-msg-text">${msg.replyTo.text}</span>
        </div>
      `;
    }

    let contentHTML = '';
    let avatarPlayer = msg.type === 'sent' ? 'E' : chat.avatar;
    if (msg.type === 'sent' && myProfile.avatar) avatarPlayer = `<img src="${myProfile.avatar}" style="width:100%; height:100%; object-fit:cover;">`;
    else if (msg.type === 'received' && chat.avatar && chat.avatar.length > 5) avatarPlayer = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`;

    const timeBlockHTML = `<div class="message-time-block">${starHTML}${editedHTML}<span class="time">${msg.time}</span>${tickHTML}</div>`;

    if (msg.isImage) {
      contentHTML = `${forwardedHTML}${quotedHTML}<img src="${msg.text}" class="chat-media" alt="Imagem" onclick="abrirModalMedia('${msg.text}', 'image')"> ${timeBlockHTML}`;
      divMsg.classList.add('media-message');
    } else if (msg.isVideo) {
      contentHTML = `${forwardedHTML}${quotedHTML}<video src="${msg.text}" class="chat-media" onclick="abrirModalMedia('${msg.text}', 'video')"></video> <div class="video-overlay-icon">▶</div>${timeBlockHTML}`;
      divMsg.classList.add('media-message');
    } else if (msg.isAudio) {
      divMsg.classList.add('audio-message');
      const duracao = msg.audioDuration || 0;
      const displayTempoInicial = formatarSegundosParaTempo(duracao);
      contentHTML = `
        ${forwardedHTML}${quotedHTML}
        <div class="custom-audio-player">
          <audio src="${msg.text}" class="hidden-audio" preload="metadata"></audio>
          <div class="audio-avatar">${avatarPlayer}</div>
          <div class="audio-controls-wrapper">
            <div class="audio-top-row">
              <button class="play-btn" onclick="playCustomAudio(this)">▶</button>
              <div class="audio-progress">
                <div class="audio-progress-bar"></div>
                <input type="range" class="audio-seek-slider" min="0" max="100" value="0" step="0.1" oninput="arrastarAudio(this)" onchange="arrastarAudio(this)">
              </div>
              <button class="audio-speed-btn" onclick="alternarVelocidadeAudio(this)">1x</button>
            </div>
            <div class="audio-bottom-row">
              <span class="audio-timer-display" data-duration="${duracao}">${displayTempoInicial}</span>
              ${timeBlockHTML}
            </div>
          </div>
        </div>`;
    } else if (msg.isDoc) {
      contentHTML = `
        ${forwardedHTML}${quotedHTML}
        <div class="doc-card" onclick="baixarDocumento('${msg.text}', '${msg.fileName || 'documento'}')">
          <span class="doc-icon">📄</span>
          <div class="doc-info">
            <span class="doc-name">${msg.fileName || 'Documento'}</span>
            <span class="doc-meta">${msg.fileSize || 'Arquivo'} • Clique para abrir</span>
          </div>
        </div>
        ${timeBlockHTML}
      `;
    } else if (msg.isLocation) {
      contentHTML = `
        ${forwardedHTML}${quotedHTML}
        <a class="loc-card" href="${msg.mapUrl || 'https://maps.google.com'}" target="_blank" rel="noopener">
          <div class="loc-map-preview">📍</div>
          <div class="loc-info">
            <div>Localização Atual</div>
            <div class="loc-sub">${msg.text}</div>
          </div>
        </a>
        ${timeBlockHTML}
      `;
    } else {
      contentHTML = `${forwardedHTML}${quotedHTML}<span class="text">${msg.text}</span>${timeBlockHTML}`;
    }

    const reactionPillHTML = msg.reaction
      ? `<div class="msg-reaction-pill" onclick="event.stopPropagation(); reagirMensagem(${msg.id}, '${msg.reaction}')" title="Clique para remover reação">${msg.reaction}</div>`
      : '';

    const reactionRowHTML = `<div class="reaction-picker-row">${emojisReacao.map(em => `<span class="reaction-option" onclick="event.stopPropagation(); reagirMensagem(${msg.id}, '${em}')">${em}</span>`).join('')}</div>`;
    const isTextSent = msg.type === 'sent' && !msg.isImage && !msg.isVideo && !msg.isAudio && !msg.isDoc && !msg.isLocation;

    divMsg.innerHTML = `
      ${contentHTML}
      ${reactionPillHTML}
      <button class="msg-options-btn" onclick="event.stopPropagation(); toggleMenu(event, 'menu-${msg.id}')">▼</button>
      <div id="menu-${msg.id}" class="msg-dropdown">
        ${reactionRowHTML}
        <div class="msg-dropdown-item" onclick="event.stopPropagation(); iniciarReply(${msg.id})">↩️ Responder</div>
        <div class="msg-dropdown-item" onclick="event.stopPropagation(); alternarFavorita(${msg.id})">${msg.starred ? '⭐ Desfavoritar' : '⭐ Favoritar'}</div>
        <div class="msg-dropdown-item" onclick="event.stopPropagation(); abrirModalEncaminhar(${msg.id})">↪️ Encaminhar</div>
        ${isTextSent ? `<div class="msg-dropdown-item" onclick="event.stopPropagation(); iniciarEdicaoMensagem(${msg.id})">✎ Editar mensagem</div>` : ''}
        <div class="msg-dropdown-item" onclick="event.stopPropagation(); entrarModoSelecao(${msg.id})">☑️ Selecionar</div>
        <div class="msg-dropdown-item" style="color: #f15c6d;" onclick="event.stopPropagation(); solicitarApagarUm(${msg.id})">🗑️ Apagar mensagem</div>
      </div>
    `;

    divMsg.addEventListener('dblclick', (e) => {
      if (!isSelectionMode) {
        e.stopPropagation();
        iniciarReply(msg.id);
      }
    });

    divMsg.addEventListener('click', (e) => {
      if (isSelectionMode) {
        e.preventDefault();
        e.stopPropagation();
        toggleMensagemSelecionada(msg.id, divMsg);
      }
    });
    chatWindow.appendChild(divMsg);
  });

  atualizarSidebar();

  if (highlightMsgId) {
    setTimeout(() => rolarParaMensagem(highlightMsgId), 80);
  } else {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  verificarBotaoDescer();
}

function rolarParaMensagem(msgId) {
  const el = document.getElementById(`msg-${msgId}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.remove('highlight-pulse');
  void el.offsetWidth;
  el.classList.add('highlight-pulse');
}

/* REAÇÕES, RESPOSTAS (REPLY), EDIÇÃO, FAVORITAS E ENCAMINHAMENTO */
function reagirMensagem(msgId, emoji) {
  fecharMenus();
  const msg = chatsData[activeChatId].messages.find(m => m.id === msgId);
  if (!msg) return;
  msg.reaction = msg.reaction === emoji ? null : emoji;
  salvarDados();
  abrirConversa(activeChatId);
}

function iniciarReply(msgId) {
  fecharMenus();
  editingMsgId = null;
  const msg = chatsData[activeChatId].messages.find(m => m.id === msgId);
  if (!msg) return;
  const authorName = msg.type === 'sent' ? 'Você' : chatsData[activeChatId].name;
  const textoResumo = resumoMensagemTexto(msg);
  replyingToMsg = { id: msg.id, author: authorName, text: textoResumo };

  const bar = document.getElementById('reply-preview-bar');
  document.getElementById('reply-preview-author').textContent = authorName;
  document.getElementById('reply-preview-text').textContent = textoResumo;
  if (bar) bar.style.display = 'flex';
  document.getElementById('message-input').focus();
}

function iniciarEdicaoMensagem(msgId) {
  fecharMenus();
  replyingToMsg = null;
  const msg = chatsData[activeChatId].messages.find(m => m.id === msgId);
  if (!msg) return;
  editingMsgId = msgId;

  const bar = document.getElementById('reply-preview-bar');
  document.getElementById('reply-preview-author').textContent = '✎ Editando mensagem';
  document.getElementById('reply-preview-text').textContent = msg.text;
  if (bar) bar.style.display = 'flex';

  const input = document.getElementById('message-input');
  input.value = msg.text;
  input.focus();
  input.dispatchEvent(new Event('input'));
}

function cancelarReplyOuEdicao() {
  replyingToMsg = null;
  if (editingMsgId !== null) {
    editingMsgId = null;
    const input = document.getElementById('message-input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    }
  }
  const bar = document.getElementById('reply-preview-bar');
  if (bar) bar.style.display = 'none';
}

function alternarFavorita(msgId) {
  fecharMenus();
  const msg = chatsData[activeChatId].messages.find(m => m.id === msgId);
  if (!msg) return;
  msg.starred = !msg.starred;
  salvarDados();
  abrirConversa(activeChatId);
}

function favoritarMensagensSelecionadas() {
  selectedMsgIds.forEach(id => {
    const msg = chatsData[activeChatId].messages.find(m => m.id === id);
    if (msg) msg.starred = !msg.starred;
  });
  salvarDados();
  sairModoSelecao();
  abrirConversa(activeChatId);
}

function abrirFavoritas() {
  const drawer = document.getElementById('starred-drawer');
  const list = document.getElementById('starred-list');
  if (!drawer || !list) return;
  list.innerHTML = '';
  let total = 0;

  for (const cId in chatsData) {
    const c = chatsData[cId];
    c.messages.filter(m => !m.deleted && m.starred).forEach(m => {
      total++;
      const item = document.createElement('div');
      item.className = 'chat-item';
      const autor = m.type === 'sent' ? 'Você' : c.name;
      item.innerHTML = `
        <div class="avatar" style="background-color: ${c.color}">${c.avatar}</div>
        <div class="chat-item-info">
          <div class="chat-item-top">
            <span class="chat-item-name">${autor} ▸ ${c.name}</span>
            <span class="chat-item-time">★ ${m.time}</span>
          </div>
          <div class="chat-item-bottom">
            <span class="chat-item-last-msg">${resumoMensagemTexto(m)}</span>
          </div>
        </div>
      `;
      item.onclick = () => {
        fecharFavoritas();
        abrirConversa(cId, m.id);
        if (window.innerWidth <= 768) {
          document.querySelector('.sidebar-wrapper').classList.add('hide-mobile');
        }
      };
      list.appendChild(item);
    });
  }

  if (total === 0) {
    list.innerHTML = `<div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);">Nenhuma mensagem favorita ainda. Use o menu (▼) em qualquer mensagem para favoritar ⭐</div>`;
  }
  drawer.classList.add('open');
}

function fecharFavoritas() {
  const drawer = document.getElementById('starred-drawer');
  if (drawer) drawer.classList.remove('open');
}

function abrirModalEncaminhar(msgId) {
  fecharMenus();
  forwardingMsgId = msgId;
  const modal = document.getElementById('forward-modal');
  const list = document.getElementById('forward-contact-list');
  if (!modal || !list) return;
  list.innerHTML = '';

  for (const cId in chatsData) {
    const c = chatsData[cId];
    const row = document.createElement('div');
    row.className = 'forward-item';
    row.innerHTML = `
      <div class="avatar" style="background-color: ${c.color}">${c.avatar}</div>
      <div style="flex:1;">
        <div style="color: var(--text-primary); font-weight: 500;">${c.name}</div>
        <div style="color: var(--text-secondary); font-size: 12px;">${c.recado}</div>
      </div>
    `;
    row.onclick = () => confirmarEncaminhamento(cId);
    list.appendChild(row);
  }

  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
}

function fecharModalEncaminhar() {
  const modal = document.getElementById('forward-modal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

function confirmarEncaminhamento(targetChatId) {
  const msgOrig = chatsData[activeChatId].messages.find(m => m.id === forwardingMsgId);
  fecharModalEncaminhar();
  if (!msgOrig) return;

  activeChatId = targetChatId;
  const novaMsg = Object.assign({}, msgOrig, {
    id: Date.now(),
    time: formatarHora(),
    type: 'sent',
    status: 'sent',
    forwarded: true,
    replyTo: null,
    reaction: null
  });
  processarEnvioMensagem(novaMsg);
}

/* BUSCA DENTRO DO CHAT */
function alternarBuscaNoChat() {
  const bar = document.getElementById('chat-search-bar');
  const input = document.getElementById('chat-search-input');
  if (!bar) return;
  if (bar.style.display === 'none') {
    bar.style.display = 'flex';
    if (input) {
      input.value = '';
      input.focus();
    }
    filtrarMensagensNoChat('');
  } else {
    bar.style.display = 'none';
    filtrarMensagensNoChat('');
  }
}

function filtrarMensagensNoChat(termo) {
  const q = (termo || '').trim().toLowerCase();
  const countEl = document.getElementById('chat-search-count');
  let encontrados = 0;

  document.querySelectorAll('#chat-window .message').forEach(el => {
    if (!q) {
      el.style.display = 'flex';
      return;
    }
    const texto = el.innerText.toLowerCase();
    if (texto.includes(q)) {
      el.style.display = 'flex';
      encontrados++;
    } else {
      el.style.display = 'none';
    }
  });

  if (countEl) {
    countEl.textContent = q ? `${encontrados} encontrada(s)` : '';
  }
}

const btnScrollBottom = document.getElementById('btn-scroll-bottom');
if (btnScrollBottom) chatWindow.onscroll = verificarBotaoDescer;
function verificarBotaoDescer() {
  if (btnScrollBottom && chatWindow.scrollHeight - chatWindow.scrollTop > chatWindow.clientHeight + 150) {
    btnScrollBottom.style.display = 'flex';
  } else if (btnScrollBottom) {
    btnScrollBottom.style.display = 'none';
  }
}
function scrollToBottom() { chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' }); }

/* PLAYER DE ÁUDIO COM VELOCIDADE 1x / 1.5x / 2x */
function alternarVelocidadeAudio(btn) {
  const player = btn.closest('.custom-audio-player');
  const audio = player.querySelector('.hidden-audio');
  const velocidades = [1, 1.5, 2];
  const atual = audio.playbackRate || 1;
  const prox = velocidades[(velocidades.indexOf(atual) + 1) % velocidades.length];
  audio.playbackRate = prox;
  btn.textContent = `${prox}x`;
}

function playCustomAudio(btn) {
  if (isSelectionMode) return;
  const player = btn.closest('.custom-audio-player');
  const audio = player.querySelector('.hidden-audio');
  const pb = player.querySelector('.audio-progress-bar');
  const slider = player.querySelector('.audio-seek-slider');
  const timerDisplay = player.querySelector('.audio-timer-display');

  let duration = parseFloat(timerDisplay.dataset.duration) || 0;
  if (duration <= 0.1) duration = (isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 1;

  document.querySelectorAll('audio.hidden-audio').forEach(a => {
    if (a !== audio) {
      a.pause();
      a.parentElement.querySelector('.play-btn').textContent = '▶';
      if (a.uiInterval) clearInterval(a.uiInterval);
    }
  });

  if (audio.paused) {
    audio.play().then(() => {
      btn.textContent = '⏸';
      if (audio.uiInterval) clearInterval(audio.uiInterval);
      audio.uiInterval = setInterval(() => {
        if (duration > 0) {
          let percent = (audio.currentTime / duration) * 100;
          if (percent >= 100) percent = 100;
          pb.style.width = percent + '%';
          slider.value = percent;
          timerDisplay.textContent = formatarSegundosParaTempo(audio.currentTime);

          if (audio.ended || audio.currentTime >= duration - 0.05 || percent >= 100) {
            audio.pause();
            audio.currentTime = 0;
            clearInterval(audio.uiInterval);
            btn.textContent = '▶';
            pb.style.width = '0%';
            slider.value = 0;
            timerDisplay.textContent = formatarSegundosParaTempo(duration);
          }
        }
      }, 50);
    }).catch(err => { console.error("Erro no player:", err); });
  } else {
    audio.pause();
    btn.textContent = '▶';
    if (audio.uiInterval) clearInterval(audio.uiInterval);
  }
}

function arrastarAudio(slider) {
  const player = slider.closest('.custom-audio-player');
  const audio = player.querySelector('.hidden-audio');
  const pb = player.querySelector('.audio-progress-bar');
  const timerDisplay = player.querySelector('.audio-timer-display');
  let duration = parseFloat(timerDisplay.dataset.duration) || 0;
  if (duration <= 0.1 && isFinite(audio.duration)) duration = audio.duration;
  if (duration > 0) {
    const newTime = (slider.value / 100) * duration;
    audio.currentTime = newTime;
    pb.style.width = slider.value + '%';
    timerDisplay.textContent = formatarSegundosParaTempo(newTime);
  }
}

let isSelectionMode = false;
let selectedMsgIds = new Set();
let backupMensagensApagadas = [];
let undoTimeout = null;
const chatHeaderNormal = document.getElementById('chat-header');
const selectionHeader = document.getElementById('selection-header');
const selectionCountText = document.getElementById('selection-count');
const snackbar = document.getElementById('undo-snackbar');

function entrarModoSelecao(idInicial) {
  fecharMenus();
  isSelectionMode = true;
  selectedMsgIds.clear();
  if (chatHeaderNormal) chatHeaderNormal.style.display = 'none';
  if (selectionHeader) selectionHeader.classList.add('show');
  chatWindow.classList.add('selection-mode-active');
  const elemento = document.getElementById(`msg-${idInicial}`);
  if (elemento) toggleMensagemSelecionada(idInicial, elemento);
}

function sairModoSelecao() {
  isSelectionMode = false;
  selectedMsgIds.clear();
  if (chatHeaderNormal) chatHeaderNormal.style.display = 'flex';
  if (selectionHeader) selectionHeader.classList.remove('show');
  chatWindow.classList.remove('selection-mode-active');
  document.querySelectorAll('.message.selected').forEach(el => el.classList.remove('selected'));
}

function toggleMensagemSelecionada(id, elementoDOM) {
  if (selectedMsgIds.has(id)) {
    selectedMsgIds.delete(id);
    elementoDOM.classList.remove('selected');
  } else {
    selectedMsgIds.add(id);
    elementoDOM.classList.add('selected');
  }
  if (selectedMsgIds.size === 0) {
    sairModoSelecao();
  } else if (selectionCountText) {
    selectionCountText.textContent = `${selectedMsgIds.size} selecionada(s)`;
  }
}

function solicitarApagarUm(id) { fecharMenus(); processarExclusao([id]); }
function apagarMensagensSelecionadas() { processarExclusao(Array.from(selectedMsgIds)); sairModoSelecao(); }

function processarExclusao(arrayIds) {
  backupMensagensApagadas = [];
  arrayIds.forEach(id => {
    const msgIndex = chatsData[activeChatId].messages.findIndex(m => m.id === id);
    if (msgIndex !== -1) {
      chatsData[activeChatId].messages[msgIndex].deleted = true;
      backupMensagensApagadas.push({ id: id, chatId: activeChatId });
    }
  });
  salvarDados();
  abrirConversa(activeChatId);
  if (snackbar) snackbar.classList.add('show');
  if (undoTimeout) clearTimeout(undoTimeout);
  undoTimeout = setTimeout(() => {
    if (snackbar) snackbar.classList.remove('show');
    backupMensagensApagadas.forEach(backup => {
      chatsData[backup.chatId].messages = chatsData[backup.chatId].messages.filter(m => !m.deleted);
    });
    salvarDados();
    backupMensagensApagadas = [];
  }, 5000);
}

const btnUndo = document.getElementById('btn-undo');
if (btnUndo) {
  btnUndo.addEventListener('click', () => {
    if (backupMensagensApagadas.length > 0) {
      backupMensagensApagadas.forEach(backup => {
        const msgIndex = chatsData[backup.chatId].messages.findIndex(m => m.id === backup.id);
        if (msgIndex !== -1) chatsData[backup.chatId].messages[msgIndex].deleted = false;
      });
      salvarDados();
      abrirConversa(activeChatId);
      if (snackbar) snackbar.classList.remove('show');
      clearTimeout(undoTimeout);
      backupMensagensApagadas = [];
    }
  });
}

function toggleMenu(e, id) {
  e.stopPropagation();
  fecharMenus();
  const m = document.getElementById(id);
  if (m) m.classList.add('show');
}
function fecharMenus() { document.querySelectorAll('.msg-dropdown').forEach(m => m.classList.remove('show')); }

const messageInput = document.getElementById('message-input');
const btnActionMain = document.getElementById('btn-action-main');
const btnAttachMenu = document.getElementById('btn-attach-menu');
const attachMenu = document.getElementById('attach-menu');
const fileInput = document.getElementById('file-input');
const docInput = document.getElementById('doc-input');
const emojiPicker = document.getElementById('emoji-picker');
const btnEmoji = document.getElementById('btn-emoji');

if (btnAttachMenu && attachMenu) {
  btnAttachMenu.onclick = (e) => {
    e.stopPropagation();
    attachMenu.classList.toggle('show');
    if (emojiPicker) emojiPicker.classList.remove('show');
  };
}

if (emojiPicker && btnEmoji && messageInput) {
  const listaEmojis = ['😀', '😂', '🥰', '😎', '🤔', '👍', '🙏', '🔥', '🎉', '❤️', '👀', '✨', '🤣', '🙌', '💡', '✅', '❌', '💯', '🚀', '🥳', '🤩', '👏', '💪', '🌟'];
  listaEmojis.forEach(e => {
    const span = document.createElement('span');
    span.className = 'emoji-item';
    span.textContent = e;
    span.onclick = () => {
      messageInput.value += e;
      messageInput.focus();
      messageInput.dispatchEvent(new Event('input'));
    };
    emojiPicker.appendChild(span);
  });
  btnEmoji.onclick = (e) => {
    e.stopPropagation();
    emojiPicker.classList.toggle('show');
    if (attachMenu) attachMenu.classList.remove('show');
  };
}

document.addEventListener('click', (e) => {
  if (emojiPicker && btnEmoji && !emojiPicker.contains(e.target) && !btnEmoji.contains(e.target)) emojiPicker.classList.remove('show');
  if (attachMenu && btnAttachMenu && !attachMenu.contains(e.target) && !btnAttachMenu.contains(e.target)) attachMenu.classList.remove('show');
});

function formatarHora() {
  const a = new Date();
  return a.getHours().toString().padStart(2, '0') + ':' + a.getMinutes().toString().padStart(2, '0');
}

if (messageInput && btnActionMain) {
  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() !== '') {
      btnActionMain.innerHTML = SVG_SEND;
      btnActionMain.onclick = sendMessage;
    } else {
      btnActionMain.innerHTML = SVG_MIC;
      btnActionMain.onclick = iniciarGravacao;
    }
  });
  messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

function processarEnvioMensagem(objMensagem) {
  const targetChatId = activeChatId;
  if (replyingToMsg) {
    objMensagem.replyTo = replyingToMsg;
    cancelarReplyOuEdicao();
  }
  chatsData[targetChatId].messages.push(objMensagem);
  salvarDados();
  abrirConversa(targetChatId);
  playSound('sent');

  setTimeout(() => {
    if (!chatsData[targetChatId]) return;
    const msgIndex = chatsData[targetChatId].messages.findIndex(m => m.id === objMensagem.id);
    if (msgIndex !== -1) {
      chatsData[targetChatId].messages[msgIndex].status = 'delivered';
      salvarDados();
      if (activeChatId === targetChatId) abrirConversa(targetChatId);
    }
  }, 900);

  setTimeout(() => {
    if (!chatsData[targetChatId]) return;
    const msgIndex = chatsData[targetChatId].messages.findIndex(m => m.id === objMensagem.id);
    if (msgIndex !== -1) {
      chatsData[targetChatId].messages[msgIndex].status = 'read';
      salvarDados();
      if (activeChatId === targetChatId) abrirConversa(targetChatId);
    }
  }, 2000);

  if (myProfile.autoReply !== false) {
    dispararAutoResposta(targetChatId, objMensagem);
  }
}

function dispararAutoResposta(chatId, msgEnviada) {
  setTimeout(() => {
    if (!chatsData[chatId]) return;
    chatsData[chatId].isTyping = true;
    if (activeChatId === chatId) abrirConversa(chatId);
    else atualizarSidebar();

    setTimeout(() => {
      if (!chatsData[chatId]) return;
      chatsData[chatId].isTyping = false;
      const resposta = gerarTextoAutoResposta(msgEnviada);
      chatsData[chatId].messages.push({
        id: Date.now(),
        text: resposta,
        time: formatarHora(),
        type: 'received',
        isImage: false,
        isVideo: false,
        isAudio: false,
        deleted: false,
        audioDuration: 0
      });
      if (activeChatId !== chatId) {
        chatsData[chatId].unread = (chatsData[chatId].unread || 0) + 1;
      }
      salvarDados();
      if (activeChatId === chatId) abrirConversa(chatId);
      else atualizarSidebar();
      showNotification(chatsData[chatId].name, resposta, chatId);
    }, 2200);
  }, 1500);
}

function gerarTextoAutoResposta(msg) {
  if (msg.isAudio) return "Acabei de ouvir seu áudio! Muito bom 🎤👏";
  if (msg.isImage) return "Que foto incrível! Adorei 📸✨";
  if (msg.isVideo) return "Vídeo recebido! Já estou assistindo 🎥";
  if (msg.isDoc) return `Recebi o documento "${msg.fileName}", obrigado! 📄✅`;
  if (msg.isLocation) return "Localização recebida! Já estou a caminho 📍🚗";

  const t = (msg.text || '').toLowerCase();
  if (t.includes('oi') || t.includes('olá') || t.includes('ola') || t.includes('bom dia') || t.includes('boa tarde') || t.includes('boa noite')) {
    return "Olá! Tudo ótimo por aqui, e com você? 😊";
  }
  if (t.includes('?')) {
    return "Com certeza! Pode contar comigo nessa 👍🚀";
  }
  const respostas = [
    "Show de bola! Esse novo CloneZap ficou igualzinho ao oficial 🔥",
    "Perfeito, combinado então! ✅",
    "Caramba, muito legal isso! Me avisa qualquer novidade 🙌",
    "Recebido! Daqui a pouco te mando mais detalhes 😉"
  ];
  return respostas[Math.floor(Math.random() * respostas.length)];
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  if (editingMsgId !== null) {
    const msg = chatsData[activeChatId].messages.find(m => m.id === editingMsgId);
    if (msg) {
      msg.text = text;
      msg.edited = true;
      salvarDados();
    }
    cancelarReplyOuEdicao();
    abrirConversa(activeChatId);
    return;
  }

  processarEnvioMensagem({
    id: Date.now(),
    text: text,
    time: formatarHora(),
    type: 'sent',
    isImage: false,
    isVideo: false,
    isAudio: false,
    deleted: false,
    status: 'sent',
    audioDuration: 0
  });
  messageInput.value = '';
  btnActionMain.innerHTML = SVG_MIC;
  btnActionMain.onclick = iniciarGravacao;
  if (emojiPicker) emojiPicker.classList.remove('show');
  if (attachMenu) attachMenu.classList.remove('show');
}

/* ENVIO DE FOTOS, VÍDEOS, DOCUMENTOS E LOCALIZAÇÃO */
if (fileInput) {
  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) { alert("Limite de 2.5 MB."); fileInput.value = ''; return; }
    const isVideoFile = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = function (evt) {
      processarEnvioMensagem({
        id: Date.now(),
        text: evt.target.result,
        time: formatarHora(),
        type: 'sent',
        isImage: !isVideoFile,
        isVideo: isVideoFile,
        isAudio: false,
        deleted: false,
        status: 'sent',
        audioDuration: 0
      });
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
    if (attachMenu) attachMenu.classList.remove('show');
  });
}

if (docInput) {
  docInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { alert("Limite de 3 MB para documentos."); docInput.value = ''; return; }
    const tamanhoKB = Math.max(1, Math.round(file.size / 1024)) + ' KB';
    const reader = new FileReader();
    reader.onload = function (evt) {
      processarEnvioMensagem({
        id: Date.now(),
        text: evt.target.result,
        fileName: file.name,
        fileSize: tamanhoKB,
        time: formatarHora(),
        type: 'sent',
        isDoc: true,
        deleted: false,
        status: 'sent'
      });
    };
    reader.readAsDataURL(file);
    docInput.value = '';
    if (attachMenu) attachMenu.classList.remove('show');
  });
}

function baixarDocumento(dataUrl, fileName) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName || 'documento';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function enviarLocalizacao() {
  if (attachMenu) attachMenu.classList.remove('show');
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        processarEnvioMensagem({
          id: Date.now(),
          text: `Lat: ${lat}, Lng: ${lng}`,
          mapUrl: `https://www.google.com/maps?q=${lat},${lng}`,
          time: formatarHora(),
          type: 'sent',
          isLocation: true,
          deleted: false,
          status: 'sent'
        });
      },
      () => {
        processarEnvioMensagem({
          id: Date.now(),
          text: `São Paulo, SP • Tempo real`,
          mapUrl: `https://www.google.com/maps?q=-23.5505,-46.6333`,
          time: formatarHora(),
          type: 'sent',
          isLocation: true,
          deleted: false,
          status: 'sent'
        });
      },
      { timeout: 4000 }
    );
  }
}

/* CÂMERA */
const cameraModal = document.getElementById('camera-modal');
const cameraStream = document.getElementById('camera-stream');
const cameraCanvas = document.getElementById('camera-canvas');
const cameraPreview = document.getElementById('camera-preview');
const btnTakePhoto = document.getElementById('btn-take-photo');
const btnRetakePhoto = document.getElementById('btn-retake-photo');
const btnSendPhoto = document.getElementById('btn-send-photo');
let streamAtual = null;

const btnOpenCamera = document.getElementById('btn-open-camera');
if (btnOpenCamera) {
  btnOpenCamera.onclick = async () => {
    if (attachMenu) attachMenu.classList.remove('show');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Abra usando o Live Server (http://localhost) para permitir a câmera.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamAtual = stream;
      cameraStream.srcObject = stream;
      cameraModal.style.display = 'flex';
      setTimeout(() => cameraModal.classList.add('show'), 10);
      cameraStream.style.display = 'block';
      btnTakePhoto.style.display = 'block';
      cameraPreview.style.display = 'none';
      btnRetakePhoto.style.display = 'none';
      btnSendPhoto.style.display = 'none';
    } catch (err) {
      alert("Acesso à câmera negado.");
    }
  };
}

const btnCloseCamera = document.getElementById('btn-close-camera');
if (btnCloseCamera) {
  btnCloseCamera.onclick = () => {
    cameraModal.classList.remove('show');
    setTimeout(() => {
      cameraModal.style.display = 'none';
      if (streamAtual) {
        streamAtual.getTracks().forEach(track => track.stop());
        streamAtual = null;
      }
    }, 300);
  };
}
if (btnTakePhoto) {
  btnTakePhoto.onclick = () => {
    cameraCanvas.width = cameraStream.videoWidth;
    cameraCanvas.height = cameraStream.videoHeight;
    cameraCanvas.getContext('2d').drawImage(cameraStream, 0, 0);
    cameraPreview.src = cameraCanvas.toDataURL('image/jpeg');
    cameraStream.style.display = 'none';
    btnTakePhoto.style.display = 'none';
    cameraPreview.style.display = 'block';
    btnRetakePhoto.style.display = 'block';
    btnSendPhoto.style.display = 'flex';
  };
}
if (btnRetakePhoto) {
  btnRetakePhoto.onclick = () => {
    cameraStream.style.display = 'block';
    btnTakePhoto.style.display = 'block';
    cameraPreview.style.display = 'none';
    btnRetakePhoto.style.display = 'none';
    btnSendPhoto.style.display = 'none';
  };
}
if (btnSendPhoto) {
  btnSendPhoto.onclick = () => {
    processarEnvioMensagem({
      id: Date.now(),
      text: cameraPreview.src,
      time: formatarHora(),
      type: 'sent',
      isImage: true,
      isVideo: false,
      isAudio: false,
      deleted: false,
      status: 'sent',
      audioDuration: 0
    });
    btnCloseCamera.onclick();
  };
}

/* GRAVAÇÃO DE ÁUDIO */
const recordingControls = document.getElementById('recording-controls');
const recordingTime = document.getElementById('recording-time');
const btnCancelMic = document.getElementById('btn-cancel-mic');

let mediaRecorder = null;
let audioChunks = [];
let recTimer = null;
let recSeconds = 0;
let gravarParaEnviar = true;
let isRequestingMic = false;
let recStartTime = 0;

async function iniciarGravacao() {
  if (messageInput.value.trim() !== '' || isRequestingMic) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Abra usando o Live Server para permitir o microfone.");
    return;
  }

  isRequestingMic = true;
  gravarParaEnviar = true;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    isRequestingMic = false;

    if (!gravarParaEnviar) {
      stream.getTracks().forEach(t => t.stop());
      resetMicUI();
      return;
    }
    if (recTimer) clearInterval(recTimer);

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    recSeconds = 0;
    recStartTime = Date.now();

    messageInput.style.display = 'none';
    if (btnAttachMenu) btnAttachMenu.style.display = 'none';
    if (btnEmoji) btnEmoji.style.display = 'none';
    document.querySelector('.footer-right').classList.add('recording-mode');
    btnActionMain.classList.add('recording-active');
    btnActionMain.innerHTML = SVG_SEND;
    if (recordingControls) recordingControls.classList.add('show');
    if (recordingTime) recordingTime.textContent = '00:00';

    recTimer = setInterval(() => {
      recSeconds++;
      if (recordingTime) recordingTime.textContent = formatarSegundosParaTempo(recSeconds);
    }, 1000);

    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data); };

    mediaRecorder.onstop = () => {
      clearInterval(recTimer);
      recTimer = null;
      const finalDuration = (Date.now() - recStartTime) / 1000;
      resetMicUI();

      if (gravarParaEnviar && audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = function (event) {
          processarEnvioMensagem({
            id: Date.now(),
            text: event.target.result,
            time: formatarHora(),
            type: 'sent',
            isImage: false,
            isVideo: false,
            isAudio: true,
            deleted: false,
            status: 'sent',
            audioDuration: finalDuration
          });
        };
        reader.readAsDataURL(audioBlob);
      }
      stream.getTracks().forEach(t => t.stop());
    };

    mediaRecorder.start();
    btnActionMain.onclick = function () {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        gravarParaEnviar = true;
        mediaRecorder.stop();
      }
    };
  } catch (err) {
    isRequestingMic = false;
    resetMicUI();
    alert("Permita o uso do microfone no navegador.");
  }
}

if (btnCancelMic) {
  btnCancelMic.addEventListener('click', () => {
    gravarParaEnviar = false;
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      audioChunks = [];
      mediaRecorder.stop();
    } else {
      resetMicUI();
    }
  });
}

function resetMicUI() {
  if (messageInput) messageInput.style.display = 'block';
  if (btnAttachMenu) btnAttachMenu.style.display = 'flex';
  if (btnEmoji) btnEmoji.style.display = 'flex';
  const footerRight = document.querySelector('.footer-right');
  if (footerRight) footerRight.classList.remove('recording-mode');
  if (btnActionMain) {
    btnActionMain.classList.remove('recording-active');
    btnActionMain.innerHTML = SVG_MIC;
    btnActionMain.onclick = iniciarGravacao;
  }
  if (recordingControls) recordingControls.classList.remove('show');
}

/* CHAMADAS DE VOZ E VÍDEO */
let callTimerInterval = null;
let callRingInterval = null;
let callSeconds = 0;
let callVideoStream = null;
let activeCallType = 'voice';

async function iniciarChamada(tipo) {
  activeCallType = tipo;
  const chat = chatsData[activeChatId];
  const modal = document.getElementById('call-modal');
  const avatarEl = document.getElementById('call-avatar');
  const nameEl = document.getElementById('call-name');
  const statusEl = document.getElementById('call-status');
  const videoPreview = document.getElementById('call-video-preview');

  if (!modal) return;
  nameEl.textContent = chat.name;
  statusEl.textContent = tipo === 'video' ? 'Chamada de vídeo... Chamando' : 'Chamando...';
  avatarEl.style.backgroundColor = chat.color;
  avatarEl.innerHTML = (chat.avatar && chat.avatar.length > 5)
    ? `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`
    : chat.avatar;

  if (tipo === 'video' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      callVideoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoPreview.srcObject = callVideoStream;
      videoPreview.style.display = 'block';
    } catch (e) {
      videoPreview.style.display = 'none';
    }
  } else if (videoPreview) {
    videoPreview.style.display = 'none';
  }

  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);

  playSound('ring');
  callRingInterval = setInterval(() => playSound('ring'), 2000);
  callSeconds = 0;

  setTimeout(() => {
    if (modal.style.display !== 'flex') return;
    clearInterval(callRingInterval);
    callRingInterval = null;
    statusEl.textContent = '00:00';
    callTimerInterval = setInterval(() => {
      callSeconds++;
      statusEl.textContent = formatarSegundosParaTempo(callSeconds);
    }, 1000);
  }, 3200);
}

function alternarMudoChamada() {
  const btn = document.getElementById('btn-call-mute');
  if (btn) btn.classList.toggle('active');
}

function alternarVivaVoz() {
  const btn = document.getElementById('btn-call-speaker');
  if (btn) btn.classList.toggle('active');
}

function encerrarChamada() {
  const modal = document.getElementById('call-modal');
  if (callRingInterval) { clearInterval(callRingInterval); callRingInterval = null; }
  if (callTimerInterval) { clearInterval(callTimerInterval); callTimerInterval = null; }
  if (callVideoStream) {
    callVideoStream.getTracks().forEach(t => t.stop());
    callVideoStream = null;
  }
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  }
  const icone = activeCallType === 'video' ? '📹' : '📞';
  const textoDuracao = callSeconds > 0
    ? `${icone} Chamada de ${activeCallType === 'video' ? 'vídeo' : 'voz'} (${formatarSegundosParaTempo(callSeconds)})`
    : `${icone} Chamada de ${activeCallType === 'video' ? 'vídeo' : 'voz'} cancelada`;

  chatsData[activeChatId].messages.push({
    id: Date.now(),
    text: textoDuracao,
    time: formatarHora(),
    type: 'sent',
    status: 'read',
    deleted: false
  });
  salvarDados();
  abrirConversa(activeChatId);
}

/* STATUS / STORIES */
let currentStatusIndex = 0;
let statusTimer = null;

function abrirModalStatus() {
  const modal = document.getElementById('status-modal');
  if (!modal) return;
  if (!statusList || statusList.length === 0) statusList = obterStatusPadrao();
  currentStatusIndex = 0;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  mostrarStatusAtual();
}

function mostrarStatusAtual() {
  if (statusTimer) clearTimeout(statusTimer);
  const st = statusList[currentStatusIndex];
  if (!st) { fecharModalStatus(); return; }

  const progContainer = document.getElementById('status-progress-container');
  progContainer.innerHTML = statusList.map((_, i) => `
    <div class="status-progress-seg">
      <div class="status-progress-fill" id="status-fill-${i}" style="width: ${i < currentStatusIndex ? '100%' : '0%'}"></div>
    </div>
  `).join('');

  const avatarEl = document.getElementById('status-user-avatar');
  avatarEl.style.backgroundColor = st.color || '#00a884';
  avatarEl.textContent = st.avatar || 'S';
  document.getElementById('status-user-name').textContent = st.user;
  document.getElementById('status-user-time').textContent = st.time;

  const bodyEl = document.getElementById('status-body');
  bodyEl.style.background = st.bg || 'linear-gradient(135deg, #00a884, #005c4b)';
  bodyEl.textContent = st.text;

  setTimeout(() => {
    const fill = document.getElementById(`status-fill-${currentStatusIndex}`);
    if (fill) {
      fill.style.transition = 'width 4.5s linear';
      fill.style.width = '100%';
    }
  }, 40);

  statusTimer = setTimeout(() => proximoStatus(), 4600);
}

function proximoStatus() {
  if (currentStatusIndex < statusList.length - 1) {
    currentStatusIndex++;
    mostrarStatusAtual();
  } else {
    fecharModalStatus();
  }
}

function criarMeuStatus() {
  if (statusTimer) clearTimeout(statusTimer);
  const texto = prompt("Digite o texto para publicar no seu Status:");
  if (texto && texto.trim()) {
    const bgs = [
      "linear-gradient(135deg, #00a884, #111b21)",
      "linear-gradient(135deg, #7f66ff, #282a36)",
      "linear-gradient(135deg, #D3396D, #3b1022)"
    ];
    statusList.unshift({
      user: myProfile.name || "Meu Status",
      avatar: "Eu",
      color: "#00a884",
      time: `Hoje às ${formatarHora()}`,
      bg: bgs[Math.floor(Math.random() * bgs.length)],
      text: texto.trim()
    });
    salvarDados();
    currentStatusIndex = 0;
  }
  mostrarStatusAtual();
}

function responderStatus(e) {
  if (e) e.stopPropagation();
  const input = document.getElementById('status-reply-input');
  const txt = input ? input.value.trim() : '';
  if (!txt) return;
  const st = statusList[currentStatusIndex];
  input.value = '';
  fecharModalStatus();
  processarEnvioMensagem({
    id: Date.now(),
    text: txt,
    replyTo: { id: 0, author: `Status de ${st.user}`, text: st.text },
    time: formatarHora(),
    type: 'sent',
    status: 'sent',
    deleted: false
  });
}

function fecharModalStatus() {
  if (statusTimer) { clearTimeout(statusTimer); statusTimer = null; }
  const modal = document.getElementById('status-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  }
}

/* GAVETAS E PERFIL DO CONTATO */
const myProfileDrawer = document.getElementById('my-profile-drawer');
const contactDrawer = document.getElementById('contact-profile-drawer');
const archivedDrawer = document.getElementById('archived-drawer');
const starredDrawer = document.getElementById('starred-drawer');

function abrirMeuPerfil() { if (myProfileDrawer) myProfileDrawer.classList.add('open'); }
function fecharMeuPerfil() { if (myProfileDrawer) myProfileDrawer.classList.remove('open'); }
function abrirArquivadas() { if (archivedDrawer) archivedDrawer.classList.add('open'); }
function fecharArquivadas() { if (archivedDrawer) archivedDrawer.classList.remove('open'); }

function abrirPerfilContato() {
  const chat = chatsData[activeChatId];
  const avatarEl = document.getElementById('contact-big-avatar');
  if (chat.avatar && chat.avatar.length > 5) {
    avatarEl.innerHTML = `<img src="${chat.avatar}" style="width:100%; height:100%; object-fit:cover;">`;
    avatarEl.style.backgroundColor = 'transparent';
    avatarEl.style.cursor = 'pointer';
    avatarEl.onclick = () => abrirModalMedia(chat.avatar, 'image');
  } else {
    avatarEl.innerHTML = chat.avatar;
    avatarEl.style.backgroundColor = chat.color;
    avatarEl.style.cursor = 'default';
    avatarEl.onclick = null;
  }
  document.getElementById('contact-big-name').textContent = chat.name;
  document.getElementById('contact-big-phone').textContent = chat.phone;
  document.getElementById('contact-big-bio').textContent = chat.recado;

  const mediaGrid = document.getElementById('contact-media-grid');
  if (mediaGrid) {
    mediaGrid.innerHTML = '';
    const midias = chat.messages.filter(m => !m.deleted && m.isImage);
    if (midias.length === 0) {
      mediaGrid.innerHTML = `<span style="font-size: 13px; color: var(--text-secondary); grid-column: 1 / -1;">Nenhuma mídia compartilhada</span>`;
    } else {
      midias.forEach(m => {
        const img = document.createElement('img');
        img.src = m.text;
        img.className = 'contact-media-thumb';
        img.onclick = () => abrirModalMedia(m.text, 'image');
        mediaGrid.appendChild(img);
      });
    }
  }

  if (contactDrawer) contactDrawer.classList.add('open');
}

function fecharPerfilContato() { if (contactDrawer) contactDrawer.classList.remove('open'); }

function limparConversaAtual() {
  if (!confirm(`Limpar todas as mensagens da conversa com ${chatsData[activeChatId].name}?`)) return;
  chatsData[activeChatId].messages = [];
  salvarDados();
  fecharPerfilContato();
  abrirConversa(activeChatId);
}

const mediaModal = document.getElementById("media-modal");
const modalBody = document.getElementById("modal-body");
let currentZoom = 1;
function abrirModalMedia(src, type) {
  if (isSelectionMode) return;
  currentZoom = 1;
  if (type === 'video') {
    modalBody.innerHTML = `<video src="${src}" id="modal-media-content" controls autoplay></video>`;
  } else {
    modalBody.innerHTML = `<img src="${src}" id="modal-media-content">`;
  }
  if (mediaModal) {
    mediaModal.style.display = "flex";
    setTimeout(() => mediaModal.classList.add("show"), 10);
  }
}
function fecharModal() {
  if (mediaModal) {
    mediaModal.classList.remove("show");
    setTimeout(() => { mediaModal.style.display = "none"; modalBody.innerHTML = ''; }, 300);
  }
}
function zoomIn() { currentZoom += 0.2; const content = document.getElementById('modal-media-content'); if (content) content.style.transform = `scale(${currentZoom})`; }
function zoomOut() { currentZoom = Math.max(0.5, currentZoom - 0.2); const content = document.getElementById('modal-media-content'); if (content) content.style.transform = `scale(${currentZoom})`; }
if (mediaModal) mediaModal.addEventListener('click', (e) => { if (e.target === mediaModal || e.target === modalBody) fecharModal(); });

function showNotification(name, message, chatIdParam = null) {
  try { playSound('received'); } catch (e) {}
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = `<div class="toast-avatar" style="background-color: var(--secondary-color)">${name.charAt(0)}</div><div class="toast-content"><span class="toast-title">${name}</span><span class="toast-message">${message}</span></div>`;
  toast.onclick = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
    if (chatIdParam && chatsData[chatIdParam]) {
      sairModoSelecao();
      abrirConversa(chatIdParam);
      if (window.innerWidth <= 768) {
        document.querySelector('.sidebar-wrapper').classList.add('hide-mobile');
      }
    }
  };
  if (container) container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { if (container && container.contains(toast)) toast.onclick(); }, 4000);

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
        if (chatIdParam && chatsData[chatIdParam]) {
          sairModoSelecao();
          abrirConversa(chatIdParam);
          if (window.innerWidth <= 768) {
            document.querySelector('.sidebar-wrapper').classList.add('hide-mobile');
          }
        }
        sysNotif.close();
      };
    }
  }
}

const btnSimular = document.getElementById('btn-simular-externa');
if (btnSimular) {
  btnSimular.addEventListener('click', () => {
    const targetId = chatsData["chat_joao"] ? "chat_joao" : Object.keys(chatsData)[0];
    chatsData[targetId].isTyping = true;
    atualizarSidebar();
    const headerStatus = document.getElementById('header-status');
    if (activeChatId === targetId && headerStatus) {
      headerStatus.textContent = 'digitando...';
      headerStatus.classList.add('typing');
    }
    setTimeout(() => {
      chatsData[targetId].isTyping = false;
      chatsData[targetId].archived = false;
      const textoSimulado = "Essa simulação ficou muito real! Experimenta dar dois cliques nesta mensagem para responder 😉";
      chatsData[targetId].messages.push({
        id: Date.now(),
        text: textoSimulado,
        time: formatarHora(),
        type: 'received',
        isImage: false,
        isVideo: false,
        isAudio: false,
        deleted: false,
        audioDuration: 0
      });
      if (activeChatId !== targetId) {
        chatsData[targetId].unread = (chatsData[targetId].unread || 0) + 1;
      }
      salvarDados();
      if (activeChatId === targetId) abrirConversa(activeChatId);
      else atualizarSidebar();
      showNotification(chatsData[targetId].name, textoSimulado, targetId);
    }, 2000);
  });
}

function voltarParaLista(e) {
  if (e) e.stopPropagation();
  document.querySelector('.sidebar-wrapper').classList.remove('hide-mobile');
}

window.addEventListener('popstate', () => {
  if (mediaModal && mediaModal.classList.contains('show')) { fecharModal(); return; }
  if (cameraModal && cameraModal.classList.contains('show') && btnCloseCamera) { btnCloseCamera.onclick(); return; }
  if (contactDrawer && contactDrawer.classList.contains('open')) { fecharPerfilContato(); return; }
  if (myProfileDrawer && myProfileDrawer.classList.contains('open')) { fecharMeuPerfil(); return; }
  if (archivedDrawer && archivedDrawer.classList.contains('open')) { fecharArquivadas(); return; }
  if (starredDrawer && starredDrawer.classList.contains('open')) { fecharFavoritas(); return; }
  if (isSelectionMode) { sairModoSelecao(); return; }
  const sidebarWrapper = document.querySelector('.sidebar-wrapper');
  if (window.innerWidth <= 768 && sidebarWrapper && sidebarWrapper.classList.contains('hide-mobile')) {
    sidebarWrapper.classList.remove('hide-mobile');
  }
});

window.addEventListener('resize', () => {
  const btnBack = document.getElementById('btn-back-mobile');
  if (window.innerWidth > 768) {
    document.querySelector('.sidebar-wrapper').classList.remove('hide-mobile');
    if (btnBack) btnBack.style.display = 'none';
  } else {
    if (btnBack) btnBack.style.display = 'block';
  }
});

/* REGISTRO DO SERVICE WORKER E INSTALAÇÃO PWA */
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

carregarDados();
atualizarMeuPerfilUI();
abrirConversa(activeChatId);
