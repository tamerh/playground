<template>

     <StackLayout>
    
      <Label text="Total bet:"></Label>
      <Label :text="totalCount"></Label>
      <Label :text="pageResultSize"></Label>
      <Label :text="totalPageSize"></Label>

      <RadListView ref="listView" for="(item,index) in betList" @itemTap="onItemTap" 
                   @scrollStarted="onScrollStarted" @scrollEnded="onScrollEnded">
        
        <v-template>
          <StackLayout orientation="horizontal">            
            <Label :text="index"></Label>
            <Label text=" Stake:"></Label>
            <Label :text="item.stake"></Label>
            <Label text=" Return:"></Label>
            <Label :text="item.return"></Label>
          </StackLayout>
        </v-template>

      </RadListView>
    </StackLayout>

</template>

<script>
   // TODO although loading on scroll is fancy it looks very error prone consider also LOAD MORE botton.
  export default {
    name: 'mybets',
    data() {
      return {
        betList: null,
        totalCount:null,
        currentPageIndex:0
    }
    },
    computed: {
        pageResultSize:{
          get: function(){
            return 40;//TODO this should big enough to cover the page
          }
        },
        totalPageSize:{
          get: function(){
            return Math.ceil(this.totalCount / this.pageResultSize)-1;
          }
        }
    }
    ,
    methods: {
        betStatusChange: function(){
        },
        list: function(){
        },
        getFullBetCB: function(bet) {
          console.log(bet);
        },
        onItemTap({ item }) {
            console.log(`Tapped on ${item.name}`);
        },
        onScrolled ({ scrollOffset }) {
          this.scrollOffset = scrollOffset;
          //console.log("scrolled offset-->"+scrollOffset);
        },
        onScrollStarted ({ scrollOffset }) {
          this.scrollStartOffset = scrollOffset;
          //console.log("scroll started offset-->"+this.scrollStartOffset);
        },
        onScrollEnded ({ scrollOffset }) {
          this.scrollEndOffset = scrollOffset;
          //console.log("scroll start offset-->"+this.scrollStartOffset);
          //console.log("scroll end offset-->"+this.scrollEndOffset);
          
          if(this.currentPageIndex < this.totalPageSize && this.scrollStartOffset <= this.scrollEndOffset){
            
              this.currentPageIndex++
              let nextBetlist = this.$db.betListL(this.pageResultSize,this.currentPageIndex * this.pageResultSize);
              this.betList.push(...nextBetlist);
          }

        },
    },
    
    mounted() {
       console.log("MyBets mounted...");
    },
    beforeMount() {
      this.betList=this.$db.betListL(this.pageResultSize,0);
      this.totalCount=this.$db.betCount();
      //console.log("total countttt>"+this.totalCount);
    }

  }
</script>

<style scoped>
</style>
