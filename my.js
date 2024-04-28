const { createApp } = Vue

createApp({
  data() {
    return {
      ValutaAtvaltasok: [],
      valutak: [
        { name: "USA dollar", szimbolum: "$", arujegy: "USD" },
        { name: "Magyar Forint", szimbolum: "Ft", arujegy: "HUf" },
        { name: "Euro", szimbolum: "€", arujegy: "EUR" },
        { name: "Orosz Rubel", szimbolum: "₽", arujegy: "RUB" },
      ],
      apikey: "fca_live_NaQq6PqJfc2yuvykGW4JBKRm8npS8FCdSlKkqfix",
      value: 1,
      what: "HUF",
      to: "HUF",
      total: null,
    };
  },
  async mounted() {
    await this.onClickCounts();
  },
  methods: {
    async onClickCounts() {
      await this.getValutaAtvaltasa();
      this.total = this.value * this.ValutaAtvaltasok[this.to];
    },
    async getValutaAtvaltasa() {
      const response = await fetch(this.url);
      const data = await response.json();
      this.ValutaAtvaltasok = data.data;
    },
  },
  computed: {
    url() {
      return `https://api.freecurrencyapi.com/v1/latest?apikey=${this.apikey}&currencies=${this.ValutaJegy}&base_currency=${this.what}`;
    },
    ValutaJegy() {
      return this.valutak.map((c) => c.arujegy).join("%2C");
    },
  },
}).mount("#app");
