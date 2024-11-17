<script lang="ts">
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import { mapActions } from 'vuex';

export default {
	components: {
		Button,
		Input
	},
	mounted() {
		(async () => {
			try {
				const response = await this.$http.get('/appeals/v1.0/appeals/?page=1&page_size=10')
				this.saveData(response.data.results)
			} catch (err) {

			}
		})()
		
	},
	methods: {
		...mapActions(['saveData'])
	}
}
</script>

<template>
	<div class="home">
		<h1 class="title">
			Список заявок
		</h1>
		<div class="table__block">
			<div>
				<div class="create__block">
					<div><Button text="СОЗДАТЬ" /></div>
				</div>
				<div class="filter__block">
					<div class="search__input">
						<Input text placeholder="Поиск (№ заявки, название)" search/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.title {
	font-family: "Roboto";
	color: #454545;
	font-size: 24px;
	line-height: 24px;
	font-weight: 400;
	margin: 25px 32px;
}
.table__block {
	margin: 72px 15px 47px 15px;
	background-color: #FFFFFF;
	border-radius: 8px;
	width: calc(100% - 30px);
}
.table__block > div {
	padding: 10px 20px;
}
.create__block {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
.create__block > div {
	width: 78px;
}
.create__block ::v-deep(.button) {
	font-size: 10px;
	padding: 7px 16px;
}
.filter__block {
	display: flex;
	justify-content: space-between;
}
.search__input {
	width: calc(50% - 7.5px);
}
.search__input ::v-deep(input) {
	padding: 17px 36px 17px 0;
}
</style>
