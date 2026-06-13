// analytics.js — минимальная имитация аналитики
window.Analytics = (function(){
  function track(event, data){
    console.log('[Analytics] ', event, data||{});
    // сюда можно отправлять на сервер или в внешний сервис
  }
  return { track };
})();
