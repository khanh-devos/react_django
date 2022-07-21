function showWidth(){
    let demo = document.getElementById("demo");
    let app = document.getElementById("app");
    //demo.textContent = app.clientWidth;
    
    //Keep the sroll postition always 0 or max WHEN RESIZE
    setTimeout(()=>{
        const ratio = Math.round(100*app.scrollLeft / (app.scrollWidth/2));
        ratio < 40 ? app.scrollTo(0, app.scrollTop)
                   : app.scrollTo(app.scrollWidth, app.scrollTop);
  
    },1000)
}

