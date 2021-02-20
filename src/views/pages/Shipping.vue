<template>
  <div class="container">
    <form class="wrapper-form">
      <div class="field-group">
        <div class="input-group">
          <p>Name*</p>
          <input
              type="text"
              class="input"
              v-model.trim="firstName"
              :class="{'is-invalid': ($v.firstName.$dirty && !$v.firstName.required)}">
        </div>
      </div>
      <div class="field-group">
        <div class="input-group">
          <p>Adress*</p>
          <input
            type="text"
            class="input"
            v-model.trim="address"
            :class="{'is-invalid': ($v.address.$dirty && !$v.address.required)}">
        </div>
      </div>
      <div class="field-group">
        <div class="input-group">
          <p>Phone</p>
          <input
            type="text"
            class="input"
            placeholder="+48"
            v-mask="phoneMask"
            v-model.trim="phone"
            :class="{'is-invalid': ($v.phone.$dirty && !$v.phone.required)}">
        </div>
      </div>
      <div class="field-group">
        <div class="input-group">
          <p>E-mail</p>
          <input
            type="text"
            class="input"
            v-model.trim="email"
            :class="{'is-invalid': ($v.email.$dirty && !$v.email.required)}">
        </div>
          <small class="invalid-feedback"
                 v-if="$v.email.$dirty && !$v.email.required">Заполните поле</small>
          <small class="invalid-feedback"
                 v-else-if="$v.email.$dirty && !$v.email.email">Нужно ввести действительный адресс</small>
      </div>
      <div class="field-group">
        <div class="input-group">
          <p>Shipping Options</p>
          <input v-if="sum > 300" type="text" value="Free express shipping" disabled>
          <select v-else>
            <option
              v-for="option in options"
            >{{option.title}}</option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <button
            :disabled="!isValid"
            @click.prevent="registerUser" class="btn btn-primary btn-user btn-block">
          PAY
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
import {email, required} from 'vuelidate/lib/validators'
export default {
  name: "Shipping",
  directives: { mask },
  data() {
    return {
      phone: null,
      email: null,
      firstName: null,
      address: null,
      phoneMask: '+48#########',
      options: [
        {title: 'Free shipping'},
        {title: 'Express shipping - additional 9.99'},
        {title: 'Courier shipping - additional 19.99'}
      ]
    }
  },
  validations: {
    phone: {required},
    firstName: {required},
    address: {required},
    email: {required, email}
  },
  computed: {
    isValid() {
      return !!(this.firstName) && !!(this.address) && !!(this.email) && !!(this.phone)
    },
    sum () {
      return this.$store.state.cart.sum
    },
  },
  methods: {
    registerUser() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
    }
  }
}
</script>

<style>

</style>
