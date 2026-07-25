/* =========================
   ELEMENT
========================= */

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const saveBtn = document.getElementById("saveBtn");

const transactionList =
document.getElementById("transactionList");

const saldo =
document.getElementById("saldo");

const incomeTotal =
document.getElementById("incomeTotal");

const expenseTotal =
document.getElementById("expenseTotal");

const homePage =
document.getElementById("homePage");

const bankPage =
document.getElementById("bankPage");

const historyPage =
document.getElementById("historyPage");

const statisticPage =
document.getElementById("statisticPage");

const debtPage =
document.getElementById("debtPage");

const settingPage =
document.getElementById("settingPage");

const homeMenu =
document.getElementById("homeMenu");

const bankMenu =
document.getElementById("bankMenu");

const historyMenu =
document.getElementById("historyMenu");

const statisticMenu =
document.getElementById("statisticMenu");

const debtMenu =
document.getElementById("debtMenu");

const settingMenu =
document.getElementById("settingMenu");


/* =========================
   TYPE BUTTON
========================= */

const incomeBtn =
document.getElementById("incomeBtn");

const expenseBtn =
document.getElementById("expenseBtn");

let currentType = "income";


/* =========================
   DRAWER
========================= */

const menuBtn =
document.getElementById("menuBtn");

const drawer =
document.getElementById("drawer");

const drawerOverlay =
document.getElementById("drawerOverlay");


/* =========================
   LOCAL STORAGE
========================= */
let transactions =
JSON.parse(
    localStorage.getItem("transactions")
) || [];

let banks =
JSON.parse(
localStorage.getItem("banks")
) || [

    {

        id:Date.now(),

        name:"Cash",

        saldo:0

    }

];

function showPage(page){

    document
    .querySelectorAll(".page")
    .forEach(item=>{

        item.classList.remove("active");

    });

    page.classList.add("active");

    closeDrawer();

}

/* =========================
   FORMAT RUPIAH
========================= */

function rupiah(nominal){

    return "Rp" +
    Number(nominal)
    .toLocaleString("id-ID");

}


/* =========================
   SIMPAN
========================= */

function saveData(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    localStorage.setItem(
        "banks",
        JSON.stringify(banks)
    );

}


/* =========================
   DRAWER OPEN
========================= */

menuBtn.onclick = ()=>{

    drawer.classList.add("show");

    drawerOverlay.classList.add("show");

    document.body.style.overflow =
    "hidden";

};


/* =========================
   DRAWER CLOSE
========================= */

function closeDrawer(){

    drawer.classList.remove("show");

    drawerOverlay.classList.remove("show");

    document.body.style.overflow =
    "";

}

drawerOverlay.onclick =
closeDrawer;


/* =========================
   KATEGORI
========================= */

const incomeCategory = [

    "Gaji",

    "Bonus",

    "Hadiah",

    "Penjualan",

    "Investasi",

    "Lainnya"

];

const expenseCategory = [

    "Makanan",

    "Transport",

    "Belanja",

    "Tagihan",

    "Hiburan",

    "Lainnya"

];


/* =========================
   LOAD CATEGORY
========================= */

function loadCategory(){

    category.innerHTML = "";

    const data =
    currentType=="income"
    ? incomeCategory
    : expenseCategory;

    data.forEach(item=>{

        category.innerHTML += `
            <option value="${item}">
                ${item}
            </option>
        `;

    });

}

loadCategory();


/* =========================
   TYPE BUTTON
========================= */

incomeBtn.onclick = ()=>{

    currentType = "income";

    incomeBtn.classList.add("active");

    expenseBtn.classList.remove("active");

    loadCategory();

};


expenseBtn.onclick = ()=>{

    currentType = "expense";

    expenseBtn.classList.add("active");

    incomeBtn.classList.remove("active");

    loadCategory();

};

/* =========================
   UPDATE SUMMARY
========================= */

function updateSummary(){

    let income = 0;
    let expense = 0;

    transactions.forEach(item=>{

        if(item.type=="income"){

            income += item.amount;

        }else{

            expense += item.amount;

        }

    });

    incomeTotal.textContent =
    rupiah(income);

    expenseTotal.textContent =
    rupiah(expense);

    saldo.textContent =
    rupiah(income-expense);

}


/* =========================
   RENDER
========================= */

function render(){

    transactionList.innerHTML = "";

    if(transactions.length==0){

        transactionList.innerHTML = `
            <div class="empty">
                Belum ada transaksi.
            </div>
        `;

        updateSummary();

        return;

    }

    transactions
.slice(0,10)
.forEach(item=>{

    transactionList.innerHTML += `

    <div class="transaction-item">

        <div class="transaction-left">

            <div class="transaction-icon ${item.type}">

                ${
                    item.type=="income"
                    ? `
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 18V6M12 6L7 11M12 6L17 11"
                        stroke="currentColor"
                        stroke-width="2.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                    </svg>
                    `
                    :
                    `
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 6V18M12 18L7 13M12 18L17 13"
                        stroke="currentColor"
                        stroke-width="2.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                    </svg>
                    `
                }

            </div>

            <div class="transaction-info">

    <h4>${item.title}</h4>

    <p>${item.date}</p>

    <div class="transaction-category">
        ${item.category}
    </div>

</div>

        </div>

        <div class="transaction-right">

            <div class="transaction-amount ${item.type}">

                ${item.type=="income" ? "+" : "-"}

                ${rupiah(item.amount)}

            </div>

            <button
            class="delete-btn"
            onclick="removeTransaction('${item.id}')">

                ✕

            </button>

        </div>

    </div>

    `;

});

    updateSummary();

}


/* =========================
   TAMBAH TRANSAKSI
========================= */

saveBtn.onclick = ()=>{

    const nama =
    title.value.trim();

    const nominal =
    Number(amount.value);

    if(

        nama==""

        ||

        nominal<=0

    ){

        alert("Lengkapi data terlebih dahulu.");

        return;

    }

    const data = {

        id:
        Date.now().toString(),

        title:nama,

        category:
        category.value,

        amount:nominal,

        type:
        currentType,

        date:
        new Date()
        .toLocaleString("id-ID")

    };

    transactions.unshift(data);

    saveData();

    render();

    title.value = "";

    amount.value = "";

    title.focus();

};


/* =========================
   LOAD
========================= */

render();

/* =========================
   HAPUS TRANSAKSI
========================= */

function removeTransaction(id){

    const ok = confirm(
        "Yakin ingin menghapus transaksi ini?"
    );

    if(!ok){

        return;

    }

    transactions = transactions.filter(item=>{

        return item.id !== id;

    });

    saveData();

    render();

}


/* =========================
   HAPUS SEMUA
========================= */

const clearAll =
document.getElementById("clearAll");

if(clearAll){

    clearAll.onclick = ()=>{

        if(transactions.length==0){

            alert("Belum ada transaksi.");

            return;

        }

        const ok = confirm(
            "Hapus semua transaksi?"
        );

        if(!ok){

            return;

        }

        transactions = [];

        saveData();

        render();

    };

}


/* =========================
   ENTER
========================= */

title.addEventListener("keypress",e=>{

    if(e.key==="Enter"){

        amount.focus();

    }

});

amount.addEventListener("keypress",e=>{

    if(e.key==="Enter"){

        saveBtn.click();

    }

});


/* =========================
   ANIMASI ITEM
========================= */

function animateItems(){

    const items =
document.querySelectorAll(".transaction-item");

    items.forEach((item,index)=>{

        item.style.opacity="0";

        item.style.transform=
        "translateY(12px)";

        setTimeout(()=>{

            item.style.transition=
            ".35s ease";

            item.style.opacity="1";

            item.style.transform=
            "translateY(0)";

        },index*50);

    });

}


/* =========================
   RENDER ULANG
========================= */

const oldRender = render;

render = function(){

    oldRender();

    animateItems();

};


/* =========================
   LOAD
========================= */

render();


/* =========================
   ESC TUTUP DRAWER
========================= */

document.addEventListener("keydown",e=>{

    if(

        e.key==="Escape"

        &&

        drawer.classList.contains("show")

    ){

        closeDrawer();

    }

});


/* =========================
   TUTUP DRAWER SAAT KLIK MENU
========================= */

    homeMenu.onclick=(e)=>{

    e.preventDefault();

    showPage(homePage);

};

bankMenu.onclick=(e)=>{

    e.preventDefault();

    showPage(bankPage);

};

historyMenu.onclick=(e)=>{

    e.preventDefault();

    showPage(historyPage);

};

statisticMenu.onclick=(e)=>{

    e.preventDefault();

    showPage(statisticPage);

};

debtMenu.onclick=(e)=>{

    e.preventDefault();

    showPage(debtPage);

};

settingMenu.onclick=(e)=>{

    e.preventDefault();

    showPage(settingPage);

};
