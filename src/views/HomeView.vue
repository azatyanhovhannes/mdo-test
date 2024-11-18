<script lang="ts">
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import ArrowUpIcon from '@/components/ArrowUpIcon.vue';
import { mapActions } from 'vuex';

export default {
	components: {
		Button,
		Input,
		ArrowUpIcon,
	},
	mounted() {
		this.getData(1,10);
	},
	methods: {
		...mapActions(['saveData', 'saveCount', 'savePageItems']),
		async getData(page: number, page_size: number) {
			try {
				const response = await this.$http.get(`/appeals/v1.0/appeals/?page=${page}&page_size=${page_size}`)
				this.saveData(response.data.results)
				this.saveCount(response.data.count)
				this.savePageItems({
					page: response.data.page,
					page_next: response.data.page_next,
					page_previous: response.data.page_previous,
					page_size: response.data.page_size,
					pages: response.data.page_size
				})
				console.log(this.$store.state.data)
			} catch (err) {

			}
		}
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
				<div class="table">
					<table style="width: 100%;">
						<thead>
							<tr>
								<th style="width: 8.2%;">№<ArrowUpIcon /></th>
								<th style="width: 12.4%;">Создана<ArrowUpIcon color="#333333"/></th>
								<th style="width: 16.5%;">Адрес</th>
								<th style="width: 16.5%;">Заявитель</th>
								<th style="width: 21.6%;">Описание</th>
								<th style="width: 12.4%;">Срок</th>
								<th style="width: 12.4%;">Статус<ArrowUpIcon /></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="i of $store.state.data">
								<td style="width: 8.2%;"><p class="num">{{ i.number }}</p></td>
								<td style="width: 12.4%;"><p class="text__ellipsis">{{ $moment(i.created_at).format("DD.MM.YYYY") }}</p></td>
								<td style="width: 16.5%;">
									<p class="text__ellipsis">{{
								 `${i.premise?.address || i.premise?.short_address || i.premise?.full_address || ''} ${i.apartment?.label || ''}`
								 }}</p>
								</td>
								<td style="width: 16.5%;">
									<p class="text__ellipsis">{{ 
									`${i.applicant.last_name} ${i.applicant.first_name && i.applicant.first_name[0] + '.'} ${i.applicant.patronymic_name && i.applicant.patronymic_name[0] + '.'}`
								 }}</p>
								</td>
								<td style="width: 21.6%;"><p class="text__ellipsis">{{ i.description }}</p></td>
								<td style="width: 12.4%;">
									<p class="text__ellipsis">{{ isNaN(i.due_date) ? $moment(i.due_date).format("DD.MM.YYYY, hh:mm") : '' }}</p>
								</td>
								<td style="width: 12.4%;"><p class="text__ellipsis">{{ i.status.name }}</p></td>
							</tr>
						</tbody>
					</table>

					<div class="bottom__block">
						<div class="left">
							<p>
								{{ $store.state.page * $store.state.page_size - ($store.state.page_size - 1) }}-{{ ($store.state.page * $store.state.page_size - ($store.state.page_size - 1)) + ($store.state.page_size - 1) }} <span>из</span> {{ $store.state.count }} <span>записей</span>
							</p>
						</div>
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
.table {
	margin-top: 32px;
}
.table table thead tr th {
font-family: "Roboto";
font-size: 14px;
font-weight: 400;
line-height: 20px;
color: #50B053;
padding: 12px 8px;
text-align: left;
vertical-align: bottom;
}
.table table tr {
	box-shadow: 0px -1px 0px 0px #DDDFE0 inset;
}
.text__ellipsis {
	color: #333333;
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	padding: 19px 8px;
	width: 90%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.num {
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
	color: #FFFFFF;
	padding: 4px 15px;
	background-color: #50B053;
	border-radius: 4px;
	display: inline-block;
}
.bottom__block {
	margin-top: 32px;
}
.bottom__block .left p {
	font-family: Roboto;
	font-size: 14px;
	font-weight: 700;
	line-height: 16.41px;
	padding: 12px 8px;
}
.bottom__block .left p span {
	font-size: 12px;
	font-weight: 400;
	line-height: 18px;
}
</style>
