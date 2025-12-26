
(function(){
  const modal = document.getElementById('connectModal');
  const openBtns = document.querySelectorAll('[data-open-connect]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const quickExit = document.getElementById('quickExit');
  const quietToggle = document.getElementById('quietToggle');
  const copyEmailBtn = document.getElementById('copyEmail');
  const copyLinkBtn = document.getElementById('copyLink');
  const pathBtns = document.querySelectorAll('[data-path]');
  const reveals = document.querySelectorAll('.reveal');
  const noteCopy = document.getElementById('copyNote');
  const noteEmail = document.getElementById('emailNote');
  const noteBox = document.getElementById('noteText');

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    const focusable = modal.querySelector('button, a');
    if (focusable) focusable.focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  openBtns.forEach(b=>b.addEventListener('click', openModal));
  closeBtns.forEach(b=>b.addEventListener('click', closeModal));
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Quick Exit: open neutral site
  if (quickExit){
    quickExit.addEventListener('click', ()=>{
      window.location.href = 'https://google.com';
    });
  }

  // Quiet Mode toggle (persists)
  const QUIET_KEY = 'aa_quiet_mode';
  function setQuiet(on){
    document.body.classList.toggle('quiet', !!on);
    try{ localStorage.setItem(QUIET_KEY, on ? '1':'0'); }catch(e){}
    if (quietToggle) quietToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (quietToggle) quietToggle.textContent = on ? 'Quiet mode: On' : 'Quiet mode: Off';
  }
  let quietInit = false;
  try{ quietInit = localStorage.getItem(QUIET_KEY)==='1'; }catch(e){}
  setQuiet(quietInit);
  if (quietToggle){
    quietToggle.addEventListener('click', ()=> setQuiet(!document.body.classList.contains('quiet')));
  }

  // Copy helpers
  async function copyText(text, btn){
    try{
      await navigator.clipboard.writeText(text);
      if(btn){
        const old = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(()=>btn.textContent = old, 1200);
      }
    }catch(e){
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      if(btn){
        const old = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(()=>btn.textContent = old, 1200);
      }
    }
  }

  if (copyEmailBtn){
    copyEmailBtn.addEventListener('click', ()=> copyText(copyEmailBtn.getAttribute('data-email'), copyEmailBtn));
  }
  if (copyLinkBtn){
    copyLinkBtn.addEventListener('click', ()=> copyText(window.location.href, copyLinkBtn));
  }

  // Path reveal: progressive disclosure
  function activatePath(key){
    reveals.forEach(r=>{
      r.classList.toggle('active', r.getAttribute('data-reveal')===key);
    });
    const node = document.querySelector(`.reveal[data-reveal="${key}"]`);
    if(node) node.scrollIntoView({behavior:'smooth', block:'start'});
  }
  pathBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      activatePath(btn.getAttribute('data-path'));
    });
  });

  // Note tools
  if (noteCopy && noteBox){
    noteCopy.addEventListener('click', ()=> copyText(noteBox.value || '', noteCopy));
  }
  if (noteEmail && noteBox){
    noteEmail.addEventListener('click', ()=>{
      const subject = encodeURIComponent('A private note — Admiring Angels');
      const body = encodeURIComponent(noteBox.value || 'Hi Admiring Angels,\n\n');
      window.location.href = `mailto:support@admiringangels.com?subject=${subject}&body=${body}`;
    });
  }

})();
