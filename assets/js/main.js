(function(){
  const modal = document.getElementById('connectModal');
  const openBtns = document.querySelectorAll('[data-open-connect]');
  const closeBtn = document.querySelector('[data-close-modal]');
  const quickExit = document.getElementById('quickExit');

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
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal(); });

  // Gentle scroll helpers
  document.querySelectorAll('[data-scroll]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const target = el.getAttribute('data-scroll');
      const node = document.querySelector(target);
      if(node) node.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Copy email buttons
  async function copyEmail(email, btn){
    try{
      await navigator.clipboard.writeText(email);
      const old=btn.textContent;
      btn.textContent='Copied ✓';
      setTimeout(()=>btn.textContent=old, 1400);
    }catch(err){
      window.prompt('Copy email:', email);
    }
  }
  document.querySelectorAll('[data-email]').forEach(btn=>{
    btn.addEventListener('click', ()=>copyEmail(btn.getAttribute('data-email'), btn));
  });

  // Quick Exit — neutral redirect
  if (quickExit){
    quickExit.addEventListener('click', ()=>{
      window.location.href='https://weather.com';
    });
  }
})();