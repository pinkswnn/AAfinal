
(function(){
  const modal = document.getElementById('ConnectModal');
  const openBtns = document.querySelectorAll('[data-open-connect]');
  const closeBtn = document.querySelector('[data-close-modal]');

  const quickExit = document.getElementById('QuickExit');
  const quietMode = document.getElementById('QuietMode');

  const copyEmail = document.getElementById('CopyEmail');
  const copyEmail2 = document.getElementById('CopyEmail2');

  const privateNote = document.getElementById('PrivateNote');
  const copyNote = document.getElementById('CopyNote');
  const emailNote = document.getElementById('EmailNote');

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
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Quick Exit -> neutral site
  quickExit?.addEventListener('click', ()=>{ window.location.href = 'https://weather.com'; });

  // Quiet Mode persist
  const savedQuiet = localStorage.getItem('aa_quiet') === '1';
  if (savedQuiet) document.body.classList.add('quiet');
  quietMode?.setAttribute('aria-pressed', savedQuiet ? 'true' : 'false');
  quietMode?.addEventListener('click', ()=>{
    const isQuiet = document.body.classList.toggle('quiet');
    localStorage.setItem('aa_quiet', isQuiet ? '1' : '0');
    quietMode.setAttribute('aria-pressed', isQuiet ? 'true' : 'false');
  });

  async function copyText(text, buttonEl){
    try{
      await navigator.clipboard.writeText(text);
      if(buttonEl){
        const old = buttonEl.textContent;
        buttonEl.textContent = 'Copied ✓';
        setTimeout(()=>buttonEl.textContent = old, 1400);
      }
    }catch(e){
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      if(buttonEl){
        const old = buttonEl.textContent;
        buttonEl.textContent = 'Copied ✓';
        setTimeout(()=>buttonEl.textContent = old, 1400);
      }
    }
  }

  copyEmail?.addEventListener('click', ()=> copyText(copyEmail.dataset.email, copyEmail));
  copyEmail2?.addEventListener('click', ()=> copyText(copyEmail2.dataset.email, copyEmail2));

  // Reveal blocks
  document.querySelectorAll('[data-reveal]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-reveal');
      const el = document.getElementById(id);
      if(!el) return;
      const hidden = el.hasAttribute('hidden');
      if(hidden) el.removeAttribute('hidden');
      el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Scroll helper
  document.querySelectorAll('[data-scroll]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.getAttribute('data-scroll');
      const node = document.querySelector(target);
      if(node) node.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Private note tool (local only)
  const saved = localStorage.getItem('aa_note');
  if(saved && privateNote) privateNote.value = saved;

  privateNote?.addEventListener('input', ()=>{
    localStorage.setItem('aa_note', privateNote.value);
  });

  copyNote?.addEventListener('click', ()=>{
    const text = (privateNote?.value || '').trim();
    if(!text) return;
    copyText(text, copyNote);
  });

  emailNote?.addEventListener('click', ()=>{
    const text = (privateNote?.value || '').trim();
    const body = encodeURIComponent(text ? text : "Hi Admiring Angels,\n\nI’m reaching out quietly.\n\n");
    window.location.href = `mailto:support@admiringangels.com?subject=${encodeURIComponent('A Private Note')}&body=${body}`;
  });
})();
