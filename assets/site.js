const $=s=>document.querySelector(s);
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-id]');if(b){const d=document.getElementById('d-'+b.dataset.id);d&&d.showModal();return}
  const d=e.target.closest('dialog');if(d&&(e.target===d||e.target.closest('.cl')))d.close();
});
const menu=$('#menu'),nav=$('#nav');
menu.onclick=()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)};
nav.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded',false)};
const pvb=$('#pvb'),pv=$('#pv');
pvb.onclick=()=>{pv.hidden=!pv.hidden;if(!pv.src&&!pv.hidden)pv.src=pv.dataset.src;pvb.setAttribute('aria-expanded',!pv.hidden)};
const up=$("#top");addEventListener("scroll",()=>{up.style.display=scrollY>700?"block":"none"});
up.onclick=()=>scrollTo({top:0});
