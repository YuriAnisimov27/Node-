import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

new Vue({
  el: '#app',
  data() {
    return {
      form: {
        name: '',
        value: ''
      },
      contacts: []
    };
  },
  methods: {
    createContact() {
      const {...contact} = this.form;
      console.log(contact);
      this.contacts.push({...contact, id: Date.now()});
      console.log('contacts', this.contacts);

      this.form.name = '';
      this.form.value = '';
    }
  }
});
