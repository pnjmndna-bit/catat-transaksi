/* ==========================================
   PXXSTUDI DASHBOARD
   PART 1
========================================== */

const websiteList = document.getElementById("websiteList");
const websiteTemplate = document.getElementById("websiteTemplate");

const websiteModal = document.getElementById("websiteModal");
const deleteModal = document.getElementById("deleteModal");

const addWebsite = document.getElementById("addWebsite");
const fab = document.getElementById("fab");
const emptyAddBtn = document.getElementById("emptyAddBtn");

const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveWebsite = document.getElementById("saveWebsite");

const searchInput = document.getElementById("searchInput");

const loadingScreen = document.getElementById("loadingScreen");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const totalWebsite = document.getElementById("totalWebsite");
const activeWebsite = document.getElementById("activeWebsite");
const warningWebsite = document.getElementById("warningWebsite");
const expiredWebsite = document.getElementById("expiredWebsite");

const emptyState = document.getElementById("emptyState");

const websiteName = document.getElementById("websiteName");
const linkName = document.getElementById("linkName");
const websiteUrl = document.getElementById("websiteUrl");
const expiredDate = document.getElementById("expiredDate");
const websiteNote = document.getElementById("websiteNote");

const todayDate = document.getElementById("todayDate");

let websites = JSON.parse(localStorage.getItem("pxxstudio_websites")) || [];

let editIndex = -1;

let deleteIndex = -1;

/* ==========================================
   TANGGAL HARI INI
========================================== */

const today = new Date();

todayDate.innerText =
today.toLocaleDateString("id-ID",{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

});

/* ==========================================
   LOADING
========================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loadingScreen.classList.add("hide");

},800);

});

/* ==========================================
   TOAST
========================================== */

function showToast(message){

toastText.innerText = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

/* ==========================================
   SIMPAN DATA
========================================== */

function saveData(){

localStorage.setItem(

"pxxstudio_websites",

JSON.stringify(websites)

);

}

/* ==========================================
   FORMAT TANGGAL
========================================== */

function formatDate(date){

    if(!date) return "-";

    return new Date(date)

    .toLocaleDateString("id-ID",{

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}

/* ==========================================
   SELISIH HARI
========================================== */

function getRemainingDays(date){

const now = new Date();

now.setHours(0,0,0,0);

const target = new Date(date);

target.setHours(0,0,0,0);

const diff = target - now;

return Math.floor(

diff / 86400000

);

}

/* ==========================================
   STATUS WEBSITE
========================================== */

function getStatus(days){

if(days > 7){

return{

text:"Aktif",

class:"status-active"

};

}

if(days >= 0){

return{

text:days + " Hari Tersisa",

class:"status-warning"

};

}

if(days >= -7){

return{

text:

"Toleransi " +

Math.abs(days) +

" Hari",

class:"status-tolerance"

};

}

return{

text:"Expired",

class:"status-expired"

};

}

/* ==========================================
   UPDATE DASHBOARD
========================================== */

function updateDashboard(){

    totalWebsite.textContent = websites.length;

    let aktif = 0;
    let warning = 0;
    let expired = 0;

    websites.forEach(item=>{

        const days =
        getRemainingDays(item.expiredDate);

        if(days > 3){

            aktif++;

        }else if(days >= -3){

            warning++;

        }else{

            expired++;

        }

    });

    activeWebsite.textContent = aktif;

    warningWebsite.textContent = warning;

    expiredWebsite.textContent = expired;

}

/* ==========================================
   EMPTY STATE
========================================== */

function updateEmptyState(){

    if(websites.length===0){

        emptyState.style.display="block";

        websiteList.style.display="none";

    }else{

        emptyState.style.display="none";

        websiteList.style.display="grid";

    }

}

/* ==========================================
   SORT BERDASARKAN TANGGAL
========================================== */

function sortWebsite(){

    websites.sort((a,b)=>{

        return new Date(a.expiredDate)

        -

        new Date(b.expiredDate);

    });

}

/* ==========================================
   CHECKLIST HTML
========================================== */

function createMonthHTML(months = []){

    let html = "";

    for(let i=1;i<=12;i++){

        html += `
        <button
        class="month-box ${months.includes(i) ? "checked" : ""}"
        data-month="${i}">
            <i class="fa-solid fa-check"></i>
        </button>
        `;

    }

    return html;

}

/* ==========================================
   PROGRESS BAR
========================================== */

function progressWidth(days){

    if(days<=0) return 100;

    return Math.max(
        10,
        100-(days/30*100)
    );

}

/* ==========================================
   RENDER WEBSITE
========================================== */

function renderWebsite(){

    websiteList.innerHTML="";

    sortWebsite();

    updateDashboard();

    updateEmptyState();

    websites.forEach((item,index)=>{

        const clone =

        websiteTemplate

        .content

        .cloneNode(true);

        const card =

        clone.querySelector(

        ".website-card"

        );

        const status =

        getStatus(

        getRemainingDays(

        item.expiredDate

        )

        );

        card.querySelector(

        ".name"

        ).textContent=

        item.name;

        card.querySelector(

        ".link-name"

        ).textContent=

        item.linkName;

        const url =

        card.querySelector(

        ".website-url"

        );

        url.href=item.url;

        url.querySelector(

        "span"

        ).textContent=

        item.url;

        card.querySelector(

        ".expired-date"

        ).textContent=

        formatDate(

        item.expiredDate

        );

        card.querySelector(

        ".remaining-day"

        ).textContent=

        status.text;

        const badge=

        card.querySelector(

        ".status-badge"

        );

        badge.textContent=

        status.text;

        badge.classList.add(

        status.class

        );

        card.querySelector(

        ".note-text"

        ).textContent=

        item.note ||

        "-";

        card.querySelector(

        ".month-list"

        ).innerHTML=

        createMonthHTML(

        item.months || []

        );

      card.querySelectorAll(".month-box").forEach(box=>{

    box.onclick=()=>{

        const month = Number(box.dataset.month);

        if(!item.months){

            item.months=[];

        }

        if(item.months.includes(month)){

            item.months=item.months.filter(m=>m!==month);

            box.classList.remove("checked");

        }else{

            item.months.push(month);

            box.classList.add("checked");

        }

        saveData();

    };

});

       const days =
getRemainingDays(item.expiredDate);

const progress =
card.querySelector(".progress-fill");

progress.style.width =
progressWidth(days)+"%";

updateProgressColor(progress,days);

      // Tombol Buka
card.querySelector(".open-btn").onclick = () => {
    window.open(item.url, "_blank");
};

// Tombol Edit
card.querySelector(".edit-btn").onclick = () => {

    editIndex = index;

    websiteName.value = item.name;
    linkName.value = item.linkName;
    websiteUrl.value = item.url;
    expiredDate.value = item.expiredDate;
    websiteNote.value = item.note || "";

    document.querySelectorAll(".month-grid input").forEach(check=>{
        check.checked = item.months?.includes(Number(check.value));
    });

    document.getElementById("modalTitle").innerHTML = `
    <i class="fa-solid fa-pen"></i>
    Edit Website
    `;

    openModal(true);

};

// Tombol Hapus
card.querySelector(".delete-btn").onclick = () => {

    deleteIndex = index;

    deleteModal.classList.add("active");

};

// TAMBAH BARIS INI
startTyping(card);

websiteList.appendChild(

clone

);

    });

}

/* ==========================================
   BUKA MODAL
========================================== */

function openModal(edit = false){

    websiteModal.classList.add("active");

    if(!edit){

        editIndex = -1;

        document.getElementById("modalTitle").innerHTML = `
        <i class="fa-solid fa-globe"></i>
        Tambah Website
        `;

        websiteName.value = "";
        linkName.value = "";
        websiteUrl.value = "";
        expiredDate.value = "";
        websiteNote.value = "";

        document
        .querySelectorAll(".month-grid input")
        .forEach(item=>item.checked=false);

    }

}

/* ==========================================
   TUTUP MODAL
========================================== */

function closeWebsiteModal(){

    websiteModal.classList.remove("active");

}

/* ==========================================
   TAMBAH DATA
========================================== */

function addData(){

    const months = [];

    document
    .querySelectorAll(".month-grid input")
    .forEach(item=>{

        if(item.checked){

            months.push(

                Number(item.dataset.month || item.value)

            );

        }

    });

    websites.push({

        id:Date.now(),

        name:websiteName.value.trim(),

        linkName:linkName.value.trim(),

        url: websiteUrl.value.trim().startsWith("http")
    ? websiteUrl.value.trim()
    : "https://" + websiteUrl.value.trim(),

        expiredDate:expiredDate.value,

        note:websiteNote.value.trim(),

        months

    });

    saveData();

    renderWebsite();

    closeWebsiteModal();

    showToast("Website berhasil ditambahkan");

}

/* ==========================================
   EDIT DATA
========================================== */

function updateData(){

    const months=[];

    document
    .querySelectorAll(".month-grid input")
    .forEach(item=>{

        if(item.checked){

            months.push(

                Number(item.dataset.month || item.value)

            );

        }

    });

    websites[editIndex]={

        ...websites[editIndex],

        name:websiteName.value.trim(),

        linkName:linkName.value.trim(),

        url: websiteUrl.value.trim().startsWith("http")
    ? websiteUrl.value.trim()
    : "https://" + websiteUrl.value.trim(),

        expiredDate:expiredDate.value,

        note:websiteNote.value.trim(),

        months

    };

    saveData();

    renderWebsite();

    closeWebsiteModal();

    showToast("Website berhasil diperbarui");

}

/* ==========================================
   SIMPAN
========================================== */

saveWebsite.addEventListener("click",()=>{

    if(

        websiteName.value.trim()==="" ||

        websiteUrl.value.trim()==="" ||

        expiredDate.value===""

    ){

        showToast("Lengkapi data terlebih dahulu");

        return;

    }

    if(editIndex===-1){

        addData();

    }else{

        updateData();

    }

});

/* ==========================================
   BUKA MODAL
========================================== */

addWebsite.onclick = openModal;

fab.onclick = openModal;

emptyAddBtn.onclick = openModal;

closeModal.onclick = closeWebsiteModal;

cancelBtn.onclick = closeWebsiteModal;

/* ==========================================
   PERPANJANG 1 BULAN
========================================== */

function addOneMonth(date){

    const d = new Date(date);

    d.setMonth(d.getMonth()+1);

    return d.toISOString().split("T")[0];

}

/* ==========================================
   COPY LINK
========================================== */

async function copyLink(url){

    try{

        await navigator.clipboard.writeText(url);

        showToast("Link berhasil disalin");

    }catch{

        showToast("Gagal menyalin link");

    }

}

/* ==========================================
   UPDATE PROGRESS COLOR
========================================== */

function updateProgressColor(bar,days){

    if(days>7){

        bar.style.background =
        "linear-gradient(90deg,#22c55e,#16a34a)";

        return;

    }

    if(days>=0){

        bar.style.background =
        "linear-gradient(90deg,#f59e0b,#f97316)";

        return;

    }

    if(days>=-7){

        bar.style.background =
        "linear-gradient(90deg,#8b5cf6,#7c3aed)";

        return;

    }

    bar.style.background =
    "linear-gradient(90deg,#ef4444,#dc2626)";

}

/* ==========================================
   CLOSE MODAL CLICK OUTSIDE
========================================== */

websiteModal.addEventListener("click",(e)=>{

    if(e.target===websiteModal){

        closeWebsiteModal();

    }

});

deleteModal.addEventListener("click",(e)=>{

    if(e.target===deleteModal){

        deleteModal.classList.remove("active");

    }

});

/* ==========================================
   ESC KEY
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeWebsiteModal();

        deleteModal.classList.remove("active");

    }

});

/* ==========================================
   AUTO BACKUP
========================================== */

function exportBackup(){

    return JSON.stringify(websites,null,2);

}

window.addEventListener("beforeunload",()=>{

    saveData();

});

document.getElementById("cancelDelete").onclick=()=>{

    deleteModal.classList.remove("active");

};

document.getElementById("confirmDelete").onclick=()=>{

    websites.splice(deleteIndex,1);

    saveData();

    renderWebsite();

    deleteModal.classList.remove("active");

    showToast("Website berhasil dihapus");

};

/* ==========================================
   CODE TYPING
========================================== */

const codeLines = [

'const app = "PxxStudix";',
'const version = "v3.0";',
'',
'fetch("/api/dashboard");',
'await response.json();',
'',
'https://pxxstudix.com',
'https://api.pxxstudix.com',
'',
'Build completed successfully ✔',
'Deploy completed ✔',
'Ready in 286ms',
'',
'> System Ready',
'> Waiting request...',
'> Monitoring server...',
'> Watching files...',
'> Listening on port 3000',
'> No errors detected.',
'> Security Scan Passed.',
'> SSL Certificate Valid.',
'> Uptime 99.99%',
'> Memory Usage 34%',
'> CPU Usage 12%',
'> CDN Connected',
'> Auto Backup Enabled'

];

function startTyping(card){

    const pre = card.querySelector(".typing-code");

    if(!pre) return;

    let line = 0;
    let char = 0;

    function type(){

        if(line >= codeLines.length){

            setTimeout(()=>{

                pre.textContent = "";

                line = 0;
                char = 0;

                type();

            },1500);

            return;

        }

        if(char < codeLines[line].length){

            pre.textContent += codeLines[line][char];

            char++;

            setTimeout(type,35);

        }else{

            pre.textContent += "\n";

            line++;

            char = 0;

            setTimeout(type,200);

        }

    }

    type();

}

renderWebsite();

searchInput.addEventListener("input",e=>{

    const keyword =

    e.target.value.toLowerCase();

    document

    .querySelectorAll(".website-card")

    .forEach(card=>{

        card.style.display =

        card.innerText

        .toLowerCase()

        .includes(keyword)

        ?

        ""

        :

        "none";

    });

});

