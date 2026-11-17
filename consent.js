/* SJE Capital: cookie consent and Google Ads conversion tracking.
   Switched OFF until ADS_ID is filled in. While off, nothing loads, no banner shows and no cookies are set.
   To switch on: set ADS_ID (e.g. 'AW-123456789') and the two conversion labels from Google Ads, then publish. */
(function(){
  var ADS_ID='';            // Google Ads account ID, e.g. 'AW-123456789'
  var LABEL_FORM='';        // conversion label for a quote form enquiry (fires on /thanks)
  var LABEL_CALL='';        // conversion label for a click on "Book a free 15-minute call"
  var KEY='sje-consent', MAX_AGE=182*864e5;   // ask again after about six months
  if(!ADS_ID) return;
  function get(){ try{ var v=JSON.parse(localStorage.getItem(KEY)||'null'); if(v&&Date.now()-v.t<MAX_AGE) return v.c; }catch(e){} return null; }
  function put(c){ try{ localStorage.setItem(KEY,JSON.stringify({c:c,t:Date.now()})); }catch(e){} }
  var loaded=false;
  function load(){
    if(loaded) return; loaded=true;
    window.dataLayer=window.dataLayer||[]; window.gtag=function(){ dataLayer.push(arguments); };
    gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'denied',analytics_storage:'denied'});
    gtag('js',new Date()); gtag('config',ADS_ID);
    var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ADS_ID); document.head.appendChild(s);
    if(LABEL_FORM && /^\/thanks\/?$/.test(location.pathname)) gtag('event','conversion',{send_to:ADS_ID+'/'+LABEL_FORM});
    document.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('[data-booking]'); if(a&&LABEL_CALL) gtag('event','conversion',{send_to:ADS_ID+'/'+LABEL_CALL}); });
  }
  function banner(){
    if(document.getElementById('cookie-bar')) return;
    var b=document.createElement('div'); b.id='cookie-bar'; b.setAttribute('role','dialog'); b.setAttribute('aria-label','Cookie choice');
    b.innerHTML='<p>We would like to use cookies to see which of our Google ads lead to enquiries. Nothing is set unless you accept. <a href="/privacy#cookies">How we use cookies</a></p><div class="cb-actions"><button type="button" id="cb-reject">Reject</button><button type="button" id="cb-accept">Accept</button></div>';
    var st=document.createElement('style');
    st.textContent='#cookie-bar{position:fixed;left:0;right:0;bottom:0;z-index:1000;background:#14382B;color:#E8EFE9;padding:14px 20px;display:flex;gap:16px;align-items:center;justify-content:center;flex-wrap:wrap;font-family:"Source Serif 4",Georgia,serif;font-size:.95rem;box-shadow:0 -6px 20px rgba(0,0,0,.18)}#cookie-bar p{max-width:62ch;margin:0}#cookie-bar a{color:#9FD8B7}#cookie-bar .cb-actions{display:flex;gap:10px}#cookie-bar button{font:inherit;font-weight:600;padding:9px 18px;border-radius:3px;cursor:pointer;border:1px solid #9FD8B7}#cb-reject{background:transparent;color:#E8EFE9}#cb-accept{background:#FBFCF9;color:#14382B;border-color:#FBFCF9}#cookie-bar button:focus-visible{outline:3px solid #9FD8B7;outline-offset:2px}';
    document.head.appendChild(st); document.body.appendChild(b);
    document.getElementById('cb-accept').addEventListener('click',function(){ put('yes'); b.remove(); load(); });
    document.getElementById('cb-reject').addEventListener('click',function(){ put('no'); b.remove(); });
  }
  function start(){
    document.querySelectorAll('.cookie-settings').forEach(function(a){ a.hidden=false; a.addEventListener('click',function(e){ e.preventDefault(); try{ localStorage.removeItem(KEY); }catch(err){} banner(); }); });
    var c=get(); if(c==='yes') load(); else if(c===null) banner();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
