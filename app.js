const API = 'https://raw.githubusercontent.com/ArefievVyacheslav/Vue-cart-os/main'


const app = new Vue({
   el: '#app',
   data: {
       products: [],
       filtered: [],
       cart: [],
       searchLine: '',
       isVisibleCart: false,
       catalogUrl: '/placeholder.json',
       addCartUrl: '/addToBasket.json',
       deleteCartUrl: '/deleteFromBasket.json'
   },
   computed: {
       filter() {
           let regexp = new RegExp(this.searchLine, 'i')
           this.filtered = this.products.filter(el => regexp.test(el.name))
           return this.filtered
       },
   },
   methods: {
       getJson(url) {
           return fetch(url)
               .then(result => result.json());
       },
       addProduct(product) {
           this.getJson(`${API + this.addCartUrl}`)
               .then(data => {
                   if (data.result === 1) {
                       let find = this.cart.find(el => el.name === product.name);
                       if (find) find.quantity++;
                       else {
                           let prod = Object.assign({quantity: 1}, product);
                           this.cart.push(prod);
                       }
                   }
               })
       },
       removeProduct(product) {
           this.getJson(`${API + this.deleteCartUrl}`)
               .then(data => {
                   if (data.result === 1) {
                       if (product.quantity > 1) product.quantity--;
                       else {
                           this.cart.splice(this.cart.indexOf(product), 1);
                       }
                   }
               })
       },
   },
   created() {
       this.getJson(`${API+this.catalogUrl}`)
                .then(data => {
                    this.products = data;
                    this.filtered = data;
                });
   }
});
