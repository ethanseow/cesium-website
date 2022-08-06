import simple from './simple.js'
// helpers and constants
const D = document;

let $commThresh = D.getElementById('commThreshSlider')
let $conicSensor = D.getElementById('conicSensorSlider')
let $gsThresh = D.getElementById('gsThreshSlider')

let $IWalker = D.getElementById('IWalker')
let $TWalker = D.getElementById('TWalker')
let $PWalker = D.getElementById('PWalker')
let $FWalker = D.getElementById('FWalker')
let $AltWalker = D.getElementById('AltWalker')

let $propDur = D.getElementById('propDur')
let $calendarField = D.getElementById('calendarField')

let $groundStationField = D.getElementById('groundStationField')

let $commCheckBox = D.getElementById('commCheckBox')
let $conicCheckBox = D.getElementById('conicCheckBox')
let $gsCheckBox = D.getElementById('gsCheckBox')

let $submitButton = D.getElementById('submitButton')


Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZDJlZjUzOC05NTk5LTRlNjEtYjQzZS00YWM5N2ZiYWIyNDUiLCJpZCI6OTc5ODQsImlhdCI6MTY1NTQ4NDU5OX0.kwtnbKrsGyQq2bq1C0st-oyXj8yBPhS42LBliNP-F14'
let viewer = new Cesium.Viewer("cesiumContainer", {
        shouldAnimate: true,
})
const defaultDataSource = Cesium.CzmlDataSource.load(simple)

const parseGroundStations = (text) => {
    const regex = /[-0-9]+(\.)?[-0-9]+/g
    const coords = text.match(regex)
    let ret = []
    for(let i = 0; i < coords.length;i +=2 ){
        ret.push([parseInt(coords[i]),parseInt(coords[i+1])])
    }
    return ret
}



// application state

// getters and setters
const getCommThreshValue = () => parseInt($commThresh.value)
const getConicSensorValue = () => parseInt($conicSensor.value)
const getGsThreshValue = () => parseInt($gsThresh.value)
const getIWalkerValue = () => parseInt($IWalker.value)
const getTWalkerValue = () => parseInt($TWalker.value)
const getPWalkerValue = () => parseInt($PWalker.value)
const getFWalkerValue = () => parseInt($FWalker.value)
const getAltWalkerValue = () => parseInt($AltWalker.value)
const getPropDur = () => parseInt($propDur.value)
const getCalendarField = () => $calendarField.value
const getGroundStationField = () => $groundStationField.value
const isCommChecked = () => $commCheckBox.checked
const isConicChecked = () => $conicCheckBox.checked
const isGSChecked = () => $gsCheckBox.checked

// event handlers and related functions
const generateJson = () => {
    const groundStationsText = getGroundStationField()
    const groundStations = parseGroundStations(groundStationsText)
    let IWalker = getIWalkerValue()
    let TWalker = getTWalkerValue()
    let PWalker = getPWalkerValue()
    let FWalker = getFWalkerValue()
    let AltWalker = getAltWalkerValue()
    let propDur = getPropDur()
    let calendarField = getCalendarField()
    let commThresh = isCommChecked() && getCommThreshValue()
    let gsThresh = isGSChecked() && getGsThreshValue()
    let conicSensor = isConicChecked() && getConicSensorValue()
    let json = {
        i:IWalker,
        t:TWalker,
        p:PWalker,
        f:FWalker,
        alt:AltWalker,
        prop_dur:propDur,
        time:calendarField,
        dist_threshold:commThresh,
        elev_threshold:gsThresh,
        conicSensorAngle:conicSensor,
        GS_pos:groundStations
    }
    return json
}

const checkAllFields = () => {
    
}

const delay = async (ms) => {
    return await new Promise(resolve => setTimeout(resolve,ms))
}

// event handler bindings


// initial setup
viewer.dataSources.add(
    defaultDataSource
);

console.log(getCommThreshValue())







$(document).ready(() => {
    console.log(simple)
    var submitButton = $('#submitButton')
    


    submitButton.on('click',async ()=>{
        onSubmit(viewer)
    })
    
    /*
    input_dict = {
        'i': 60, 
        't': 6, 
        'p': 2, 
        'f': 1, 
        'alt': 600, 
        'time': '2022-06-08T00:00:00', 
        'prop_dur': 1, 
        'dist_threshold': None, 
        'elev_threshold': None, 
        'conicSensorAngle': None, 
        'GS_pos': [[10, 10], [40, 40], [60, 60], [100, 100], [150, 150]]}
    */
    /*
    var commThresh = document.getElementById('commThreshSlider')
    commThresh.value = null

    var conicSensor = document.getElementById('conicSensorSlider')
    conicSensor.value = null
    var gsThresh = document.getElementById('gsThreshSlider')
    gsThresh.value = null
    */
    IWalker.value = "60"
    TWalker.value = "6"
    PWalker.value = "2"
    FWalker.value = "1"
    AltWalker.value = "600"
    propDur.value ="1"
    groundStationField.value = '[[10,10],[40,40],[60,60],[100,100],[150,150]]'
})
const onSubmit = async(viewer) => {
    console.log(helloworld)
    



    const parseGroundStations = (text) => {
        const regex = /[-0-9]+(\.)?[-0-9]+/g
        const coords = text.match(regex)
        let ret = []
        for(let i = 0; i < coords.length;i +=2 ){
            ret.push([parseInt(coords[i]),parseInt(coords[i+1])])
        }
        return ret
    }
    groundStationField = parseGroundStations(groundStationField)
    // no walker params, exit
    if (IWalker == '' || TWalker == '' || PWalker == '' || FWalker == '' || AltWalker == ''){
        // alert the fields that have not been filled out
        alert('You did not fill out all the fields')
        return
    }
    commThresh = parseInt(commThresh)
    conicSensor = parseInt(conicSensor)
    gsThresh = parseInt(gsThresh)
    IWalker = parseInt(IWalker)
    TWalker = parseInt(TWalker)
    PWalker = parseInt(PWalker)
    FWalker = parseInt(FWalker)
    AltWalker = parseInt(AltWalker)
    propDur = parseInt(propDur)
    if(!commCheckBox){
        commThresh = null
    }
    if(!gsCheckBox){
        gsThresh = null
    }
    if(!conicCheckBox){
        conicCheckBox = null
    }
    const params = {
        i:IWalker,
        t:TWalker,
        p:PWalker,
        f:FWalker,
        alt:AltWalker,
        prop_dur:propDur,
        time:calendarField,
        dist_threshold:commThresh,
        elev_threshold:gsThresh,
        conicSensorAngle:conicSensor,
        GS_pos:groundStationField
    }   
    document.getElementById('submitButton').innerHTML = 'waiting'
    await delay(5000)
    document.getElementById('submitButton').innerHTML = 'Submit'
}

const setLoading = (isLoading) => {

}