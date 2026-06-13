// preloader.js — простая предзагрузка изображений/аудио
window.Preloader = (function(){
  function images(list, onProgress, onComplete){
    let loaded=0; const total=list.length; if (!total) return onComplete && onComplete();
    list.forEach(src=>{ const img=new Image(); img.onload=img.onerror=function(){ loaded++; onProgress&&onProgress(loaded/total); if(loaded===total) onComplete&&onComplete(); }; img.src=src; });
  }
  return { images };
})();
