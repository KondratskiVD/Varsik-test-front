<template>
  <div class="container">
    <form class="wrapper-form" @submit.prevent>
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
          <div>
            <input
              type="text"
              class="input"
              v-model.trim="email"
              :class="{'is-invalid': ($v.email.$dirty && !$v.email.required)}">
            <div>
              <small class="invalid-feedback"
                     v-if="$v.email.$dirty && !$v.email.required">Заполните поле</small>
              <small class="invalid-feedback"
                     v-else-if="$v.email.$dirty && !$v.email.email">Нужно ввести действительный адресс</small>
            </div>
          </div>
        </div>
      </div>
      <div class="field-group">
        <div class="input-group">
          <p>Shipping Options</p>
          <select>
            <option
              v-for="option in options"
            >{{option.title}}</option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <button
            :disabled="!isValid"
            @click.stop="registerUser" class="btn btn-primary btn-user btn-block">
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
      return this.firstName !== null &&
        this.address !== null &&
        this.email !== null &&
        this.phone !== null
    }
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
.field-group {
  margin-bottom: 15px;
}
.invalid-feedback {
  font-size: 80%;
  color: #e74a3b;
}
.input-group {
  display: flex;
}
.input-group p {
  min-width: 150px;
}
.input-group input{
  border: 1px solid #b0b0b0;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  padding: 0.5rem 0.5rem;
  width: 250px;
}
.input-group select {
  border: 1px solid #b0b0b0;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  padding: 0.5rem 0.5rem;
  width: 268px;
}
.is-invalid {
  border-color: #dc3545 !important;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
}
@media screen and (max-width: 768px) {
  .input-group {
    flex-wrap: wrap;
  }
}
</style>
