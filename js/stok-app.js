import { dbBahanAjar, dbUpbjj } from "./dataBahanAjar.js";

const { createApp, ref, computed, watch } = Vue;

const App = {
  setup() {
    /** @type {import('vue').Ref<Array<import('./dataBahanAjar.js').BahanAjar>>} */
    const rawData = ref(dbBahanAjar);
    const listUpbjj = ref(dbUpbjj);

    // Note : State Form Baru
    const newData = ref({
      kode: "",
      judul: "",
      kategori: "Umum",
      upbjj: "Jakarta",
      lokasi: "-",
      qty: null,
      safety: 5,
      harga: null,
    });

    // Note : State Filter
    const filterUpbjj = ref("");
    const filterKategori = ref("");
    const filterWarning = ref(false);
    const sortBy = ref("judul");

    // Note : State Modal
    const selectedItem = ref(null);
    const showInputModal = ref(false);

    // Note : Computed: Kategori Unik
    const uniqueCategories = computed(() => {
      const source = filterUpbjj.value
        ? rawData.value.filter((item) => item.upbjj === filterUpbjj.value)
        : rawData.value;
      return [...new Set(source.map((item) => item.kategori))];
    });

    // Note : Computed: Processed Data
    const processedStok = computed(() => {
      let result = [...rawData.value];

      if (filterUpbjj.value) {
        result = result.filter((item) => item.upbjj === filterUpbjj.value);
      }
      if (filterKategori.value) {
        result = result.filter(
          (item) => item.kategori === filterKategori.value
        );
      }
      if (filterWarning.value) {
        result = result.filter(
          (item) => item.qty < item.safety || item.qty === 0
        );
      }

      result.sort((a, b) => {
        if (sortBy.value === "judul") return a.judul.localeCompare(b.judul);
        if (sortBy.value === "qty") return a.qty - b.qty;
        if (sortBy.value === "harga") return a.harga - b.harga;
        return 0;
      });

      return result;
    });

    // Note :  Watchers
    watch(filterUpbjj, () => {
      filterKategori.value = "";
    });

    // Methods
    const resetFilters = () => {
      filterUpbjj.value = "";
      filterKategori.value = "";
      filterWarning.value = false;
      sortBy.value = "judul";
    };

    // --- Methods Modal Input ---
    const openInputModal = () => {
      showInputModal.value = true;
    };

    const closeInputModal = () => {
      showInputModal.value = false;
    };

    const tambahData = () => {
      if (newData.value.kode && newData.value.judul) {
        rawData.value.push({ ...newData.value });
        alert("Data Berhasil Ditambahkan!");

        // Reset field
        newData.value.kode = "";
        newData.value.judul = "";
        newData.value.qty = null;
        newData.value.harga = null;
        newData.value.lokasi = "-";

        // Tutup modal otomatis
        closeInputModal();
      }
    };

    // --- Methods Modal Detail ---
    const openDetail = (item) => {
      selectedItem.value = item;
    };

    const closeDetail = () => {
      selectedItem.value = null;
    };

    const formatRupiah = (angka) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(angka || 0);
    };

    const getStatusClass = (item) => {
      if (item.qty === 0) return "bg-red-100 text-red-800 border-red-200";
      if (item.qty < item.safety)
        return "bg-orange-100 text-orange-800 border-orange-200";
      return "bg-green-100 text-green-800 border-green-200";
    };

    const getStatusLabel = (item) => {
      if (item.qty === 0) return "Kosong";
      if (item.qty < item.safety) return "Menipis";
      return "Aman";
    };

    return {
      listUpbjj,
      uniqueCategories,
      processedStok,
      filterUpbjj,
      filterKategori,
      filterWarning,
      sortBy,
      newData,
      selectedItem,
      showInputModal, // Return state baru
      resetFilters,
      tambahData,
      openDetail,
      closeDetail,
      openInputModal, // Return method baru
      closeInputModal, // Return method baru
      formatRupiah,
      getStatusClass,
      getStatusLabel,
    };
  },
};

createApp(App).mount("#app");
