<template>
<ScrollView>
    <StackLayout class="home-panel">        
     <StackLayout>
        <GridLayout rows="*" height="500px">
            <RadPieChart allowAnimation="false" row="0">
                <PieSeries v-tkPieSeries selectionMode="None" expandRadius="0" outerRadiusFactor="0" :items="pieSource" valueProperty="count"
                    legendLabel="label" showLabels="true" showPercentage="true"/>
                <!-- <RadLegendView v-tkPieLegend position="Top" offsetOrigin="TopRight" width="110" enableSelection="true" /> -->
                
                 <Palette v-tkPiePalette>
                            <PaletteEntry v-tkPiePaletteEntry strokeWidth="0" fillColor="Green"/>
                            <PaletteEntry v-tkPiePaletteEntry strokeWidth="0" fillColor="Gray"/> 
                             <PaletteEntry v-tkPiePaletteEntry strokeWidth="0" fillColor="Red"/>
                 </Palette>

            </RadPieChart>
        </GridLayout>
    </StackLayout>

    <Label class="title" text="Profit/Loss"  col="1"/>
        
    <StackLayout height="500px"><!--shows slightly bigger in android simulator. -->
        <RadRadialGauge>
            <RadialScale v-tkRadialGaugeScales minimum="0" maximum="6" radius="0.90">
                <ScaleStyle v-tkRadialScaleStyle majorTicksCount="7" minorTicksCount="9" lineThickness="0" labelsCount="7" ticksOffset="0"/>
                <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="1.2" location="0.97">
                    <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#dddddd" />
                </RadialBarIndicator>
                <RadialBarIndicator v-tkRadialScaleIndicators minimum="1.2" maximum="2.4" location="0.97">
                    <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#9DCA56" />
                </RadialBarIndicator>
                <RadialBarIndicator v-tkRadialScaleIndicators minimum="2.4" maximum="3.6" location="0.97">
                    <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#F0C44D" />
                </RadialBarIndicator>
                <RadialBarIndicator v-tkRadialScaleIndicators minimum="3.6" maximum="4.8" location="0.97">
                    <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#E27633" />
                </RadialBarIndicator>
                <RadialBarIndicator v-tkRadialScaleIndicators minimum="4.8" maximum="6" location="0.97">
                    <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#A7010E" />
                </RadialBarIndicator>
                <RadialNeedle v-tkRadialScaleIndicators :value="gaugeValue" />
            </RadialScale>
        </RadRadialGauge>
    </StackLayout>

    </StackLayout>
</ScrollView>
</template>

<script>
require('nativescript-ui-gauge/vue');
require('nativescript-ui-chart/vue'); 

export default {
	name: 'dashboard',
	data() {
		return {
			msg: 'Hello World I am Tamer!',
			gaugeValue: 2,
			pieSource: null,
		};
	},
	methods: {
		getBetDCB: function(detail) {
			console.log(detail.home);
		},
		report1CB: function(r) {
			console.log('dash report1-->' + r);
		},
		report2CB: function(r) {
			console.log('dash report2-->' + r);
			for (let key in r) {
				if (r[key].id == 0) {
					r[key].label = 'won';
				} else if (r[key].id == 1) {
					r[key].label = 'wating';
				} else if (r[key].id == 2) {
					r[key].label = 'lost';
				}
				console.log(r[key]);
			}
			this.pieSource = r;
		},
	},
	mounted() {
		console.log('Dashboard mounted...');
	},
	beforeMount() {
	    this.$db.report1(this.report1CB);
		this.$db.report2(this.report2CB);
	},
};
</script>

<style scoped>
.home-panel {
	vertical-align: center;
	font-size: 20;
	margin: 15;
}

.description-label {
	margin-bottom: 15;
}
</style>
