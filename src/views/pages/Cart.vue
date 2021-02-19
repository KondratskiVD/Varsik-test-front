<template>
  <div class="container">
    <div
        class="item wrapper" v-for="skeleton in 3"
        v-if="loading"
      >
      <skeleton-loader
          :width="100"
          :height="100"
          animation="fade"
      />
      <div class="item-text">
        <h4 class="item-title">
          <skeleton-loader
            :width="100"
            :height="20"
            animation="fade"
          />
        </h4>
        <h5 class="item-description">
          <skeleton-loader
            :width="200"
            :height="35"
            animation="fade"
          />
        </h5>
      </div>
      <div class="item-group">
        <div class="item-trash">
          <i>
            <skeleton-loader
               :width="20"
               :height="20"
               animation="fade"
            />
          </i>

        </div>
        <div class="item-count">
          <skeleton-loader
              :width="200"
              :height="30"
              animation="fade"
          />
        </div>
      </div>
    </div>

    <div
      class="item wrapper" v-for="item in products">
      <img class="item-img" src="@/assets/unnamed.png" alt="">
      <div class="item-text">
        <h4 class="item-title">{{ item.title}}</h4>
        <h5 class="item-description">{{  item.description }}</h5>
      </div>
      <div class="item-group">
        <div class="item-trash">
          <i @click="removeItem(item.id)" class="fas fa-trash-alt item-group_pointer"></i>
        </div>
        <div class="item-count">
          <span
            @click="changeCount(item.id, false)"
            class="item-count__change item-group_pointer"><i class="fas fa-minus"></i></span>
          <input type="text" :value="item.count">
          <span
            @click="changeCount(item.id, true)"
            class="item-count__change item-group_pointer"><i class="fas fa-plus"></i></span>
          <p class="item-count__price">{{ computedPrice(item.count, item.price) | formattedNumber }}</p>
        </div>
      </div>
    </div>
    <div class="result wrapper">
      <div class="result__group">
        <p class="result__sum">{{ result | formattedNumber }}</p>
        <button
          @click.stop="buyProducts"
          >BUY</button>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from 'skeleton-loader-vue';

export default {
  name: "Cart",
  components: { 'skeletonLoader': SkeletonLoader },
  data() {
    return {
      products: [],
      loading: true
    }
  },
  created() {
    this.$http.get('https://my-json-server.typicode.com/KondratskiVD/mock/products')
    .then((response) => {
      this.products = response.data
      this.loading = false
    })
  },
  computed: {
    result() {
      let count = 0
      this.products.forEach(item => {
        count = count + item.count * item.price
      })
      return count
    },
  },
  methods: {
    computedPrice(price, count) {
      return price * count
    },
    removeItem(id) {
      this.products = this.products.filter(item => {
        if (item.id !== id) {
          return item
        }
      })
    },
    changeCount(id, increase) {
      this.products.map(item => {
        if (item.id === id) {
            if (increase && item.count <= 49) {
              item.count++
            } else if (!increase && item.count >= 1 ){
              item.count--
            }
        }
      })
    },
    buyProducts() {
      this.$store.dispatch('cart/setNewSum', this.result)
      this.$router.push({name: 'shipping'})
    }
  }
}
</script>

<style scoped>
  .skeleton {
    margin: 0 auto;
    display: flex;
    max-width: 760px;
    width: 100%;
  }
</style>
