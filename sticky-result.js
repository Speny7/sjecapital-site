/* Phones: keep the calculator's main answer in view while the inputs are being changed.
   Usage: load this file with data-target (ID of the headline figure), data-label (short label)
   or data-label-from="sibling" (use the text after the figure), and defer. */
(function(){
  var me=document.currentScript||document.querySelector('script[src*="sticky-result.js"]')||document.querySelector('script[data-target]'); if(!me) return;
  var id=me.getAttribute('data-target'), label=me.getAttribute('data-label')||'', fromSib=me.getAttribute('data-label-from')==='sibling';
  function start(){
    var fig=document.getElementById(id), res=document.querySelector('.calc-results'); if(!fig||!res) return;
    var bar=document.createElement('div'); bar.className='sr-bar'; bar.setAttribute('aria-hidden','true');
    bar.innerHTML='<span class="sr-text">'+(fromSib?'<b class="sr-val"></b> <span class="sr-label"></span>':'<span class="sr-label"></span> <b class="sr-val"></b>')+'</span><button type="button" class="sr-go" tabindex="-1">See the result &darr;</button>';
    var st=document.createElement('style');
    st.textContent='.sr-bar{display:none}@media (max-width:900px){.sr-bar{position:fixed;left:0;right:0;bottom:0;z-index:900;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));background:#14382B;color:#E8EFE9;font-family:"Source Serif 4",Georgia,serif;font-size:.92rem;box-shadow:0 -6px 18px rgba(0,0,0,.18);transform:translateY(110%);transition:transform .2s ease}.sr-bar.on{transform:none}.sr-bar b{font-family:"EB Garamond",Georgia,serif;font-size:1.25rem;color:#fff;font-variant-numeric:tabular-nums}.sr-label{color:#BFD6C6}.sr-go{font:inherit;font-size:.85rem;background:none;border:1px solid #9FD8B7;color:#E8EFE9;border-radius:3px;padding:6px 10px;white-space:nowrap;cursor:pointer}}@media (prefers-reduced-motion:reduce){.sr-bar{transition:none}}';
    document.head.appendChild(st); document.body.appendChild(bar);
    var vis=false, lastY=0;
    function txt(){ var l=label; if(fromSib){ var s=fig.nextElementSibling; if(s) l=s.textContent.replace(/\s+/g,' ').trim().split(/[.:;,]/)[0]; }
      bar.querySelector('.sr-label').textContent=l; bar.querySelector('.sr-val').textContent=fig.textContent.trim(); }
    function place(){ var r=res.getBoundingClientRect(), h=window.innerHeight||document.documentElement.clientHeight;
      var show=r.top>h*0.85 && !document.getElementById('cookie-bar'); bar.classList.toggle('on',show); }
    bar.querySelector('.sr-go').addEventListener('click',function(){ res.scrollIntoView({behavior:'smooth',block:'start'}); });
    ['input','change','click'].forEach(function(ev){ document.addEventListener(ev,function(){ txt(); setTimeout(txt,260); }); });
    window.addEventListener('scroll',place,{passive:true}); window.addEventListener('resize',place);
    txt(); place();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
