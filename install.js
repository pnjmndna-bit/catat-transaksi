/* ==========================================
   PXXSTUDIX INSTALL APP
========================================== */

let deferredPrompt = null;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt",(e)=>{

    e.preventDefault();

    deferredPrompt = e;

    if(installBtn){

        installBtn.style.display = "flex";

    }

});

if(installBtn){

    installBtn.addEventListener("click",async()=>{

        if(!deferredPrompt){

            alert("Perangkat atau browser ini belum mendukung instalasi aplikasi.");

            return;

        }

        deferredPrompt.prompt();

        const choice = await deferredPrompt.userChoice;

        if(choice.outcome==="accepted"){

            installBtn.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Aplikasi Terpasang
            `;

        }

        deferredPrompt = null;

    });

}

window.addEventListener("appinstalled",()=>{

    console.log("PxxStudix berhasil diinstall");

    if(installBtn){

        installBtn.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Aplikasi Terpasang
        `;

    }

});
