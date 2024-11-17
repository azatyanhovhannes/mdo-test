<script lang="ts">
import EyeIcon from "./EyeIcon.vue";
import LockIcon from "./LockIcon.vue";
import PhoneIcon from "./PhoneIcon.vue";
import SearchIcon from "./SearchIcon.vue";

export default {
  emits: ['send-value'],
  props: {
    password: {
      type: Boolean,
      required: false
    },
    phone: {
      type: Boolean,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    search: {
      type: Boolean,
      required: false
    },
    text: {
      type: Boolean,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isShowPassword: false,
      inputValue: ''
    }
  },
  methods: {
    changeIsShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    handleChange() {
      this.$emit('send-value', this.inputValue)
    }
  },
  components: {
    EyeIcon,
    LockIcon,
    PhoneIcon,
    SearchIcon
  },
  mounted() {
    if(this.$props.phone){
    this.inputValue = '7'
  }
  }
}
</script>

<template>
  <div>
    <div class="password" v-if="password">
      <LockIcon class="lock" />
      <input 
      :type="isShowPassword? 'text' : 'password'" placeholder="Пароль"
      @input="handleChange"
      v-model="inputValue" />
      <EyeIcon
        class="eye"
        :class="{ 'active': isShowPassword }"
        @click="changeIsShowPassword"
      />
    </div>
    <div v-if="phone" class="phone">
      <label v-if="label">{{ label }}</label>
      <input 
       v-mask="'+7 (###) ###-##-##'"
       @input="handleChange"
       v-model="inputValue"
        />
      <PhoneIcon class="phone__icon" />
    </div>
    <div v-if="text" class="search">
      <input 
      type="text"
      v-model="inputValue"
      :placeholder="placeholder"
      @input="handleChange">
      <SearchIcon v-if="search" class="search__icon"/>
    </div>
  </div>
</template>

<style scoped>
input {
  border: none;
  border-bottom: 1px solid #cccccc;
  width: calc(100% - 14px);
  padding: 7px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #999999;
}
input:focus-visible {
  outline: none;
}
input::placeholder {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #999999;
}

label {
color: #50B053;
font-size: 12px;
font-weight: 400;
line-height: 18px;

}

.password {
  position: relative;
}
.password input {
  padding-left: 32px;
  width: calc(100% - 39px);
}
.lock {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
.eye {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  cursor: pointer;
  margin-right: 12px;
}

.active >>> path {
  fill: rgb(46, 152, 218);
}
.phone {
  position: relative;
}
.phone input {
  padding-left: 32px;
  width: calc(100% - 39px);
}
.phone__icon {
  position: absolute;
  left: 0;
  bottom: 7px;
}
.search {
  position: relative;
}
.search__icon {
  position: absolute;
  top: 17px;
  right: 0;
}
</style>
