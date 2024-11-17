<script lang="ts">
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			phone: '',
			password: '',
			error: '',
		}
	},
	components: {
		Input,
		Button
	},
	methods: {
		...mapActions(['saveToken']),
		changePhone (value: string) {
			this.phone = value.replace(/\D/g, '');
		},
		changePassword(value: string) {
			this.password = value;
		},
		async login() {
			try {
				const response = await this.$http.post('/auth/login/ ', {
					"username": this.phone,
					"password": this.password
				});

				const token = response.data.key;

				this.saveToken(token);
        localStorage.setItem('token', token);
				
				this.$router.push('/')
			}catch(err) {
				this.error = 'Ошибка авторизации. Проверьте данные.';
			}
		},
	}
}

</script>

<template>
	<div class="login">
		<div class="form__block">
			<div class="title">Авторизация</div>
			<form @submit.prevent="login">
				<Input class="phone__input" @send-value="changePhone" value="phone" phone label="Логин или Телефон" />
				<Input password @send-value="changePassword"/>
				<p v-if="error" class="color__red">{{ error }}</p>
				<div class="button__block">
					<div class="button">
					<Button text="Войти"/>
				</div>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped lang="scss">
$background-image: url("@/assets/images/login.jpeg");

.login {
	width: 100%;
	height: 100vh;
	background-image: $background-image;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	justify-content: center;
	align-items: center;
}

.form__block {
	position: relative;
	height: 250px;
	width: 300px;
	border-radius: 5px;
	background-color: #ffffff;
	padding: 20px;
	display: flex;
}

.title {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	margin: 0 auto;
	font-size: 16px;
	font-weight: 500;
	line-height: 20px;
	color: #ffffff;
	width: 308px;
	text-align: center;
	padding: 18px 0;
	background-color: #44a248;
	height: min-content;
	border-radius: 5px;
	transform: translateY(-19px);
}
.form__block form {
	margin-top: 66px;
	width: 100%;
}

.phone__input {
	margin-bottom: 29px;
}

.button__block {
	display: flex;
	justify-content: center;
	margin-top: 28px;
}

.button {
	width: 110px;
}

.color__red {
	color: red;
	font-size: 12px;
}
</style>
