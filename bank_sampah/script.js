function login() {
    const u = username.value;
    const p = password.value;

    if (u === "admin" && p === "admin") {
        localStorage.setItem("role", "admin");
        location.href = "admin.html";
    } else if (u === "user" && p === "123") {
        localStorage.setItem("role", "nasabah");
        location.href = "nasabah.html";
    } else {
        alert("Login gagal");
    }
}

function logout() {
    localStorage.removeItem("role");
}

function setor() {
    const nama = document.getElementById("nama").value;
    const jenis = document.getElementById("jenis").value;
    const berat = document.getElementById("berat").value;

    const harga = { Plastik: 3000, Kertas: 2000, Logam: 5000 };
    const total = berat * harga[jenis];

    let data = JSON.parse(localStorage.getItem("data")) || [];
    data.push({ nama, jenis, berat, total });
    localStorage.setItem("data", JSON.stringify(data));

    alert("Setoran berhasil!");
}

if (document.getElementById("chart")) {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    const total = { Plastik: 0, Kertas: 0, Logam: 0 };
    let list = "";

    data.forEach(d => {
        total[d.jenis] += d.total;
        list += `<div class="card">${d.nama} - Rp ${d.total}</div>`;
    });

    document.getElementById("list").innerHTML = list;

    new Chart(chart, {
        type: "bar",
        data: {
            labels: Object.keys(total),
            datasets: [{
                data: Object.values(total),
                backgroundColor: ["#22d3ee", "#a5b4fc", "#facc15"]
            }]
        }
    });
}
