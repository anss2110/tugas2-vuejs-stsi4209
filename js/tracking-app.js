import { dbPaket } from "./dataBahanAjar.js";

const { createApp, ref, computed, watch } = Vue;

const App = {
  setup() {
    const listPaket = ref(dbPaket);
    const listEkspedisi = ref(["JNE Regular", "JNE Express", "Pos Indonesia"]);

    const inputDO = ref({
      nim: "",
      nama: "",
      ekspedisi: "JNE Regular",
      paketId: "",
      tanggal: new Date().toISOString().slice(0, 10),
      hargaDisplay: 0,
    });

    const doCounter = ref(3);

    const riwayatDO = ref([
      {
        noDO: "DO2025-001",
        nim: "043000001",
        nama: "Budi Santoso",
        ekspedisi: "JNE Express",
        paket: "Paket Semester 1 TI",
        harga: 450000,
        tanggal: "2025-11-28",
        status: "Delivered",
      },
      {
        noDO: "DO2025-002",
        nim: "043000002",
        nama: "Siti Aminah",
        ekspedisi: "Pos Indonesia",
        paket: "Paket Semester 1 Hukum",
        harga: 300000,
        tanggal: "2025-11-29",
        status: "On Process",
      },
    ]);

    const keywordResi = ref("");
    const searchResult = ref(null);
    const showTrackingModal = ref(false);
    const timelineData = ref([]);

    const generatedDONumber = computed(() => {
      const year = new Date().getFullYear();
      const sequence = String(doCounter.value).padStart(3, "0");
      return `DO${year}-${sequence}`;
    });

    const selectedPaketDetail = computed(() => {
      return listPaket.value.find((p) => p.id === inputDO.value.paketId);
    });

    watch(
      () => inputDO.value.paketId,
      (newId) => {
        const paket = listPaket.value.find((p) => p.id === newId);
        inputDO.value.hargaDisplay = paket ? paket.harga : 0;
      }
    );

    const formatRupiah = (angka) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(angka || 0);
    };

    const simpanDO = () => {
      if (!inputDO.value.paketId || !inputDO.value.nim) {
        alert("Mohon lengkapi data!");
        return;
      }

      const dataBaru = {
        noDO: generatedDONumber.value,
        nim: inputDO.value.nim,
        nama: inputDO.value.nama,
        ekspedisi: inputDO.value.ekspedisi,
        paket: selectedPaketDetail.value?.nama || "-",
        harga: inputDO.value.hargaDisplay,
        tanggal: inputDO.value.tanggal,
        status: "Manifested",
      };

      riwayatDO.value.unshift(dataBaru);
      doCounter.value++;

      // Reset form
      inputDO.value.nim = "";
      inputDO.value.nama = "";
      inputDO.value.paketId = "";

      alert(`DO ${dataBaru.noDO} berhasil disimpan!`);
    };

    const cariPaket = () => {
      if (!keywordResi.value) {
        alert("Masukkan Nomor DO terlebih dahulu!");
        return;
      }

      const found = riwayatDO.value.find(
        (item) => item.noDO.toLowerCase() === keywordResi.value.toLowerCase()
      );

      if (found) {
        searchResult.value = found;
        generateMockTimeline(found);
        showTrackingModal.value = true;
      } else {
        alert("Nomor DO tidak ditemukan!");
      }
    };

    const closeTrackingModal = () => {
      showTrackingModal.value = false;
      searchResult.value = null;
    };

    const generateMockTimeline = (item) => {
      const steps = [];
      const date = item.tanggal;

      steps.push({
        date: date,
        time: "08:00",
        activity: "Data DO diterima di Sistem SITTA",
        loc: "Server UT",
        done: true,
      });

      steps.push({
        date: date,
        time: "14:30",
        activity: `Paket diserahkan ke pihak ${item.ekspedisi}`,
        loc: "Gudang UT Pusat",
        done: true,
      });

      if (item.status === "On Process" || item.status === "Delivered") {
        steps.push({
          date: date, // Asumsi hari yang sama malamnya
          time: "21:00",
          activity: "Paket sedang dalam perjalanan ke kota tujuan",
          loc: "Hub Logistik Jakarta",
          done: true,
        });
      }

      if (item.status === "Delivered") {
        steps.push({
          date: "Estimasi +2 Hari",
          time: "10:00",
          activity: `Paket diterima oleh Ybs (${item.nama})`,
          loc: "Alamat Mahasiswa",
          done: true,
        });
      } else {
        steps.push({
          date: "Estimasi",
          time: "--:--",
          activity: "Menuju Alamat Penerima",
          loc: "-",
          done: false,
        });
      }

      timelineData.value = steps.reverse();
    };

    return {
      listPaket,
      listEkspedisi,
      riwayatDO,
      inputDO,
      generatedDONumber,
      selectedPaketDetail,
      // Return state/methods baru
      keywordResi,
      searchResult,
      showTrackingModal,
      timelineData,
      cariPaket,
      closeTrackingModal,
      formatRupiah,
      simpanDO,
    };
  },
};

createApp(App).mount("#app");
