<template>

  <StackLayout>

    <Label text="Games:"></Label>

    <RadListView ref="listView" for="(country,index) in football" @itemTap="onItemTap">

      <v-template>
        <StackLayout orientation="horizontal">
          <Label :text="country.country" />

          <StackLayout>
            <GridLayout columns="*" rows="*" v-for="tournament in country.tournaments">
              <StackLayout>
                <Label :text="tournament.name" row="0" col="0" backgroundColor="#43b883" />
                <GridLayout columns="*,*" rows="*" v-for="game in tournament.games">
                  <Label :text="gameTime(game.t)" row="0" col="0" backgroundColor="#43b883" />
                  <Label :text="game.h +'+'+game.a" row="0" col="1" backgroundColor="#43b883" />
                </GridLayout>
              </StackLayout>
            </GridLayout>

          </StackLayout>
        </StackLayout>
      </v-template>

    </RadListView>

  </StackLayout>

</template>

<script>
// TODO although loading on scroll is fancy it looks very error prone consider also LOAD MORE botton.
export default {
	name: 'games',
	data() {
		return {
			football: [],
		};
	},
	computed: {},
	methods: {
		betStatusChange: function() {},
		list: function() {},
		gameTime(time) {
			let gametime = new Date(time);
			return (gametime.getHours()<10 ? "0"+gametime.getHours(): gametime.getHours()) + ':' + (gametime.getMinutes()<10 ? "0"+gametime.getMinutes(): gametime.getMinutes());
		},
		updateGamesCB: function(games) {
			console.log('girildiCB');
			console.log(games.football);
			this.football = games.football;
		},
		onItemTap({ item }) {
			console.log(`Tapped on ${item.name}`);
		},
	},

	mounted() {
		console.log('Games mounted...');
	},
	beforeMount() {
		// 1- get daily sport data and insert database

		this.$db.updateGames(this.updateGamesCB);
	},
};
</script>

<style scoped>
</style>
