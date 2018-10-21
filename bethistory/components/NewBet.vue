<template>
<ScrollView>
<StackLayout>
<WrapLayout backgroundColor="#ffffff">
                <Label text="Stake" width="30%" backgroundColor="#43b883"/>
                <TextField width="70%" v-model="betForm.stake" row="2" keyboardType="number"
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                <Label text="Return" width="30%" backgroundColor="#43b883"/>
                <TextField width="70%" v-model="betForm.return" row="2" keyboardType="number"
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                <Label text="Date" width="30%" backgroundColor="#43b883"/>
                <TextField width="70%" v-model="betForm.date" row="2" keyboardType="datetime"
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                <Label text="Status" width="100%" backgroundColor="#43b883"/>
                <SegmentedBar width="100%" v-model="betForm.status" selectedIndex="0" @selectedIndexChange="betStatusChange">
                    <SegmentedBarItem title="won" />
                    <SegmentedBarItem title="wating" />
                    <SegmentedBarItem title="lost" />
                </SegmentedBar>

                <Label text="Notes" width="30%" backgroundColor="#43b883"/>
                <TextField width="70%" heigth="40%" v-model="betForm.note" row="12" 
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                <Label text="Details" width="100%" backgroundColor="#43b883"/>
                <WrapLayout v-for="detail in betForm.details" :key="detail.id">
                   
                    <Label text="Status" width="100%" backgroundColor="#43b883"/>
                    <SegmentedBar width="100%" v-model="detail.status" selectedIndex="0">
                        <SegmentedBarItem title="Won" />
                        <SegmentedBarItem title="Lost" />
                        <SegmentedBarItem title="Wating" />
                    </SegmentedBar>

                    <Label text="Odd" width="30%" backgroundColor="#43b883"/>
                    <TextField width="70%" v-model="detail.odd" row="2" keyboardType="number"
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                     <Label text="Sport type" width="100%" backgroundColor="#43b883"/>
                    <SegmentedBar width="100%" v-model="detail.sport_type" selectedIndex="0">
                        <SegmentedBarItem title="Football" />
                        <SegmentedBarItem title="Basketball" />
                        <SegmentedBarItem title="Tennis" />
                    </SegmentedBar>

                    <Label text="Home" width="30%" backgroundColor="#43b883"/>
                    <TextField width="70%" v-model="detail.home" row="2" keyboardType="number"
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                    <Label text="Away" width="30%" backgroundColor="#43b883"/>
                    <TextField width="70%" v-model="detail.away" row="2" keyboardType="number"
                      borderBottomWidth="3" borderBottomColor="#cec8c8"
		             padding="0" />

                </WrapLayout>
                
                <WrapLayout>
                    <Button text="Add Detail" @tap="addBetD" width="50%" />
                    <Button text="Save" @tap="saveBet" width="50%"/>
                    <!-- <Button text="Go Back" @tap="$navigateBack" width="50%"/> -->
                </WrapLayout>

</WrapLayout>
</StackLayout>
</ScrollView>
</template>

<script>

  export default {
    name: 'newbet',
    data() {
      return {
        msg: 'Hello World I am Tamer!',
          betForm:{
            date: new Date(),
            stake: "0",
            return: "0",
            status: 0,
            note: 'Any note related to this bet',
            details:[]
        },
        betTypes:[{title:"Finished"},{title:"Waiting"}]
    }
    },
    methods: {
        betStatusChange: function(){
            /** 
            console.log("bet status changed");
            if(this.betForm.status==2){
            
                this.betForm.return=0;
            
            }else if(this.betForm.return<=this.betForm.stake){
                alert({
                    title: "",
                    message: "Return must be bigger than stake",
                    okButtonText: "ok"
                    }).then(() => {
                        console.log("Alert dialog closed");
                });

            }
            */
        },
        saveBet: function(){
            console.log("status-->"+this.betForm.status);
            this.$db.saveBet(this.betForm);
        },
        addBetD: function(){

            this.betForm.details.push({
                 bet_type:0,
                 odd:0,
                 sport_type:0,
                 home:"Beşiktaş",
                 away:"Fenerbahçe",
                 status:0
            })

        },
        getFullBetCB: function(bet) {
          console.log(bet);
        },
    },
    mounted() {
       console.log("BetEntry mounted...");
    },
    beforeMount() {
        this.addBetD();
    }

  }
</script>

<style scoped>
</style>
