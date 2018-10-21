<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="*,*,*,*,*">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0" row="0"/>
                <Label text="Games" @tap="changeActiveComp('games')" col="1" row="0" />
                <Label text="Dashboard" @tap="changeActiveComp('dashboard')" col="2" row="0"/>
                <Label text="My Bets" @tap="changeActiveComp('mybets')" col="3" row="0" />
                <Label text="New Bet" @tap="changeActiveComp('newbet')" col="4" row="0" />
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>
                <Label class="drawer-item" text="Settings" @tap="changeActiveComp('settings')"/>

            </StackLayout>

            <GridLayout ~mainContent colums="*" rows="*">
                <StackLayout>
                    <mybets v-if="activeComp=='mybets'"/>
                    <newbet v-if="activeComp=='newbet'"/>
                    <dashboard v-if="activeComp=='dashboard'"/>
                    <games v-if="activeComp=='games'"/>
                    <settings v-if="activeComp=='settings'"/>
                </StackLayout>
                
            </GridLayout>

        </RadSideDrawer>
    </Page>
</template>

<script>
import Dashboard from './Dashboard';
import MyBets from './MyBets';
import NewBet from './NewBet';
import Games from './Games';
import Settings from './Settings';

export default {
	components: {
		mybets: MyBets,
		newbet: NewBet,
		dashboard: Dashboard,
        games: Games,
        settings:Settings
	},
	data() {
		return {
            activeComp: 'mybets',
		};
	},
	methods: {
		changeActiveComp(comp) {
			this.activeComp = comp;
			this.$refs.drawer.nativeView.closeDrawer();
		},
		goToPage: function(page) {
			this.$navigateTo(page);
		},
	},
	mounted() {
        console.log('App mounted...');
	},
	beforeMount() {
        console.log('App before mount...');
	},
};
</script>

<style scoped>
ActionBar {
	background-color: #53ba82;
	color: #ffffff;
}

.title {
	text-align: left;
	padding-left: 16;
	font-size: 16;
}

.message {
	vertical-align: center;
	text-align: center;
	font-size: 20;
	color: #333333;
}

.drawer-header {
	padding: 50 16 16 16;
	margin-bottom: 16;
	background-color: #53ba82;
	color: #ffffff;
	font-size: 24;
}

.drawer-item {
	padding: 8 16;
	color: #333333;
	font-size: 16;
}
</style>
